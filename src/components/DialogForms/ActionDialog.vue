<script setup>
import FormItem from "@/components/FormItem.vue";
import {computed} from "vue";
let props = defineProps(['pen'])
let emit = defineEmits(['updateValue'])
let formData = computed(()=>{
  return [
    {
      title:'顺序',
      type:'number',
      event: 'change',
      prop: 'index',
      bindProp: props.pen.rule,
      func(v){
        emit('updateValue',{
          prop:'rule.index',
          value:v
        })
      },
    },{
      type:'code',
      event:'changeCode',
      prop:'code',
      bindProp: props.pen.rule,
      func(v){
        emit('updateValue',{
          prop:'rule.code',
          value:v
        })
      },
    }
  ]
})
</script>

<template>
  <form-item v-for="item in formData" :data="item"></form-item>
</template>

<style scoped>

</style>