<template>
  <div>
    <el-breadcrumb separator=">" class="bread-nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>限时抢购列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" class="add" @click="$router.push('seckill/add')">添加</el-button>
    <el-table :data="seckArr" style="width: 1050px;margin:100px auto;" max-height="600" row-key="id">

      <el-table-column prop="title" label="秒杀名称" width="120"></el-table-column>

      <el-table-column prop="goodsid" label="商品名称" width="120">
        <template slot-scope="scope">
          {{scope.row.goodsid }}
        </template>
      </el-table-column>

      <!--开始时间-->
      <el-table-column prop="begintime" label="开始时间" width="120">
        <template slot-scope="scope">
            <span>
              {{scope.row.begintime | formattime }}
            </span>
        </template>
      </el-table-column>

      <!--结束时间-->
      <el-table-column prop="endtime" label="结束时间" width="120">
        <template slot-scope="scope">
            <span>
              {{scope.row.endtime | formattime }}
            </span>
        </template>
      </el-table-column>


      <el-table-column prop="status" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="160">
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
    data() {
      return {
        seckArr: [],
        showalert: false,
        goodsArr: []
      };
    },
    mounted() {
      this.axios.get('/api/secklist?istree=1').then(res => {
        this.seckArr = res.data.list;
        this.seckArr = res.data.list ? res.data.list : this.seckArr;
        // this.axios.get('/api/goodslist').then(res => {
        //   this.goodsArr = res.data.list;
        // });
      });



    },

    methods: {
      edit(id) {
        this.$router.push('seckill/add/' + id)
      },
      del(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
            this.axios.post('/api/seckdelete', {id}).then(res => {
              if (res.data.code != 200) {
                this.$message({
                  type: 'info',
                  message: '删除失败',
                });
                return
              }
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.seckArr = res.data.list;
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

</style>
