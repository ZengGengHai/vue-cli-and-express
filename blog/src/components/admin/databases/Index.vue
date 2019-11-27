<template>
  <div >
   


    <el-container>
      <el-aside width="150px" style="margin-right:10px;">
         <el-card  >
              <div slot="header" class="clearfix">
                <!-- <span style="font-size:12px;">数据表</span>
                <el-button style="font-size:12px;float: right; padding: 0px 0" type="text">操作</el-button> -->
                <el-row type="flex"  :gutter="20" class="row-bg" justify="space-between" style="font-size:12px;width:150px;">
                    <el-col :span="12"><div class="grid-content" style="font-weight:900;">数据表</div></el-col>
                    <el-col :span="10"><div class="grid-content " style="color: #409EFF;font-size:12px;cursor: pointer;font-family:sans-serif; ">操作</div></el-col>
                  
                </el-row>
              </div>
              <div >
                <el-row    style="font-size:12px;text-align:left;line-height:30px;" >
                    <!-- <el-col :span="24"><div class="grid-content" ><div  @click="toURL('admin')">用户表</div></div></el-col>
                    <el-col :span="24"><div class="grid-content "><div  @click="toURL('blog')">文章表</div></div></el-col> -->
                    <el-col :span="24"><div class="grid-content" ><router-link :to="{ path: '/admin/databases/table/admin'}">用户表</router-link> </div></el-col>
                    <el-col :span="24"><div class="grid-content "><router-link :to="{ path: '/admin/databases/table/blog'}">文章表</router-link></div></el-col>
                    <el-col :span="24"><div class="grid-content "><router-link :to="{ path: '/admin/databases/table/friend'}">友链表</router-link></div></el-col>
                    <el-col :span="24"><div class="grid-content "><router-link :to="{ path: '/admin/databases/table/lifeRecord'}">生活记录表</router-link></div></el-col>
                </el-row>
                 
              </div>
          </el-card>
      </el-aside>
      <el-main style="padding:0px;">
            <router-view></router-view>
      </el-main>
    </el-container>


  </div>
</template>

<script>
export default {
 
  name: 'Users',
  data () {
    return {
   
    }
  },
  methods: {
  

  },
 


   


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
    color: #128bf8;
    border-left: 4px solid #128bf8;
    padding-left: 5px;
}



.clearfix:before,
  .clearfix:after {
    display: table;
    content: "";

  }
  .clearfix:after {
    clear: both
  }


</style>
