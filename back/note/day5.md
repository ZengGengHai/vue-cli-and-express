# Vue.js - Day5 - Webpack

# npm简介

Node Package Manager node包管理工具

包是什么？？？

## 三个关键内容

1. npm服务器
2. [npm网站](www.npmjs.com)
3. npm命令行工具

## npm安装

只要安装好了node, 那么npm就自动安装好了

## npm命令行工具的使用

在node装完之后，全局就有一个npm命令可以使用了

1. 初始化一个pacakge.json文件
   `npm init`
   `npm init -y`

如果当前文件夹名称包含中文等特殊字符，则npm init命令执行会报错，报错之后pacakge.json文件中的name和version属性为空，需要自己手动的补全！！

1. 下载包(本地安装)
   下载的包会放到当前项目中的node_modules文件夹中！   
   `npm install 包名`
   `npm install 包名@版本号`

`npm i 包名`
`npm i 包名@版本号`

`npm install 包名 包名1 包名2`

1. 卸载包
   `npm uninstall 包名`

## 全局安装

当要使用一个包，这个包会提供一个全局命令的时候，这个包就需要被全局安装！

命令
`npm install 包名 -g`
`npm install 包名 --global`

live-server
npm install less -g



# package.json

## 作用

package.json文件就是用来描述一个包的信息的！

只要一个文件夹中有一个合格的pacakge.json文件，那么这个文件夹就可以被称为是一个包！

合格的定义：  必须包含两个属性 name version

## package.json文件中的属性

name: 包名    不能有中文，不能有空格，不能有大写字母，不能有特殊字符！
version:  版本信息 

description： 描述信息
author: 作者
keywords: 关键词 方便在npm网站上进行搜索
license: 开源协议 自己指定

scripts: 放的就是一些shell命令，这些命令可以通过 `npm run 命令别名` 进行执行
    可以省略run执行的命令别名： start stop restart test config
    例如`npm start`

dependencies:
devDependencies:

## 版本号说明

一般的版本号都会包含3个数字，中间用.隔开
格式：   主版本号.次版本号.修订版本号

主版本号： 当代码功能更新，更新之后，不兼容之前的版本了，那么需要更新主版本号！
此版本号： 当代码功能更新，更新之后，依然兼容之前的版本，只是新增了某些功能，那么需要更新次版本号
修订版本号： 当代码更新，更新的只是修复了某些BUG,或者优化了某些功能，那么这个时候只需要更新 修订版本号就可以了

jquery: 1.x 2.x 3.x
1.10.1 1.12.4
1.12.1 1.12.4

## dependencies 和 devDependencies 的说明

这两个属性中保存的都是当前包所有的依赖信息。

dependencies： 运行时依赖项，在将代码上传到服务器时，这个包仍被需要
devDependencies： 开发时依赖项，这个依赖项只需要在开发时时候，上传到服务器的时候不需要！

问题： 为什么要将依赖项信息存储起来呢？？？
主要目的是为了代码共享的时候，比较方便！

在进行代码分享的时候，不需要分享node_modules，只需要分享自己的代码和pacakge.json即可，另外的程序员拿到代码之后，自己根据pacakge.json下载所有的依赖项即可！

`npm install`  这条命令会自动根据package.json中保存的包信息进行下载 （devDependencies+dependencies）

只下载运行时依赖项可以使用命令`npm install --production`

## 如何将依赖项的信息保存到dependencies 和 devDependencies中

在早期版本的npm中，依赖项信息不会自动保存！

1. 将依赖项的信息保存到dependencies
   `npm install 包 --save`
   `npm install 包 -S`
2. 将依赖项的信息保存到devDependencies
   `npm install 包 --save-dev`
   `npm install 包 -D`



# nrm

## 说明

npm服务器是在国外的，所以下载速度会比较慢，所以我们可以设置npm，让其下载包的时候，从国内的服务器上进行下载。

设置npm让其从国内服务器下载，需要用到一个工具，这个工具就是nrm

## 安装

`npm install nrm -g`

## 使用

1. 查看可用的服务器列表
   `nrm ls`
2. 查看当前正在使用的服务器
   `nrm current`
3. 切换到指定的服务器
   `nrm use 服务器名称`
4. 测速命令
   `nrm test`
   `nrm test 指定的服务器名称`



## 在网页中会引用哪些常见的静态资源？

+ JS
 - .js  .jsx  .coffee  .ts（TypeScript  类 C# 语言）
+ CSS
 - .css  .less   .sass  .scss
+ Images
 - .jpg   .png   .gif   .bmp   .svg
+ 字体文件（Fonts）
 - .svg   .ttf   .eot   .woff   .woff2
+ 模板文件
 - .ejs   .jade  .vue【这是在webpack中定义组件的方式，推荐这么用】


## 网页中引入的静态资源多了以后有什么问题？？？
1. 网页加载速度慢， 因为 我们要发起很多的二次请求；
2. 要处理错综复杂的依赖关系


## 如何解决上述两个问题
1. 合并、压缩、精灵图、图片的Base64编码
2. 可以使用之前学过的requireJS、也可以使用webpack可以解决各个包之间的复杂依赖关系；

## 什么是webpack?
webpack 是前端的一个项目构建工具，它是基于 Node.js 开发出来的一个前端工具；


## 如何完美实现上述的2种解决方案
1. 使用Gulp， 是基于 task 任务的；
2. 使用Webpack， 是基于整个项目进行构建的；
+ 借助于webpack这个前端自动化构建工具，可以完美实现资源的合并、打包、压缩、混淆等诸多功能。
+ 根据官网的图片介绍webpack打包的过程
+ [webpack官网](http://webpack.github.io/)
+ <https://www.webpackjs.com/>中方网

## webpack安装的两种方式
1. 运行`npm i webpack -g`全局安装webpack，这样就能在全局使用webpack的命令 npm i webpack@3.6.0 -g






npm i webpack  webpack-cli  -g



webpack.config.js

mode :



webpack ./src/main.js  ./dist/bundle.js





webpack



 webpack-dev-server



html-webpack-plugin







npm i webpack webpack-cli  -D





2. 在项目根目录中运行`npm i webpack --save-dev`安装到项目依赖中

## 初步使用webpack打包构建列表隔行变色案例
1. 运行`npm init`初始化项目，使用npm管理项目中的依赖包
2. 创建项目基本的目录结构
3. 使用`cnpm i jquery --save`安装jquery类库
4. 创建`main.js`并书写各行变色的代码逻辑：
```
	// 导入jquery类库
    import $ from 'jquery'

    // 设置偶数行背景色，索引从0开始，0是偶数
    $('#list li:even').css('backgroundColor','lightblue');
    // 设置奇数行背景色
    $('#list li:odd').css('backgroundColor','pink');
```
5. 直接在页面上引用`main.js`会报错，因为浏览器不认识`import`这种高级的JS语法，需要使用webpack进行处理，webpack默认会把这种高级的语法转换为低级的浏览器能识别的语法；
6. 运行`webpack 入口文件路径 输出文件路径`对`main.js`进行处理：
```
webpack src/main.js dist/bundle.js
```

## 使用webpack的配置文件简化打包时候的命令
1. 在项目根目录中创建`webpack.config.js`
2. 由于运行webpack命令的时候，webpack需要指定入口文件和输出文件的路径，所以，我们需要在`webpack.config.js`中配置这两个路径：
```
    // 导入处理路径的模块
    var path = require('path');

    // 导出一个配置对象，将来webpack在启动的时候，会默认来查找webpack.config.js，并读取这个文件中导出的配置对象，来进行打包处理
    module.exports = {
        entry: path.resolve(__dirname, 'src/js/main.js'), // 项目入口文件
       
        output: { // 配置输出选项
            path: path.resolve(__dirname, 'dist'), // 配置输出的路径
            filename: 'bundle.js' // 配置输出的文件名
        },
        mode: 'development'
    }
```

## 实现webpack的实时打包构建
1. 由于每次重新修改代码之后，都需要手动运行webpack打包的命令，比较麻烦，所以使用`webpack-dev-server`来实现代码实时打包编译，当修改代码之后，会自动进行打包构建。 

2. 运行`cnpm i webpack-dev-server --save-dev`安装到开发依赖

3. 安装完成之后，在命令行直接运行`webpack-dev-server`来进行打包，发现报错，此时需要借助于`package.json`文件中的指令，来进行运行`webpack-dev-server`命令，在`scripts`节点下新增`"dev": "webpack-dev-server"`指令，发现可以进行实时打包，但是dist目录下并没有生成`bundle.js`文件，这是因为`webpack-dev-server`将打包好的文件放在了内存中

   npm run dev
 + 把`bundle.js`放在内存中的好处是：由于需要实时打包编译，所以放在内存中速度会非常快
 + 这个时候访问webpack-dev-server启动的`http://localhost:8080/`网站，发现是一个文件夹的面板，需要点击到src目录下，才能打开我们的index首页，此时引用不到bundle.js文件，需要修改index.html中script的src属性为:`<script src="../bundle.js"></script>`
 + 为了能在访问`http://localhost:8080/`的时候直接访问到index首页，可以使用`--contentBase src`指令来修改dev指令，指定启动的根目录：  --open自动打开
 ```
 "dev": "webpack-dev-server --contentBase src"
 ```
 同时修改index页面中script的src属性为`<script src="bundle.js"></script>`



## 使用`html-webpack-plugin`插件配置启动页面
由于使用`--contentBase`指令的过程比较繁琐，需要指定启动的目录，同时还需要修改index.html中script标签的src属性，所以推荐大家使用`html-webpack-plugin`插件配置启动页面.
1. 运行`cnpm i html-webpack-plugin --save-dev`安装到开发依赖
2. 修改`webpack.config.js`配置文件如下：
```
    // 导入处理路径的模块
    var path = require('path');
    // 导入自动生成HTMl文件的插件
    var htmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
        entry: path.resolve(__dirname, 'src/js/main.js'), // 项目入口文件
        output: { // 配置输出选项
            path: path.resolve(__dirname, 'dist'), // 配置输出的路径
            filename: 'bundle.js' // 配置输出的文件名
        },
        plugins:[ // 添加plugins节点配置插件
            new htmlWebpackPlugin({
                template:path.resolve(__dirname, 'src/index.html'),//模板路径
                filename:'index.html'//自动生成的HTML文件的名称
            })
        ]
    }
```
3. 修改`package.json`中`script`节点中的dev指令如下：
```
"dev": "webpack-dev-server"
```
4. 将index.html中script标签注释掉，因为`html-webpack-plugin`插件会自动把bundle.js注入到index.html页面中！

## 实现自动打开浏览器、热更新和配置浏览器的默认端口号
**注意：热更新在JS中表现的不明显，可以从一会儿要讲到的CSS身上进行介绍说明！**
### 方式1：
+ 修改`package.json`的script节点如下，其中`--open`表示自动打开浏览器，`--port 4321`表示打开的端口号为4321，`--hot`表示启用浏览器热更新：
```
"dev": "webpack-dev-server --hot --port 4321 --open"
```

### 方式2：
1. 修改`webpack.config.js`文件，新增`devServer`节点如下：
```
devServer:{
        hot:true,
        open:true,
        port:4321
    }
```
2. 在头部引入`webpack`模块：
```
var webpack = require('webpack');
```
3. 在`plugins`节点下新增：
```
new webpack.HotModuleReplacementPlugin()
```

## 使用webpack打包css文件
1. 运行`cnpm i style-loader css-loader --save-dev`
2. 修改`webpack.config.js`这个配置文件：
```
module: { // 用来配置第三方loader模块的
        rules: [ // 文件的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }//处理css文件的规则
        ]
    }
```
3. 注意：`use`表示使用哪些模块来处理`test`所匹配到的文件；`use`中相关loader模块的调用顺序是从后向前调用的；

## 使用webpack打包less文件

```
index.less

ul{
  padding: 0;
  margin: 0;
}
```



1. 运行`cnpm i less-loader less -D`
2. 修改`webpack.config.js`这个配置文件：
```
{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
```

## 使用webpack打包sass文件

```
index.scss

html, body{
  margin: 0;
  padding: 0;

  li{
    font-size: 12px;
    line-height: 30px;
  }
}

```



1. 运行`cnpm i sass-loader node-sass --save-dev`
2. 在`webpack.config.js`中添加处理sass文件的loader模块：
```
{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
```

## 使用webpack处理css中的路径
1. 运行`cnpm i url-loader file-loader --save-dev`
2. 在`webpack.config.js`中添加处理url路径的loader模块：
```
{ test: /\.(png|jpg|gif)$/, use: 'url-loader' }
```
3. 可以通过`limit`指定进行base64编码的图片大小；只有小于指定字节（byte）的图片才会进行base64编码：
```
{ test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=43960' },
```

## 使用babel处理高级JS语法
1. 运行`cnpm i babel-core babel-loader babel-plugin-transform-runtime --save-dev`安装babel的相关loader包
2. 运行`cnpm i babel-preset-es2015 babel-preset-stage-0 --save-dev`安装babel转换的语法
3. 在`webpack.config.js`中添加相关loader模块，其中需要注意的是，一定要把`node_modules`文件夹添加到排除项：
```
{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
```
4. 在项目根目录中添加`.babelrc`文件，并修改这个配置文件如下：
```
{
    "presets":["es2015", "stage-0"],
    "plugins":["transform-runtime"]
}
```
5. **注意：语法插件`babel-preset-es2015`可以更新为`babel-preset-env`，它包含了所有的ES相关的语法；**

## 相关文章
[babel-preset-env：你需要的唯一Babel插件](https://segmentfault.com/p/1210000008466178)
[Runtime transform 运行时编译es6](https://segmentfault.com/a/1190000009065987)