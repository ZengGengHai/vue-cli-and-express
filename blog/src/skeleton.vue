<template>
    <div class="skeleton-wrapper">
    
        <header class="skeleton-header"></header>
        <section class="skeleton-block">
         <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);height:100%;width:25%;position:fixed;left:0;top:0;">
           <div style="margin:100px auto 20px;width:100px;height:100px;border-radius:50%;background:#eee;"></div>
           <div style="margin:0px auto 20px;width:40%;height:20px;background:#eee;"></div>
           <div style="margin:0px auto 50px;width:60%;height:15px;background:#eee;"></div>
           <div style="margin:0px auto 20px;width:10%;height:17px;background:#eee;"></div>
           <div style="margin:0px auto 20px;width:10%;height:17px;background:#eee;"></div>
         </div>
         <div style="height:100%;width:75%;position:fixed;right:0;top:0;box-sizing:border-box;padding:60px;">
           <div v-for="i in 3" :key="i">
             <div style="box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);height:180px;padding:20px 0 0 30px;margin-bottom:35px;">
              <div style="width:40%;height:30px;background:#eee;margin:0 0 20px;"></div>
              <div style="width:80%;height:15px;background:#eee;margin:5px 0;"></div>
              <div style="width:80%;height:15px;background:#eee;margin:5px 0;"></div>
              <div style="width:70%;height:15px;background:#eee;margin:5px 0;"></div>
              <div style="width:10%;height:15px;background:#eee;margin:5px 0;"></div>
              <div style="width:20%;height:15px;background:#eee;margin:5px 0;"></div>
            </div>
           </div>
           <div style="width:30%;height:30px;background:#eee;float:right;margin-top:10px;"></div>
    
         </div>
           
        </section>
    </div>
</template>

<script>
export default {
    name: 'skeleton'
};
</script>

<style>


 
</style>