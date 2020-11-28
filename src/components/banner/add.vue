<template>
  <el-form :model="bannerfrom"
           ref="bannerfrom" style="width: 400px" label-width="100px"
           class="demo-ruleform">
    <!--    :rules="rules"-->
    <el-breadcrumb separator=">" class="bread-nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/banner' }">商品详情列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <br>
    <br>
    <h1>{{tip}}</h1>

    <!--商品名称-->
    <el-form-item label="轮播图名称" prop="title">
      <el-input v-model="bannerfrom.title"></el-input>
    </el-form-item>

    <!--图片-->
    <el-form-item label="图片">
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
    <el-form-item label="新品" prop="status">
      <el-radio-group v-model="bannerfrom.status">
        <el-radio :label="1">正常</el-radio>
        <el-radio :label="2">禁用</el-radio>
      </el-radio-group>
    </el-form-item>

    <!--    操作-->
    <el-form-item>
      <el-button type="primary" @click="submitForm('bannerfrom')">{{tip}}</el-button>
      <el-button @click="resetForm('bannerfrom')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    data() {
      return {
        bannerfrom: {
          title: '',
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

        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false
      };
    },

    mounted() {
      if (this.$route.params.id) {
        this.tip = '修改';
        this.axios.get('/api/bannerinfo' ,{id:this.$route.params.id} ).then((res) => {
          this.bannerfrom = res.data.list;
          if (res.data.list.img == '') {
            return
          }
          this.fileList.push({url: this.bannerfrom.img});
        })
      } else {
        this.tip = '添加';
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.$route.params.id) {
              this.bannerfrom.id = this.$route.params.id;
              let data = new FormData();
              for (let i in this.bannerfrom) {
                data.append(i, this.bannerfrom[i]);
              }
              this.axios.post('/api/banneredit', data);
            } else {
              let data = new FormData();
              for (let i in this.bannerfrom) {
                data.append(i, this.bannerfrom[i]);
              }
              this.axios.post('/api/banneradd', data);//添加
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
        this.bannerfrom.img = file.raw;
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


