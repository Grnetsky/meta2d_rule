<script setup>
import {onMounted} from "vue";
import {Meta2d} from "@meta2d/core";
import Materials from "@/components/Materials.vue";
import {init} from "@/core/extension/meta2dExtension.js";

onMounted(()=>{
  let meta2d = new Meta2d("meta2d",{
    toArrow:'triangle'
  });
  init()
})
</script>

<template>
  <Materials></Materials>
  <div id="meta2d"></div>
</template>

<style scoped>
#meta2d {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #eee;
}
</style>