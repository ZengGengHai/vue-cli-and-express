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
.site-content{
  padding-left:3vw;
  padding-right:3vw;
  padding-top:80px;

}
@media only screen and (min-width:1001px){
  .site-content{
    padding-left:320px;
    padding-right:3.333em;
    padding-top:3.333em;

  }
}
@media only screen and (min-width:801px) and (max-width:1001px){
  .site-content{
    padding-left:32vw;
    padding-right:3.333em;
    padding-top:3.333em;

  }
}
</style>
