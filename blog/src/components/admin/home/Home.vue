<template>
  <div style="min-width:900px;" >
    <el-container>
      <el-header>
    
       <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6"><div ></div>vue-cli+node-express</el-col>
        <el-col :span="5"><div >博客后台系统</div></el-col>
        <el-col :span="6"><div >
           <el-row  >
            <el-col :span="10" style=""><div>{{adminName}}</div></el-col>
            <el-col :span="10"><div ><el-button type="primary"  @click="open" size="small" icon="el-icon-user-solid">退出登录</el-button></div></el-col>
          </el-row>
        </div>
         
        </el-col>
      </el-row>
        
      </el-header>
      <el-container>
        <el-aside width="">
          <el-row class="tac">        
            <el-col :span="24">
              <h5 style="text-align:center">导览</h5>
              <el-menu
                default-active="/admin/databases/users"
                 class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                
                :router="true"
                :collapse="isCollapse"

                >
                <el-submenu index="1" >
                  <template slot="title" >
                    <i class="el-icon-location" ></i>
                    <span >开发</span>
                  </template>    
                  <el-menu-item index="/admin/databases/users">数据</el-menu-item>
                  <el-menu-item index="/admin/statistics">统计</el-menu-item>
     
             
        
                </el-submenu>
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">功能</span>
                </el-menu-item>
                <el-menu-item index="3" >
                  <i class="el-icon-document"></i>
                  <span slot="title">文件</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-setting"></i>
                  <span slot="title">设置</span>
                </el-menu-item>
              </el-menu>
            </el-col>   
          </el-row>
<el-row class="btn" type="flex" justify="end" >
  <!-- <el-col style="width:50px;" ><div>
    <el-radio-group v-model="isCollapse"  >
    <el-radio :label="false" type="text" size="mini"  v-show="isCollapse"  class="showbox">  k</el-radio>
    <el-radio :label="true" type="text" size="mini"  v-show="!isCollapse" class="showbox">   <i class="el-icon-setting"></i></el-radio>
  </el-radio-group>
  </div></el-col> -->
   <i v-if="isCollapse" class="el-icon-d-arrow-right show-menu" @click='changeMenu'></i>
   <i v-if="!isCollapse" class="el-icon-d-arrow-left show-menu" @click='changeMenu'></i>
</el-row>


        </el-aside>
  
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  created() {
   this.pushName();
  },
  name: 'Home',
  data () {
    return {
     adminName:'',
     //导航栏的展开与收起
      isCollapse: false,

    

    }
  },
  methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      open() {
        this.$confirm('是否退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //清除token
          localStorage.removeItem('token')
          localStorage.removeItem('adminName')
          //跳回登录页面
          this.$router.push('/admin/login')
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
      },
      pushName(){
        let admin =JSON.parse(localStorage.getItem('admin'))
        let adminName = admin.username
       this.adminName = adminName;
      },
      changeMenu(){
        this.isCollapse = this.isCollapse ?  false : true;
      }
  
  },
  watch: {
      'isCollapse': function(newVal,oldVal){
          console.log(newVal)
          if(newVal){
            // asideWidth:'60'
          }
      }
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

 .el-header, .el-footer {
    background-color:#fff;
    color: #333;
    text-align: center;
    line-height: 60px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    z-index: 10;
    /* min-width: 960px; */
  }
  
  .el-aside {
    background-color: #fff;
    color: #333;
    text-align: left;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: relative;
 
  }
  /* 二级目录 */
  .el-submenu .el-menu-item {
    min-width: 55px;
    padding-left:0px;
  }

 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 130px;
    padding:0px;
    box-sizing: border-box;   
  }
.el-container{
    height:100vh;
}
.el-menu{
  /* border:1px solid red; */

}
  
.el-main {
    background-color: #E9EEF3;
    color: #333;
   
   
    /* min-width: 800px;
    overflow: hidden; */

}
/* 导航栏的开关按钮样式 */
  .btn{
    position: absolute;
    bottom: 0;
    width:100%;
  }
  .show-menu{
    padding:10px;
  }



  .el-menu-vertical-demo:not(.el-menu--collapse) {
    /* width: 200px;
    min-height: 400px; */
    /* margin-right: 20px; */

  }

  

</style>
