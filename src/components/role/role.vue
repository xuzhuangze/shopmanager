<template>
  <div>
    <el-breadcrumb separator=">" class="bread-nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" class="add" @click="$router.push('role/add')">添加</el-button>
    <el-table :data="roleArr" style="width: 1000px;margin:100px auto;" max-height="500" row-key="id"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="id" label="角色编号" width="220"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="220"></el-table-column>

      <el-table-column prop="status" label="状态" width="220">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="edit(scope.row.id)"> 编辑</el-button>
          <el-button type="danger" size="small" @click="del(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        roleArr: [],
        showalert: false,
      };
    },
    mounted() {
      this.axios.get('/api/rolelist').then(res => {
        console.log(res.data.list)
        this.roleArr = res.data.list;
        this.roleArr = this.roleArr ? this.roleArr : [];
      })
    },
    methods: {
      edit(id) {
        this.$router.push('role/add/' + id)
      },
      del(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
            this.axios.post('/api/roledelete', {id}).then(res => {
              if (res.data.code != 200) {
                this.$message({
                  type: 'info',
                  message: '删除失败',
                });
                return
              }
              this.roleArr = res.data.list;
              this.roleArr = this.roleArr ? this.roleArr : [];
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            })

          }
        ).catch((res) => {
          if (res == 'cancel') {
            this.$message({
              type: 'success',
              message: '已取消删除'
            });
          } else {
            this.$message({
              type: 'info',
              message: '删除失败'
            });
          }

        })
      }

    }

  }
  ;
</script>

<style>
  tr.el-table__row {
    text-align: center;
  }

  .cell {
    text-align: center;
  }
</style>
