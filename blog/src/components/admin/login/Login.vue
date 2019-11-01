<template>
    <div>
        <el-row :gutter="10" type="flex" justify="center" class="box" align="middle">
            <el-col  :xs="20" :sm="10" :md="8" :lg="6" :xl="4" >
                 <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
                    <el-form-item   label="账号"    prop="username">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button  type="primary" @click="submitForm('ruleForm')">登录</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
     
    </div>
</template>

<script>

   export default {
    name:'Login',
    data() {
      return {
        ruleForm: {
          username: 'zgh',
          password:'zghzzj'
  
        },
        rules: {
           username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: '' }
          ],
          password:[
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: "" }
          ]
        },

      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {     
              console.log('验证成功',this.ruleForm)
             
            this.$axios.post('/admin',this.$qs.stringify(this.ruleForm)).then((res)=>{
                console.log(res)
                let {data,status} = res
                if(status === 200){
                    if(data.code === 0){
                        localStorage.setItem('admin',JSON.stringify(data.data[0]))
                        this.$router.push('/admin')
                    }else{
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'error'
                        });
                    }
                }else{
                        localStorage.removeItem('token')
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'error'
                        });
                }
                
            

             
            })
            .catch(err=>{
              console.log(err)
            })
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
    width:100%;
    height:100vh;
   background: #99a9bf;
}

.demo-ruleForm{
    min-width: 300px;
    background: white;
    border-radius: 15px;
    padding:60px 20px 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.el-form-item__label{
    background: red;
}


</style>
