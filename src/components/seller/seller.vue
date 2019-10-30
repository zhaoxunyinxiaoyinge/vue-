<template>
    <div class="seller" ref="seller">
      <div class="seller-wrap">
        <div class="content border-1px">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star"><Star :size="36" :score="seller.score" class="stars"></Star><span class="mount">({{seller.ratingCount}})</span><span class="mounts">月售{{seller.sellCount}}单</span></div>
            <div class="favorite">
                <span @click="toggleFavorite($event)" class="icon-favorite" :class="{active:favorites}"></span>
                <span class="text">{{favoriteText}}</span>
            </div>
        </div>
          <ul class="seller-deatil">
              <li><span class="sever">起送价</span><div><span class="large">{{seller.minPrice}}</span>元</div></li>
              <li><span class="sever">商家配送</span><div><span class="large">{{seller.deliveryPrice}}</span>元</div></li>
              <li><span class="sever">平均配送时间</span><div><span class="large">{{seller.deliveryTime}}</span>分钟</div></li>
          </ul>
          <Split></Split>
          <div class="seller-time">
              <h2>公告时间</h2>
              <p class="bulletin">{{seller.bulletin}}</p>
          </div>
          <ul class="description">
              <li class="items border-top-1px" v-for="item in seller.supports">
                  <span class="img" :class="classMap[item.type]"  ></span>{{item.description}}
              </li>
          </ul>
          <Split></Split>
          <div class="seller-scenry">
              <h2>商家实景</h2>
              <div class="wrapper-list" ref="wrapper">
                  <ul class="pics-list" ref="picsList">
                      <li v-for="item in seller.pics" class="seller-img"><img :src="item" alt=""/></li>
                  </ul>
              </div>
          </div>
          <div class="information">
              <h2>商家信息</h2>
              <ul>
                  <li v-for="item in seller.infos" class="seller-information border-top-1px">{{item}}</li>
              </ul>
          </div>
      </div>
    </div>
</template>

<script>
    import Star from "../../components/star/star"
    import Split from "../../components/split/split"
    import Scroll from "better-scroll"
    export default {
        name: "seller",
        props:{
            seller:Object
        },
        data(){
          return {
            classMap:["first","two","third","four","five","six","seven"],
              favorites:false
          }
        },
        components:{
            Star,
            Split
        },
        computed:{
            favoriteText(){
             return  this.favorites===true ? "已收藏":"未收藏"
            },
            ClassMap(){
                return ["fisrst","two","third","four","five","six","seven"]
        }
    },

        created(){
            this.$nextTick(()=>{
                this.Scroll= new Scroll(this.$refs.seller,{
                    click:true,

                })

            });

                this.$nextTick(()=>{
                    if(this.seller.pics) {
                        let picWidth = 120;
                        let margin = 6;
                        let width = (picWidth + margin) * this.seller.pics.length - margin;
                        this.$refs.picsList.style.width = width + "px";
                        this.picscroll = new Scroll(this.$refs.wrapper, {
                            scrollX: true,
                            eventPassthrough: "vertical"
                        })

                    }

            })
        },
        methods:{
            toggleFavorite(event){
                if(!event._constructed){
                    return;
                }
                this.favorites=!this.favorites
            }
        }
    }
</script>

<style scoped lang="stylus">
    @import "../../commont/style/mixin.styl"
        .seller
            position absolute
            top 174px
            left 0
            bottom 0
            width 100%
            overflow hidden
            .seller-wrap
                .content
                    padding 18px 0
                    margin 0 18px
                    border-1px(7,17,27,0.1)
                    .name
                        color rgb(7,17,27);
                        font-size 14px
                        line-height 14px
                        margin-bottom 8px
                    .star
                        line-height 18px
                        font-size 0
                        .stars
                            display inline-block
                            vertical-align top
                            margin-right 8px
                        .mounts,.mount
                            display inline-block
                            font-size 10px
                            line-height 18px
                            color rgb(77,85,93)
                        .mount
                            display inline-block
                            margin-right 12px
                    .favorite
                        position absolute
                        right 0px
                        top 18px
                        text-align center
                        .icon-favorite
                            display block
                            line-height 24px
                            font-size 24px
                            margin-bottom 4px
                            &.active
                                color rgb(240,20,20)
                        .text
                            color rgb(77,85,93)
                            font-size 10px
                            line-height 10px
                .seller-deatil
                    padding 18px 0
                    display flex
                    li
                      text-align center
                      border-right 1px solid rgba(7,17,27,0.1)
                      flex 1
                    &.last-child
                            border-right none
                      .sever
                          font-size 10px
                          line-height 10px
                          color rgb(147,153,159)
                          margin-bottom 4px
                      div
                        font-size 10px
                        color rgb(7,17,27)
                        line-height 24px
                        .large
                            font-size 24px
                .seller-time
                    padding 18px
                    h2
                        color rgb(7,17,27);
                        font-size 14px
                        line-height 14px
                        margin-bottom 8px
                    .bulletin
                        font-size 12px
                        line-height 24px
                        color rgb(240,20,20)
                        padding 0 12px
                .description
                    padding 0 18px
                    .items
                        padding 16px 12px
                        font-size 12px
                        line-height 16px
                        color rgb(7,17,27)
                        border-top-1px(rgba(7,17,27,0.1))
                        .img
                            width 16px
                            height 16px
                            margin-right 6px
                            background-size 16px 16px
                            vertical-align top
                            display inline-block
                            &.first
                                bg-img("decrease_4")
                            &.two
                                bg-img("discount_4")
                            &.third
                                bg-img("discount_4")
                            &.four
                                bg-img("guarantee_4")
                            &.five
                                bg-img("guarantee_4")
                            &.six
                                bg-img("invoice_4")
                            &.seven
                                bg-img("special_4")
                .seller-scenry
                    padding 18px 0 18px 18px
                    h2
                        color rgb(7,17,27);
                        font-size 14px
                        line-height 14px
                        margin-bottom 12px
                .wrapper-list
                    width 100%
                    overflow hidden
                    .pics-list
                        height 90px
                        white-space nowrap
                        font-size 0
                        .seller-img
                            display inline-block
                            width 120px
                            height 90px
                            margin-right 6px
                            img
                                width 100%
                .information
                    padding 18px 18px 0
                    h2
                        color rgb(7,17,27);
                        font-size 14px
                        line-height 14px
                        margin-bottom 12px
                    .seller-information
                        border-top-1px(rgba(7,17,27,0.1))
                        padding 16px 12px
                        font-size 12px
                        line-height 16px
                        color rgb(7,17,27)

</style>