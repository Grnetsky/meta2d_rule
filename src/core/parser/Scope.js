// 沙盒 局部作用于 代码执行的地方
export function scopedEval(scope, expr) {
    // TODO 此处应当引入用户输入数据的全局变量！！！！！
    // 函数的参数名称与作用域的键相匹配，函数体是表达式
    try {
        const func = new Function('data'/*这是变量名列表*/, `${expr};return data;`);
    // 将作用域的值作为参数传递
        return func(scope)
    } catch (e) {
        return {
            error:e.message,
            stack:e.stack,
            userCode:expr
        };
    }
}