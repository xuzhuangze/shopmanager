<template>
  <div class="wrap">
    <div class="logincart">
      <el-form :model="loginform" :rules="rules" ref="loginform" style="width: 400px" label-width="100px"
               class="demo-ruleform">

        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginform.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="loginform.password" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login('loginform')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {mapStates, mapMutations, mapActions} from 'vuex';

  export default {
    name: "login",
    // computed:{
    //   ...mapActions()
    // },
    data() {
      return {
        loginform: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      login(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('dologinSync', this.loginform).then(res => {
              console.log(res.data.msg)
              if (res.data.code == 200) {
                this.$message({
                  type: 'success',
                  message: res.data.msg
                });
                this.$router.push('/');
              } else {
                this.$message({
                  type: 'info',
                  message: res.data.msg
                });
                return
              }
            }).catch(err => {
              this.$message({
                type: 'info',
                message: err.data.msg
              });
              return
            })
          }
        });
      },
    }
  }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  html, boay, #app, .wrap {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .wrap {
    background: #333333;
    padding-top: 1px;
  }

  .logincart {
    width: 500px;
    height: 300px;
    margin: 0 auto;
    margin-top: 160px;
    background: #E9EEF3;
    border-radius: 15px;
    padding-top: 70px;

  }

  .el-form, .demo-ruleform {
    margin: 0 auto;

  }

  .el-form-item {
    margin-bottom: 30px;
  }

  .el-button, .el-button--primary {
    width: 100%;
    height: 30px;
  }
</style>
