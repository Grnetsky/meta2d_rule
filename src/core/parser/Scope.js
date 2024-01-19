// 沙盒 局部作用于 代码执行的地方
import {dialog} from "@/core/extension/meta2dExtension.js";

export function scopedEval(scope, expr) {

    // 函数的参数名称与作用域的键相匹配，函数体是表达式
    const func = new Function('data'/*这是变量名列表*/, `return ${expr};`);

    // 将作用域的值作为参数传递
    try {
        func(scope);
        return scope
    } catch (e) {
        dialog().update({
            theme:"danger",
            header: "错误",
            body:'[ScopedEval] Error: ' + e.message,
            onConfirm(){
                dialog().hide
            }
        });
        dialog().show
    }
}