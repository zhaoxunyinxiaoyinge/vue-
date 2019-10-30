<template>
  <div id="app">
    <!--这里绑定的是一个属性传值的过程，这里给子组件seller赋值-->
    <v-header :seller="seller"></v-header>
    <!--这里有一个1像素边框的特效（commont/style/mixin下面设置的）-->
    <div class="tab border-1px">
      <div class="tab-item">
      <router-link to="/goods">商品</router-link>
    </div>
      <div class="tab-item">
      <router-link to="/ratings">评论</router-link>
    </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <!--这里是路由的使用方法，代表路由的内容;-->
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import  Head from "./components/header/header.vue"
  //这里在常用js模块里面写的，现在只不过将其导入进来了!注意导入的方法
  //下面是总结接:原生的es6的导出和导入的方法(import,export,其中的导出名和导入名必须一致，如果想用其他的名，那么必须{name as 设置名})
  //也可以用{}形式导出多个，在导入的时候也可用* as obj导入多个；
  import  {urlParse} from "./commont/js/util"
  export default {
      name:"app",
      data(){
          return {
              seller:{
                  id:(()=>{
                      let fun=urlParse();
                      return fun.id
                  })()
              },

          }
      },
      components:{
          "v-header":Head,

      },
      //生命周器函数
      created(){
          //这里就是用到了vue-rescoruce插件作为服务；
          this.$http.get("http://localhost:8080/api/seller?id="+this.seller.id).then((response)=>{
            //注意这里的返回值不再是json,而是一个对像，在body下才是json数据
              response=response.body;
            this.seller=Object.assign({},this.seller,response.data)
            console.log(this.seller.id)
          })
      }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "./commont/style/mixin.styl"
  #app
    .tab
      display :flex
      width :100%
      height 40px
      line-height 40px
      border-1px(#f2f2f2)
      .tab-item
        text-align :center
        flex:1
        text-decoration:none
        &>a
          text-decoration none
          display:block
          font-size:14px
          color:rgb(77,85,93)
          &.active
            color: rgb(240,20,20)

</style>
