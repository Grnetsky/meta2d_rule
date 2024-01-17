<script setup>
import MenuItem from "@/components/MenuItem.vue";
let props = defineProps(['menu-list'])
</script>

<template>
  <div>
    <t-menu>
      <div v-for="(item,index) in props.menuList" :key="item.value||index">
        <MenuItem :menu="item"></MenuItem>
      </div>
    </t-menu>
  </div>
</template>


<style scoped>

</style>