<template>
  <el-form :model="managerform" :rules="rules" ref="managerform" style="width: 400px" label-width="100px"
           class="demo-ruleform">
    <el-breadcrumb separator=">" class="bread-nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/manager' }">管理员管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <br>
    <br>
    <br>
    <h1>{{tip}}</h1>

    <el-form-item label="所属角色" prop="roleid">
      <el-select v-model="managerform.roleid" placeholder="请选择上级菜单">
        <!--        <el-option value="请选择" label="请选择"></el-option>-->
        <el-option :value="item.id" :label="item.rolename" v-for="item in roleArr"></el-option>
      </el-select>
    </el-form-item>


    <!--角色名称-->
    <el-form-item label="用户名" prop="username">
      <el-input v-model="managerform.username"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="managerform.password" type="password"></el-input>
    </el-form-item>


    <!--    状态-->
    <el-form-item label="状态" prop="status">
      <el-switch v-model="managerform.status==1 ? true : false "></el-switch>
    </el-form-item>

    <!--    操作-->
    <el-form-item>
      <el-button type="primary" @click="submitForm('managerform')">{{tip}}</el-button>
      <el-button @click="resetForm('managerform')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    data() {
      return {
        managerform: {
          username: '',
          password: '',
          status: 1,
          roleid: '',
          id: '',
          randstr: '',
          rolename: '',
          uid: '',
        },
        tip: '添加',
        rules: {
          username: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ],
          roleid: [
            {required: true, message: '请选择上级菜单', trigger: 'change'}
          ],
        },
        roleArr: [],
        defaultProps: {
          children: 'children',
          label: 'title'
        },
      };
    },


    mounted() {
      this.axios.get('api/rolelist').then((res) => {
        this.roleArr = res.data.list;
      });
      if (this.$route.params.uid) {
        this.tip = '修改';
        this.axios.get('/api/userinfo?uid=' + this.$route.params.uid).then(res => {
          this.managerform = res.data.list;
          this.managerform.password = '';
        })
      } else {
        this.tip = '添加';
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.$route.params.uid) {
              this.managerform.id = this.$route.params.uid;
              this.axios.post('/api/useredit', this.managerform);
            } else {
              this.axios.post('/api/useradd', this.managerform);
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
      }
    }
  }
</script>

