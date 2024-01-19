<script setup>
const {data:i} = defineProps(['data'])
</script>

<template>
          <!--          输入框-->
          <t-input v-model="i.bindProp[i.prop]" :placeholder="i.option?.placeholder || '请输入'" v-if="i.type==='input'" @[i.event]="i.func" :type="i.option?.type||'text'"/>
<!--          文件框-->
            <t-button v-else-if="i.type==='file'"><label :for="i.for" >
              <input :id="i.for" style="display: none" type="file" :accept="i.option?.accept || '*/*'" @[i.event]="i.func" >
                选择文件
              </label>
            </t-button>
<!--          数字框-->
          <t-input-number :placeholder="i.option?.placeholder || '请输入'" :step="i.option?.step || 1" v-model="i.bindProp[i.prop]" :min="i.option?.min ?? -Infinity" :max="i.option?.max ?? Infinity" @[i.event]="i.func" v-else-if="i.type==='number'"/>
<!--          选择框-->
          <t-select v-model="i.bindProp[i.prop]" :placeholder="i.option.placeholder" v-else-if="i.type==='select'" @[i.event]="i.func">
            <t-option
                v-for="item in i.option.list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
            >
             <div v-if="item.template" class="select_template" v-html="item.template"></div>
            </t-option>
          </t-select>

<!--          取色器-->
          <t-color-picker v-model="i.bindProp[i.prop]" show-alpha v-else-if="i.type === 'color'" @[i.event]="i.func"/>
<!--          开关-->
          <t-switch v-model="i.bindProp[i.prop]" v-else-if="i.type==='switch'" @[i.event]="i.func"/>

<!--          按钮-->
          <t-button :type="i.option.type" v-else-if="i.type === 'button'" @[i.event]="i.func" :style="i.middle?'width:100%;margin: auto;':''">{{i.option.title}}</t-button>
</template>

<style scoped>
:deep(.el-collapse-item__header) {
  font-weight: 1000;
}
:deep(.el-collapse-item__content){
  margin-right: 15px;
}
</style>