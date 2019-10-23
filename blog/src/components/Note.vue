<template>
    <div>
        <div>note</div>
        <ul>
            <li v-for="(item) in noteList" :key="item">
                <router-link :to="/article/ + item" >{{item}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'Note',
    data(){
        return {
            noteList:[]

        }
    },
    components:{
    
    },
    mounted(){
        this.$axios.get('http://localhost/note/getNoteList')
        .then((res) =>{
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