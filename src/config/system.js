import {scopedEval} from "@/core/parser/Scope.js";
import {errorObj, ReportError} from "@/core/utils/feedback.js";
import {dialog} from "@/core/utils/dialog.js";
import {flushPen} from "@/core/utils/color.js";
import {stopAnimation} from "@/core/utils/animate.js";
import {DebugGuide} from "@/components/DebugGuide/index.js";
import {IconBehaviourMap} from "@/config/icons.js";

export let executeMode = {
    'debug':executeDebug,
    'run':executeRun,
}

//  执行调试
function executeRun(queue) {
    let userdata = {index:1}
    // 初始化
    systemInit()
    let res = queue.reduce((prev,curr)=>{
        // 此处只设置对于action类型的处理情况，未做解耦处理
        let curIcon = meta2d.findOne(curr)
        let behaviour = IconBehaviourMap[curIcon.rule.type] // 获取当前图标的行为
        return behaviour.behavior(prev,curIcon.rule,curIcon.id)
    },userdata)
    return res
}

// debug 调试模式
async function executeDebug(queue) {
    let userdata = {index:1}
    systemInit()
    let userStop = false // 用户终止代码执行
    let generate = debugGenerator(queue)
    let generateCode = generate.next()
    let debugGuide = DebugGuide({
        onNext(){
            console.log('next,xxxxxxxx')
        }
    }).show()
    while (!generateCode.done && !userStop){
        // 若代码未执行完
        let curItem = generateCode.value
        let curCode = curItem.code

        let res = scopedEval(userdata,curCode)
        if (res.error){
            // ReportError(res.error,res.stack,res.userCode,curItem.id)
            flushPen(curItem.id,{
                startColor: '#000000',
                endColor: '#fd0000',
                duration:1000,
                frames:60,
                alternate:true
            })
            debugGuide.next(curItem.id,res)
            throw new Error('userCode Error') // 跳出reduce方法
        }else {
            flushPen(curItem.id,{
                startColor: '#000000',
                endColor: '#01fd53',
                duration:1000,
                frames:60,
                alternate:true
            })
        }
        debugGuide.next(curItem.id,res)
        // 获取用户下一步操作
        let { operate } = await getNextOperation(debugGuide,res,curItem.id)
        // 用户点击执行下一步
        if(operate === 'next'){
            generateCode = generate.next()
            stopAnimation(curItem.id)
        }else {
            debugGuide.destroy()
            terminateCode(curItem)
            // 程序退出
            break
        }
    }
    dialog().hide()
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


function getNextOperation(debugGuide,res,id) {
    return new Promise(resolve => {
        debugGuide.setResolve(resolve)
    })
}

function systemInit() {
    // 初始化
    stopAnimation(errorObj.id)
}

function terminateCode(curItem) {
    stopAnimation(curItem.id)
}