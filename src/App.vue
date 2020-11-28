<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .bread-nav{
    position: absolute;
    top: 70px;
    left: 230px;
  }
  *{
    padding: 0;
    margin: 0;
  }
#app{
  width: 100vw;
  height: 100vh;
}
.add{
  position: absolute;
  top:110px;
  left: 250px;
}
</style>
