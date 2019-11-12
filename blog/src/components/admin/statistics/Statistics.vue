<template>
  <div class="statistics"  >

    <el-row type="flex" :span="24" justify="space-around" style="padding-top:30px;">
       <el-col :span="10"><div>
            <el-calendar v-model="value">
            </el-calendar>
         </div></el-col>
        <el-col :span="10" ><div>
            <div v-for="(item,index) in pathCountMap" :key="index">
              <el-row  :span="24" justify="space-around" style="min-width:490px;">
                <el-col :span="20" style="text-align:left;line-height:30px;">{{pathCountMap[index].url}}</el-col>
                <el-col :span="4"  style="text-align:left;line-height:30px;font-weight:blod;">{{pathCountMap[index].num}}</el-col>
              </el-row>
            </div>
        </div></el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  async created() {
     this.getstatistics();

  },

  data () {
    return {
      value: new Date(),
      pathCountMap:[]
    }
  },
  methods: {
    async getstatistics(){
      let time = this.$moment(this.value).format('YYYY-MM-DD');
     
      let res = await this.$axios.get('/statistics/getTodayVisit/'+ time)
       if(res.status == 200){
         if(res.data.code === 0){
           this.pathCountMap = res.data.data
         }
       }
    },
   async changeDate(newDate){
      console.log(newDate)     
      let res = await this.$axios.get('/statistics/getTodayVisit/'+ newDate)
       if(res.status == 200){
         if(res.data.code === 0){
           this.pathCountMap = res.data.data
         }
       }
    }

  },


  watch: {
          value(newval,oldval){
            var time = this.$moment(newval).format('YYYY-MM-DD');
            console.log(time)
            this.changeDate(time)

          }
        }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.statistics{
    background: #fff;
    text-align: center;
    padding:70px 50px;
  
}
</style>
