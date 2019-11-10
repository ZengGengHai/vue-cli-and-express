<template>
  <div id="app">
 
    <router-view name="header"/>
    <router-view name="main" class="site-content"/>
    <router-view name="admin"/>
  
  </div>
</template>

<script>
export default {
  name: 'App',

}
</script>

<style>

 body{
  margin:0px;
  font-size: 14px;
  -ms-overflow-style: none; 
  scrollbar-width: none;  
 
}

.site-content{
  padding-left:3vw;
  padding-right:3vw;
  /* padding-top:80px; */

}
@media only screen and (min-width:1001px){
  .site-content{
    padding-left:300px;
    margin-left: 3.333em;
    padding-right:3.333em;
    /* padding-top:3.333em; */
  }
  .blog-child:first-child{
     padding-top:3.3vh;
     height:96.6vh;
  }
}
@media only screen and (min-width:801px) and (max-width:1001px){
  .site-content{
    padding-left:30vw;
    margin-left: 2.333em;
    padding-right:2.333em;
    /* padding-top:3.333em; */
  }
  .blog-child:first-child{
     padding-top:3.3vh;
     height:96.6vh;
  }
} 
@media only screen and (max-width:800px){
  .site-content{
    /* padding-top:8.533em; */
  }
  .blog-child{
     padding-top:8vh;
     height:92vh;
  }
}

</style>
