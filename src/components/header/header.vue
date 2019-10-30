<template>
    <div id="head">
        <div class="content-wrapper">
            <div class="avatar"> <!--在vue中不能直接使用src,会报错的-->
                <img width="64" height="64" :src="seller.avatar"/>
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="dercstion">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <!--这里加if的原因是异步的原因，这里的数据没有获取到-->
                <div v-if="seller.supports" class="supports">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>

            </div>
            <div v-if="seller.supports" class="supports-count" @click="setMal">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
         </div>
        <div class="blackground">
            <img :src="seller.avatar" width="100%" height="100%" alt=""/>
        </div>
        <!--这里有一个动画是vue2的普通过渡效果-->
        <transition name="fade">
            <div class="modal" v-show="showMal">
            <div class="detail-wrap clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star-wrap">
                        <!--这里是星星组件-->
                        <Star :size="48" :score="seller.score"></Star>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul class="supportss">
                      <li class="supportss-item" v-for="(item,index) in seller.supports">
                          <span class="supportss-img" :class="classMap[index]"></span>
                          <span class="supportss-text">{{item.description}}</span>
                      </li>
                    </ul>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="details-content">
                        <p class="details-text">{{seller.bulletin}}</p>
                    </div>
                </div>
            </div>
            <div class="detail-close" @click="closeMal">
                <i class="icon-close"></i>
            </div>
        </div>
        </transition>
    </div>
</template>

<script>
    import Star from "../star/star"
    export default {
        name: "headers",
        props: {
            seller: {
                type: Object
            }
        },
        data:function(){
        return {
            //这里对应的属性值是控制首页的蒙城的实现,分别被事件引用；
            showMal:false,
        }
    },
        methods:{
            setMal:function () {
                this.showMal=true
            }
            ,
            closeMal:function () {
                this.showMal=false
            }
        },
        created(){
            //这里主要用到了:class类的插值语法；
            this.classMap=["decrease","discount","guarantee","invoice","special"]
        },
        components:{
           Star
        }

    }
</script>
<style lang="stylus" scoped>
    //这是 相对于引入css时候的写法；
    @import "../../commont/style/mixin.styl"
    #head
        color: #fff
        position relative
        background rgba(7,17,27,0.5)
        overflow hidden
        .content-wrapper
            padding: 24px 12px 18px 24px
            position relative
            .avatar
                display inline-block
                border-radius 2px
            .content
                display: inline-block
                font-size 12px
                margin-left 16px
                .title
                    margin: 2px 0px 8px 0px
                    .brand
                        width: 30px;
                        height: 18px;
                        display inline-block
                        /*这里是直接引样式函数*/
                        bg-img("brand")
                        background-size 30px 18px
                        vertical-align top
                    .name
                        margin-left: 6px
                        font-size: 16px
                        line-height 18px
                        font-weight bold
                .dercstion
                        line-height 12px
                        font-size 12px
                        margin-top 8px
                        margin-bottom 10px
                .supports
                    .icon
                        display inline-block
                        width 12px
                        height 12px
                        margin-right 4px
                        background-size 12px 12px
                        background-repeat no-repeat
                        vertical-align middle
                        /*这里主要是跟classMap来对应的*/
                        &.decrease
                            bg-img("decrease_1")
                        &.discount
                            bg-img("discount_1")
                        &.guarantee
                            bg-img("guarantee_1")
                        &.invoice
                            bg-img("invoice_1")
                        &.special
                            bg-img("special_1")
                    .text
                        font-size 10px
                        line-height 12px
            .supports-count
                position absolute
                height 24px
                line-height 24px
                border-radius 14px
                padding 0 8px
                right 12px
                bottom 15px
                background-color rgba(0,0,0,0.2)
                text center
                .count
                    font-size 10px
                    vertical-align top
                .icon-keyboard_arrow_right
                    font-size 10px
                    margin-left 2px
        .bulletin-wrapper
            height:28px
            line-height 28px
            padding:0 22px 0 12px
            background-color rgba(7,17,27,0.2)
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            position relative
            .bulletin-title
                display inline-block
                height:12px
                width 22px
                bg-img("bulletin")
                background-size 22px 12px
                background-repeat no-repeat
                vertical-align middle
            .bulletin-text
                margin-left :4px
                font-size 10px
                color:#fff
            .icon-keyboard_arrow_right
                position absolute
                right 12px
                top 12px
                font-size 10px
        .blackground
            position: absolute
            left 0
            top 0
            width 100%
            height 100%
            z-index -1
            filter blur(10px)
        .modal
            /*注意固定定位相对于body定位的*/
            position:fixed
            left:0
            top 0
            width 100%
            height:100%
            z-index 60
            overflow auto
            opacity 1
            backdrop-filter blur(10px)
            background-color rgba(7,17,27,0.8)
            &.fade-enter,&.fade-leave-active
                opacity 0
                background-color rgba(7,17,27,0)
            &.fade-enter-active,&.fade-leave-active
                transition all 0.5s
            .detail-wrap
                width 100%
                min-height 100%
              .detail-main
                margin-top 64px
                padding-bottom 32px
                .name
                 font-size 16px
                 font-weight 700
                 line-height 16px
                 text-align center
                .star-wrap
                    text-align center
                    margin-top  16px
                    margin-bottom 28px
                .title
                    width 80%;
                    margin 0 auto 18px
                    display: flex
                    .text
                        padding:0 12px
                        font-size 14px
                        font-weight 700
                        line-height 14px
                    .line
                        flex 1
                        position relative
                        top 4px
                        height 1px
                        border-bottom:1px solid rgba(255,255,255,0.2)
                .supportss
                    width:80%
                    margin 0 auto 28px
                    .supportss-item
                        padding:0 12px
                        margin-bottom 12px
                        &last-child
                            margin-bottom 0
                        .supportss-img
                            display inline-block
                            width 16px
                            height 16px
                            margin-right 6px
                            background-size 16px 16px
                            background-repeat no-repeat
                            vertical-align middle
                            &.decrease
                                bg-img("decrease_2")
                            &.discount
                                bg-img("discount_2")
                            &.guarantee
                                bg-img("guarantee_2")
                            &.invoice
                                bg-img("invoice_2")
                            &.special
                                bg-img("special_2")
                .details-content
                    width 80%
                    margin 24px auto 0
                    .details-text
                        padding 0 12px
                        font-size 12px
                        line-height 24px

            .detail-close
                position relative
                font-size 32px
                color  rgba(255,255,255,0.5)
                margin -32px auto 0 auto
                clear both
                text-align center
                width 32px
                height 32px


</style>
