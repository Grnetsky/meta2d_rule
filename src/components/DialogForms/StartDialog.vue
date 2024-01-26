<script setup>
import FormItem from "@/components/FormItem.vue";
import {computed} from "vue";
let props = defineProps(['pen'])
let emit = defineEmits(['updateValue'])
let formData = computed(()=>{
  return [{
    type:'code',
    event:'changeCode',
    prop:'input',
    bindProp: props.pen.rule,
    language:'json',
    func(v){
      emit('updateValue',{
        prop:'rule.input',
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