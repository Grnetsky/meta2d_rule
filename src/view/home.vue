<script setup>

import Meta2d from "../components/Meta2d.vue";
import Materials from "../components/Materials.vue";
import Nav from "../components/Nav.vue";
import {reactive} from "vue";
import {basicMaterials} from "@/config/menu.js";
let menuList = reactive(basicMaterials)
</script>

<template>
  <div class="home">
    <div class="head">
      <Nav></Nav>
    </div>
    <div class="body">
      <Materials :menu-list="menuList"></Materials>
      <Meta2d></Meta2d>
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