<script setup>
import Nav from "../components/Nav.vue";
import {reactive} from "vue";
import {basicMaterials} from "@/config/menu.js";
import Menu from "@/components/Menu.vue";
let menuList = reactive(basicMaterials)
</script>

<template>
  <div class="home">
    <div class="head">
      <Nav></Nav>
    </div>
    <div class="body">
      <Menu :menu-list="menuList"></Menu>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
 .home {
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   .body {
     display: flex;
     flex-direction: row;
     height: 100%;
     width: 100%;
   }
 }
</style>