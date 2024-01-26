import {CustomError, errorObj, feedbackPenError, feedbackPenSuccess, ReportError} from "@/core/utils/feedback.js";
import {dialog} from "@/core/utils/dialog.js";
import {stopAnimation} from "@/core/utils/animate.js";
import {DebugGuide} from "@/components/DebugGuide/index.js";
import {IconBehaviourMap} from "@/config/icons.js";
import {getStart, setGoto} from "@/core/parser/diagram.js";
import {getErrorSuggest} from "@/config/suggest.js";

export const systemEnv = {
    env:'run',
    output:'',
}
export let executeMode = {
    'debug':executeDebug,
    'run':executeRun,
}

//  执行调试
function executeRun(start) {
    systemEnv.env = 'run'
    let userdata = JSON.parse(start.rule.input)
    // 初始化
    let behaviour = IconBehaviourMap[start.rule.type]
    let result = null
    try {
        result = behaviour.behavior(userdata,undefined,start.rule,start.id)
    }catch (e) {
        result = {
            type:'runtime',
            error:e.name,
            message:e.message,
            ...e.data,
            suggest: getErrorSuggest(e.message)
        }
    }
    return result
}

// debug 调试模式
async function executeDebug(start) {
    systemEnv.env = 'debug'
    let userdata = JSON.parse(start.rule.input)
    let debugGuide = DebugGuide().show()

    let behaviour = IconBehaviourMap[start.rule.type]
    let generator = behaviour.debug(userdata,undefined,start.rule,start.id)
    let generateResult = generator.next()
    let id = 0
    while (!generateResult.done){
        // 获取用户下一步操作
        // 若代码未执行完
        let result = generateResult.value.result
        id = generateResult.value.id
        debugGuide.next(id,result,generateResult.done)
        // 异常处理
        if (result.error){
            feedbackPenError(id)
        }else {
            feedbackPenSuccess(id)
        }
        // 获取用户下一步操作 TODO 若用户一直不操作，会导致promise未得到解决而使内存泄漏
        let { operate } = await getNextOperation(debugGuide)
        // 用户点击执行下一步
        if(operate === 'next'){
            stopAnimation(id)
            generateResult = generator.next()

        }else {
            // 用户点击其他行为
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
    systemEnv.env = 'run';
    systemEnv.output = ''
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
export function recurseExecute(env,prev,rule,id) {
    let behaviour = IconBehaviourMap[rule.type]
    let result = behaviour.behavior(env,prev,rule,id)
    // 执行代码时代码发生错误
    if (result.error){
        // 抛出异常
        throw CustomError(result.message,result)
    }

    // 此处应当寻找下一个执行的目标
    setGoto(result.id)
    // 深度优先
    let goto = rule.goto;
    goto.forEach(item =>{
        result = recurseExecute(env,result.result,meta2d.findOne(item).rule,item)
    })
    return result
}

export function* recurseExecuteDebug(env, prev, rule, id) {
    let behaviour = IconBehaviourMap[rule.type];
    let result = behaviour.behavior(env, prev, rule, id);
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
                yield* recurseExecuteDebug(env, result.result, childRule, item);
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

// 保存规则流程
export function save(data) {
    // TODO 如何设计数据类型??
    //  检验图纸数据是否合法
    systemInit()
    let start = getStart(meta2d.store.data);
    // TODO 此处返回值永远不会为error
    let result = executeMode.run(start)
    if(result.error){
        ReportError('save',result)
        return false
    }else {
        
        return true
    }
}