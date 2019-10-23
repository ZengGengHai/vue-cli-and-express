---

typora-root-url: ./

---



# 基于vue-cli 与 express 搭建的博客



![1571806937686](/img/1571806937686.png)




## 安装使用

```
//安装
cd blog
npm install

cd back
npm install

//使用
cd blog
npm start

cd back
npm start

//查看vue-cli页面
http://localhost:8080/index  

//查看打包好的页面
http://localhost:8080/index 

```



## 开发记录

1. 安装vue-cli脚手架

   ```
   npm i -g @vue/cli
   npm i -g @vue/cli-init
   vue init webpack blog
   ```

2. 安装express脚手架

   ```
   npm install express-generator -g
   express back
   ```

3. 安装node 热更新

   ```
   //安装
   npm -g install supervisor
   //使用
   supervisor ./bin/www
   ```

4. 安装axios实现请求

   1. 安装

      ```
      npm i --save axios
      ```

   2. Note.vue中使用

      ```javascript
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
      ```

   3. 解决跨域

      1. 开发时候可以在浏览器快捷键右键属性中目标结尾添加脚本

         因为vue-cli打包时候就不存在跨域问题

         ```
         --args --disable-web-security --user-data-dir
         ```

      2. 在服务端设置响应头（不安全）

         ```javascript
         app.all("*",function(req,res,next){
           res.header("Access-Control-Allow-Origin","*");
           next();
         });
         ```

5. 打包vue-cli

   ```
   npm run build
   ```

6. 路由索引与重写

   1. vue-cli有路由，express也有路由

      页面跳转的时候用vue-cli路由，请求特定路由获取数据就交给express，express重写索引

      ```
      npm i --save connect-history-api-fallback
      ```

       

      ​    

      在express的app.js引入

      ```javascript
      var history = require('connect-history-api-fallback')
      
      //访问接口http://localhost/note/getNoteList 就跳转给node的express处理
      app.use(history({
        rewrites: [
          {
            from: /^\/note\/.*$/,
            to: function(context) {
              return  context.parsedUrl.pathname;
            }
          } 
        ]
      }));
      ```

7. marked的使用

   ```javascript
   //作用：识别渲染 .md 文件
   cd back
   npm install marked --save
   
   //使用
   在express中的routes/note.js文件中引用
   const marked = require('marked');
   
   
   router.get('/getNoteByName/:name', function(req, res, next) {
     console.log(req.params.name)
     var fileName = req.params.name
     fs.readFile('./note/' + fileName + '.md',function(err,data){
       if(err){
         res.send("文件不存在")
       }else{
         var htmlStr = marked(data.toString());
         res.json(htmlStr);
       }
     })
   });
   
   ```

8. 高亮语法使用，是读物的页面添加样式

   1. 安装：

      1. cd blog
      2. npm install marked --save

   2. 使用

      在Article.vue组件中使用

      ```javascript
      import hljs from "highlight.js";
      import javascript from 'highlight.js/lib/languages/javascript';
      import 'highlight.js/styles/agate.css';
      
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
              });
       }
      ```

   3. 高亮查库样式：

      https://github.com/highlightjs/highlight.js/tree/master/src/styles

9. ...

10. ...

11. ...

12. ...




