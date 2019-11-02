<template>
  <div id="app">
 
    <router-view name="header"/>
    <router-view name="main" class="site-content"/>
     <router-view name="admin"/>
  
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{
  margin:0px;
}
</style>
