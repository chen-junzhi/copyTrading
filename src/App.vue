<script setup>
import { RouterView, useRoute } from 'vue-router'
const route = useRoute()

</script>

<template>
  <header>
    <el-menu router
             :default-active="route.path"
             class="el-menu"
             mode="horizontal"
             background-color="#283150"
             text-color="#fff">
      <h2 class="logo">LOGO</h2>
      <el-menu-item index="/trade">交易达人</el-menu-item>
    </el-menu>
  </header>

  <RouterView />
</template>

<style scoped>
.el-menu {
  display: flex;
  align-items: center;
  padding: 0 1rem;
}
.logo {
  color: #fff;
  margin-right: 20px;
}
</style>
