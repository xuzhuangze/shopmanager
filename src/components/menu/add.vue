<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="width: 400px" label-width="100px"
           class="demo-ruleForm">
    <el-breadcrumb separator=">" class="bread-nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu' }">菜单列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <br>
    <br>
    <h1>{{tip}}</h1>
    <!--菜单名称-->
    <el-form-item label="菜单名称" prop="title">
      <el-input v-model="ruleForm.title"></el-input>
    </el-form-item>

    <!--上级菜单-->
    <el-form-item label="上级菜单" prop="pid">
      <el-select v-model="ruleForm.pid" placeholder="请选择上级菜单">
        <el-option :value="0" label="顶级菜单"></el-option>
        <el-option :value="item.id" :label="item.title" v-for="item in menuArr"></el-option>
      </el-select>
    </el-form-item>

    <!--类型-->
    <el-form-item label="类型" prop="type">
      <el-radio-group v-model="ruleForm.type">
        <el-radio :label="1">菜单</el-radio>
        <el-radio :label="2">目录</el-radio>
      </el-radio-group>
    </el-form-item>

    <!--图标or菜单地址-->
    <el-form-item label="图标" prop="icon" v-if="ruleForm.type == 2">
      <el-input v-model="ruleForm.icon" placeholder="请输入图标"></el-input>
    </el-form-item>
    <el-form-item label="菜单地址" prop="url" v-else>
      <el-input v-model="ruleForm.url" placeholder="请输入菜单地址"></el-input>
    </el-form-item>

    <!--    状态-->
    <el-form-item label="状态" prop="status">
      <el-radio-group v-model="ruleForm.status">
        <el-radio :label="1">正常</el-radio>
        <el-radio :label="2">禁用</el-radio>
      </el-radio-group>
    </el-form-item>

    <!--    操作-->
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">{{tip}}</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {

    data() {
      return {
        ruleForm: {
          title: '',
          pid: 0,
          icon: '',
          url: '',
          type: 1,
          status: 1
        },
        tip: '添加',
        rules: {
          title: [
            {required: true, message: '请输入菜单名称', trigger: 'blur'},
          ],
          pid: [
            {required: true, message: '请选择上级菜单', trigger: 'change'}
          ],
          url: [
            {required: false, message: '请输入菜单地址', trigger: 'blur'}
          ],
          icon: [
            {required: false, message: '请输入图标', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择添加类型', trigger: 'change'}
          ],
          status: [
            {required: true, message: '请选择状态', trigger: 'blur'}
          ]
        },
        menuArr: [],
      };
    },

    mounted() {
      this.axios.get('api/menulist?pid=0').then((res) => {
        this.menuArr = res.data.list;
      })
      if (this.$route.params.id) {
        this.tip = '修改';
        this.axios.get('/api/menuinfo?id=' + this.$route.params.id).then(res => {
          this.ruleForm = res.data.list;
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
              this.ruleForm.id = this.$route.params.id;
              this.axios.post('/api/menuedit', this.ruleForm);
            } else {
              this.axios.post('/api/menuadd', this.ruleForm);
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

