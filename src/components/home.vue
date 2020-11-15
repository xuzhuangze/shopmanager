<template>
  <el-container class="wrap" >
    <el-header></el-header>
    <el-container class="middle">
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          open="1"
        >
          <el-submenu index="1">
            <template slot="title" open>
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="/student">学生管理</el-menu-item>
              <el-menu-item index="1-2">课程管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
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
