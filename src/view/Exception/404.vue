<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="ht-not-found not-found-default">
          <div class="content">
            <img :src="errPng" alt="404 image" width="560" height="428" />
            <h2>噢！找不到页面。</h2>
          </div>
          <div id="clouds">
            <div class="cloud cloud-1"></div>
            <div class="cloud cloud-2"></div>
            <div class="cloud cloud-3"></div>
            <div class="cloud cloud-4"></div>
            <div class="cloud cloud-5"></div>
            <div class="cloud cloud-6"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import errPng from '@/assets/err_image/404.png'
  export default {
      data(){
        return {
          errPng: errPng + '?' + +new Date()
        }
    }
  }
</script>
