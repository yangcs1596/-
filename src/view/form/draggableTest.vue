<template>
  <div class="root">
    <!--pdf预览地址 https://www.cnblogs.com/wuqilang/p/13031290.html-->
    <div class="show-certificat-img">
      <!--<a :href="'/static/js/pdf/web/viewer.html?file=' + url" target="_blank">哈哈哈</a>-->
      <iframe :src="'/static/js/pdf/web/viewer.html?file=' + url"  width="100%" height="400px"></iframe>
    </div>
    <!--vue-drag-resize的地址 https://github.com/kirillmurashov/vue-drag-resize-->
    <!--拖拽的组件还有vue-drag-resize没有用到； 这里用的是dnd.js 还有一个组件是vuedraggable-->
    <draggable
      :data="'希望drop组件接收到的数据'"
      @dragstart="onSourceDragStart"
      @dragsend="onSourceDragEnd">
      <div class="drag-content">拖动我</div>
    </draggable>
    <droppable
      class="drop-box"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
      @drop="onDrop"
      @dragenter="onDragEnter"
      @dragover="onDragOver"
      @dragleave="onDragLeave">
      <div style="position:relative; width:500px; height: 500px;background-color: blue">
        <div  v-drag="{set: set}" v-for="(item,i) in list" :key="item" :style="{'position': 'absolute', 'top': i*60 + 50 +'px', 'left': i*10 + 30 + 'px' }">
          <el-button type="primary">拖动我{{item}}</el-button>
        </div>
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
        url: encodeURIComponent('http://localhost:8080/api/file/view?code=wKhYdF8Puz-AA6YfAAG-AA0DWH4941'),
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
            if (el.offsetLeft < 0) {
              el.style.left = 0
            }
            if (el.offsetLeft > 410) {
              el.style.left = '410px'
            }
            if (el.offsetTop < 0) {
              el.style.top = 0
            }
            if (el.offsetTop > 460) {
              el.style.top = '460px'
            }
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
