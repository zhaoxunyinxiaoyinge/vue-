// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//导入vue.js包
import Vue from "vue";
//导入app.vue文件
import Apps from "./App.vue";
//导入vue-resource资源文件包，用于发送服务获取数据；
import Resource from "vue-resource";
//导入vue路由vue-router
import Router from "./router/index.js"
//这里导入的是全局样式，在整个项目的vue文件都可以是使用；
import "./commont/style/index.styl";
Vue.config.productionTip = false;
//A web request service for Vue.js，这个插件是用于发送服务请求的；
Vue.use(Resource);
 //在这里可以看在app.vue页面获取的数据方式；
 new Vue({
    el:'#app',
     //这里是注册路由；这里的路由是在路由文件下index.js下注册的，可以跳到index.js查看
     //组件，可以直接生成虚也dom;
    router:Router,
    //这里是渲染函数来渲染
    render:h => h(Apps)
})