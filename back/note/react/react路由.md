# 创建项目demo1

```
 这个语句是下面两个语句的结合
// npx create-react-app my-app

先安装create-react-app
// npm i create-react-app -g
// create-react-app my-app
// yarn start

```

在index.js删除App,创建一个App组件

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//根组件
// import App from './App';
import App from "./App.jsx"//加后缀名
// class App extends React.Component{
//     render(){
//         return (
//             <div>我是根组件</div>
//     )
//     }
// }

ReactDOM.render(<App />, document.getElementById('root'));


```

创建一个App.jsx组件

```
import React from "react"
class App extends React.Component{
    render(){
        return (
            <div>我是一个好人</div>
        )
    }
}

export default App
```



把评论项目放入脚手架

```
第一步:
在src目录中创建components
Comment.jsx
import React from 'react'
import CommentForm from './CommentForm.jsx'
import CommentList from './CommentList.jsx'
import './Comment.css'
class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        { id: 1, name: '张三', content: '沙发' },
        { id: 2, name: '李四', content: '板凳' },
        { id: 3, name: '王五', content: '卖瓜子' }
      ],
      index: 3
    }
  }
  render() {
    return (
      <div className="container">
        <h1>评论案例</h1>
        <CommentForm add={this.add} />
        <hr />
        {/* 1. 父组件把评论列表数据传递给了子组件 */}
        <CommentList list={this.state.list} />
      </div>
    )
  }

  // 添加评论的方法
  add = (name, content) => {
    this.state.list.push({
      id: ++this.state.index,
      name,
      content
    })
    this.setState(this.state)
  }
}

export default Comment
======================================================================
Comment.css
.container {
  width: 800px;
  margin: 0 auto;
}
========================================================================


创建 CommentForm.jsx
import React from 'react'
class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      content: ''
    }
  }
  render() {
    return (
      <div className="form">
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        />
        <br />
        <textarea
          name="content"
          value={this.state.content}
          onChange={this.handleChange}
          cols="30"
          rows="5"
        />
        <br />
        <button onClick={this.clickFn}>添加</button>
      </div>
    )
  }
  clickFn = () => {
    // 调用父组件传递过来的方法
    let { add } = this.props
    add(this.state.name, this.state.content)

    // 清空表单
    this.setState({
      name: '',
      content: ''
    })
  }
  handleChange = e => {
    let { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
}

export default CommentForm

========================================================================================
创建CommentList.jsx
import React from 'react'
class CommentList extends React.Component {
  render() {
    // 2. 子组件通过props可以获取到父组件传递过来的数据
    let { list } = this.props
    return (
      <div className="list">
        <ul>
          {list.map(item => (
            <li key={item.id}>
              <h3>
                评论人：
                {item.name}
              </h3>
              <p>
                评论内容：
                {item.content}
              </p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

// 导出组件
export default CommentList

=======================================================================================

在App.jsx导入
// jsx就表示一个react组件，  jsx仅仅是后缀不一样 jsx的作用和js的作用完全一样
// 有些编辑器，看到jsx文件，提供一些高亮，提示等等
// 定义一个根组件
import React from 'react'
import Comment from './components/Comment.jsx'
class App extends React.Component {
  render() {
    return <Comment />
  }
}
// 导出根组件
export default App
```



路由：

# 新创建一个项目demo2

```
新创建一个项目demo2
create-react-app demo2
cd demo2
  yarn start
安装路由
npm i react-router-dom
===================================
index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
ReactDOM.render(<App />, document.getElementById('root'))
==============================================
App.jsx
// 根组件
import React from 'react'
import Home from './components/Home.jsx'
import User from './components/User.jsx'
import Login from './components/Login.jsx'
import { HashRouter, Route, Link } from 'react-router-dom'
// 如何在react项目中使用react-router
// 1. 需要安装react-router-dom包  npm i react-router-dom
// 2. 需要引入一些组件

class App extends React.Component {
  render() {
    // HashRouter:整个路由容器，将来配置路由，是一定要有一个HashRouter
    // Link : 相当于vue中 router-link 配置路由的连接，最终会渲染成一个a标签
    // Route: 配置路由规则
    return (
      <HashRouter>
        <div>
          <ul>
            <li>
              <Link to="/home">首页</Link>
            </li>
            <li>
              <Link to="/user">用户管理</Link>
            </li>
            <li>
              <Link to="/login">登录</Link>
            </li>
          </ul>
          {/* 配置路由规则 一个路径会对应一个组件 */}
          <Route path="/home" component={Home} />
          <Route path="/user" component={User} />
          <Route path="/login" component={Login} />
        </div>
      </HashRouter>
    )
  }
}
export default App
=============================================================
App.jsx
// react-router-dom的详解
import React from 'react'
import Home from './components/Home.jsx'
import User from './components/User.jsx'
import Login from './components/Login.jsx'
import { HashRouter, Link, Route, Switch,BrowserRouter} from 'react-router-dom'

class App extends React.Component {
  render() {
    // HashRouter和BrowserRouter都是核心的路由容器
    // HashRouter通过锚点来实现的，路径带了#
    // BrowserRouter通过H5的history模式实现，路径不带#

    // 路由匹配规则相关的组件有俩
    // Route: 表示一个匹配规则
    // Switch: 开关，
    return (
      <HashRouter>
        <div>
          <ul>
            <li>
              <Link to="/home">首页</Link>
            </li>
            <li>
              <Link to="/user">用户管理</Link>
            </li>
            <li>
              <Link to="/login">登录</Link>
            </li>
          </ul>
          {/* Switch : 使用Switch把一组route包裹起来，保证只显示一个组件 */}
          {/* 配置路由规则 一个路径会对应一个组件 */}
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/user" component={User} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

export default App
========================================================================================



在src中创建一个components目录
Home.jsx
import React from 'react'
export default class Home extends React.Component {
  render() {
    return <div>这是home组件</div>
  }
}
==========================================================================
Login.jsx
import React from 'react'
export default class Login extends React.Component {
  render() {
    return <div>这是Login组件</div>
  }
}
===================================================
User.jsx
import React from 'react'
export default class User extends React.Component {
  render() {
    return <div>这是User组件</div>
  }
}



```



# 创建项目demo3

```
新创建一个项目demo3
create-react-app demo3
cd demo3
  yarn start
安装路由
npm i react-router-dom
===========================
index.js
import React from 'react'
import ReactDOM from 'react-dom'
// 如果App根组件
import App from './App'

// 渲染根组件到页面
ReactDOM.render(<App />, document.getElementById('root'))
================================================================
App.jsx
import React from 'react'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import User from './components/User'
// react-router-dom这个包，给我们声明了很多的组件
// 我们可以直接导入这些组件去使用，就可以完成我们想要的路由相关的功能

// 1. 路由容器相关的组件：  HashRouter: 有#号，锚点实现   BrowserRouter：没有#号，<h5></h5>
// 2. 路由连接  Link  NavLink
// Link: to属性，表示的点击这个Link，跳转到的路由， Link最终渲染成a标签
// NavLink: 作用和Link是一样的，路由跳转  NavLink比Link更强大的一点是可以指定样式

// 3. 路由匹配  Route: 一条路由规则  Switch: 保证同时只会匹配一条路由规则
// Route表示一条路由规则，同时也表示路由的出口（匹配的组件在哪儿显示）
// Switch组件，可以保证只会匹配到一个路由， Swicth中只能出现Route
import {
  BrowserRouter,
  NavLink,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div>我是一个根组件</div>
          <ul>
            <li>
              <NavLink activeClassName="now" to="/home">
                首页
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="now" to="/users">
                用户管理
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="now" to="/login">
                登录
              </NavLink>
            </li>
          </ul>

          <Switch>
            {/* path="/" 只要是/xxx的路由都匹配上exact表示精确匹配 */}
            {/* Redirect: 表示路由的重定向  一定要加exact*/}
         
            <Redirect exact from="/" to="/home" />
            <Route path="/home" component={Home} />
            <Route path="/users" component={User} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
===================================================================================
App.css
.now {
  font-size: 24px;
  color: red;
}
=================================================================================
components目录
Home.jsx
import React from 'react'
export default class Home extends React.Component {
  render() {
    return <div>这是Home组件</div>
  }
}
========================================================================================
Login.jsx
import React from 'react'
export default class Login extends React.Component {
  render() {
    return <div>这是Login组件</div>
  }
}
====================================================================================
User.jsx
import React from 'react'
export default class User extends React.Component {
  render() {
    return <div>这是User组件</div>
  }
}

```



# 创建项目获取路由参数demo4

```
新创建一个项目demo3
create-react-app demo3
cd demo3
  yarn start
安装路由
npm i react-router-dom
==================================
index.js
import React from 'react'
import ReactDOM from 'react-dom'
// 如果App根组件
import App from './App'

// 渲染根组件到页面
ReactDOM.render(<App />, document.getElementById('root'))

=====================================================
import React from 'react'
import './App.css'
import News from './components/News'


import { HashRouter, Link, Switch, Route } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <div>我是一个根组件</div>
          <ul>
            <li>
              <Link to="/news/1">新闻1</Link>
            </li>
            <li>
              <Link to="/news/2">新闻2</Link>
            </li>
            <li>
              <Link to="/news/3">新闻3</Link>
            </li>
          </ul>

          <Switch>
            {/* 
              路由参数：   /news/:id   表示匹配 /news/xx  /news/a /news/b
              */}
             

            {/* <Route path="/news/:id" component={News} /> */}

            {/* /news/xxx/xxx */}
            {/* http://localhost:3000/#/news/hello/3 */}
            <Route path="/news/:type/:id" component={News} />
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

export default App
========================================================
components
News.jsx
import React from 'react'
export default class News extends React.Component {
  // 通过props.match就可以获取到路由的参数
  render() {
  //console.log(this.props.match)
    let { match } = this.props

    console.log(match)
    // 获取到路由的参数  /news/1  /news/2
     //return <div>这是News组件===={match.params.id}</div>
    return <div>这是News组件</div>
  }
}

```

# 创建项目编程式导航demo5

```
新创建一个项目demo3
create-react-app demo3
cd demo3
  yarn start
安装路由
npm i react-router-dom
==================================
index.js
import React from 'react'
import ReactDOM from 'react-dom'
// 如果App根组件
import App from './App'
// 渲染根组件到页面
ReactDOM.render(<App />, document.getElementById('root'))
================================
App.js
import React from 'react'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import User from './components/User'

// 声明式导航： 通过Link或者NavLink实现导航的跳转
// 编程式导航： 通过js代码来实现路由的跳转  router.push()
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {/*  <ul>
            <li>
              <Link to="/home" component={Home}>
                首页
              </Link>
            </li>
            <li>
              <Link to="/user" component={User}>
                用户
              </Link>
            </li>
            <li>
              <Link to="/Login" component={Login}>
                登录
              </Link>
            </li>
          </ul> */}
          {/* Redirect: 表示路由的重定向 */}
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/home" component={Home} />
            <Route path="/user" component={User} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
export default App
===========================================
创建components目录
import React from 'react'
export default class Home extends React.Component {
  render() {
    return <div>这是Home组件</div>
  }
}
=====================================================
Login.jsx
import React from 'react'
// 如果想要通过js来实现react中路由的跳转
// 1. 导入withRouter方法
// 2. 使用withRouter包裹住当前组件
// 3. withRouter把当前组件包裹后，在当前组件的props中就能够获取history对象
// ，通过history对象就可以实现路由的额跳转
import { withRouter } from 'react-router-dom'
class Login extends React.Component {
  render() {
    console.log(this.props.history)
    // history对象
    let { history } = this.props
    return (
      <div>
        {/* 需求：点击登录的时候，跳转到首页组件去 */}
        {/* 编程式导航：通过js来显现路由的跳转 */}
        这是Login组件{' '}
        <button onClick={() => history.push('/home')}>点击登录</button>
      </div>
    )
  }
}

export default withRouter(Login)
=========================================================
User.jsx
import React from 'react'
export default class User extends React.Component {
  render() {
    return <div>这是User组件</div>
  }
}


```

