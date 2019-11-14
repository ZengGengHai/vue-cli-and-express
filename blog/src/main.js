// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import App from './App'
import router from './router'

//ElementUI
//  import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

//格式化时间
// import moment from 'moment'
Vue.prototype.$moment=moment  //全局加载

//富文本的使用
import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)



//axios
// import axios from "axios"
Vue.prototype.$axios = axios


// axios.defaults.headers['Content-Type']='application/x-www-form-urlencoded'
axios.defaults.baseURL = "https://blog.zenggenghai.cn/api/"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
//添加请求拦截器
axios.interceptors.request.use(function (config) {
  console.log('axios请求拦截器')
  // console.log(config)
  console.log(router.history.current.fullPath)
  if(router.history.current.fullPath.indexOf('admin') >= 1){
    console.log('后台页面发送的请求')
    if(router.history.current.fullPath.indexOf('admin_login') >= 1){
      console.log('登录页面')
  
    }else{
      console.log('不是登录页面,fwt验证,请求是携带headers.Authorization.token')
      config.headers.Authorization = localStorage.getItem('token')
      console.log('headers携带验证信息')
    }
  }else{
    console.log('来自前台页面请求')
  }
 
 
  return config;
})
//响应拦截器
axios.interceptors.response.use(function (response){
  // console.log('axios响应拦截器',response)
  // console.log(response)
  if(response.status === 200){
    if(response.data.code === -2 && response.data.msg === "token无效"){
      console.log('token无效')
      localStorage.removeItem('token')
      router.push("/admin/login")
    }

  }
  return response;
})


//引用qs使axios的post对象序列化
// import Qs from 'qs'   //引入方式
Vue.prototype.$qs = Qs  //全局加载



router.beforeEach((to, from, next) => {
    
      let goToPath = to.path
      console.log(goToPath)

      if(goToPath.indexOf('admin') >= 1){
        if(goToPath.indexOf('login')>=1){
          console.log('vue-router路由守卫使用:登录页面，暂时不需要验证身份')
          next();
        }else{
          console.log('vue-router路由守卫使用:进入后台页面，需要验证身份，先进行简单的验证：是否有token')
          if(localStorage.getItem('token')){
            
            next();
          }else{
            console.log('无token')
            alert('请登录后再访问');
            next({
              path:'/admin/login'
            });

          }
         
        }
      }else{
          console.log("vue-router路由守卫使用:非后台页面，不用验证身份")
          next();
      }
      
     
   
});








Vue.config.productionTip = false
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})




// "axios": "^0.19.0",
// "element-ui": "^2.12.0",
// "highlight.js": "^9.15.10",
// "marked": "^0.7.0",
// "vue": "^2.5.2",
// "vue-quill-editor": "^3.0.6",
// "vue-router": "^3.0.1"