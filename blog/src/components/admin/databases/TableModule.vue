<template>
  <div class="article"  >
        <el-row type="flex" justify="end">
            <el-col :span="24"><div class="grid-content" style="text-align:right;line-height:10px;padding-bottom:5px;">
                   <el-button type="text" style="color: #606266; font-size:12px;padding-left:15px;text-align:center;" @click="addFormVisible = true" >添加数据</el-button>
                   <el-button type="text" style="color: #606266; font-size:12px;padding-left:15px;text-align:center;" >查询</el-button>
                   <i   style="color: #606266; font-size:14px;padding-left:15px;" class="el-icon-refresh" @click="getDataList(curPage)" ></i>
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
                       
                      
                                <el-popover :trigger="scope.row[item.prop]==null? 'manual':'hover' "  placement="top" >
                                    <p >{{ scope.row[item.prop] }}</p>
                                    <div slot="reference" >
                                        <el-tag >{{ scope.row[item.prop] }}</el-tag>
                                    </div>
                                </el-popover>

                      </template>
                        </el-table-column>
                      
                        <el-table-column
                        align="center"
                        label="操作"
                        :width ='200'
                        fixed="right"
                        
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

        <el-row type="flex" class="pagination" justify="end" align="middle">
            <el-col :span="20"><div class="grid-content" style="text-align:right">
                    <el-pagination
                        layout="total, prev, pager, next,sizes,jumper" 
       
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
        <el-dialog title="添加数据" :visible.sync="addFormVisible" width="40%" >
            <el-form  ref = 'tableColumn' label-position="left"  >
                <el-form-item 
                v-for="(item,index) in tableColumn" :key="index"
                :prop='item.prop'    :label="item.label"
                 label-width="120px"
                 v-show="item.show"
                   >
                           <el-popover
                            ref="popover2"
                            placement="top-start"
                            title="提示"     
                            trigger="hover"
                            content="点击右边图标可以编写富文本内容">
                          </el-popover>
                    <el-input  v-if="item.data == 'varCharFwb'" v-model="item.content"   size="small" v-popover:popover2   >
                      <i
                        class="el-icon-document el-input__icon"
                        slot="suffix"
                        @click="documentIconClick(item.prop)">
                      </i>
                    </el-input>

                    <el-input  v-else-if="item.data == 'varChar'"  type="textarea" v-model="item.content"   size="small"  suffix-icon="el-icon-date"   autosize >
         
                   
                    </el-input>

                     <el-input v-else-if="item.data == 'data'"  v-model="item.content" size="small" suffix-icon="el-icon-date"  :disabled="true"></el-input>
                    <el-input v-else  v-model="item.content" size="small" ></el-input>

                </el-form-item>
              
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDateClose()">取 消</el-button>
                <el-button type="primary" @click="addDate()">确 定</el-button>
            </div>
        </el-dialog>




        <!-- 编辑数据遮罩 -->
        <el-dialog title="编辑数据" 
        :visible.sync="editFormVisible"
         width="40%"
        :before-close="editHandleClose"
          >
            <el-form  ref = 'tableColumn' label-position="left"  >
                <el-form-item 
                v-for="(item,index) in tableColumn" :key="index"
                :prop='item.prop'    :label="item.label"
                 label-width="120px"
                 v-show="item.show"
                   >
                           <el-popover
                            ref="popover1"
                            placement="top-start"
                            title="提示"     
                            trigger="hover"
                            content="点击右边图标可以编写富文本内容">
                          </el-popover>
                    <el-input  v-if="item.data == 'varCharFwb'" v-model="item.content"   size="small" v-popover:popover1   >
                      <i
                        class="el-icon-document el-input__icon"
                        slot="suffix"
                        @click="documentIconClick(item.prop)">
                      </i>
                    </el-input>

                    <el-input  v-else-if="item.data == 'varChar'"  type="textarea" v-model="item.content"   size="small"  suffix-icon="el-icon-date"   autosize >
         
                   
                    </el-input>

                     <el-input v-else-if="item.data == 'data'"  v-model="item.content" size="small" suffix-icon="el-icon-date"  :disabled="true"></el-input>
                    <el-input v-else  v-model="item.content" size="small" ></el-input>

                </el-form-item>
              
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDateClose()">取 消</el-button>
                <el-button type="primary" @click="editDate()">确 定</el-button>
            </div>
        </el-dialog>        







        <!-- 富文本据遮罩 -->
        <el-dialog
        title="富文本编辑器"
        :visible.sync="fwbVisible"
        class="el-dialog__body"
        width="55%"
        :fullscreen=fwbShowFull
        :before-close="handleClose">
        <el-switch
          v-model="fwbShowFull"
          active-text="全屏显示"
        >
        </el-switch>
        <p class="fwbBox">
          <quill-editor 
              v-model="content" 
              class="ql-editor "
              ref="myQuillEditor" 
              :options="editorOption" 
              @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
              @change="onEditorChange($event)">
          </quill-editor>
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="fwbClose()">取 消</el-button>
          <el-button type="primary" @click="fwbButton()">确 定</el-button>
        </span>
      </el-dialog>

       <el-upload
        class="editor-upload"
        accept="image/*"
        action="http://127.0.0.1:3000/api/upload/singleFile"
        :show-file-list="false"
        :on-success="success"
      ></el-upload>



  </div>
</template>

<script>


   const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
    
      [{'header': 1}, {'header': 2}],               // custom button values
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
      [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
      [{'direction': 'rtl'}],                         // text direction
    
      [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
    
      [{'color': []}, {'background': []}],          // dropdown with defaults from theme
      [{'font': []}],
      [{'align': []}],
      ['link', 'image'],
      ['clean']                                         // remove formatting button
    ]




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
        //编辑数据盒子
        editFormVisible:false,


        //添加表单数据
        AddForm:{
        },
        //表单富文本容器标记
        clickProp:'',

        //富文本盒子
        fwbVisible:false,

        serverUrl: '../file/upload',  // 这里写你要上传的图片服务器地址
        content: `<p>hello world </p>`,
        editorOption: {
              modules:{
                    toolbar:{
                        container: toolbarOptions,  // 工具栏
                        handlers: {
                          image: function(value) {
                            if (value) {
                              console.log("aa")
                              document.querySelector("input[name='file']").click();
                            } else {
                              this.quill.format("image", false);
                            }
                          }
                        }

                   
                    }
                }
        },

        //富文本全屏按钮
        fwbShowFull:false

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
         if(code === 2) {
            this.dataLists =[],
            this.total =0
            setTimeout(()=>{
                this.loading = false
            },500)
         }
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
        this.tableColumn.map((item,index,key) => {

          item.content = row[item.prop]
          if(item.data==='varCharFwb'){
            this.content = row[item.prop]
            console.log(this.content)
          }
          console.log(item,index,key)
          // item.content = row[item.prop]
        });
        
        this.editFormVisible = true;
      },
      //编辑确定
       editDate(){
        this.editFormVisible = false;
        let data = {}
        this.tableColumn.forEach(item => {
          data[item.prop] = item.content  
        });
        console.log(data)
        this.$axios.post(`/${this.Table}_update`,this.$qs.stringify(data)).then((res) =>{
          console.log(res)
          if(res.status === 200){
            if(res.data.code === 0){
                this.getDataList()
                this.$message({
                    type:'success',
                    message:'添加成功',
                    duration:1000
                  })
            }

          }else{
              this.$message({
                type:'error',
                message:'添加失败',
                duration:1000
              })
          }

        }).then(e =>{
          this.clearData();

        })
      },
      //取消编辑
      editHandleClose(){
        this.editFormVisible = false;
        this.clearData()
      },

      clearData(){
        this.tableColumn.map(item => {
          item.content = '' 
        });
        this.content = ''
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
                    this.total= this.total-1;
                    const index = this.dataLists.findIndex(item => item.id === id)
                    this.dataLists.splice(index,1);
                    const totalPage = Math.ceil(this.dataLists.length / this.pageSize)

                   
                
                    if(totalPage === 0 && this.curPage != 1){
                        this.getDataList(--this.curPage);

                    }else if(this.total === this.pageSize){
                        this.getDataList(1);
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

        let data = {}
        this.tableColumn.forEach(item => {
          data[item.prop] = item.content  

        });
        console.log(data)
        this.$axios.post(`/${this.Table}_create`,this.$qs.stringify(data)).then((res)=>{
          console.log(res)
          if(res.status === 200){
            if(res.data.code === 0){
                this.getDataList()
                this.$message({
                    type:'success',
                    message:'修改成功',
                    duration:1000
                  })
            }

          }else{
              this.$message({
                type:'error',
                message:'修改失败',
                duration:1000
              })
          }

        }).then(e=>{
          this.clearData();
        }).catch(err => {
             console.log('aa')
           })  

        this.addFormVisible = false;

    },
    //取消添加数据
    addDateClose(){
       this.tableColumn.map((item)=>{
         item.content = ''
       })
      this.addFormVisible = false;
      // this.clickProp=''
    },
    //提交编辑
    editData(row){
            
      this.editFormVisible = false;
      console.log('提交编辑')
    },

    //取消编辑
    editDateClose(){
      console.log('取消编辑')
      // this.clearData();
      this.editFormVisible = false;
      // this.clickProp=''
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
    documentIconClick(prop){
      console.log(prop)
      this.clickProp=prop
      console.log('启用富文本');
      this.fwbVisible = true
    },

    //富文本窗口关闭
    handleClose(done) {
      this.fwbVisible = false
      //表单富文本容器标记
      if(!this.editFormVisible){
        this.content=''
      }
      console.log('关闭窗口')
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    //取消富文本编辑
    fwbClose(){
      //表单富文本容器标记
      this.clickProp=''
      if(!this.editFormVisible){
        this.content=''
      }
  
      this.fwbVisible = false
      console.log('关闭窗口')
    },
    //编写好富文本
    fwbButton(){
     this.fwbVisible = false
     console.log('点击确定，展示富文本内容：',this.content)
     console.log(this.tableColumn,this.clickProp)
     this.tableColumn.map((item,i) =>{
       console.log(item,i)
       if(item.prop === this.clickProp){
         console.log("1")
         item.content = this.content
       }
     })

     
    },

    //富文本图片上传回调函数
    success(res, file, fileList) {
          console.log(res)
          let quill = this.$refs.myQuillEditor.quill;
          let range = quill.getSelection();
            let length = range.index;
            quill.insertEmbed(length, "image", res.url);
            quill.setSelection(length + 1);
        
    },



    onEditorReady(editor) { // 准备编辑器
      },
    onEditorBlur(){}, // 失去焦点事件
    onEditorFocus(){}, // 获得焦点事件
    onEditorChange(){}, // 内容改变事件
    saveHtml:function(event){
      console.log(this.content);
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



/* 富文本样式 */

.ql-toolbar.ql-snow{
    display: flex;
    flex-wrap: wrap;
}


</style>
