<template>
  <el-form :model="specsform" :rules="rules" ref="specsform" style="width: 700px" label-width="100px"
           class="demo-ruleform">
    <el-breadcrumb separator=">" class="bread-nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/specs' }">规格列表</el-breadcrumb-item>
      <el-breadcrumb-item>规格{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <br>
    <br>
    <br>
    <h1>{{tip}}</h1>
    <!--规格名称-->
    <el-form-item label="规格名称" prop="specsname">
      <el-input v-model="specsform.specsname"></el-input>
    </el-form-item>


    <el-form-item
      v-for="(specs, index) in specsArr"
      :label="'域名' + index"
      :key="index"
      :prop="specs.value"

    >

      <el-input v-model="specs.value"></el-input>
      <el-button @click="addSpecs" type="primary" v-if="index == 0">新增域名</el-button>
      <el-button @click.prevent="removeSpecs(index)" type="danger" v-else>删除</el-button>
    </el-form-item>

    <!--    状态-->
    <el-form-item label="状态" prop="status">
      <el-switch v-model="specsform.status ==1 ? true : false " @click="hahaq"></el-switch>
    </el-form-item>

    <!--    操作-->
    <el-form-item>
      <el-button type="primary" @click="submitForm('specsform')">{{tip}}</el-button>
      <el-button @click="resetForm('specsform')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    data() {
      return {
        specsArr: [{value: ''}],
        specsform: {
          specsname: '',
          attrs: '',
          status: 1,
        },
        tip: '添加',
        rules: {
          specsname: [
            {required: true, message: '请输入规格名称', trigger: 'blur'},
          ],
        },
      };
    },


    mounted() {

      if (this.$route.params.id) {
        this.tip = '修改';
        this.axios.get('/api/specsinfo?id=' + this.$route.params.id).then(res => {
          console.log(res.data.list[0])
          this.specsform = res.data.list[0];
          this.specsArr = [];
          this.specsform.attrs.map(item => {
            this.specsArr.push({value: item})
          });
        })
      } else {
        this.tip = '添加';
      }

    },
    methods: {
      hahaq() {
        console.log(this.specsform.status)
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let arr = this.specsArr.map(item => {
              return item.value;
            })
            console.log(arr)
            this.specsform.attrs = arr.join(',');
            if (this.$route.params.id) {
              this.specsform.id = this.$route.params.id;
              this.axios.post('/api/specsedit', this.specsform);
            } else {
              this.axios.post('/api/specsadd', this.specsform);
            }
            this.$router.go(-1)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },


      //添加
      addSpecs() {
        this.specsArr.push({value: ''})
      },

      //删除
      removeSpecs(index) {
        this.specsArr.splice(index, 1)
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .el-input {
    width: 55%;
  }

</style>

