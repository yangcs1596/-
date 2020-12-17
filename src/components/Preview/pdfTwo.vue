<template>
  <div class="center">
    <mark-down-edit></mark-down-edit>
    <div class="contor">
      <el-button @click="prev">上一页</el-button>
      <el-button @click="next">下一页</el-button>
      <span>Page: <span v-text="page_num"/> / <span v-text="page_count"/></span>
      <el-button icon="el-icon-plus" @click="addscale"/>
      <el-button icon="el-icon-minus" @click="minus"/>
    </div>
    <!--<canvas id="the-canvas" class="canvasstyle"/>-->
    <!--<div>-->
    <!--<span v-text="page_num"></span>-->
    <!--</div>-->
    <div id="pdf-container" :style="{'display':'inline-flex', 'flex-wrap':'wrap', 'width': page_count*600 + 'px'}">
      <!--<canvas id="the-canvas" class="canvasstyle"/>-->
      <!--<div v-for="index in page_count" style="position: relative">-->
        <!--<canvas :id="'the-canvas_' + index" class="pdfClass"></canvas>-->
        <!--<div>-->
          <!--<span>{{index}}</span>-->
        <!--</div>-->
        <!--<div  v-drag="{set: set}" style="position:absolute; top: 0; left: 0;">-->
          <!--<el-button type="primary">拖动我</el-button>-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import PDFJS from "pdfjs-dist";
  import workerSrc from 'pdfjs-dist/build/pdf.worker.entry'
  // let PDFJS = require('pdfjs-dist');
  // PDFJS.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.min');
  import MarkDownEdit from '@/components/MarkDown/MarkDownEdit'
  export default {
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
            if (el.offsetLeft > 511) {
              el.style.left = '511px'
            }
            if (el.offsetTop < 0) {
              el.style.top = 0
            }
            if (el.offsetTop > 801) {
              el.style.top = '801px'
            }
            document.onmousemove = document.onmouseup = null
            bindings.value.set(el.style.left, el.style.top)
          }
        }
      }
    },
    data() {
      return {
        pdfUrl: 'http://localhost:8080/api/file/view?code=wKhYdF8Puz-AA6YfAAG-AA0DWH4941',// 这里是pdf文件地址，后台给的流文件请求地址也是可以的
        pdfDoc: null,// pdfjs 生成的对象
        pageNum: 1,//
        pageRendering: false,
        pageNumPending: null,
        scale: 1.0,// 放大倍数
        page_num: 0,// 当前页数
        page_count: 0,// 总页数
        maxscale: 2,// 最大放大倍数
        minscale: 0.8,// 最小放大倍数
        list:[]
      }
    },
    components:{MarkDownEdit},
    computed: {
      ctx() {
        const id = document.getElementById('the-canvas')
        return id.getContext('2d')
      }
    },
    created() {
      PDFJS.GlobalWorkerOptions.workerSrc = workerSrc
      this.$nextTick(() => {
        this.init()
      })
    },
    methods: {
      set(x,y){
        console.log(x,y)
      },
      init() {
        let _this = this;
        // 初始化pdf
        const loadingTask = PDFJS.getDocument(this.pdfUrl);
        loadingTask.promise.then(function (pdfDoc_) {
          _this.pdfDoc = pdfDoc_
          _this.page_count = _this.pdfDoc.numPages
          // _this.renderPage(_this.pageNum)
          for (var j = 1; j <= _this.page_count; j++) {
            var id = "the-canvas_" + j;
            _this.createPdfContainer(id, 'pdfClass');
            _this.renderPage(j, id)
          }
        })
      },
      //创建
      createPdfContainer(id, className) {
        var pdfContainer = document.getElementById('pdf-container');
        var divNew = document.createElement("div")
        var canvasNew = document.createElement('canvas');
        canvasNew.id = id;
        canvasNew.className = className;
        var spanNew = document.createElement('span')
        spanNew.textContent = id.split("_")[1]
        divNew.appendChild(canvasNew);
        divNew.appendChild(spanNew)
        var html= `<div style="position: relative">
                    <canvas id="${id}" class="${className}"></canvas>
                    <div>
                      <span>${id.split("_")[1]}</span>
                    </div></div>`
        pdfContainer.appendChild(new DOMParser().parseFromString(html,'text/html').body.childNodes[0])

      },
      //页码切换
      renderPage(num, id) { // 渲染pdf
        const vm = this
        this.pageRendering = true
        // const canvas = document.getElementById('the-canvas')
        const canvas = document.getElementById(id)
        // Using promise to fetch the page
        this.pdfDoc.getPage(num).then(function (page) {
          var viewport = page.getViewport({scale: vm.scale})
          // alert(vm.canvas.height)
          canvas.height = viewport.height
          vm.pdfWidth = canvas.width = viewport.width
          // Render PDF page into canvas context
          var renderContext = {
            canvasContext: canvas.getContext('2d'),
            viewport: viewport
          }
          var renderTask = page.render(renderContext)
          // Wait for rendering to finish
          renderTask.promise.then(function () {
            vm.pageRendering = false
            if (vm.pageNumPending !== null) {
              // New page rendering is pending
              vm.renderPage(vm.pageNumPending)
              vm.pageNumPending = null
            }
          })
        })
        vm.page_num = vm.pageNum
      },
      addscale() { // 放大
        if (this.scale >= this.maxscale) {
          return
        }
        this.scale += 0.1
        this.queueRenderPage(this.pageNum)
      },
      minus() { // 缩小
        if (this.scale <= this.minscale) {
          return
        }
        this.scale -= 0.1
        this.queueRenderPage(this.pageNum)
      },
      prev() { // 上一页
        const vm = this
        if (vm.pageNum <= 1) {
          return
        }
        vm.pageNum--
        vm.queueRenderPage(vm.pageNum)
      },
      next() { // 下一页
        const vm = this
        if (vm.pageNum >= vm.page_count) {
          return
        }
        vm.pageNum++
        vm.queueRenderPage(vm.pageNum)
      },
      queueRenderPage(num) {
        if (this.pageRendering) {
          this.pageNumPending = num
        } else {
          this.renderPage(num)
        }
      }
    },
    watch: {
    }
  };
</script>
