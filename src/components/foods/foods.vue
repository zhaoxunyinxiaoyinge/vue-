<template>
    <div>
        <transition name="goo">
            <div v-show="flag" class="foods" ref="foods">
                    <div class="food-content">
                        <div class="image-header">
                            <img :src="foods.image" alt="">
                            <div class="backTo" @click="hide">
                                <i class="icon-arrow_lift"></i>
                            </div>
                        </div>
                        <div class="content">
                            <h1 class="title">{{foods.name}}</h1>
                            <div class="details">
                                <span class="selle-count">月售{{foods.sellCount}}份</span>
                                <span class="rating">好评率{{foods.rating}}%</span>
                            </div>
                            <div class="prices">
                                <span class="price">￥{{foods.price}}</span><span v-if="foods.oldPrice" class="lowerprice">￥{{foods.oldPrice}}</span>
                            </div>
                            <div class="control-wapper">
                                <CarShop :foods="foods"></CarShop>
                            </div>
                            <transition name="buyfade"><div class="buy" @click="add($event)" v-show="!foods.count||foods.count===0">加入购物车</div></transition>
                        </div>
                        <Split></Split>
                        <div class="info" v-show="foods.info">
                            <h1>商品信息</h1>
                            <p>{{foods.info}}</p>
                        </div>
                        <split></split>
                        <div  class="ratings">
                            <h1 class="title">商品评价</h1>
                            <Pingjia @selects="select" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :rating="foods.ratings"></Pingjia>
                            <div class="rating-wrapper">
                                <ul v-show="foods.ratings&&foods.ratings.length">
                                    <li v-show="needshow(rating.rateType,rating.text)" v-for="rating in foods.ratings" class="item-rating border-1px">
                                        <div class="user">
                                            <span class="name">{{rating.username}}</span>
                                            <span class="avatar"><img src="./../../../static/1.jpg" alt=""></span>
                                        </div>
                                        <div class="timer">{{rating.rateTime|formats}}</div>
                                        <p class="text"><span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}</p>
                                    </li>
                                </ul>
                                <div class="no-rating" v-show="!foods.ratings||(foods.ratings.length===0)">暂无评价</div>
                            </div>
                        </div>
                    </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import  Vue from "vue"
    import Bscroll from "better-scroll"
    import CarShop from "./../cartShop/cartShop"
    import  Split from "./../split/split"
    import  Pingjia from "./../pingjia/pingjia"
    import {format} from "../../commont/js/util";
    const POSITIVE=0;
    const NEGATIVE=1;
    const ALL=2;

    export default {
        name: "foods",
        props:{
            foods:{
                type:Object
            }
        },
        components:{
          CarShop,
          Split,
         Pingjia,
    },
        data(){
            return {
                flag:false,
                //这里是在父组件中对子组件的值进行的默认值;
                selectType:ALL,
                onlyContent: true,
                desc:{
                    all:"全部",
                    positive:"推荐",
                    negative:"吐槽"
                }
            }
        },
        filters:{
            formats(time){
                let date=new Date(time);
                return format(date,"yyyy-MM-dd hh:mm");
            }
        },
        methods:{
            //这里的方法是可以被父组件调用的;子组件不能调用父组件的方法
            show:function(){
              this.flag=true;
              //这里设置的是页面开始显示的时候设置以下属性的值;
                //表示在当前选择的件元素是这个元素；
               this.selectType=ALL
                //这里表示显示的是显示所有内容；
                this.onlyContent=true;
              this.$nextTick(()=>{
                  //判断这个对象是否曾在
                  if(!this.scroll){
                      this.scroll=new Bscroll(this.$refs.foods,{
                          click:true
                      })
                  }else{
                      //重新计算
                      this.scroll.refresh()
                  }

              })

            },
            hide(){
                this.flag=false;
            },
            add(event){
                if(!event._constructed){
                    return false;
                }
                Vue.set(this.foods,"count",1);
            },
            //这里是子组件里面的事件在父组件触发
            select(type){
                this.selectType=type;
                this.$nextTick(()=>{
                    this.scroll.refresh()
                })
            },
            //这里的是子组件的事件在父组件触发
            toggleContent(){
                this.onlyContent=!this.onlyContent;
                this.$nextTick(()=>{
                    this.scroll.refresh()
                })
            },
            needshow(type,text){
                if(this.onlyContent&&!text){
                    return false
                }
                if(this.selectType===ALL){
                    return true
                }else{
                    return type===this.selectType
                }
            }
        }
    }
</script>
<style scoped lang="stylus">
    @import "./../../commont/style/mixin.styl"
        .foods
            position fixed
            left 0
            bottom 48px
            top 0
            width 100%
            z-index 30
            background-color #fff
            transform translate3d(0,0,0);
            &.goo-enter,&.goo-leave-active
               transform  translate3d(100%,0,0)
            &.goo-enter-active,&.goo-leave-active
                transition all 0.5s
            .image-header
                position relative
                width 100%
                height 0
                padding-top  100%
                img
                    position absolute
                    top 0
                    left 0
                    width 100%
                    height 100%
                .backTo
                    position absolute
                    left 0
                    top 10px
                    .icon-arrow_lift
                        display block
                        padding 10px
                        font-size 20px
                        color #fff
            .content
                position relative
                padding 18px
                .title
                    font-size 14px
                    font-weight 800
                    line-height 14px
                    color rgb(8,18,28)
                    margin-bottom 8px
                .details
                    margin-bottom 18px
                    line-height 18px
                    font-size 0
                    .selle-count,.rating
                        font-size 10px
                        color rgb(147,153,159)
                    .selle-count
                        margin-right 12px
                .price
                    font-size 14px
                    line-height 24px
                    font-weight 700
                    color rgb(240,20,20)
                    margin-right 8px
                .lowerprice
                    font-size 10px
                    color rgb(147,153,159)
                    line-height 24px
                    text-decoration line-through
                .control-wapper
                    position absolute
                    right 12px
                    bottom 18px
                .buy
                    position absolute
                    bottom 18px
                    right 18px
                    width 70px
                    height 24px
                    line-height 24px
                    color #FFFFFF
                    background-color rgb(0,160,220)
                    border-radius 12px
                    font-size 10px
                    text-align center
                    z-index 12
                    opacity 1
                    &.buyfade-enter,&.buyfade-leave
                        opacity 0
                        z-index  -1
                    &.buyfade-enter.active,&.buyfade-leave-active
                        transition all 0.2s
            .info
                padding 18px
                h1
                 font-size 14px
                 color #07111b
                p
                 margin 6px 8px 0
                 font-size 12px
                 font-weight 200
                 line-height 24px
                 color rgb(77,85,93)
            .ratings
                padding-top 18px
                .title
                    font-size 14px
                    font-weight 700
                    line-height 24px
                    color rgb(7,17,27)
                    margin-left 18px
                .rating-wrapper
                    padding 0 18px
                    .item-rating
                        position relative
                        padding 16px 0
                        border-1px(rgba(7,17,27,0.1))
                        .user
                            position absolute
                            right 0
                            top 16px
                            font-size 0
                            line-height 12px
                            .name
                                display inline-block
                                font-size 10px
                                line-height 12px
                                color rgb(147,153,159)
                                margin-right 6px
                                vertical-align top
                            .avatar
                                display inline-block
                                width 12px
                                height 12px
                                border-radius 6px
                                overflow hidden
                                img
                                    width 12px;
                                    height 12px
                            .time
                                font-size 10px
                                line-height 12px
                                color rgb(147,153,159)
                                margin-bottom 6px
                        .text
                            line-height 16px
                            font-size 12px
                            color rgb(7,17,27)
                            display inline-block
                            .icon-thumb_up,.icon-thumb_down
                                font-size 12px
                                line-height 24px
                                margin-right 4px
                            .icon-thumb_up
                                color rgb(0,160,220)
                            .icon-thumb_down
                                color rgb(147,153,159)
                    .no-rating
                        font-size 12px
                        padding:16px 0
                        color rgb(7,17,27)


</style>