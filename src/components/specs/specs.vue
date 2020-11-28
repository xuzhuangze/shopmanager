<template>
  <div>
    <el-breadcrumb separator=">" class="bread-nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>规格列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="primary" class="add" @click="$router.push('specs/add')">添加</el-button>

    <el-table :data="specsArr" style="width: 1000px;margin:100px auto;" max-height="500" row-key="id"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">

      <el-table-column prop="id" label="规格编号" width="220"></el-table-column>

      <el-table-column prop="specsname" label="规格名称" width="220"></el-table-column>

      <el-table-column prop="attrs" label="规格" width="220">
        <template slot-scope="scope">
          <el-tag type="success" v-for="item in scope.row.attrs">
            {{item}}
          </el-tag>
        </template>
      </el-table-column>


      <el-table-column prop="status" label="状态" width="220">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>


      <el-table-column fixed="right" label="操作" width="">
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
        specsArr: [],
      };
    },
    mounted() {
      this.axios.get('/api/specslist').then(res => {
        this.specsArr = res.data.list ? res.data.list : this.specsArr;
      })
    },
    methods: {
      edit(id) {
        this.$router.push('specs/add/' + id)
      },
      del(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
            this.axios.post('/api/specsdelete', {id}).then(res => {
              if (res.data.code != 200) {
                this.$message({
                  type: 'info',
                  message: res.data.msg,
                });
                return
              }
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.specsArr = res.data.list;
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
