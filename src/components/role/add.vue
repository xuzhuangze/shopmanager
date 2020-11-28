<template>
  <el-form :model="roleform" :rules="rules" ref="roleform" style="width: 400px" label-width="100px"
           class="demo-ruleform">
    <el-breadcrumb separator=">" class="bread-nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/role' }">角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>角色添加{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <br>
    <br>
    <br>
    <h1>{{tip}}</h1>
    <!--角色名称-->
    <el-form-item label="角色名称" prop="rolename">
      <el-input v-model="roleform.rolename"></el-input>
    </el-form-item>

    <!--角色权限-->
    <el-form-item label="角色权限" prop="type">
      <el-tree
        :data="menuArr"
        show-checkbox
        node-key="id"
        ref="tree"
        :default-expanded-keys="arr"
        :default-checked-keys="arr"
        :props="defaultProps">
      </el-tree>
    </el-form-item>

    <!--    状态-->
    <el-form-item label="状态" prop="status">
      <el-switch v-model="roleform.status==1 ? true : false "></el-switch>
    </el-form-item>

    <!--    操作-->
    <el-form-item>
      <el-button type="primary" @click="submitForm('roleform')">{{tip}}</el-button>
      <el-button @click="resetForm('roleform')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    data() {
      return {
        arr: [],
        roleform: {
          rolename: '',
          menus: '',
          status: 1,
        },
        tip: '添加',
        rules: {
          rolename: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ],
        },
        menuArr: [],
        defaultProps: {
          children: 'children',
          label: 'title'
        },

      };
    },


    mounted() {

      this.axios.get('api/menulist?istree=1').then((res) => {
        this.menuArr = res.data.list;
      })
      if (this.$route.params.id) {
        this.tip = '修改';
        this.axios.get('/api/roleinfo?id=' + this.$route.params.id).then(res => {
          this.roleform = res.data.list;
          this.arr = res.data.list.menus.split(',');
        })
      } else {
        this.tip = '添加';
      }

    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let menus = this.$refs.tree.getCheckedNodes().map((item) => {
              return item.id;
            });
            this.roleform.menus = menus.join(',');
            if (this.$route.params.id) {
              this.roleform.id = this.$route.params.id;
              this.axios.post('/api/roleedit', this.roleform);
            } else {
              this.axios.post('/api/roleadd', this.roleform);
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

