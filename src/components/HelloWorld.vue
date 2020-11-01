<template>
  <div class="demo-image__placeholder">
    <el-button type="primary" @click="click">展示图片</el-button>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="tab in tabs" :key="tab" :label="tab" :name="tab">
        {{tab}}
      </el-tab-pane>
    </el-tabs>
    <div class="block">
      <span class="demonstration">默认</span>
      <el-image :src="src"></el-image>
    </div>
    <div class="block">
      <span class="demonstration">自定义</span>
      <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg">
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
      </el-image>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        src: '',
        activeName: '用户管理',
        tabs: ["用户管理", "配置管理", "角色管理", "定时任务补偿"]
      };
    },
    methods: {
      handleClick(tab, event) {

      },
      click() {
        this.src = 'http://192.168.88.115:18117/tools/creatQrCode?contents=123&width=200&height=200'
      }
    }
  };
</script>
