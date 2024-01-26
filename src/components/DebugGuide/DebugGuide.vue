<template>
  <div ref="modalRef" class="modal" v-show="visible">
    <!-- 模态框内容 -->
    <t-card header-bordered :style="{ width: '400px' }">
      <template #title>
        <div  ref="controlRef" class="title" :style="{color:result.error?'red':'green'}">{{result.error?'异常':'正常'}}</div>
      </template>
      返回值：{{result.result}}
      <p>全局变量：{{result.env}}</p>
      <p>代码：{{result.userCode}}</p>
      <p>执行情况：{{result.type}}</p>
      <p>耗费时间：{{result.costTime}}</p>
      <template #footer>
        <t-button @click="close">Close</t-button>
        <t-button @click="next">{{result.type === 'success'?'下一步':'结束'}}</t-button>
      </template>
    </t-card>
  </div>
</template>

<script setup>
import {computed, ref, onMounted} from "vue";
import {makeDraggable} from "@/core/utils/other.js";
let props = defineProps(['result','visible','id'])
let controlRef = ref(null)
let modalRef = ref(null)
let timer = 0
onMounted(()=>{
  makeDraggable(modalRef.value,controlRef.value)
})

let position = computed(()=>{
  if(!props.id.value){
    return  {x:0,y:0}
  }
  let pen = meta2d.findOne(props.id.value)
  const store = pen.calculative.canvas.store;
  const worldRect = pen.calculative.worldRect;
  let pos = {
    x: worldRect.x + store.data.x + worldRect.width / 2 + 'px',
    y: worldRect.y + store.data.y + 'px'
  };
  return pos
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
  }
  .title{
    cursor: pointer;
  }
</style>