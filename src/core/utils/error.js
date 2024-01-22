import {dialog} from "@/core/utils/dialog.js";
import {colorTransition} from "./color.js";
import {deepClone} from "@meta2d/core";

export let errorObj = {}
export function ReportError(message, stack, code, id) {
    // 创建对话框
    errorObj.id = id
    let d = dialog({
        header: '错误报告',
        body: (h) => {
            // 使用h函数返回VNode
            return h('div', {}, [
                h('p', {}, `错误信息：${message}`),
                h('p', {}, `错误代码：${code}`),
                h('p', {}, `错误堆栈：${stack}`)
            ]);
        },
        onConfirm() {
            d.hide()
        },
        buttons: [
            {
                text: '确定',
                primary: true
            }
        ]
    })
    d.show()

    // 设置日志系统

    // 反馈给用户
    feedbackWithUI(id)
}

function feedbackWithUI(id) {
    flushPen(id,{
        startColor:'#000000',
        endColor:'#FF0000',
        duration:1000,
        frames:20,
        alternate:true
    })
}

// 闪烁图元
function flushPen(id,config) {
    let {startColor,endColor,duration,frames,alternate} = config
    let pen = meta2d.findOne(id)
    let colors = colorTransition(startColor,endColor,frames)
    let colorFrames = colors.map((color)=>{
        return {duration: duration/frames, visible: true, flipX: false, flipY: false, color}
    })
    alternate?
        colorFrames = colorFrames.concat(deepClone(colorFrames).reverse()):''
    pen.frames = colorFrames
    meta2d.startAnimate(pen.id)
}
