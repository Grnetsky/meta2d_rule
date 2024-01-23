<template>
  <div class="modal" v-show="visible">
    <!-- 模态框内容 -->
    {{id}}
    结果：{{result.result}}
    <p>代码：{{result.userCode}}</p>
    <p>执行情况：{{result.type}}</p>
    <p>耗费时间：{{result.costTime}}</p>
    <p style="color: red">{{ position.x }} {{position.y}}</p>
    <button @click="close">Close</button>
    <button @click="next">{{result.type === 'success'?'下一步':'结束'}}</button>
  </div>
</template>

<script setup>
import {computed, watch} from "vue";
let props = defineProps(['result','visible','id'])
let position = computed(()=>{
  if(!props.id.value){
    return  {x:0,y:0}
  }
  let pen = meta2d.findOne(props.id.value)
  let x = meta2d.getPenRect(pen).x + meta2d.getPenRect(pen).width / 2
  let y = meta2d.getPenRect(pen).y + meta2d.getPenRect(pen).height / 2
  return {x:x+'px',y:y+'px'};
})

let emit = defineEmits(['close','next','awaitNext'])
function close(){
  emit('close')
}

function next() {
  if(props.result.type === 'success'){
    emit('next')
    emit('awaitNext')
  }else {
    emit('close')
  }
}
</script>
<style scoped>
  .modal {
    position: absolute;
    transition: all 1s ease;
    top: v-bind('position.y');
    z-index: 9999;
    left:v-bind('position.x');
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>