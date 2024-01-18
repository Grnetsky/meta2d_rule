<script setup xmlns="http://www.w3.org/1999/html">
import {reactive} from "vue";
import {BasicIcon} from "@/config/icons.js";
import {deepClone} from "@meta2d/core";
const icons = reactive(BasicIcon)
function dragPen(data,e) {
  const json = JSON.stringify(data)
  e.dataTransfer.setData("Meta2d",json)}

function onTouchstart(data,e) {
  meta2d.canvas.addCaches = deepClone([data])
}
</script>

<template>
  <t-list size="small">
    <t-list-item v-for="(item,index) in icons" :key="index">
      <div class="icon_item" draggable="true"
           @dragstart="dragPen(item.data,$event)"
           @click.stop="onTouchstart(item.data,$event)">

      <svg class="l-icon" aria-hidden="true">
        <use :xlink:href="'#'+item.icon"></use>
      </svg>
      </div>{{item.text}}
    </t-list-item>
  </t-list>
</template>

<style scoped>

</style>