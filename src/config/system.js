import {scopedEval} from "@/core/parser/Scope.js";
import {errorObj, ReportError} from "@/core/utils/error.js";
import {dialog} from "@/core/utils/dialog.js";

export let executeMode = {
    'debug':executeDebug,
    'run':executeRun,
}

//  执行调试
function executeRun(queue) {
    let userdata = {index:1}
    // 停止动画
    meta2d.stopAnimate(errorObj.id)
    queue.reduce((prev,curr)=>{
        let curCode = meta2d.findOne(curr).rule.code
        console.log(curCode)
        let res = scopedEval(prev,curCode)
        if (res.error){
            ReportError(res.error,res.stack,res.userCode,curr)
            throw new Error('userCode Error')
        }
        return res
    },userdata)
    return userdata
}

// debug 调试模式
async function executeDebug(queue) {
    let userdata = {index:1}
    let userStop = false // 用户终止代码执行
    let generate = debugGenerator(queue)
    let generateCode = generate.next()
    while (!generateCode.done && userStop){
        // 若代码未执行完
        let curItem = generateCode.value
        let curCode = curItem.code
        let res = scopedEval(userdata,curCode)
        if (res.error){
            ReportError(res.error,res.stack,res.userCode,curItem.id)
            throw new Error('userCode Error') // 跳出reduce方法
        }
        // 获取用户下一步操作
        let { operate } = await getNextOperation()
        if(operate === 'next'){
            generateCode = generate.next()
        }
    }
    return userdata
}

function* debugGenerator(queue){
    for (let i = 0; i < queue.length; i++) {
        let code = meta2d.findOne(queue[i]).rule.code
        yield {
            id:queue[i],
            code
        }
    }
}


function getNextOperation() {
    return new Promise(resolve => {
        dialog({
            body:'下一步',
            onConfirm(){
                resolve({
                    operate:'next'
                })
            }
        })
    })
}