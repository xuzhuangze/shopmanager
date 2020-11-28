<template>
  <el-form :model="seckForm"
           ref="seckForm" style="width: 400px" label-width="100px"
           class="demo-ruleform">
    <!--    :rules="rules"-->
    <el-breadcrumb separator=">" class="bread-nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/seckill' }">限时秒杀列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <br>
    <br>
    <h1>{{tip}}</h1>

    <el-form-item label="活动标题" prop="title">
      <el-input v-model="seckForm.title"></el-input>
    </el-form-item>

    <!--一级分类·-->
    <el-form-item label="一级分类" prop="first_cateid">
      <el-select v-model="seckForm.first_cateid" placeholder="请选择一级分类" @change="changeCate">
        <el-option :value="item.id" :label="item.catename" v-for="item in cateArr"></el-option>
      </el-select>
    </el-form-item>

    <!--    二级分类·-->
    <el-form-item label="二级分类" prop="second_cateid" v-if="secondcateArr.length != 0">
      <el-select v-model="seckForm.second_cateid" placeholder="请选择二级分类" @change="getGoods">
        <el-option :value="item.id" :label="item.catename" v-for="item in secondcateArr"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="商品" prop="goodsid">
      <el-select v-model="seckForm.goodsid" placeholder="请选择商品">
        <el-option :value="item.id" :label="item.goodsname" v-for="item in goodsArr"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item prop="begintime">
      <div class="block">
        <span class="demonstration">默认</span>
        <el-date-picker
          v-model="seckForm.begintime"
          type="datetime"
          placeholder="选择日期时间"
          @change="getbeginTime"
        >
        </el-date-picker>
      </div>
    </el-form-item>


    <el-form-item prop="endtime">
      <div class="block">
        <span class="demonstration">默认</span>
        <el-date-picker
          v-model="seckForm.endtime"
          type="datetime"
          placeholder="选择日期时间"
          @change="getendTime"
        >
        </el-date-picker>
      </div>
    </el-form-item>


    <!--    状态-->
    <el-form-item label="状态" prop="status">
      <el-radio-group v-model="seckForm.status">
        <el-radio :label="1">正常</el-radio>
        <el-radio :label="2">禁用</el-radio>
      </el-radio-group>
    </el-form-item>

    <!--    操作-->
    <el-form-item>
      <el-button type="primary" @click="submitForm('seckForm')">{{tip}}</el-button>
      <el-button @click="resetForm('seckForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {

    data() {
      return {
        seckForm: {
          title: '',
          first_cateid: '',
          second_cateid: '',
          begintime: '',
          endtime: '',
          status: 1,
          goodsid: '',
        },
        tip: '添加',
        // rules: {
        //   goodsname: [
        //     {required: true, message: '请输入分类名称', trigger: 'blur'},
        //   ],
        //   pid: [
        //     {required: true, message: '请选择上级菜单', trigger: 'change'}
        //   ],
        //
        //   status: [
        //     {required: true, message: '请选择状态', trigger: 'blur'}
        //   ]
        // },

        cateArr: [],
        secondcateArr: [],
        goodsArr: [],
      };
    },

    mounted() {

      //请求一级分类
      this.axios.get('/api/catelist?istree=1').then(res => {
        this.cateArr = res.data.list;
      });

      //修改时渲染详情
      if (this.$route.params.id) {
        this.tip = '修改';
        this.axios.get('/api/seckinfo?id=' + this.$route.params.id).then((res) => {
          this.seckForm = res.data.list;
          this.changeCate(res.data.list.first_cateid, res.data.list.second_cateid);//获取二级分类
          this.getGoods(res.data.list.second_cateid, res.data.list.goodsid);//获取商品
          //格式化起始时间
          this.seckForm.begintime = parseInt(this.seckForm.begintime);
          this.seckForm.endtime = parseInt(this.seckForm.endtime);
        })
      } else {
        this.tip = '添加';
      }
    },
    methods: {
  
      //获取起始时间戳
      getbeginTime(t) {
        this.seckForm.begintime = new Date(t).getTime();
        console.log(this.seckForm.begintime)
      },
      getendTime(t) {
        this.seckForm.endtime = new Date(t).getTime();
        console.log(this.seckForm.endtime)
      },

      //根据一级分类获取二级分类
      changeCate(v, sid) {
        // if(v==0){
        //   this.secondcateArr = [];
        //   this.secondcateArr.length = 0;
        //   return
        // }
        if (sid) {
          this.seckForm.second_cateid = sid;
        } else {
          this.seckForm.second_cateid = '';
        }
        this.secondcateArr = [];
        this.cateArr.map(item => {
          if (item.id == v) {
            this.secondcateArr = item.children;
          }
        });
      },

      //根据二级分类获取商品
      getGoods(v, goodsid) {
        if (goodsid) {
          this.seckForm.goodsid = goodsid;
        } else {
          this.seckForm.goodsid = '';
        }
        this.goodsArr = [];
        this.axios.get(`/api/goodslist?fid=${this.seckForm.first_cateid}&sid=${this.seckForm.second_cateid}`).then(res => {
          this.goodsArr = res.data.list ? res.data.list : this.goodsArr;
        });
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.seckForm)
            // let data = new FormData();
            // for (let i in this.seckForm) {
            //   data.append(i, this.seckForm[i]);
            // }
            //为修改时
            if (this.$route.params.id) {
              this.seckForm.id = this.$route.params.id;
              // data.append('id', this.seckForm.id);
              this.axios.post('/api/seckedit', this.seckForm);
            } else {//添加
              this.axios.post('/api/seckadd', this.seckForm);//添加
              // this.axios.post('/api/seckadd', data);//添加
            }
            this.$router.go(-1);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }
  }
</script>


