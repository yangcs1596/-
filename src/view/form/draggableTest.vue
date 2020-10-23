<template>
  <div class="root">

    <draggable
      :data="'希望drop组件接收到的数据'"
      @dragstart="onSourceDragStart"
      @dragsend="onSourceDragEnd">
      <div class="drag-content">拖动我</div>

    </draggable>
    <el-button v-drag="{set: set}" style="position: absolute" type="primary">拖动我</el-button>

    <droppable
      class="drop-box"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
      @drop="onDrop"
      @dragenter="onDragEnter"
      @dragover="onDragOver"
      @dragleave="onDragLeave">
      <div style="width:500px; height: 500px;background-color: blue">
      <el-button v-drag="{set: set}" v-for="(item,i) in list" :key="item" :style="{'position': 'absolute', 'top': i*60 + 50 +'px' }" type="primary">拖动我{{item}}</el-button>
      </div>


    </droppable>

  </div>
</template>

<script>
/**
 *  这里用的是dnd.js
 *  参考文档 https://github.com/qgh810/dnd
 **/
  import Draggable from '@/components/Draggable/draggable'// form后面的地址根据实际情况而定
  import Droppable from '@/components/Draggable/droppable'// form后面的地址根据实际情况而定
  export default {
    data() {
      return {
        list: [88,2,3]
      }
    },
    components: {
      Draggable,
      Droppable
    },
    directives: {
      drag(el, bindings) {
        el.onmousedown = function(e) {
          var disx = e.pageX - el.offsetLeft
          var disy = e.pageY - el.offsetTop
          document.onmousemove = function(e) {
            el.style.left = e.pageX - disx + 'px'
            el.style.top = e.pageY - disy + 'px'
          }
          document.onmouseup = function(e) {
            // console.log(this.data.arr)
            // e.preventDefault()
            // if (el.offsetLeft < 0) {
            //   el.style.left = 0
            // }
            // if (el.offsetLeft > 515) {
            //   el.style.left = '515px'
            // }
            // if (el.offsetTop < 0) {
            //   el.style.top = 0
            // }
            // if (el.offsetTop > 794) {
            //   el.style.top = '794px'
            // }
            document.onmousemove = document.onmouseup = null
            bindings.value.set(el.style.left, el.style.top)
          }
        }
      }
    },
    methods: {
      set(x,y){
        console.log(x,y)
      },
      onSourceDragStart (params) {
        console.log('被拖动元素监听到拖动开始', params)
      },
      onSourceDragEnd (params) {
        console.log('被拖动元素监听到拖动结束', params)
      },
      onDragStart (params) {
        console.log('监听到拖动开始', params)
      },
      onDragEnd (params) {
        // params.el.innerHTML = params.el.innerHTML + params.sourceNode.innerHTML
        console.log('监听到拖动结束', params)
      },
      onDrop (params) {
        this.list.push(this.list.length + 1)
        console.log('监听到被拖动元素放下', params)
      },
      onDragEnter (params) {
        console.log('监听到被拖动元素进入当前范围', params)
      },
      onDragOver (params) {

        //console.log('监听到被拖动元素在上方移动, 这个调用调多次就不打印了')
      },
      onDragLeave (params) {
        console.log('监听到被拖动元素离开当前范围', params)
      }
    }
  }
</script>

<style>
  .drop-box{
    border: 1px;
    width: 500px;
    height: 500px;
    background-color: red;
  }
</style>
