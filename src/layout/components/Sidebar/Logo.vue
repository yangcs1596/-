<template>
  <el-menu-item v-if="sidebarLogo" :class="{ 'submenu-title-noDropdownlogo': isCollapse }" index="0">
    <!-- 缩小时显示的logo，可以自定义，这里直接使用图标库中的 -->
    <img v-if="isCollapse" :src="logoImg" style="width: 20px; height: 20px" />
    <!--正常状态下显示的，可以使用本地的logoImg-->
    <el-row v-else>
      <el-col :span="8">
        <div class="logo-con">
          <!--<img src="https://aurora-1255840532.cos.ap-chengdu.myqcloud.com/logo.png">-->
          <img :src="logoImg" style="width: 30px; height: 30px" />
        </div>
      </el-col>
      <el-col :span="16">
        <div style="height: 18px; color: white; font-size: 20px; text-align: center">测试管理</div>
        <div style="height: 4px; color: white; font-size: 12px; text-align: center">JUSTICE & FAITH</div>
      </el-col>
    </el-row>
  </el-menu-item>
</template>

<script>
import logoImg from '@/assets/images/logo.png'
import { mapState } from 'vuex'
export default {
  name: 'Logo',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      logoImg: logoImg
    }
  },
  computed: {
    ...mapState({
      sidebarLogo: (state) => state.settings.sidebarLogo
    })
  }
}
</script>

<style scoped>
.submenu-title-noDropdownlogo {
  padding-left: 5px !important;
}
.logo-con img {
  width: 30px;
  height: 30px;
  margin-top: 5px;
}
</style>
