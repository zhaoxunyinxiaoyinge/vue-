<template>
    <div class="carShop">
        <transition name="fade">
            <div @click.stop="removes" class="removeCart icon-remove_circle_outline" v-show="foods.count>0">
            </div>
        </transition>
        <div class="amountsCart" v-show="foods.count>0">
           {{foods.count}}
        </div>
        <div class="addCart icon-add_circle" @click.stop="add">
        </div>
    </div>
</template>

<script>
    import  Vue from "vue"
    export default {
        name: "cartShop",
        props:{
            foods:{
                type:Object,
            }
        },
        methods:{
            add(event){
                if(!event._constructed){
                    return ;
                }
                //最开始的时候是没有count属性的;
                if(!this.foods.count){
                    //调用vue的方法给实例添加属性;
                    Vue.set(this.foods,"count",1)
                }else{
                    this.foods.count++
                }
            },
            removes(){
                if(this.foods.count>0){
                    this.foods.count--
                }

            }

        },

    }
</script>

<style scoped lang="stylus">
    .carShop
        font-size 0
        .removeCart
            display inline-block
            font-size 24px
            color: rgb(0,160,220)
            margin-right 5px
            vertical-align middle
            transform translate3d(0px,0,0)
            &.fade-enter-active,&.fade-leave-active
                transition all  0.2s
            &.fade-enter,&.fade-leave-to
                transform translate3d(30px,0,0)
                opacity 0
       .amountsCart
            display inline-block
            font-size 15px
            vertical-align middle
            margin-right 5px
       .addCart
            display inline-block
            font-size 24px
            color: rgb(0,160,220)
            margin-right 5px
            vertical-align middle



</style>