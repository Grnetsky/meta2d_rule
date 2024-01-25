// 沙盒 局部作用于 用户代码执行的地方
import {deepClone} from "@meta2d/core";

export function scopedEval(scope, previous,expr,id) {
    // TODO 此处应当引入用户输入数据的全局变量！！！！！
    // 函数的参数名称与作用域的键相匹配，函数体是表达式
    try {
        let st = Date.now()
        // 默认返回data，用户定义的数据
        const func = new Function('data','prev'/*这是变量名列表*/, `${expr};`);
    // 将作用域的值作为参数传递
        let res = func(scope,previous)

        return {
            result:deepClone(res),
            userCode:expr,
            id:id,
            type:'success',
            costTime:Date.now()-st
        }
    } catch (e) {
        return {
            error:e.message,
            stack:e.stack,
            id:id,
            userCode:expr,
            type:'error'
        };
    }
}