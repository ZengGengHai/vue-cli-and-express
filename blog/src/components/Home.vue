<template>
  <div class="blog-home">
    <div class="blog-child">
       <div v-for="(item,index) in blogLists" :key="index" >
        <el-card class="box-card" >
          <el-row type="flex" justify="space-between" align="middle">
            <el-col :span="20" ><div class="grid-content bg-purple">
              
              <span ><h2>{{item.title}}</h2> </span>  
            </div></el-col>
            <el-col :span="4">
              <el-row  type="flex" justify="end"  > <el-tag type="success" size="mini">{{item.type}}</el-tag></el-row>
            </el-col>
          </el-row>




          <p style="letter-spacing:1px;color:#333;">{{item.abstract}}</p>
          <div><div  style="font-size:12px;color:green;font-weight:bloder;cursor: pointer;" @click="openContent(item.id)" ref="tip" >查看内容</div></div>
          <div class="ql-container ql-snow blog-content " style="height:0px;border:0px;" ref="content"><div class="ql-editor" v-html="item.content" ></div></div>
          <!-- <div class="ql-container ql-snow">
    <div class="ql-editor" v-html="item.content">
    </div>
</div> -->
          
          <div style="margin-top:15px;color: #738a94;font-size:10px;">{{item.updatedAt}}</div>
        </el-card>
     </div>




      <el-row type="flex" class="pagination" justify="end">
          <el-col :span="20"><div  style="text-align:end">
                  <el-pagination
                      class="pagination"
                      layout="total, prev, pager, next" 
                      :page-size="pageSize"                    
                      :total="total"
                      :page-sizes = [5,10,15]
                      :current-page.sync = "curPage"
                      @current-change = "changePage"
                      @size-change = "handleSizeChange">
                  </el-pagination>
          </div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name:'Home',
   data(){
     return {
          
            activeName: '0',
            isOpenContent :false,
            liheight:0,
            blogLists:[],
            //每页大小
            pageSize:5,
            //当前页码
            curPage:1,
            //总条数
            total:0,
          }

  },
  created() {
    this.getBlogList();
  },
  computed: {
    
  },
  mounted(){
    //监听窗口大小变化
      // window.onresize = () => {
      //    return (() => {         
      //    })()
      //  }
    
    this.$nextTick(e => {
      // this.article.map((item,index) =>{
      //   item.isOpenContent = false;
      // })
      // console.log(this.article) 
    });
  },

  methods: {

    async getBlogList(curPage = 1){
      console.log(curPage)
      let res = await this.$axios.get('/blog_list',{params:{
           offset:(curPage - 1)*this.pageSize,
           limit:this.pageSize
      }})
      console.log(res)
      if(res.status === 200){
        if(res.data.code === 0){
          let data = res.data.data
          console.log(data)
          this.total = data.count;
          this.blogLists = data.list;

        }

      }


    },
    openContent(id){
      console.log(this.$refs.tip[0].innerText)
      this.$refs.tip[0].innerText = "点击收起"
      this.blogLists.map((item,index) =>{
          if(id === item.id){
            console.log( this.$refs.content[index].style.height)
            if(this.$refs.content[index].style.height == "" || this.$refs.content[index].style.height == "0px" ){
                this.$refs.content[index].style.height = "auto"
                this.$refs.content[index].style.margin = "15px 0"
                this.$refs.content[index].style.opacity = "1"
                this.$refs.tip[index].innerText = "点击收起"
                this.$refs.tip[index].style.color = "#ed3030"
            }else{
                this.$refs.content[index].style.height = "0px"
                this.$refs.content[index].style.opacity = "0"
                this.$refs.tip[index].innerText = "查看内容"
                this.$refs.content[index].style.margin = "0"
                this.$refs.tip[index].style.color = "#005000"
            }
            
          
          }else{
            // this.$refs.content[index].style.height = "0px"
            // this.$refs.content[index].style.opacity = "0"
            // this.$refs.tip[index].innerText = "查看内容"
            // this.$refs.content[index].style.margin = "0"
            // this.$refs.tip[index].style.color = "#005000"
          }
        
      })
    },
   
    
    //页面改变或者点击左右跳转页面
    changePage(curPage){
     this.$refs.content.forEach((element,i) => {
          this.$refs.content[i].style.height = "0px"
          this.$refs.content[i].style.opacity = "0"
          this.$refs.content[i].style.margin = "0"
          this.$refs.tip[i].style.color = "#005000"
          this.$refs.tip[i].innerText = "查看内容"
     });
     this.getBlogList(curPage)
    },
    
    handleSizeChange(pageSize){
      this.$refs.content.forEach((element,i) => {
          this.$refs.content[i].style.height = "0px"
          this.$refs.content[i].style.opacity = "0"
          this.$refs.content[i].style.margin = "0"
          this.$refs.tip[i].style.color = "#005000"
          this.$refs.tip[i].innerText = "查看内容"
     });
      this.curPage = 1;
      this.pageSize = pageSize
      this.getBlogList(this.curPage)
    }, 
      
  }
}
</script>

<style >
.ql-container.ql-snow{
  border:0px;
  /* height:0px; */
}

/* 文章内容是否展开 */
.pagination{
  margin:30px 0 50px;
}


.blog-content{
  height:0px;
  opacity:0;
  overflow: hidden;
  /* transition:height 0.3s ease 0.2s,opacity 0.2s ease ; */
}
.box-card{
  margin: 30px 15px 20px;
}
 .blog-home {
   font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 0px;
  height:100vh;
  padding-top:0px;
  overflow: hidden;
 
}

.blog-child{
  width:100%;
  height: 100vh;
  overflow-x: hidden; /*x轴禁止滚动*/
  overflow-y: scroll;/*y轴滚动*/
}
.blog-child::-webkit-scrollbar {
  display: none;
}




</style>