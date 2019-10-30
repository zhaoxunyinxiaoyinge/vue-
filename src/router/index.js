import Vue from "vue"
import Router from "vue-router"
import goods from "../components/goods/goods"
import ratings from "../components/ratings/ratings"
import seller from "../components/seller/seller"
Vue.use(Router)
const routes=[
    {
        path:'/',
        name:'goods',
        redirect:"/goods"
    },
    {
        path:'/goods',
        name:'goods',
        component:goods
    },
    {
        path:'/ratings',
        name:'ratings',
        component: ratings
    },
    {
        path:'/seller',
        name:'seller',
        component: seller
    }


]
 export default new Router({
    //这里可以设置路由的激活类
    linkActiveClass:"active",
    routes
})

