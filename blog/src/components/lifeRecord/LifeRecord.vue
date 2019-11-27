<template>
    <div   class="blog-home">
        <div class="blog-child">

         <!-- <div v-for="(item,index) in lifeRecord" :key="index" class="friend-item" >
            {{item.content}}
         </div> -->
           <el-timeline style="width:90%;margin-top:10px;" >
            
            <el-timeline-item :timestamp="item.updatedAt"  v-for="(item,index) in lifeRecord" :key="index" placement="top">
            <el-card>
                <p style="font-weight:bold;">{{item.content}}</p>
                <p> 编写于 {{item.updatedAt}}</p>
            </el-card>   
            </el-timeline-item>
           
        </el-timeline>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.getFriendList();
    },
    name:'Friend',
    data(){
        return {
            lifeRecord:[]
        }
    },
    components:{
        
        
    },
    mounted(){
      
    },
    methods: {
        async getFriendList(){
            let res = await this.$axios.get('/lifeRecord_list',{params:{
                offset:0,
                limit:30
            }})
          
            if(res.status === 200){
                if(res.data.code === 0){
                 let data = res.data.data
                 
                 this.lifeRecord = data.list
                 console.log(this.lifeRecord)
                }

            }

        },
        See (e) {
           window.open(e);
        }

    },
}
</script>

<style >
   a:link { text-decoration: none;}  
   .introduce{
       color:#9c9797;
       margin-top: 10px;
       text-align:justify;
       text-justify:distribute-all-lines;
   }
   .friend-item{
       box-shadow: 2px 2px 15px #eee;
       margin-top: 20px;
       box-sizing: border-box;
       padding:20px;
   }
   .link{
       text-align: right;
   }
</style>