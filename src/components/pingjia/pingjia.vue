<template>
    <div class="ratingselect">
        <div class="rating-type border-1px">
            <!--为每个按钮绑定点击事件-->
            <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<i class="count">{{rating.length}}</i></span>
            <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<i class="count">{{positive.length}}</i></span>
            <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<i class="count">{{nagetive.length}}</i></span>
        </div>
        <div class="swicth"  :class="{'on':onlyContent}" >
            <span @click="toggleContent($event)"  class="icon-check_circle"></span>
            <span class="lookRating">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
    const POSITIVE=0;
    const NEGATIVE=1;
    const ALL=2;
    export default {
        name: "pingjia",
        props:{
            //这里的属性传入值从父组件里传入,平且是一个数组
            rating:{
                type:Array,
                default(){
                    return [];
                }
            },
            selectType:{
                type:Number,
                default:ALL,
            },
            onlyContent:{
                type:Boolean,
                default:true
            },
            desc:{
                type:Object,
                default(){
                    return{
                        all:"全部",
                        positive:"满意",
                        negative:"不满意"
                    }
                }
            }

        },
        methods:{
            select(type,event){
                //这里是为了防止桌面浏览器上触发两次点击事件
                if(!event._constructed){
                    return ;
                }
                //这里用于向父组件派发事件
                this.$emit("selects",type);
            },
            toggleContent(event){
                if(!event._constructed){return;}
                //这里是用于向父组件派发一个事件
                this.$emit("toggle");
            }
        },
        computed:{
           positive(){
            return this.rating.filter((ratings)=>{
                return ratings.rateType===POSITIVE
            })
           },
           nagetive(){
               return this.rating.filter((ratings)=>{
                   return ratings.rateType===NEGATIVE;
               })
           }
        }
    }
</script>

    <style scoped lang="stylus">
        @import "../../commont/style/mixin.styl"
    .ratingselect
        .rating-type
            padding 18px 0
            margin 0 18px
            border-1px(rgba(7,17,27,0.1))
            font-size 0
            .block
                display inline-block
                padding 8px 12px
                border-radius 1px
                font-size 12px
                line-height 16px
                margin-right 8px
                color rgb(77,85,93)
                .count
                    font-size 8px
                    line-height 16px
                    font-style normal
                    margin-left 2px
                &.active
                    color #fff
                &.positive
                     background-color rgba(0,160,220,0.2)
                     &.active
                        background-color  rgb(0,160,220)
                &.negative
                    background-color rgba(77,85,93,0.2)
                    &.active
                        background-color rgb(77,85,93)

        .swicth
            padding 12px 18px
            border-bottom 1px solid rgba(7,17,27,0.1)
            color rgb(147,153,159)
            font-size 0
            &.on
                .icon-check_circle
                    color #00c850
            .icon-check_circle
                font-size 24px
                margin-right 4px
                line-height 24px
            .lookRating
                font-size 12px
                vertical-align top
                line-height 24px

    </style>