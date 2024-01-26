<script setup>
import CodeEditor from "@/components/MonacoEditor/CodeEditor.vue";

let props = defineProps(['data'])
</script>

<template>
          <!--          输入框-->
          <t-input :label="data.title" :value="data.bindProp[data.prop]" :placeholder="data.option?.placeholder || '请输入'" v-if="data.type==='input'" @[data.event]="data.func" :type="data.option?.type||'text'"/>
<!--          文件框-->
            <t-button v-else-if="data.type==='file'"><label :for="data.for" >
              <input :id="data.for" style="display: none" type="file" :accept="data.option?.accept || '*/*'" @[data.event]="data.func" >
                选择文件
              </label>
            </t-button>
<!--          数字框-->
          <t-input-number :label="data.title" auto-width theme="column" :placeholder="data.option?.placeholder || '请输入'" :step="data.option?.step || 1" v-model="data.bindProp[data.prop]" :min="data.option?.min ?? -Infinity" :max="data.option?.max ?? Infinity" @[data.event]="data.func" v-else-if="data.type==='number'"/>
<!--          选择框-->
          <t-select v-model="data.bindProp[data.prop]" :placeholder="data.option.placeholder" v-else-if="data.type==='select'" @[data.event]="data.func">
            <t-option
                v-for="item in data.option.list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
            >
             <div v-if="item.template" class="select_template" v-html="item.template"></div>
            </t-option>
          </t-select>

<!--          取色器-->
          <t-color-picker v-model="data.bindProp[data.prop]" show-alpha v-else-if="data.type === 'color'" @[data.event]="data.func"/>
<!--          开关-->
          <t-switch v-model="data.bindProp[data.prop]" v-else-if="data.type==='switch'" @[data.event]="data.func"/>

<!--          按钮-->
          <t-button :type="data.option.type" v-else-if="data.type === 'button'" @[data.event]="data.func" :style="data.middle?'width:100%;margin: auto;':''">{{data.option.title}}</t-button>
          <CodeEditor :language="data.language" v-else-if="data.type === 'code'" :code="data.bindProp[data.prop]" @[data.event]="data.func"></CodeEditor>
</template>

<style scoped>
:deep(.el-collapse-item__header) {
  font-weight: 1000;
}
:deep(.el-collapse-item__content){
  margin-right: 15px;
}
</style>