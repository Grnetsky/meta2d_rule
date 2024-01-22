import {dialog} from "@/core/utils/dialog.js";

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
    let pen = meta2d.findOne(id)
    pen.frames = [
        {duration: 200, visible: true, flipX: false, flipY: false, color: 'rgba(0, 0, 0, 1)'},
        {duration: 200, visible: true, flipX: false, flipY: false, color: 'rgba(66, 0, 0, 1)'},
        {duration: 200, visible: true, flipX: false, flipY: false, color: 'rgba(117, 1, 1, 1)'},
        {duration: 200, visible: true, flipX: false, flipY: false, color: 'rgba(184, 0, 0, 1)'},
        {duration: 200, visible: true, flipX: false, flipY: false, color: 'rgba(255, 0, 0, 1)'},
        {duration: 200, visible: true, flipX: false, flipY: false}
    ]
        meta2d.startAnimate(pen.id)
}
