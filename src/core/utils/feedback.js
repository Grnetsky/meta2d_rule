import {dialog} from "@/core/utils/dialog.js";
import {flushPen} from "@/core/utils/color.js";
import {setLog} from "@/core/log/index.js";

export let errorObj = {}
export function ReportError(type, {message, stack, userCode, id,suggest}) {
    // 创建对话框
    let d = null
    switch (type){
        case 'userCode':
            errorObj.id = id
            d = dialog({
                header: '代码错误',
                theme:'danger',
                body: (h) => {
                    // 使用h函数返回VNode
                    return h('div', {}, [
                        h('H4', {style:'color:red'}, ['错误信息',h('p',{},message)]),
                        h('H4', {style:'color:blue'}, ['错误代码',h('p',{style:'color:tomato'},userCode)]),
                        // h('p', {}, `错误堆栈：${stack}`),
                        h('H4', {style:'color:orange'}, ['建议： '+suggest]),

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
            break
        case 'parse':
            d = dialog({
                header:"解析错误",
                theme:'danger',
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
            break
        case 'runtime':
            d = dialog({
                header:'运行时错误',
                theme:'danger',
                body: (h) => {
                    // 使用h函数返回VNode
                    return h('div', {}, [
                        h('H4', {style:'color:red'}, ['错误信息',h('p',{},message)]),
                        h('H4', {style:'color:orange'}, ['建议 ',h('p',{},suggest)]),
                    ])},
                onConfirm() {
                    d.hide()
                }
            })
            break
        case 'save':
            d = dialog({
                header:'保存失败',
                theme:'danger',
                body: (h) => {
                    // 使用h函数返回VNode
                    return h('div', {}, [
                        h('H4', {style:'color:red'}, ['错误信息',h('p',{},message)]),
                        h('H4', {style:'color:orange'}, ['建议 ',h('p',{},suggest)]),
                    ])},
                onConfirm() {
                    d.hide()
                }
            })
            break
        default:
            d = dialog({
                header:'未知错误',
                theme:'danger',
                body: (h) => {
                    // 使用h函数返回VNode
                    return h('div', {}, [
                        h('H4', {style:'color:red'}, ['错误信息',h('p',{},message)])]
                    )},
                onConfirm() {
                    d.hide()
                }
            })
    }
    d.show()

    // 设置日志系统
    setLog()
    // 反馈给用户
    id && feedbackPenError(id)
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

export function CustomError(message, data) {
    const error = new Error(message);
    error.data = data;
    return error;
}