<script setup>
import FormItem from "@/components/FormItem.vue";
const props = defineProps(['data','target'])
</script>

<template>
  <div v-for="(item,index) in data" :key="index">
    <FormItem :data="item" :target="target.rule">
    </FormItem>
  </div>
</template>

<style scoped>

</style>