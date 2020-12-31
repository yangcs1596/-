<!--//rotate3DCard.vue-->
<style scoped lang="scss">
  .card-3d{
    margin: 0 auto;
    width: 200px;
    height: 300px;
    transition: all .2s;
    position: relative;
    perspective: 1500px;
    background-color: transparent;
    point: cursor;
    .el-card{
      max-height: 350px;
      .image{
        width: 200px;
        height: 300px;
      }
    }
    .card{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: all 1s;
      backface-visibility: hidden;
      border-radius: 4px;
      border: 1px solid #ff3a0e;
      &:hover{
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
        border-color: #eee;
      }
      .card-z{
        background-color: red;
      }
      .card-f-y{
        transform: rotateY(-180deg);
      }
      .card-f-x{
        transform: rotateX(-180deg);
      }
    }
  }
</style>
<template>
  <div class="card-3d" @click="eve_cardres_click" @mouseover="eve_cardres_msover" @mouseout="eve_cardres_msout">
    <div class="card card-z" ref="cardz" style="transform: rotateX(0deg);">
      <el-card :body-style="{ padding: '0px' }">
        <div>
          <img src="http://image.uczzd.cn/13490718928584081258.jpeg?id=0&from=export" class="image">
        </div>
        <div style="padding: 14px;">
          <span>您的身份</span>
        </div>
      </el-card>
    </div>
    <div :class="['card',direction=='row'?'card-f-y':'card-f-x']" ref="cardf" style="transform: rotateX(-180deg);">
      <el-card :body-style="{ padding: '0px' }">
        <div>
          <img src="https://iknow-pic.cdn.bcebos.com/5366d0160924ab18f85ba4a035fae6cd7a890bd3?x-bce-process=image/resize,m_lfit,w_600,h_800,limit_1" class="image">
        </div>
        <div style="padding: 14px;">
          <span>您是神牌</span>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
  export default {
    props:{
      trigger:{ //触发方式 hover click custom
        type:String,
        default: 'click' //默认点击触发
      },
      value:{ //正反面
        type:Boolean,
        default:true
      },
      direction:{ //方向 row col
        type:String,
        default:'row'
      }
    },
    data() {
      return {
        surface:true
      }
    },
    watch:{
      value(bool){//自定义触发方式
        if(this.trigger == 'custom')this.fn_reserve_action(bool)
      }
    },
    methods: {
      fn_reserve_action(bool) {
        var arr = this.direction == 'row' ? ['rotateY(180deg)', 'rotateY(0deg)'] : ['rotateX(-180deg)', 'rotateX(0deg)']
        this.$refs.cardz.style.transform = bool ? arr[0] : arr[1]
        this.$refs.cardf.style.transform = !bool ? arr[0] : arr[1]
      },
      eve_cardres_click(){
        if(this.trigger == 'click'){
          this.fn_reserve_action(this.surface)
          this.surface = !this.surface
        }
      },
      eve_cardres_msover(){
        if(this.trigger == 'hover')this.fn_reserve_action(true)
      },
      eve_cardres_msout(){
        if(this.trigger == 'hover')this.fn_reserve_action(false)
      }
    }
  }
</script>
