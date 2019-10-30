<template>
        <div class="start" :class="startType">
            <span track-by="$index" v-for="classItem in classItems" :class="classItem" class="star-item"></span>
        </div>
</template>
<script>

    const LENGTH=5;
    const HALF="half";
    const OF="off";
    const ON="on";
    export default {
        name: "star",
        props:{
            size:{
                type:Number
            },
            score:{
                type:Number
            }
        },
       computed: {
           startType(){
            return "star" +this.size
           },
            classItems(){
                let result=[];
               let score=Math.floor(this.score*2)/2;
               let hafstar=score%1!==0;
               let innter=Math.floor(score);
               for(let i=0;i<innter;i++){
                   result.push(ON);
               }
               if(hafstar){
                   result.push(HALF);
               }
               while(result.length<LENGTH){
                   result.push(OF);
               }
               return result
           }
       }
    }
</script>

<style scoped lang="stylus">
    @import "../../commont/style/mixin.styl"
            .start
                font-size 0
            /*.star-item*/
                /*display inline-block*/
                /*background-repeat no-repeat*/
            &.star24
                font-size 0
                .star-item
                    width 10px
                    height 10px
                    display inline-block
                    margin-right 3px
                    background-size: 10px 10px
                    background-repeat no-repeat
                    &.on
                        bg-img("star24_on")
                    &.off
                        bg-img("star24_off")
                    &.half
                        bg-img("star24_half")
            &.star36
                font-size 0
                .star-item
                    width 15px
                    height 15px
                    margin-right 6px
                    background-size: 15px 15px
                    background-repeat no-repeat
                    display inline-block
                    &.on
                        bg-img("star36_on")
                    &.off
                        bg-img("star36_off")
                    &.half
                        bg-img("star36_half")
            &.star48
                font-size 0
                .star-item
                    width 20px
                    height 20px
                    margin-right 22px
                    background-size: 20px 20px
                    background-repeat no-repeat
                    display inline-block
                    &.on
                        bg-img("star48_on")
                    &.off
                        bg-img("star48_off")
                    &.half
                        bg-img("star48_half")
</style>