<template>
  <div>
    <el-breadcrumb separator=">" class="bread-nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="primary" class="add" @click="$router.push('goodscate/add')">添加</el-button>
    <el-table :data="cateArr" style="width: 1000px;margin:100px auto;" max-height="500" row-key="id"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="catename" label="分类名称" width="120"></el-table-column>

      <el-table-column prop="pid" label="图片" width="150">
        <template slot-scope="scope" v-if="scope.row.pid != 0 && scope.row.img!=''">
          <img :src="scope.row.img" style="width: 80px;height: 80px"/>
        </template>
      </el-table-column>


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
  export default {
    components: {},
    data() {
      return {
        cateArr: [],
      };
    },
    mounted() {
      this.axios.get('/api/catelist?istree=1').then(res => {
        this.cateArr = res.data.list;
      })
    },
    methods: {
      edit(id) {
        this.$router.push('goodscate/add/' + id)
      },
      del(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          this.axios.post('/api/catedelete', {id}).then(res => {
            if (res.data.code != 200) {
              this.$message({
                type: 'info',
                message: '删除失败',
              });
              return
            }
            this.cateArr = res.data.list;
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
