import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Header from "@/components/Header"
import Home from "@/components/Home"
import About from "@/components/about/About"

import Note from "@/components/article/note"
import Article from "@/components/article/Article"

import  AdminHome from "@/components/admin/home/Home"
import  AdminLogin from "@/components/admin/login/Login"
import  DataBases from "@/components/admin/databases/Index"
import  TableModule from "@/components/admin/databases/TableModule"
import AdminTable from "@/components/admin/databases/Admin"

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect:"/index"
    },
    {
      path: '/index',
      name: 'index',
      components: {
        header:Header,
        main:Home
      }
    },
    {
      path: '/about',
      name: 'about',
      components: {
        header:Header,
        main:About
      }
    },
    {
      path: '/note',
      name: 'note',
      components: {
        header:Header,
        main:Note
      }
    },
    {
      path: '/article/:id',
      name: 'article',
      components: {
        header:Header,
        main:Article
      }
    },
    // 后台页面
    {
      path: '/admin',
      name: 'admin',
      components: {
        admin:AdminHome
      },

      children:[
        {path:'databases',component:DataBases,
        children:[
          {path:'table/:id',component:TableModule},
          {path:'admin',component:AdminTable}
        ]
      }
    
      ]
    },
    // 后台登录页面
    {
      path: '/admin/login',
      name: 'login',
      components: {
        admin:AdminLogin
      
      }
    }
   
    
  ]
})

//防止重复点击两次
const originalPush = Router.prototype.push
Router.prototype.push = function push (location){
  return originalPush.call(this,location).catch(err=>err)
}



export default router
