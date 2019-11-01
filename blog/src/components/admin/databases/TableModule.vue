<template>
  <div class="article"  >
        <el-row type="flex" justify="end">
            <el-col :span="24"><div class="grid-content" style="text-align:right;line-height:10px;padding-bottom:5px;">
                   <el-button type="text" style="color: #606266; font-size:12px;padding-left:15px;text-align:center;" @click="addFormVisible = true" >添加数据</el-button>
                   <el-button type="text" style="color: #606266; font-size:12px;padding-left:15px;text-align:center;" >查询</el-button>
                   <i   style="color: #606266; font-size:14px;padding-left:15px;" class="el-icon-refresh" ></i>
            </div></el-col>
        </el-row>
        <el-row :gutter='20'>
            <el-col :spen='18' style="padding:0px;width:100%;">
                   <el-table
                        :data="dataLists"
                         v-loading="loading"
                        :header-cell-style="{
                        'background-color': '#fafafa',
                        'line-height':'30px'                      
                        }"
                        style="width: 100%"
                        highlight-current-row
                        :border="false"
                    >
                        <el-table-column
                          v-for="(item,index) in tableColumn"
                        :key="index"
                      
                        :label="item.label"
                        show-overflow-tooltip
                        :width ='200'
                        >
                        <template slot-scope="scope">
                       
                      
                                <el-popover trigger="hover" placement="left">
                                    <p>{{ scope.row[item.prop] }}</p>
                                    <div slot="reference" >
                                        <el-tag >{{ scope.row[item.prop] }}</el-tag>
                                    </div>
                                </el-popover>

                      </template>
                        </el-table-column>
                      
                        <el-table-column
                        align="center"
                        label="操作"
                        >
                        <template slot-scope="scope">
                            <el-button @click="Edit(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button type="text" size="small" >
                                  <template >
                                        <el-popover trigger="click" placement="top"  :ref="`popover-${scope.$index}`" >
                                            <p>
                                                是否删除所选的数据
                                            </p>
                                            <p>
                                            <div style="text-align: right; margin: 0">
                                                <el-button size="mini" type="text" @click="scope._self.$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                                                <el-button type="primary" size="mini"  @click="Del(scope.row)">确定</el-button>
                                            </div>
                                            
                                            <div slot="reference" >
                                                删除
                                            </div>
                                        </el-popover>
                                    </template>
                              </el-button>
                        </template>
                        </el-table-column>
                    </el-table>
            </el-col>
        </el-row>

        <el-row type="flex" class="pagination" justify="end">
            <el-col :span="20"><div class="grid-content" style="text-align:right">
                    <el-pagination
                        layout="total, prev, pager, next,sizes,jumper" 
                        small
                        background
                        :page-size="pageSize"                    
                        :total="total"
                        :page-sizes = [3,6,9,12]
                        :current-page.sync = "curPage"
                        @current-change = "changePage"
                        @size-change = "handleSizeChange">
                    </el-pagination>
            </div></el-col>
        </el-row>




        <!-- 添加数据遮罩 -->
        <el-dialog title="添加数据" :visible.sync="addFormVisible"  >
            <el-form  ref = 'tableColumn' label-position="left" >
                <el-form-item 
                v-for="(item,index) in tableColumn" :key="index"
                :prop='item.prop'    :label="item.label"
                 label-width="120px"
                 v-show="item.show"
                   >
                    <el-input  v-if="item.data == 'varcharfwb'" v-model="item.content"   size="small"   >
                      <i
                        class="el-icon-document el-input__icon"
                        slot="suffix"
                        @click="documentIconClick">
                      </i>
                    </el-input>

                    <el-input  v-else-if="item.data == 'varchar'"  type="textarea" v-model="item.content"   size="small"  suffix-icon="el-icon-date"   autosize >
         
                   
                    </el-input>

                     <el-input v-else-if="item.data == 'data'"  v-model="item.content" size="small" suffix-icon="el-icon-date"  :disabled="true"></el-input>
                    <el-input v-else  v-model="item.content" size="small" ></el-input>

                </el-form-item>
              
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addDate()">确 定</el-button>
            </div>
        </el-dialog>


        <!-- 富文本据遮罩 -->
        <el-dialog
        title="富文本编辑器"
        :visible.sync="fwbVisible"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="fwbVisible = false">取 消</el-button>
          <el-button type="primary" @click="fwbButton()">确 定</el-button>
        </span>
      </el-dialog>


  </div>
</template>

<script>

export default {
    async created(){
  

      this.Table =this.$route.params.id;
      console.log('当前表名：')

      let column = await this.getColumn();
      if(column.status === 200){
        if(column.data.code === 0){
          let tableColumn = column.data.data
          console.log(tableColumn)
          this.tableColumn = tableColumn
       
          console.log()
        }
      }
      this.getDataList();
    },


    name:'table1',
    data() {
      return {
        //表
        Table:'',

        tableColumn:[],
  
        //表格数据
        dataLists: [],
         
        //每页大小
        pageSize:3,
        //当前页码
        curPage:1,
        //总条数
        total:0,
        //表格加载
        loading:false, 

        //添加数据盒子
        addFormVisible:false,


        //添加表单数据
        AddForm:{
        },

        //富文本盒子
        fwbVisible:false
  
      }
    },
    methods: {
      //模板服用刷新数据
      async createTable(){
        console.log(this.Table)
        let column = await this.getColumn();
        if(column.status === 200){
          if(column.data.code === 0){
            let tableColumn = column.data.data
            console.log(tableColumn)
            this.tableColumn = tableColumn

          }
        }
        this.getDataList();
      },

      //获取表格式
      getColumn(){
        return new Promise((resolve,reject) => {
          this.$axios.get('/'+this.Table+'_table').then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      },
      async getDataList(curPage = 1){
        this.loading = true;

       let res = await this.$axios.get('/'+this.Table+'_list',{params:{
            // query:this.queryStr,
            offset:(curPage - 1)*this.pageSize,
            limit:this.pageSize

        }
        })
       console.log(res)
       if(res.status === 200){
         let code = res.data.code
         if(code === 0 ){
             let data = res.data.data
             this.dataLists = data.list,
             this.total =data.count,
         
            setTimeout(()=>{
                this.loading = false
            },500)
          
         }else{
           
           setTimeout(()=>{
              this.loading = false
            },500)
         }
        
       }else{
           this.$message({
               type:'error',
               message:meta.msg,
               duration:1000
           })
       }

  
      }, 
      //编辑按钮
      Edit(row){
        console.log(row,'bianji')
      },
      //删除数据
      Del(row){
          console.log(row)
          let id = row.id
          let data = {
            'id':id
          }
          console.log(id)
          this.$axios.post(`/${this.Table}_delete`,this.$qs.stringify(data)).then((res) =>{
            if(res.status === 200){
                let code = res.data.code
                if(code === 0){
                    this.$message({
                      type:'success',
                      message:'删除成功',
                      duration:1000
                    })
                    const index = this.dataLists.findIndex(item => item.id === id)
                    this.dataLists.splice(index,1);
                    const totalPage = Math.ceil(this.dataLists.length / this.pageSize)
                
                    if(totalPage === 0 && this.curPage != 1){
                        this.getDataList(--this.curPage);
                    }

                }else{
                  this.$message({
                      type:'error',
                      message:res.data.msg,
                      duration:1000
                  })
                }
              
            }

          })

      },
      //添加确定
      addDate(row){
        console.log(this.tableColumn)
      },
    //页面改变或者点击左右跳转页面
    changePage(curPage){
      this.getDataList(curPage)
    },
    
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.getDataList(this.curPage)
    }, 
    //启用富文本
    documentIconClick(){
      console.log('启用富文本');
      this.fwbVisible = true
    },
    handleClose(done) {
      this.fwbVisible = false
      console.log('关闭窗口')
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    //编写好富文本
    fwbButton(){
     this.fwbVisible = false
     console.log('点击确定')
    },




    
    },
    
     beforeRouteUpdate(to, from, next){
       console.log('监听路由参数变化')
        this.Table = to.params.id;
        this.dataLists=[];
        this.createTable();
        next();
    }

  }
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.article{
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
    color:#333;
}

.el-table thead{
    color:1f1f1f;
}

/* 弹窗样式 */
.find{
    background: red;
    color:red;
}

.el-message-box{
    vertical-align:top  !important;
    margin-top:100px !important;
}

</style>
