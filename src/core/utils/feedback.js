import {dialog} from "@/core/utils/dialog.js";
import {flushPen} from "@/core/utils/color.js";
import {setLog} from "@/core/log/index.js";

export let errorObj = {}
export function ReportError(message, stack, code, id) {
    // 创建对话框
    errorObj.id = id
    let d = dialog({
        header: '错误报告',
        body: (h) => {
            // 使用h函数返回VNode
            return h('div', {}, [
                h('H4', {style:'color:red'}, ['错误信息',h('p',{},message)]),
                h('H4', {style:'color:blue'}, ['错误代码',h('p',{style:'color:tomato'},code)]),
                // h('p', {}, `错误堆栈：${stack}`)
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
    setLog()
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

function ReportWarn() {
    
}

