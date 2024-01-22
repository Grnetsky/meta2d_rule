<template>
    <div ref="monacoDom" class="monaco"></div>

</template>

<script lang="js">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
} from 'vue';
import { monaco } from './customMonaco.js';

export default defineComponent({
  name: 'EditorModal',
  props: {
    code: {
      type: String,
      default: () => {
        return '';
      },
    },
    language: {
      type: String,
      default: () => {
        return 'javascript';
      },
      validator: (value) => {
        // 这个值必须匹配下列字符串中的一个
        return ['javascript', 'json', 'markdown'].includes(value);
      },
    },
    placeholder: {
      type: String,
      default: () => {
        return '';
      },
    },
  },
  emits: ['changeCode'],
  setup(props, { emit }) {
    const curTheme = 'vs-dark'; // 暗主题
    const monacoDom = ref(null);

    let editor = null;
    onMounted(() => {
      if (!editor) {
        editor = monaco.editor.create(monacoDom.value, {
          theme: curTheme,
          automaticLayout: true,
          language: props.language,
        });
      }
      // 可见状态
      editor.setValue(props.code);
      monaco.editor.setModelLanguage(editor.getModel(), props.language);
      editor.onDidChangeModelContent((event) => {
        emit('changeCode', editor.getValue())
      });

          // 格式化
      setTimeout(() => {
        editor.getAction(['editor.action.formatDocument']).run();
      }, 300);
    }
    );
    onUnmounted(() => {
      editor?.dispose();
    });

    return { monacoDom };
  },
});
</script>

<style>
    .monaco {
      height: 300px;
    }
</style>
