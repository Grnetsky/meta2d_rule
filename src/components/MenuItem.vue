<script setup>
import { getCurrentInstance } from 'vue'
let { menu } = defineProps(['menu'])
let instance = getCurrentInstance()
</script>

<template>
  <div v-if="menu">
    <t-menu-item v-if="!menu.children" :value="menu.value" :to="menu.route" @[menu.event]="menu.func(instance)">
      <template #icon>
        <t-icon :size="menu.size || 'medium'" v-if="menu.icon" :name="menu.icon" />
      </template>
      <span v-if="menu.title">{{ menu.title}}</span>
    </t-menu-item>
    <t-submenu v-else :value="menu.value" >
      <template #icon>
        <t-icon :size="menu.size || 'medium'" v-if="menu.icon" :name="menu.icon" />
      </template>
      <template #title v-if="menu.title">
       {{ menu.title}}
      </template>
      <MenuItem v-for="(child,index) in menu.children" :key="child.value || index" :menu="child"></MenuItem>
    </t-submenu>
  </div>
</template>

<style scoped>

</style>