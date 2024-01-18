<script setup>
import MenuItem from "@/components/MenuItem.vue";
import { ref } from "vue";

let props = defineProps(['menu-list'])
let collapsed = ref(false)
function changeCollapsed() {
  collapsed.value = !collapsed.value
}
function setCollapsed(val) {
  collapsed.value = val
}
</script>

<template>
  <div>
    <t-menu :collapsed="collapsed">
      <div v-for="(item,index) in props.menuList" :key="item.value||index">
        <MenuItem @setCollapsed="setCollapsed" :menu="item"></MenuItem>
      </div>

      <template #operations>
        <t-button class="t-demo-collapse-btn" variant="text" shape="square" @click="changeCollapsed">
          <template #icon><t-icon name="view-list" /></template>
        </t-button>
      </template>
    </t-menu>
  </div>
</template>


<style scoped>

</style>