<template>
  <div>

    <el-button type="primary" @click="$router.push('student/add')">添加</el-button>
    <el-table :data="infos" style="width: 1000px;margin:100px auto;" max-height="500">
      <el-table-column prop="id" label="菜单编号" width="120"></el-table-column>
      <el-table-column prop="title" label="菜单名称" width="120"></el-table-column>
      <el-table-column prop="pid" label="上级菜单" width="120">
        <template slot-scope="scope">
          {{scope.row.pid==0?'顶级':'一级'}}
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="图标" width="120"></el-table-column>
      <el-table-column prop="url" label="菜单地址" width="120"></el-table-column>
      <el-table-column prop="status" label="状态" width="120">
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

  import dele from './delete';

  export default {
    components: {
      dele,
    },
    data() {
      return {
        infos: [],
        showalert: false,
      };
    },
    mounted() {
      this.axios.get('/api/menulist?istree=1').then(res => {
        this.infos = res.data.list

      })
    },
    methods: {
      edit(id) {
        this.$router.push('student/add/' + id)
      },
      del(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          this.axios({url: '/api/menudelete', method: 'post', data: {id}}).then(res => {
            if (res.data.code != 200) {
              this.$message({
                type: 'info',
                message: '删除失败',
              });
              return
            }
            this.infos = res.data.list;
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })

        }).catch((res) => {
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

  };
</script>

<style>

</style>
