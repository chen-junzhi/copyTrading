<script setup>
import { useRouter } from 'vue-router'
defineOptions({
  name: '404'
});

const router = useRouter()
const toHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="container">
    <div class="box">
      <img src="@/assets/images/404.png">
      <el-button class="button" type="primary" @click="toHome()">回到首页</el-button>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #283150;
  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    .button {
      margin-top: 30px;
    }
  }
}
</style>
