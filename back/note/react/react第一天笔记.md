# react概述

![](images/react.jpg)

## react介绍

> react 用于构建用户界面的 JavaScript 库

React 起源于 Facebook 的内部项目，因为该公司对市场上所有 JavaScript MV* 框架，都不满意，就决定自己写一套，用来架设 [Instagram 照片墙](https://www.instagram.com/) 的网站（17年 用户量7亿+）。做出来以后，发现这套东西很好用，就在2013年5月开源了。

## react文档

- [英文文档](https://reactjs.org/)	
- [中文文档](https://doc.react-china.org/)
- [github地址](https://github.com/facebook/react)

## react特点

- 声明式：React 可以非常轻松地创建用户交互界面。为你应用的每一个状态设计简洁的视图，在数据改变时 React 也可以高效地更新渲染界面。
- 组件化：创建好拥有各自状态的组件，再由组件构成更加复杂的界面。
- 一次学习，随处编写：无论你现在正在使用什么技术栈，你都可以随时引入 React 开发新特性。React 也可以用作开发原生应用的框架 [React Native](https://facebook.github.io/react-native/).

## react的优势

- 使用`组件化`开发方式，符合现代Web开发的趋势
- 技术成熟，社区完善，配件齐全，适用于大型Web项目（生态系统健全）
- 由Facebook专门的团队维护，技术支持可靠
- ReactNative - Learn once, write anywhere: Build mobile apps with React
- 使用方式简单，性能非常高，支持服务端渲染 SSR
- React非常火，从技术角度，可以满足好奇心，提高技术水平；从职业角度，有利于求职和晋升，有利于参与潜力大的项目


# react初体验

## 引包（安装）

cdn的方式

```html
<script src="https://cdn.bootcss.com/react/16.4.0/umd/react.development.js"></script>
<script src="https://cdn.bootcss.com/react-dom/16.4.0/umd/react-dom.development.js"></script>
<!-- 生产环境中不建议使用 -->
<script src="https://cdn.bootcss.com/babel-standalone/6.26.0/babel.min.js"></script>
```

本地的方式

```html
<!-- react的核心库 -->
<script src="lib/react.development.js"></script>
<!-- 提供与DOM相关的功能 -->
<script src="lib/react-dom.development.js"></script>
<!-- 将es6的语法转成es5,包括react的jsx语法，需要通过babel转换 -->
<script src="lib/babel.min.js"></script>
```

## 创建react元素

**注意，如果在浏览器端使用babel，必须指定type='text/babel'**

```html
<script type="text/babel">
    // 创建react元素
    // 参数1： 元素的名称
    // 参数2： 元素的属性
    // 参数3： 元素的内容（子元素）
    const element = React.createElement('div', {
        title: 'hello react'
    }, 'Hello React！！！')
</script>
```

## 渲染元素到页面

准备html的结构

```html
<div id="app"></div>
```

把元素渲染到页面

```js
// 把元素渲染到页面中
// 参数1：需要渲染的react对象
// 参数2：指定渲染到页面中的容器
ReactDOM.render(
    element,
    document.getElementById('app')
)
```

## createElement方法解释

[api地址](https://react.docschina.org/docs/react-api.html#createelement)

```js
/*
作用：根据指定的参数，创建react对象
参数1：指定创建虚拟DOM的类型
  类型：string 或者 react组件
	1. 任意字符串类型的标签名称，比如：'div' / 'span'
	2 react组件类型，比如：<Welcome></Welcome>
参数2：指定元素自身的属性
	类型：对象或者null
参数3：当前元素的子元素
	类型：string 获取react对象
返回值：react对象
*/
React.createElement(
  type,
  [props],
  [...children]
)
```

## render方法解释

[api地址](https://react.docschina.org/docs/react-dom.html#render)

```js
/* 
  功能：渲染一个React元素，添加到位于提供的container里的DOM元素中
  参数1：：指定要渲染的react对象
  参数2：指定渲染到页面中的容器（DOM对象）
  参数3：回调函数
*/
ReactDOM.render(
  element,
  document.getElementById('app')
)
```

## 小练习

生成以下结构

```html
<ul id="list">
    <li>苹果</li>
    <li>香蕉</li>
    <li>橘子</li>
</ul>
```

**总结：使用createElement创建react对象非常的麻烦，推荐您使用JSX**

# jsx语法

## jsx快速体验

```js
// 通过jsx语法创建react对象
const element = <div title="哈哈">你好啊</div>
// 渲染react对象
ReactDOM.render(
    element,
    document.getElementById('app')
)
```

## jsx讲解

> jsx: 一种 JavaScript 的语法扩展。 在react中推荐使用react来描述用户界面（创建react对象）
>
> 通过jsx创建react对象，实质内部还是调用createElement方法，只不过jsx语法更加的简洁

+ jsx虽然看起来像模板，但是jsx是一个js对象，并不是字符串，也不是DOM对象
+ 在jsx中可以使用表达式， 只需要使用`{}`包裹起来即可
+ 为了代码可读性，书写jsx的时候需要保证**代码的缩进**,并且给jsx的代码使用`()`包裹起来

+ jsx中的元素只能有一个根元素，并且标签必须闭合。
+ 因为 JSX 的特性更接近 JavaScript 而不是 HTML ,所以jsx的属性是js的属性，比如class变成了className

# react的虚拟DOM与diff算法

> React 中最值得称道的部分莫过于 Virtual DOM 与 diff 的完美结合，特别是其高效的 diff 算法，让用户可以无需顾忌性能问题而”任性自由”的刷新页面

## 虚拟DOM

> 虚拟DOM（Virtual DOM）:虚拟DOM就是使用javascript的对象来描述了DOM结构

- 为什么要有虚拟DOM?
  - 因为操作真实DOM的代价是非常昂贵的，随便一个DOM对象，都有很多很多的属性
  - DOM中大部分的属性都不是我们需要关注的
- 虚拟DOM：
  - 使用js对象来描述一个DOM结构，在react框架中，描述一个DOM的对象，使用的一个虚拟DOM
  - 页面的更新可以先全部反映在js对象上，操作内存中的js对象的速度显然要快多了，不需要重绘与回流
  - 等更新完后，再将最终的js对象映射成真实的DOM，交由浏览器去绘制。

## DIFF算法

> react中通过diff算法来决定如何更新视图中的内容

[官方文档-diff]([diff算法 - 中文文档](https://www.reactjscn.com/docs/reconciliation.html))

### diif算法的举例

- 如果两棵树的根元素类型不同，React会销毁旧树，创建新树

```js
// 旧树
<div>
  张三
</div>

// 新树
<span>
  张三
</span>
```

- 对于类型相同的React DOM 元素，如果仅仅是属性不同，只更新不同的属性

```js
// 旧
<div className="before" title="stuff"></div>
// 新
<div className="after" title="stuff"></div>
只更新：className 属性

// 旧
<div style={{color: 'red', fontWeight: 'bold'}}></div>
// 新
<div style={{color: 'green', fontWeight: 'bold'}}></div>
只更新：color属性
```

- 添加节点的情况

```js
// 旧
<ul>
  <li>first</li>
  <li>second</li>
</ul>

// 新
<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
// 在虚拟DOM中添加 <li>third</li>



// 效率不高
// 旧
<ul>
  <li>a</li>
  <li>b</li>
</ul>
// 新
<ul>
  <li>c</li>
  <li>a</li>
  <li>b</li>
</ul>
// React将改变每一个子节点, 不会保证<li>a</li><li>b</li>不变化
```

- 带key的情况

```js
// 旧
<ul>
  <li key="2015">a</li>
  <li key="2016">b</li>
</ul>

// 新
<ul>
  <li key="2014">c</li>
  <li key="2015">a</li>
  <li key="2016">b</li>
</ul>

// react会根据唯一的key来移动元素
// 在遍历数据时，推荐在使用 key 属性
```

### react中DOM的更新方式

1. 使用虚拟DOM(JavaScript)对象结构表示 DOM 树的结构，根据虚拟DOM渲染出真正的DOM树

1. 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异(diff算法)

1. 把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了

## 参考资料

- [虚拟DOM介绍](https://www.jianshu.com/p/616999666920)

- [如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)



# 组件化

- 组件化思想分析
  - web components
  - 单一职责
- 创建组件语法
  - 函数方式
  - 类方式
- 组件的状态state
- 父组件向子组件传值props
  - 单向数据流
  - 子组件不可以修改props数据

# 组件的生命周期

- componentWillMount 组件挂载之前调用，render()之前调用
- componentDidMount DOM渲染完成后调用，可以用于加载后台数据
- componentDidUpdate 组件更新时触发该方法，初始渲染不调用
- componentWillUnmount 组件被销毁之前一般用于清理工作（定时器timer、网络请求、订阅事件）

# 事件绑定

- 函数名采用驼峰式
- 函数值采用{函数名称}
- 阻止默认行为不可以使用return false
- 事件函数中的this绑定
  - 构造函数中使用bind(this)
  - 声明函数时使用箭头函数
- 函数传参

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

- 子组件向父组件传值

# 条件渲染与循环渲染

- 条件渲染
  - js形式条件渲染
  - 元素变量
  - 行内条件渲染
  - 阻止组件渲染
- 循环渲染
  - 渲染多个元素
  - key只在数组上下文中有含义
  - key在兄弟节点之间必须唯一
  - JSX中可以嵌入map结构

# 表单操作

> 表单元素本身就与别的元素不同，因为天生就包含一些初始状态

- 受控组件与非受控组件
  - 受控组件的数据由React组件控制
  - 非受控组件的数据由DOM控制

# 案例

- 图书管理

# 直接操作DOM

- 什么情况需要直接操作DOM
  - 管理焦点，文本选择或者媒体重放
  - 触发命令式动画
  - 集成第三方DOM库
- ref用法

```
// 构造函数
this.textInput = React.createRef();
// 标签中
<input type="text" ref={this.textInput} />
// 使用
this.textInput.current.focus();
```

# JSX进阶特性

- 点标记的组件用法<MyComponents.DatePicker color="blue"/>
- 动态组件名称
- props值操作
- 组件children





# 





