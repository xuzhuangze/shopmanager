<template>
  <div>
    <el-breadcrumb separator=">" class="bread-nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="primary" class="add" @click="$router.push('goodsdetail/add')">添加</el-button>

    <el-table :data="goodsdetailArr" style="width: 1200px;margin:100px auto;" max-height="500" row-key="id"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">

      <el-table-column prop="id" label="商品编号" width="120"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="120"></el-table-column>
      <el-table-column prop="price" label="商品价格" width="120"></el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="120"></el-table-column>

      <el-table-column prop="isnew" label="新品" width="120">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isnew == 1">是</el-tag>
          <el-tag type="danger" v-else>否</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="ishot" label="热卖" width="120">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.ishot == 1">是</el-tag>
          <el-tag type="danger" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="img" label="商品图片" width="150">
        <!--        scope.row.pid != 0 &&-->
        <template slot-scope="scope" v-if="scope.row.img!=''">
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
        goodsdetailArr: [
          // {
          //   id: '',
          //   goodsname: '',
          //   price: '',
          //   market_price: '',
          //   isnew: 1,
          //   ishot: 1,
          //   pid: 0,
          //   img: '',
          //   status: 1,
          //
          // },
        ],
      };
    },
    mounted() {
      this.axios.get('/api/goodslist').then(res => {
        this.goodsdetailArr = res.data.list ? res.data.list : this.goodsdetailArr;
      })
    },
    methods: {
      edit(id) {
        this.$router.push('goodsdetail/add/' + id)
      },
      del(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          this.axios.post('/api/goodsdelete', {id}).then(res => {
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
            this.goodsdetailArr = res.data.list;
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
