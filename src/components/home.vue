<template>
  <el-container class="wrap">
    <el-header>
      <p style="color: #E9EEF3;padding: 0 80px;line-height: 60px">
        <span style="float: left">
           欢迎回来，{{ userinfo ?  userinfo.username : ''}}
        </span>

        <a href="javascript:;" style="float: right;color: #E9EEF3" @click="out">退出</a>
      </p>
    </el-header>
    <el-container class="middle">
      <el-aside width="200px">

        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          open="1"
        >

          <!--首页-->
          <el-menu-item index="/">
            <i class="el-icon-setting"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <!--顶级菜单-->
          <el-submenu :index=" '' + index" v-for="(firstmenuitem,index ) in menuArr" :key="firstmenuitem.id">
            <template slot="title" open>
              <i :class="firstmenuitem.icon"></i>
              <span>{{firstmenuitem.title}}</span>
            </template>
            <el-menu-item-group v-if="firstmenuitem.children" v-for="secondmenuitem in  firstmenuitem.children">
              <el-menu-item :index="secondmenuitem.url">{{secondmenuitem.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb separator=">" class="bread-nav">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex'

  export default {
    computed: {
      ...mapState(['userinfo'])
    },
    data() {
      return {
        menuArr: [],
        defaultActive: '/',
        opens: [],
      }
    },
    mounted() {
      this.menuArr = this.userinfo.menus;
    },
    watch: {
      $route() {
        this.defaultActive = this.$route.meta.selected;
      },
    },
    methods: {
      out() {
        this.$store.commit('getuserinfo', {});
        this.$router.push('/login')
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

    },
  };
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  .wrap {
    height: 100%;
    display: flex;
    padding: 0;
    margin: 0;
  }

  .el-header {
    background-color: rgb(36, 39, 48);
    color: #333;
    text-align: center;
  }

  .el-aside {
    background-color: rgb(57, 61, 73);
    color: #333;
    text-align: center;
  }

  .middle {
    flex: 1;
  }

  .middle .el-aside,
  .middle .el-main {
    height: 100%;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
