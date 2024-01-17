<script setup>
let { menu } = defineProps(['menu'])
</script>

<template>
  <div v-if="menu">
    <t-menu-item v-if="!menu.children" :value="menu.value" :to="menu.route">
      <template #icon>
        <t-icon v-if="menu.icon" :name="menu.icon" />
      </template>
      {{menu.title}}
    </t-menu-item>
    <t-submenu v-else :value="menu.value" >
      <template #icon>
        <t-icon v-if="menu.icon" :name="menu.icon" />
      </template>
      <template #title>
        {{ menu.title}}
      </template>
      <MenuItem v-for="(child,index) in menu.children" :key="child.value || index" :menu="child"></MenuItem>
    </t-submenu>
  </div>
</template>

<style scoped>

</style>