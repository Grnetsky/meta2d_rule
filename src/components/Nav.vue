<script setup>
import {reactive,ref} from "vue";
import {basicNavList} from "@/config/menu.js";
import MenuItem from "@/components/MenuItem.vue";
let navList = reactive(basicNavList)
let activeValue = ref('')
function changeHandler(v) {
}
</script>

<template>
  <div>
    <t-head-menu v-model="activeValue" theme="light" @change="changeHandler" expand-type="popup">
      <template #logo>
        <img :height="navList.logo.height" :src="navList.logo.src" :alt="navList.logo.alt" />
      </template>
        <MenuItem v-for="(item,index) in navList.defaults" :key="index" :menu="item"></MenuItem>
      <template #operations>
<!--        <t-button v-for="(item,index) in navList.operations" :key="index" variant="text" shape="square" @[item.event]="item.func">-->
<!--          <template #icon><t-icon :size="item.size || 'medium'" :name="item.icon" /></template>-->
<!--        </t-button>-->
        <MenuItem v-for="(item,index) in navList.operations" :key="index" :menu="item"></MenuItem>

      </template>
    </t-head-menu>
  </div>
</template>

<style lang="less" scoped>
.t-menu__operations {
  .t-button {
    margin-left: 8px;
  }
}
.t-demo-menu--dark {
  .t-button {
    color: #fff;
    &:hover {
      background-color: #4b4b4b;
      border-color: transparent;
      --ripple-color: #383838;
    }
  }
}
</style>
