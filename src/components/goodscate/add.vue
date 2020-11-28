<template>
  <el-form :model="goodsform" :rules="rules" ref="goodsform" style="width: 400px" label-width="100px"
           class="demo-goodsform">
    <el-breadcrumb separator=">" class="bread-nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goodscate' }">分类列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <br>
    <br>
    <h1>{{tip}}</h1>
    <!--商品名称-->
    <el-form-item label="分类名称" prop="catename">
      <el-input v-model="goodsform.catename"></el-input>
    </el-form-item>

    <!--上级分类-->
    <el-form-item label="上级分类" prop="pid">
      <el-select v-model="goodsform.pid" placeholder="请选择上级菜单">
        <el-option :value="0" label="顶级分类"></el-option>
        <el-option :value="item.id" :label="item.catename" v-for="item in cateArr"></el-option>
      </el-select>
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
  export default {

    data() {
      return {
        goodsform: {
          catename: '',
          pid: 0,
          img: '',
          status: 1,
        },
        fileList: [],
        tip: '添加',
        rules: {
          catename: [
            {required: true, message: '请输入分类名称', trigger: 'blur'},
          ],
          pid: [
            {required: true, message: '请选择上级菜单', trigger: 'change'}
          ],

          status: [
            {required: true, message: '请选择状态', trigger: 'blur'}
          ]
        },
        cateArr: [],

        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false
      };
    },

    mounted() {
      this.axios.get('/api/catelist?istree=1').then(res => {
        this.cateArr = res.data.list;
      })
      if (this.$route.params.id) {
        this.tip = '修改';
        this.axios.get('/api/cateinfo?id=' + this.$route.params.id).then(res => {
          this.goodsform = res.data.list;
          if (this.goodsform.pid == 0 || this.goodsform.img == '') {
            return
          }
          this.fileList.push({url: this.goodsform.img});
        })
      } else {
        this.tip = '添加';
      }
    },

    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //修改

            if (this.$route.params.id) {
              this.goodsform.id = this.$route.params.id;
              let data = new FormData();
              for (let i in this.goodsform) {
                data.append(i, this.goodsform[i]);
              }
              ;
              this.axios.post('/api/cateedit', data);
            } else {
              let data = new FormData();
              for (let i in this.goodsform) {
                data.append(i, this.goodsform[i]);
              }
              ;
              this.axios.post('/api/cateadd', data);//添加
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

      //删除
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

