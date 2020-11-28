<template>
  <el-form :model="goodsform"
           ref="goodsform" style="width: 600px" label-width="100px"
           class="demo-ruleform">
    <!--    :rules="rules"-->
    <el-breadcrumb separator=">" class="bread-nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goodsdetail' }">商品详情列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <br>
    <br>
    <h1>{{tip}}</h1>

    <!--一级分类·-->
    <el-form-item label="一级分类" prop="first_cateid">
      <el-select v-model="goodsform.first_cateid" placeholder="请选择上级菜单" @change="changeCate">
        <el-option :value="0" label="顶级分类"></el-option>
        <el-option :value="item.id" :label="item.catename" v-for="item in cateArr"></el-option>
      </el-select>
    </el-form-item>

    <!--    二级分类·-->
    <el-form-item label="二级分类" prop="second_cateid" v-if="secondcateArr.length != 0">
      <el-select v-model="goodsform.second_cateid" placeholder="请选择二级分类">
        <el-option :value="item.id" :label="item.catename" v-for="item in secondcateArr"></el-option>
      </el-select>
    </el-form-item>

    <!--商品名称-->
    <el-form-item label="商品名称" prop="goodsname">
      <el-input v-model="goodsform.goodsname"></el-input>
    </el-form-item>

    <!--商品价格-->
    <el-form-item label="商品价格" prop="price">
      <el-input v-model="goodsform.price"></el-input>
    </el-form-item>


    <!--市场价格-->
    <el-form-item label="市场价格" prop="market_price">
      <el-input v-model="goodsform.market_price"></el-input>
    </el-form-item>


    <!--商品图片-->
    <el-form-item label="商品图片">
      <template>
        <el-upload
          :file-list="fileList"
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="fileChange">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url" alt=""
            >
            <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </template>
    </el-form-item>

    <!--  商品规格-->
    <el-form-item label="商品规格" prop="specsid">
      <el-select v-model="goodsform.specsid" placeholder="请选择商品规格" @change="changeSpecs">
        <el-option :value="item.id" :label="item.specsname" v-for="item in specsArr"></el-option>
      </el-select>
    </el-form-item>


    <!--  商品规格属性-->
    <el-form-item label="规格属性" prop="specsattr" v-if="attrArr.length != 0">
      <el-select v-model="goodsform.specsattr" placeholder="请选择规格属性">
        <el-option :value="item" :label="item" v-for="item in attrArr"></el-option>
      </el-select>
    </el-form-item>


    <el-form-item label="商品描述" prop="description" style="text-align: left;margin-top: 150px;">
      <div id="div1"></div>
    </el-form-item>


    <!--    新品-->
    <el-form-item label="新品" prop="isnew">
      <el-radio-group v-model="goodsform.isnew">
        <el-radio :label="1">新品</el-radio>
        <el-radio :label="2">非新品</el-radio>
      </el-radio-group>
    </el-form-item>

    <!--    热卖-->
    <el-form-item label="热卖" prop="ishot">
      <el-radio-group v-model="goodsform.ishot">
        <el-radio :label="1">热卖</el-radio>
        <el-radio :label="2">非热卖</el-radio>
      </el-radio-group>
    </el-form-item>

    <!--    状态-->
    <el-form-item label="状态" prop="status">
      <el-radio-group v-model="goodsform.status">
        <el-radio :label="1">正常</el-radio>
        <el-radio :label="2">禁用</el-radio>
      </el-radio-group>
    </el-form-item>

    <!--    操作-->
    <el-form-item>
      <el-button type="primary" @click="submitForm('goodsform')">{{tip}}</el-button>
      <el-button @click="resetForm('goodsform')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>


  //配置富文本编辑器
  import E from 'wangeditor';


  export default {

    data() {
      return {
        specsArr: [],
        attrArr: [],
        goodsform: {
          goodsname: '',
          first_cateid: '',
          second_cateid: '',
          price: '',
          market_price: '',
          description: '',
          specsid: '',
          specsattr: '',
          isnew: 1,
          ishot: 1,
          img: '',
          status: 1,
        },
        fileList: [],
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
        editor: null,
        cateArr: [],
        secondcateArr: [],
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false
      };
    },

    mounted() {
      this.editor = new E('#div1');
      this.editor.config.uploadImgShowBase64 = true;
      this.editor.config.showFullScreen = false;
      this.editor.config.menus = [
        'bold',
        'head',
        'link',
        'italic',
        'underline',
        'image',
      ];
      this.editor.create();
      this.axios.get('/api/catelist?istree=1').then(res => {
        this.cateArr = res.data.list;
      });
      this.axios.get('/api/specslist?istree=1').then(res => {
        this.specsArr = res.data.list;
      });


      if (this.$route.params.id) {
        this.tip = '修改';
        this.axios.get('/api/goodsinfo?id=' + this.$route.params.id).then((res) => {
          this.goodsform = res.data.list;
          // console.log(res.data.list)
          // return;
          this.editor.txt.html(this.goodsform.description);
          console.log(this.editor.txt.html())
          return;
          this.changeCate(res.data.list.first_cateid, res.data.list.second_cateid);
          this.changeSpecs(res.data.list.specsid, res.data.list.specsattr)
          // this.goodsform.second_cateid = res.data.list.second_cateid;

          if (this.goodsform.img == '') {
            return
          }
          this.fileList.push({url: this.goodsform.img});
        })
      } else {
        this.tip = '添加';
      }
    },
    methods: {
      //根据商品规格获取商品详情
      changeSpecs(v, sid) {
        if (sid) {
          this.goodsform.specsattr = sid;
        } else {
          this.goodsform.specsattr = '';
        }
        this.attrArr = [];
        this.specsArr.map(item => {
          if (item.id == v) {
            this.attrArr = item.attrs;
          }
        });

      },

      //根据一级分类获取二级分类
      changeCate(v, sid) {
        if (sid) {
          this.goodsform.second_cateid = sid;
        } else {
          this.goodsform.second_cateid = '';
        }
        this.secondcateArr = [];
        this.cateArr.map(item => {
          if (item.id == v) {
            this.secondcateArr = item.children;
          }
        });

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.goodsform.description = this.editor.txt.text();
            if (this.$route.params.id) {
              this.goodsform.id = this.$route.params.id;
              let data = new FormData();
              for (let i in this.goodsform) {
                data.append(i, this.goodsform[i]);
              }
              this.axios.post('/api/goodsedit', data);
            } else {
              let data = new FormData();
              for (let i in this.goodsform) {
                data.append(i, this.goodsform[i]);
              }
              this.axios.post('/api/goodsadd', data);//添加
            }
            this.$router.go(-1)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },


      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      //上传图片
      fileChange(file) {
        this.goodsform.img = file.raw;
      },

      //删除图片
      handleRemove() {
        this.fileList = [];
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      }
    }
  }
</script>


