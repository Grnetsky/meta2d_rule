<script setup>
import {onMounted} from "vue";
import {Meta2d} from "@meta2d/core";

onMounted(()=>{
  let meta2d = new Meta2d("meta2d");
})
</script>

<template>
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