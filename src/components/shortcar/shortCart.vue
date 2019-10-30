<template>
<div>
    <div class="shortcart" @click="toggle">
        <div class="short-left">
            <div class="logo" >
                <!--这里主要是在购物车的数量大于零时，给购物车添加高亮-->
                <div class="logo-content" :class="{hightlogo:totalCount>0}">
                    <span class="icon-shopping_cart text"></span>
                </div>
                <div class="number" v-show="totalCount>0">{{totalCount}}</div>
            </div>
            <div class="price" :class="{hight:totalCount>0}">
                ￥{{totals}}
            </div>
            <div class="minPrice" >
                另需配送费{{giveMoney}}元
            </div>
        </div>
        <div class="short-right" :class="enmoney" @click.stop.prevent="pay">
            {{totalMoneys}}
        </div>
        <transition name="toggle">
            <div class="showcart-list" v-show="listShow" @click.stop.prevent="">
                <div class="list-header">
                    <h1 class="title">购物车</h1>
                    <span class="empty" @click="clear">清空</span>
                </div>
                <div class="list-content" ref="content">
                    <ul>
                        <!--默认是空值!-->
                        <li class="food" v-for="food in selectfood">
                            <span class="name">{{food.name}}</span>
                            <div class="price">
                                <span>￥{{food.price*food.count}}</span>
                            </div>
                            <div class="cartControl-wrapper">
                                <!--这里是引用按钮组件,传入的是每个物品项对应的值-->
                                <CartShop :foods="food"></CartShop>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>

    </div>
    <div>
        <transition name="fade">
            <div class="mask" @click="toggles" v-show="listShow"></div>
        </transition>
    </div>
</div>
</template>

<script>
    import CartShop from "../cartShop/cartShop";
    import Sroll from "better-scroll"
    export default {
        name: "shortCart",
        components: {CartShop},
        props:{
            seller:{
             type:Object,
            },
            //在购物车中首先是我们需要一个数组，用来对购物车进行联动；因为每个商品需要保存在里面，这样方便计算
            selectfood:{
                type:Array,
                default(){
                    return[
                        {
                            price:0,
                            count:0
                        }
                    ]
                }
            }

            },
        data(){
         return{
             //这里默认的是显示的是true,不过到listshow的返回值是false
             fold:true
         }
        },
        computed:{
            listShow(){
              //  如果在购物车没有订购物品，那么就是false;
              if(!this.totalCount) {
                  this.fold = true
                  return false
              }else{
                  //假如你选择了商品，但是我们不能让他自动显示出来，必须，在点击时候显示出来，
                  //那么点击得的时候，就是fold值给自己取反值；
                  let show=!this.fold;
                  if(show){
                      //在更新完数据后再更新dom;
                      this.$nextTick(()=>{
                          if(!this.scroll){
                          //这里的滚动元素必须是包过里面的元素;
                          this.scroll=new Sroll(this.$refs.content,{
                              click:true
                          })}else{
                              this.scroll.refresh()
                          }
                      })
                  }
                  return show;
              }

            },
            totals:function(){
                let total=0;
                this.selectfood.forEach((item)=>{
                    total+=item.price*item.count
                });
                return total;
            },
            totalCount:function(){
               let count=0;
               this.selectfood.forEach((item)=>{
                    count+=item.count
               })

                return count
            },
            totalMoneys:function () {
                if(this.totalCount===0){
              return `￥${this.seller.minPrice}元起送`;
                }else if( this.totals<20){
                  return `还差￥${20-this.totals}元起送`
                }else{
                    return "请结算"
                }

            },
            //这里的计算属性对应的是一个类的三种转态；
            enmoney(){
                    if(this.totals>=20){
                    return "Money"
             }else if(0<this.totals && this.totals<20){
                      return "noMoney"
                    }
            else if(this.totals===0){
                       return ;
                    }

                    },
            giveMoney(){
                if(this.totals>0){
                    return this.totalCount*4
                }else if(this.totals===0){
                    return 4;
                }
            }
            },
        methods:{
            toggle:function(){
                //如果购物车没东西，再怎么点击也是没效果；
                if(!this.totalCount){
                    return ;
                }
                //这里是对取值取反；可以有一个折叠效果，这里的fold改变的是
                this.fold =!this.fold
            },
            pay(){
                if(this.totals<this.seller.minPrice){
                    return;
                }
                window.alert("请付钱啊，小帅哥!")
            },
            //点击购物车栏发生的事件，就是将蒙层显示出来；
            toggles(){
                //这里设置的属性值，是在点击蒙层时，关闭蒙层;所以要设置为true；
                this.fold=true
            },
            clear(){
                this.selectfood.forEach((food) => {
                    food.count = 0;
                });
            }


        }

        }
</script>

<style scoped lang="stylus">
    @import "../../commont/style/mixin.styl"
        .shortcart
            width 100%
            height 48px
            position fixed
            left 0
            bottom 0
            z-index 50
            display flex
            .showcart-list
                transform translate3d(0,-100%,0)
                position absolute
                z-index -1
                top 0
                left 0
                width 100%
                &.toggle-enter,.toggle-leave-active
                    transform translate3d(0,0,0)
                &.toggle-enter-active,.toggle-leave-active
                    transition all 0.5s
                .list-header
                    height 40px
                    line-height 40px
                    padding 0 18px
                    background-color #f3f5f7
                    border-bottom 1px solid rgba(7,17,27,0.1)
                    .title
                        float left
                        font-size 14px
                        color:rgb(7,17,27)
                    .empty
                        float right
                        font-size 12px
                        color: rgb(0,130,220)
                .list-content
                    padding 0 18px
                    max-height 217px
                    overflow hidden
                    background-color #FFFFFF
                    .food
                        position relative
                        padding 12px 0
                        box-sizing border-box
                        border-1px(rgba(7,17,27,0.1))
                        .name
                            line-height 24px
                            font-size 14px
                            color rgb(7,17,27)
                        .price
                            position absolute
                            right 90px
                            bottom 12px
                            line-height 24px
                            font-size:14px
                            font-weight 700
                            color rgb(240,20,20)
                        .cartControl-wrapper
                            position absolute
                            right 0
                            bottom 12px

            .short-left
                flex 1
                background-color #141d27
                font-size 0
                .logo
                    display inline-block
                    position relative
                    box-sizing border-box
                    top -10px
                    width 53px
                    height 53px
                    border-radius 50%
                    background-color #141d27
                    margin 0 16px
                    padding 6px
                    .number
                        position absolute
                        background-color red
                        text-align center
                        width 25px
                        height 20px
                        border-radius 15px
                        line-height 20px
                        font-size 12px
                        z-index 20px
                        right 0px
                        top -0px
                        color: #fff
                        box-shadow 0 4px 8px 0 rgba(0,0,0,.4)
                    .logo-content
                        width 41px
                        height 41px
                        border-radius 50%
                        background-color rgba(255,255,255,0.4)
                        text-align center
                        &.hightlogo
                            background-color rgb(0,160,220)
                            .text
                                color: #fff
                        .text
                            font-size 24px
                            color rgba(255,255,255,0.4)
                            line-height 41px
                .price
                    display inline-block
                    border-right 1px solid rgba(255,255,255,0.1)
                    padding-right 12px
                    font-weight 700
                    font-size:16px
                    color rgba(255,255,255,0.4)
                    vertical-align top
                    line-height 24px
                    margin 12px 0 12px 0
                    &.hight
                     color:#fff
                .minPrice
                    display inline-block
                    vertical-align top
                    box-sizing border-box
                    line-height 48px
                    padding 0 12px
                    color rgba(255,255,255,0.4)
                    font-size 12px
                    font-weight 700
            .short-right
                flex 0 0 105px
                box-sizing border-box
                line-height 48px
                font-size 12px
                color rgba(255,255,255,0.4)
                background-color #2b333b
                text-align center
                pading:0 8px
                font-weight 700
                &.noMoney
                    background-color #2b333b
                &.Money
                    background-color #00fa00
                    color #fff
    .mask
        position fixed
        top 0
        left 0
        width 100%
        height 100%
        z-index 40
        backdrop-filter blur(10)
        opacity: 1
        background: rgba(7, 17, 27, 0.6)
        &.fade-enter,.fade-leave-active
            background-color rgba(7,17,27,0.6)
            opacity 0
        &.fade-enter-active,.fade-leave-active
            transition all 0.5s linear



</style>