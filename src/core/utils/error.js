import {dialog} from "@/core/utils/dialog.js";

export function ReportError(message,stack,code) {
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
        onConfirm(){
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
}