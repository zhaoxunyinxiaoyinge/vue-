<template>
    <div class="foods">
        <!--这里的ref="ment"通常在实例化中用到，一般用在要滚动的元素的副元素上-->
        <div class="menu-wrapper" ref="ment" >
            <ul>
                <li class="items border-1px" @click="selectMenu(index,$event)" v-for="(item,index) in goods" :class="{'current':currentIndex===index}" >
                    <span class="text">
                       <span v-show="item.type>0" :class="classMap[index]" class="text-img"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foods">
            <ul>
                <li class="foods-items food-list-hoke" v-for="(item,index) in goods" >
                    <h2>{{item.name}}</h2>
                    <ul>
                        <li class="foods-list" v-for="items in item.foods" @click.stop="selectFsood(items,$event)">
                            <div class="foods-list-img">
                                <img :src="items.icon" alt=""/>
                            </div>
                            <div class="foods-content">
                                <p class="name">{{items.name}}</p>
                                <p class="names" v-if="items.description">{{items.description}}</p>
                                <p><span class="mount">月销量{{items.sellCount}}份</span><span class="haoping">好评率{{items.rating}}%</span></p>
                                <p><span class="price">￥{{items.price}}</span><span v-if="items.oldPrice" class="lowerprice">￥{{items.oldPrice}}</span></p>
                                <div class="carShops"><Carts :foods="items"></Carts></div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <Shortcart :selectfood="selectfood" :seller="seller"></Shortcart>
        <div>
            <Food :foods="selectfoods" ref="food"></Food>
        </div>
    </div>
</template>
<script>
    import Suboor from "better-scroll"
    import Shortcart from "../shortcar/shortCart"
    import Carts from "../cartShop/cartShop"
    import Food from "../foods/foods"
    export default {
        props:{
            seller:{
            type:Object
            }
        },
        name: "goods",
        components:{
            Shortcart,
            Carts,
            Food
        },
        data(){
                return{
                    //因为得到的是从本地服务器加载的goods数据
                    goods:[],
                    listHeight:[],
                    scrollY:0,
                    selectfoods:{}
                }
            },
        created(){
            //这里本地服务器发送一个请求获取数据；goods数据
            this.$http.get("http://localhost:8080/api/goods").then((res)=>{
                this.goods=res.body.data
                //在获取数据后再更新dom后再计算高度
                this.$nextTick(function(){
                    this._instict();
                    this._calculateHeight()
                })
            })
            this.classMap=["decrease","discount","guarantee","invoice","special"]

        },
        computed:{
            //这里的计算方法是为了将左边和右边进行映射；
            currentIndex(){
                for(let i=0;i<this.listHeight.length;i++){
                    //当前的值;
                    let height1=this.listHeight[i];
                    //后面的值，方便比较;
                    let height2=this.listHeight[i+1];
                    //height2在最后一个的时候是udefined，
                    if(!height2||(this.scrollY>=height1 && this.scrollY<height2)){
                        return i;
                    }

                }
                return 0


            },
            //这用来映射购物车栏目的，这样才能进行联动；
            selectfood(){
                let food=[];
                //对从服务端获取的foods数据，进行循环，
                this.goods.forEach((items)=>{
                   // 可以找到种没个对象数组，
                   items.foods.forEach((item)=>{
                     //在每个数组对像下面有一foods属性，下面也是一个数组;
                     if(item.count) {
                     //判断是否有数组，如果有的话，就添加进去;
                         food.push(item)
                }

                   })

                })
                return food
            }
        },
        methods:{
            //注意传入了的当前的索引值
            selectMenu(index,event){
                //屏蔽浏览器的事件
                if(!event._constructed){return ;}
                let foodList = this.$refs.foods.getElementsByClassName('food-list-hoke');
                //找到左边要滚动的元素
                let el = foodList[index]
                //调用better-sroll的实例方法，将元素滚动到指定的位置；
                this.foodScroll.scrollToElement(el, 300);
            }
            ,
            _instict(){
                //这里是在修直的方向实例化个better-scroll;
                this.menuScroll=new Suboor(this.$refs.ment,{
                    //这里会自动有一个事件，在pc端容易触发两次事件；
                    click:true
                });
                this.foodScroll=new Suboor(this.$refs.foods,{
                    //这是better-scroll相当于探针的作用，让它告诉我们位置
                    probeType:3,
                    click:true
                });
                //监听在这滚动条上的监听事件，获取在y抽的距离;
                this.foodScroll.on("scroll",(pos)=>{
                    this.scrollY=Math.abs(Math.round(pos.y));
                })

            },
            _calculateHeight(){
                //这里是为了获取.foods-wrapper的元素下面的每个元素的元素高度
                let foodlist=this.$refs.foods.getElementsByClassName("food-list-hoke");
                let heights=0;
                this.listHeight.push(heights);
                for(let i=0;i<foodlist.length;i++){
                    heights+=foodlist[i].clientHeight;
                    this.listHeight.push(heights);
                }
                console.log(this.listHeight);

            },
            selectFsood(items,event){
                if(!event._constructed){
                    return ;
                }
                //这里是把循环遍历的每一个元素赋值给selectfood这个变量
                this.selectfoods=items
            // 在这里我开始调用子组件Food的方法;
                this.$refs.food.show();
            }
        }

    }
</script>

<style scoped lang="stylus">
    @import "../../commont/style/mixin.styl"
        .foods
            position absolute
            width 100%
            top 174px
            bottom 64px
            overflow hidden
            display flex
            .menu-wrapper
                flex 0 0 80px
                width 80px
                background-color #f3f5f7
               .items
                 display table
                 height 54px
                 width 56px
                 padding 0 12px
                 border-1px(rgba(7,17,27,0.1))
                 color #696c70
                 &.current
                    position relative
                    z-index 10
                    margin-top -1px
                    background-color #fff
                    font-weight 700
                    border-none()

                 .text
                    display table-cell
                    vertical-align middle
                    font-size 12px
                    line-height 14px
                    .text-img
                           display inline-block
                           width 12px
                           height 12px
                           margin-right 4px
                           background-size 12px 12px
                           background-repeat no-repeat
                           vertical-align middle
                           &.decrease
                               bg-img("decrease_3")
                           &.discount
                               bg-img("discount_3")
                           &.guarantee
                               bg-img("guarantee_3")
                           &.invoice
                               bg-img("invoice_3")
                           &.special
                               bg-img("special_3")
            .foods-wrapper
                flex 1
                h2
                  height 28px
                  padding-left 12px
                  line-height 28px
                  border-left 2px solid #d9dde1
                  background #f3f5f7
                  font-size 12px
                  color rgb(147,153,159)
                .foods-list
                    display flex
                    margin 18px
                    padding-bottom 18px
                    border-1px(rgba(7,17,27,0.1))
                    &last-child
                        border-none()
                    .foods-list-img
                        flex 0 0 28px
                        margin-right 10px
                        width 57px
                        height 57px
                        img
                            width 57px
                            height 57px

                    .foods-content
                        flex 1
                        padding-top 2px
                        position relative
                        .name
                            font-size 14px
                            color rgb(7,17,27)
                            margin-bottom 8px
                        .names
                            margin-bottom 8px
                            color:rgb(147,153,159)
                            line-height 12px
                            font-size 10px
                        .mount
                            margin-right 12px
                        .mount,.haoping
                            color:rgb(147,153,159)
                            line-height 10px
                            font-size 10px
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
                        .carShops
                            position absolute
                            right 0
                            bottom -10px

</style>