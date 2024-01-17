<script setup>
import {reactive,ref} from "vue";
import {basicNavList} from "@/config/menu.js";
import MenuItem from "@/components/MenuItem.vue";
let navList = reactive(basicNavList)
let activeValue = ref('')
function changeHandler(v) {
  console.log(v)
}
</script>

<template>
  <div>
    <t-head-menu v-model="activeValue" theme="light" @change="changeHandler" expand-type="popup">
      <template #logo>
        <img :height="navList.logo.height" :src="navList.logo.src" :alt="navList.logo.alt" />
      </template>
        <MenuItem v-for="(item,index) in navList.defaults" :key="index" :menu="item"></MenuItem>
      <t-submenu value="2" title="菜单2">
        <t-menu-item value="2-1"> 子菜单2-1 </t-menu-item>
        <t-menu-item value="2-2"> 子菜单2-2 </t-menu-item>
        <t-menu-item value="2-3"> 子菜单2-3 </t-menu-item>
      </t-submenu>
      <template #operations>
        <t-button v-for="(item,index) in navList.operations" :key="index" variant="text" shape="square">
          <template #icon><t-icon :name="item.icon" /></template>
        </t-button>
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
