<template>
  <div class="blog-home">
    <div class="blog-child">
        <div class="cabinet-box">
        <!-- <div>note</div>
        <ul>
            <li v-for="(item) in noteList" :key="item">
                <router-link :to="/article/ + item" >{{item}}</router-link>
            </li>
        </ul> -->
            <div v-for="(item,index) in noteList" :key="index" class="cabinet">
                <div class="dir-time">{{item.time}}</div>
                <div class="cabinet-title">{{item.name}}</div>
                <div class="cabinet-content">
                    <div class="file" v-for="(fileitem,i) in item.data" :key="i">
                        <router-link :to="/article/ + fileitem.url" >{{fileitem.fileName}} ... {{fileitem.time}}</router-link>
                    </div>  
                </div>  
            </div>

            <!-- 使flex 最后一行靠左边 -->
            <div  class="like-cabinet"></div> 
            <div  class="like-cabinet"></div>  
            <div  class="like-cabinet"></div>   
            <div  class="like-cabinet"></div>
             
        </div>
    </div>


       
    </div>
</template>

<script>
export default {
    created() {
     
        
    },
    name:'Note',
    data(){
        return {
            noteList:[]

        }
    },
    components:{
    
    },
    mounted(){
        this.$axios.get('/note/getNoteList')
        .then((res) =>{
          res.data.forEach(element => {
              element.time = moment(element.time).format('YYYY-MM-DD');
              element.data.forEach(item => {
                  item.time = moment(item.time).format('YYYY-MM-DD');
              })
          });
          this.noteList = res.data         
        })
        .catch((error) =>{
          
            console.log(error);
        
        })
        .finally(()=>{
           
        });
    }
}




</script>

<style lang="">

    .cabinet-box{    
        display: flex;
        flex-direction: row;
        flex-wrap:wrap;
        justify-content:space-around;
        /* justify-content: flex-start; */
    }
  
    .cabinet{
        width:220px;  
        /* background: red; */
        margin:20px 10px;
        border-radius:8px 8px 0px 0px;
        position: relative;
        box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
        transition: all 0.3s linear 0s;
    }
   .like-cabinet{
       width:220px;
       margin:20px 10px;
       height: 1px;
       visibility:hidden;
   }
    .cabinet:hover{
        box-shadow:5px 5px 14px 0 rgba(0,0,0,0.2);
        transition: all 0.3s linear 0s;
    }
    .cabinet-title{
        height: 40px;
        background: #000;
        text-align: center;
        border-radius:8px 8px 0px 0px;
        color:#fff;
        font-weight: bold;
        line-height: 40px;
        
    }
    .cabinet-content{
        height:250px;
        margin-bottom: 40px;
        overflow-y: auto; 
    }
    .dir-time{
        position:absolute;
        bottom:0;
        font-size: 13px;
        line-height: 17px;
        background: #eee;
        padding:5px 20px;
        /* color:#fff; */
        border-radius: 0px 10px 0px 0px;
       
    }
    .file{
        padding:8px 20px;
        text-decoration:none;
        display: flex;
        flex-direction:row;
        justify-content:space-between;

    }


    @media only screen and (min-width:1001px){

    }
    @media only screen and (min-width:801px) and (max-width:1001px){
        
    }
    @media only screen and (max-width:800px){
        .cabinet{ width:180px}
        .like-cabinet{
            width:180px;
            height: 1px;
        }
    }
    a {
    text-decoration: none;
    }
    
    .router-link-active {
    text-decoration: none;
    }
        

    
 
</style>