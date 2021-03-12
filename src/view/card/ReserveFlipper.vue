<template>
  <div class="reverseLeft reverse" >
    <!--<groundOrderAmount class="pageContent" :class="ifShow ? 'screen-left' : 'screen-right'" ></groundOrderAmount>-->
    <!--<groundOrderProportion class="pageContent" :class="!ifShow ? 'screen-left' : 'screen-right'" :show="ifShow"></groundOrderProportion>-->

    <el-card :body-style="{ padding: '0px' }" class="pageContent" :class="ifShow ? 'screen-left' : 'screen-right'">
      <img src="https://iknow-pic.cdn.bcebos.com/5366d0160924ab18f85ba4a035fae6cd7a890bd3?x-bce-process=image/resize,m_lfit,w_600,h_800,limit_1" class="image">
      <div style="padding: 14px;">
        <span>您是神牌</span>
      </div>
    </el-card>

    <el-card :body-style="{ padding: '0px' }" class="pageContent" :class="!ifShow ? 'screen-left' : 'screen-right'" :show="ifShow">
      <div>
        <img src="http://image.uczzd.cn/13490718928584081258.jpeg?id=0&from=export" class="image">
      </div>
      <div style="padding: 14px;">
        <span>您的身份</span>
      </div>
    </el-card>
  </div>
</template>

<script>
  import rotate3DCard from '@/components/3D/retote3DCard';

  export default {
    name: 'ReserveFlipper',
    components: {
      rotate3DCard
    },
    data(){
      return {
        ifShow: 1
      }
    },
    mounted(){
      this.flip()
    },
    methods:{
      flip(){
        let num = 1;
        setInterval(() => {
          if(num%2 == 0){
            this.ifShow = 1
          }else{
            this.ifShow = null
          }
          num++;
        }, 2000);
      }
    }
  };
</script>
<style>
  .reverse{
    position: relative;
    flex:1;
    transform-style: preserve-3d;
  }
  .pageContent{
    overflow: hidden;
    display: block;
    position: absolute;
    transition: all 0.6s linear;
    backface-visibility: hidden;
  }

  .screen-left{
    transform:  rotate(0);
  }

  .screen-right {
    transform:  rotateY(180deg);
  }

</style>
