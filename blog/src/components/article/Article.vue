<template>
    <div>
        <div   class="blog-home">
            <div class="blog-child">
                <div v-html="article"></div>
            </div>
        </div>
    </div>
</template>

<script>
// import marked from 'marked'
// import hljs from "highlight.js";
// import javascript from 'highlight.js/lib/languages/javascript';
// import 'highlight.js/styles/atelier-forest-dark.css';

export default {
    name:'Article',
    data(){
        return {
            article:''
        }
    },
    components:{
       
    },
    created(){
        this.$axios.get('/note/getNoteByName/'+this.$route.params.id)
        .then(res=>{
            // this.article=res.data
            //  marked.setOptions({
            //     renderer: new marked.Renderer(),
            //     highlight: function(code) {
            //         return hljs.highlightAuto(code).value;
            //     },
            //     pedantic:false,
            //     gfm: true,
            //     tables: true,
            //     breaks: false,
            //     sanitize: false,
            //     smartLists: false,
            //     smartypants: true,
            //     xhtml: true
            //     }
            // );
              this.article = res.data
      
                  this.$nextTick(() => {
                      let blocks = document.querySelectorAll('pre code');
                      blocks.forEach(block => {
                          hljs.highlightBlock(block);
                      });
                  });
             
            

        })
        .catch(res=>{
            console.log("失败")
        })
    }
}
</script>

<style lang="">
    pre{
        box-sizing: border-box;
       
    }
    .hljs{
        padding:20px;
    }
</style>