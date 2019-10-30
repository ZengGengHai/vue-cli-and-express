<template>
 <div class="edit_container">
        <quill-editor 
            v-model="content" 
            ref="myQuillEditor" 
            :options="editorOption" 
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>
        <button v-on:click="saveHtml">保存</button>
        
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
      ['link', 'image', 'video'],
      ['clean']                                         // remove formatting button
    ]


export default {
    name:'Home',
   data(){
     return {
           serverUrl: '../file/upload',  // 这里写你要上传的图片服务器地址
            content: `<p>hello world</p>`,
            editorOption: {
                  modules:{
                        toolbar:{
                            container: toolbarOptions,  // 工具栏
                            // handlers: {
                            //     'image': function (value) {
                            //         if (value) {
                            //             alert('自定义图片')
                            //         } else {
                            //             // this.quill.format('image', false); //禁止图片事件
                            //         }
                            //     }
                            // }
                        }
                    }
            }
        }
  },computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    },methods: {
        onEditorReady(editor) { // 准备编辑器
        },
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
        saveHtml:function(event){
          console.log(this.content);
        }
    }
}
</script>

<style lang="">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.ql-toolbar.ql-snow{
    display: flex;
    flex-wrap: wrap;
}
</style>