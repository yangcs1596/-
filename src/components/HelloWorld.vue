<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane v-for="tab in tabs" :key="tab" :label="tab" :name="tab">
       {{tab}}
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        activeName: '用户管理',
        tabs: ["用户管理", "配置管理", "角色管理", "定时任务补偿"]
      };
    },
    methods: {
      handleClick(tab, event) {

      }
    }
  };
</script>
