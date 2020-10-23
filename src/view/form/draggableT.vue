<!--group详解
string：命名，个人建议用元素id就行,用处是为了设置可以拖放容器时使用，在array中的put的设置中再做介绍；
object：{name,pull,put}
       name：同string的方法，
       pull：pull用来定义从这个列表容器移动出去的设置，true/false/'clone'/function
           true:列表容器内的列表单元可以被移出；
           false：列表容器内的列表单元不可以被移出；
           'clone'：列表单元移出，移动的为该元素的副本；
           function：用来进行pull的函数判断，可以进行复杂逻辑，在函数中return false/true来判断是否移出；
       put：put用来定义往这个列表容器放置列表单元的的设置，true/false/['foo','bar']/function
           true:列表容器可以从其他列表容器内放入列表单元；
           false：与true相反；
           ['foo','bar']：这个可以是一个字符串或者是字符串的数组，代表的是group配置项里定义的name值；
           function：用来进行put的函数判断，可以进行复杂逻辑，在函数中return false/true来判断是否放入；-->
<!--事件
onChoose：function 列表单元被选中的回调函数
onStart：function 列表单元拖动开始的回调函数
onEnd：function 列表单元拖放结束后的回调函数
onAdd：function 列表单元添加到本列表容器的回调函数
onUpdate：function 列表单元在列表容器中的排序发生变化后的回调函数
onRemove：function 列表元素移到另一个列表容器的回调函数
onFilter：function 试图选中一个被filter过滤的列表单元的回调函数
onMove：function 当移动列表单元在一个列表容器中或者多个列表容器中的回调函数
onClone：function 当创建一个列表单元副本的时候的回调函数-->
<template>
  <div class="content">
    <div class="top">
      <!-- 左侧按钮 -->
      <draggable
        v-model="list1"
        draggable=".c-item"
        @clone="clone"
        :options="{sort: true, group: {name: 'field', pull:'clone',put: false}}"
      >
        <div v-for="d in list1" class="item c-item">
          <el-button type="primary">{{d.name}}</el-button>
        </div>
      </draggable>
    </div>

    <!-- 右侧按钮 -->
    <draggable group="field"
               :list="list2"
               draggable=".item">
      <div class="bottom">
        <div v-for="(d, i) in list2" :key="i" class="item">
          <el-button type="primary">{{d.name}}</el-button>
          <!--<el-button v-drag="{set: set}" :id="d.id"-->
          <!--:style="{'position': 'absolute', 'left':d.x, 'top': d.y}"-->
          <!--type="primary">-->
          <!--{{d.name}}-->
          <!--</el-button>-->
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
  /**
   * wKhYdF-P0KGAdKfQAABQ2DoI5MQ672
   * 学习连接：https://www.jianshu.com/p/03f0f58f84cc
   **/
  import draggable from "vuedraggable";

  export default {
    components: {
      draggable
    },
    directives: {
      drag(el, bindings) {
        el.onmousedown = function (e) {
          var disx = e.pageX - el.offsetLeft
          var disy = e.pageY - el.offsetTop
          document.onmousemove = function (e) {
            el.style.left = e.pageX - disx + 'px'
            el.style.top = e.pageY - disy + 'px'
          }
          document.onmouseup = function (e) {
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
            bindings.value.set(el.style.left, el.style.top, el.getAttribute("id"))
          }
        }
      }
    },
    data() {
      return {
        list1: [
          {name: "John", id: 1, x: 0, y: '60px'},
          {name: "Joao", id: 2, x: 0, y: '110px'},
          {name: "Jean", id: 3, x: 0, y: '160px'},
          {name: "Gerard", id: 4, x: 0, y: '210px'}
        ],
        list2: [
          {name: "Juan", id: 5, x: 0, y: 60},
          {name: "Edgard", id: 6, x: 0, y: 110},
          {name: "Johnson", id: 7, x: 0, y: 160}
        ]
      };
    },
    methods: {
      set(x, y, id) {
        console.log(x, y)
        console.log(JSON.stringify(this.list2))
        for (let i = 0; i < this.list2.length; i++) {
          if (id == this.list2[i].id) {
            this.list2[i].x = x
            this.list2[i].y = y
          }
        }
      },
      copy(e) {
        console.log()
        return e
      },
      start(et) {
        console.log("start" + et)
      },
      toChange(e,) {
        console.log(e)
        console.log(JSON.stringify(this.list2))
        if (e.added) {
          console.log(this.list2)
        }

      },
      clone(e) {
        // e.draggedContext.element.x = originalEvent.x
        // e.draggedContext.element.y = originalEvent.y
        console.log("clone", e)
        return false
      }
    }
  };
</script>
<style>
  .el-button {
    margin: 20px;
  }

  .item {
    float: left;
  }

  .content {
    width: 100%;
    /*高度自动,因为嵌套的div高度不确定,所以这里设置自动*/
    height: auto;
    background-color: #5e5e5e;
  }

  /*顶部div*/
  .top {
    width: 50%;
    height: 500px;
    float: left;
    background-color: #00ffcc;
    /*margin-left: 50%;*/
    /*需要设置绝对定位,才能用left*/
    /*position: relative;*/
    /*这里需要看width多少,left的值等于width的一半*/
    /*left: -200px;*/
  }

  /*底部div*/
  .bottom {
    width: 50%;
    height: 500px;
    background-color: blueviolet;
    float: left;
    /*这里*/
    /*margin-left: 50%;*/
    /*position: relative;*/
    /*这里需要看width多少,left的值等于width的一半*/
    /*left: -200px;*/
  }
</style>
