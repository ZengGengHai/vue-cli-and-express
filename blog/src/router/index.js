import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Header from "@/components/Header"
import Home from "@/components/Home"
import About from "@/components/about"
import Note from "@/components/note"
import Article from "@/components/Article"


Vue.use(Router)

export default new Router({
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
    }

  ]
})
