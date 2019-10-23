<template>
    <div>
        <div v-html="article"></div>
    </div>
</template>

<script>
import marked from 'marked'
import hljs from "highlight.js";
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/agate.css';

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
        this.$axios.get('http://localhost/note/getNoteByName/'+this.$route.params.id)
        .then(res=>{
            // this.article=res.data
             marked.setOptions({
                renderer: new marked.Renderer(),
                highlight: function(code) {
                    return hljs.highlightAuto(code).value;
                },
                pedantic:false,
                gfm: true,
                tables: true,
                breaks: false,
                sanitize: false,
                smartLists: false,
                smartypants: true,
                xhtml: true
                }
            );
              this.article = marked(res.data)

        })
        .catch(res=>{
            console.log("失败")
        })
    }
}
</script>

<style lang="">
    pre{
        background:#eae9e942;
        box-sizing: border-box;
        padding:20px;
    }
</style>