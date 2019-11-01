<template>
  <div class="admin"  >
   admin
  </div>
</template>

<script>

export default {


  data () {
    return {

    }
  },
  methods: {
  

  },


  watch: {
        
        }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.admin{
    background: #fff;
    padding:10px 20px;
}
/* 分页 */
.pagination{
    margin-top: 30px;
}


/* 鼠标悬停在表格样式 */
.el-tag{
    border:none;
    background-color: transparent ;
}

.el-table thead{
    color:1f1f1f;
}

/* 弹窗样式 */
.find{
    background: blue;
    color:red;
}

.el-message-box{
    vertical-align:top  !important;
    margin-top:100px !important;
}

</style>
