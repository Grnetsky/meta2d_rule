import {dialog} from "@/core/utils/dialog.js";
import {flushPen} from "@/core/utils/color.js";
import {setLog} from "@/core/log/index.js";

export let errorObj = {}
export function ReportError(type, {message, stack, code, id,suggest}) {
    // 创建对话框
    let d = null
    switch (type){
        case 'userCode':
            errorObj.id = id
            d = dialog({
                header: '代码错误',
                body: (h) => {
                    // 使用h函数返回VNode
                    return h('div', {}, [
                        h('H4', {style:'color:red'}, ['错误信息',h('p',{},message)]),
                        h('H4', {style:'color:blue'}, ['错误代码',h('p',{style:'color:tomato'},code)]),
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
            feedbackPenError(id)
            break
        case 'parse':
            d = dialog({
                header:"解析错误",
                body: (h) => {
                    // 使用h函数返回VNode
                    return h('div', {}, [
                        h('H4', {style:'color:red'}, ['错误信息： '+message]),
                        h('H4', {style:'color:orange'}, ['建议： '+suggest]),
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
            id && feedbackPenError(id)
            break
        case 'runtime':
            d = dialog({
                header:'运行时错误',
                body: (h) => {
                    // 使用h函数返回VNode
                    return h('div', {}, [
                        h('H4', {style:'color:red'}, ['错误信息',h('p',{},message)]),
                        h('H4', {style:'color:orange'}, ['建议 ',h('p',{},suggest)]),
                    ])}
            })
            break
        default:
            d = dialog({
                header:'未知错误',
                body: (h) => {
                    // 使用h函数返回VNode
                    return h('div', {}, [
                        h('H4', {style:'color:red'}, ['错误信息',h('p',{},message)])])}
            })
    }
    d.show()

    // 设置日志系统
    setLog()
    // 反馈给用户
}

export function feedbackPenError(id) {
    flushPen(id,{
        startColor:'#000000',
        endColor:'#FF0000',
        duration:1000,
        frames:20,
        alternate:true
    })
}

export function feedbackPenSuccess(id){
    flushPen(id,{
        startColor:'#000000',
        endColor:'#00d721',
        duration:1000,
        frames:20,
        alternate:true
    })
}

export function feedbackPenWarn(id){
    flushPen(id,{
        startColor:'#000000',
        endColor:'#ff6a00',
        duration:1000,
        frames:20,
        alternate:true
    })
}

