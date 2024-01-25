import {scopedEval} from "@/core/parser/Scope.js";
import {errorObj, feedbackPenError, feedbackPenSuccess, ReportError} from "@/core/utils/feedback.js";
import {dialog} from "@/core/utils/dialog.js";
import {flushPen} from "@/core/utils/color.js";
import {stopAnimation} from "@/core/utils/animate.js";
import {DebugGuide} from "@/components/DebugGuide/index.js";
import {IconBehaviourMap} from "@/config/icons.js";
import {setGoto} from "@/core/parser/diagram.js";

export const systemEnv = {
    env:'run'
}
export let executeMode = {
    'debug':executeDebug,
    'run':executeRun,
}

//  执行调试
function executeRun(start) {
    systemEnv.env = 'run'
    let userdata = {index:1}
    // 初始化
    let behaviour = IconBehaviourMap[start.rule.type]
    let result = behaviour.behavior(userdata,start.rule,start.id)
    console.log(result,'rrrrrrrrr')
    // 异常处理

    // let res = queue.reduce((prev,curr)=>{
    //     // 此处只设置对于action类型的处理情况，未做解耦处理
    //     let curIcon = meta2d.findOne(curr)
    //     let behaviour = IconBehaviourMap[curIcon.rule.type] // 获取当前图标的行为
    //     return behaviour.behavior(prev,curIcon.rule,curIcon.id)
    // },userdata)
    return result
}

// debug 调试模式
async function executeDebug(start) {
    systemEnv.env = 'debug'
    let userdata = {index:1}
    let debugGuide = DebugGuide().show()

    let generateResult = {value:{},done:false}
    let behaviour = IconBehaviourMap[start.rule.type]
    let generator = behaviour.debug(userdata,start.rule,start.id)
    while (!generateResult.done){
        generateResult = generator.next()
        // 获取用户下一步操作
        // 若代码未执行完
        console.log(generateResult,'generateResult')
        let result = generateResult.value.result
        let id = generateResult.value.id
        debugGuide.next(id,result)
        // 异常处理
        if (result.error){
            feedbackPenError(id)
        }else {
            feedbackPenSuccess(id)
        }
        // 获取用户下一步操作
        let { operate } = await getNextOperation(debugGuide)
        // 用户点击执行下一步
        if(operate === 'next'){
            stopAnimation(id)
        }else {
            // 用户点击其他行为
            debugGuide.destroy()
            stopAnimation(id)
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


function getNextOperation(debugGuide) {
    return new Promise(resolve => {
        debugGuide.setResolve(resolve)
    })
}

export function systemInit() {
    // 初始化
    let pens = meta2d.store.data.pens.filter(pen=>!pen.type)
    pens.forEach(i=>{
        i.rule.goto = []
    })
    stopAnimation(errorObj.id)
}

function terminateCode(curItem) {
    stopAnimation(curItem.id)
}


// 递归调用
export function recurseExecute(env,rule,id) {
    let behaviour = IconBehaviourMap[rule.type]
    let result = behaviour.behavior(env,rule,id)
    if (result.error){
        ReportError('userCode',{message:result.error,stack:result.stack,code:result.userCode,id:result.id})
        throw new Error('userCode Error')
    }

    // 此处应当寻找下一个执行的目标
    setGoto(result.id)
    // 深度优先
    let goto = rule.goto;
    goto.forEach(item =>{
        result = recurseExecute(env,meta2d.findOne(item).rule,item)
    })
    return result
}

export function* recurseExecuteDebug(env, rule, id) {
    let behaviour = IconBehaviourMap[rule.type];
    let result = behaviour.behavior(env, rule, id);
    yield {
        result,
        id
    };
    setGoto(result.id)
    // 深度优先
    let goto = rule.goto;
    if (goto.length === 0) {
        // 递归的基本情况
        return {
            result,
            id
        };
    }

    // let results = [result]; // 收集所有结果
    for (let item of goto) {
        try {
            let childRule = meta2d.findOne(item).rule;
            if (childRule) {
                // 使用 yield* 递归子生成器
                yield* recurseExecuteDebug(env, childRule, item);
            }
        } catch (error) {
            console.error("An error occurred during recursion", error);
            // 处理错误或提前终止递归
            break;
        }
    }
    // 可以选择将所有结果合并返回
    return {
        result,
        id
    };
}
