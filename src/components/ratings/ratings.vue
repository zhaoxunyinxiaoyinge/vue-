<template>
  <div class="ratings" ref="ratings">
        <div class="rating-content" >
            <div class="over-view">
                <div class="view-left">
                    <div class="score">{{seller.score}}</div>
                    <div class="avatage">综合评分</div>
                    <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="view-right">
                    <div class="start-wrapper">
                        <span class="title">服务态度</span>
                        <Star class="star" :size="36" :score="seller.serviceScore"></Star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="start-wrapper">
                        <span class="title">商品评分</span>
                        <Star class="star" :size="36" :score="seller.foodScore"></Star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="score">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <Split></Split>
            <Pingjia @selects="select" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :rating="ratings"></Pingjia>
            <div class="rating-wrapper">
                <ul>
                    <li v-for="item in ratings" v-show="needshow(item.rateType,item.text)" class="items border-1px">
                        <div class="avatar">
                            <img :src="item.avatar" alt="">
                        </div>
                        <div class="content">
                            <div class="name">{{item.username}}</div>
                            <div class="time">{{item.rateTime|format}}</div>
                            <div class="stars"><Star class="star" :size="24" :score="item.score"></Star><span class="arred">{{item.deliveryTime}}分钟送达</span></div>
                            <p class="text">{{item.text}}</p>
                            <div class="recommend">
                                <span :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"></span>
                                <span class="text-recommend" v-for="i in item.recommend">{{i}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
  </div>
</template>
<script>
    import Star from "../../components/star/star"
    import Split from "../../components/split/split"
    import Pingjia from "../../components/pingjia/pingjia"
    import {format} from "../../commont/js/util"
    import Bscroll from "better-scroll"
    const ALL=2;
    export default {
        name: "ratings",
        props:{
             seller:Object,
             arr:Array
         },
        components:{
            Star,
            Split,
            Pingjia,
        },
        filters:{
          format(time){
              var date=new Date(time)
              return format(date,"yyyy-MM-dd hh:mm:ss");
          }
        },
        data(){
            return {
                ratings:[],
                //这里是在父组件中对子组件的值进行的默认值;
                selectType:ALL,
                onlyContent: true,
                desc:{
                    all:"全部",
                    positive:"满意",
                    negative:"不满意"
                }
            }
        },
        methods:{
            select(type) {
                this.selectType = type;
                this.$nextTick(() => {
                    this.scroll.refresh()
                })
            },
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
                    }else {
                        return type === this.selectType
                    }
            }

        } ,
        created(){
            this.$http.get("http://localhost:8080/api/ratings").then((res)=>{
                this.ratings=res.body.data;
                this.$nextTick(()=>{
                    this.scroll=new Bscroll(this.$refs.ratings,{
                        click:true
                    })
                })

            })
        }
    }
</script>

<style scoped lang="stylus">
    @import "../../commont/style/mixin.styl"
    .ratings
        position  absolute
        top 174px
        width 100%
        left 0
        bottom 0
        overflow hidden
        .over-view
            padding 18px 0
            display:flex
            .view-left
                flex 0 0 134px
                border-right 1px solid rgba(7,17,27,0.1);
                display: flex
                flex-direction column
                align-items  center
                @media only screen and (max-width:320px)
                    flex 0 0 120px
                    width 120px
                .score
                    line-height 28px
                    font-size 24px
                    color rgb(255,153,0)
                    margin-bottom 6px
                .avatage
                    font-size 12px
                    line-height 12px
                    color rgb(7,17,27)
                    margin-bottom 8px
                .rankRate
                    font-size 10px
                    line-height 10px
                    color rgb(147,153,159)
                    margin-bottom 6px
            .view-right
                flex 1
                padding-left 24px
                @media only screen and (max-width:320px)
                    padding-left 6px
                .start-wrapper
                    font-size 0
                    margin-bottom 8px
                    .title
                        display inline-block
                        font-size 12px
                        line-height 18px
                        color rgb(7,17,27)
                        margin-right 6px
                        vertical-align top
                    .start
                        display inline-block
                        margin-right 6px
                        vertical-align top
                    .score
                        font-size 12px
                        color rgb(255,153,0)
                        line-height 18px
                        vertical-align top
                .delivery-wrapper
                    font-size 0px
                    .title
                        display inline-block
                        font-size 12px
                        line-height 18px
                        margin-right 6px
                    .score
                          display inline-block
                          font-size 12px
                          line-height 18px
                          color rgb(147,153,159)
        .rating-wrapper
             padding 0 18px
            .items
                display flex
                padding 18px 0
                border-1px(rgba(7,17,27,0.1))
                .avatar
                    flex 0 0 28px
                    width 28px
                    height 28px
                    border-radius 50%
                    margin-right 12px
                    overflow hidden
                    img
                        display block
                        width 100%
                .content
                    position relative
                    flex 1
                    .name
                        margin-bottom 14px
                        font-size 10px
                        line-height 12px
                        color rgb(7,17,27)
                    .time
                        position absolute
                        top 0
                        right 18px
                    .stars
                        font-size 0
                        margin-bottom 6px
                        .star
                            margin-right 6px
                            display: inline-block
                            vertical-align top
                        .arred
                            display inline-block
                            vertical-align top
                            font-size 10px
                            line-height 12px
                            color rgb(147,153,159)
                    .text
                        font-size 12px
                        line-height 18px
                        color rgb(7,17,27)
                        margin-bottom 8px
                    .recommend
                        font-size 0
                        .icon-thumb_up,.icon-thumb_down
                            display inline-block
                            font-size 12px
                            line-height 16px
                            color rgb(0,160,220)
                            margin-right 8px
                            vertical-align top
                        .icon-thumb_down
                            color #b7bbbf
                        .text-recommend
                            display inline-block
                            font-size 9px
                            line-height 18px
                            background-color rgb(255,255,255)
                            border-radius 2px
                            border 1px solid rgba(7,17,27,0.1)
                            margin-right 8px
                            color rgb(147,153,159)
                            padding: 0 6px
                            margin-bottom 10px


</style>