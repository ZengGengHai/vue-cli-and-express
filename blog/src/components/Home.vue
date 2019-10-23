<template>
    <div>
<el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
    </div>
</template>

<script>
export default {
    name:'Home',
    data(){
        return {
             dialogImageUrl: '',
        dialogVisible: false
        }
    },
    components:{
        
    },
    watch:{
        radio(a,f){
            console.log(a)
        }
    },
    methods: {

    
    }
}
</script>

