import {createApp, ref,reactive} from 'vue';
import DebugGuideComponent from './DebugGuide.vue';
import {stopAnimation} from "@/core/utils/animate.js";

// 命令式debug引导组件
export function DebugGuide(props) {
    const options = {...props}
    let mountNode = null
    const visible = ref(false);
    const { onNext,result} = options;
    const penId = ref('')
    const resultReactive = reactive(result || {
        result:{},
        userCode:'',
        costTime:'',
        env:'',
        type:'',
        noReport:false,
        done:false,
        error:undefined
    })
    const show = () => {
        visible.value = true;
        return DebugGuide.instance
    }
    const hide = () => {
        visible.value = false;
        return DebugGuide.instance
    }
    const destroy = () => {
        DebugGuide.__resolve({
            operate:'terminate'
        })
        DebugGuide.instance.unmount(); // 卸载组件
        stopAnimation(penId.value)
        document.body.removeChild(mountNode); // 清除挂载点
        DebugGuide.instance = null
    }
    const next = (id,result,done) => {
        penId.value = id
        resultReactive.result = result.result
        resultReactive.userCode = result.userCode
        resultReactive.costTime = result.costTime
        resultReactive.type = result.type
        resultReactive.error = result.error
        resultReactive.env = result.env
        resultReactive.done = done
        resultReactive.noReport = result.noReport
        return DebugGuide.instance
    };
    const setResolve = (resolve) => {
        DebugGuide.__resolve = resolve
    }
    const awaitNext = () => {
        DebugGuide.__resolve({
            operate:'next'
        })
    }
    if (!DebugGuide.instance) {
        DebugGuide.instance = createApp(DebugGuideComponent, {
            visible,
            result:resultReactive,
            id:penId,
            onClose: destroy,
            onNext: onNext,
            onAwaitNext:awaitNext,
        });
        // 创建挂载点
        mountNode = document.createElement('div');
        document.body.appendChild(mountNode);
        // 挂载组件
        DebugGuide.instance.mount(mountNode);
        DebugGuide.instance.show = show
        DebugGuide.instance.next = next
        DebugGuide.instance.setResolve = setResolve
        DebugGuide.instance.destroy = destroy
        DebugGuide.instance.hide = hide
    }
    // 创建组件实例，`createApp` 需要组件选项
    return DebugGuide.instance
}