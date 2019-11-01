// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


//富文本的使用
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)



//axios
import axios from "axios"
Vue.prototype.$axios = axios
axios.defaults.baseURL = "http://localhost:3000/api/"
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
//添加请求拦截器
axios.interceptors.request.use(function (config) {
  console.log('请求拦截器')
  return config;
})
//响应拦截器
axios.interceptors.response.use(function (response){
  console.log('响应拦截器')
  if(response.config.url.indexOf('admin') >= 0){
    //给请求头中添加 Authorization 请求头
   
    let admin =JSON.parse(localStorage.getItem('admin')) 
    if(admin==""||admin==null){
      router.push("/admin/login")
      console.log('未登录用户')
    }else{
      console.log('登录用户')
    }
  }

  return response;
})



//引用qs使axios的post对象序列化
import Qs from 'qs'   //引入方式
Vue.prototype.$qs = Qs  //全局加载






Vue.use(ElementUI);




Vue.config.productionTip = false
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
