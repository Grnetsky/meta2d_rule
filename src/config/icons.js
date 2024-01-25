import ActionDialog from "@/components/DialogForms/ActionDialog.vue";
import StartDialog from "@/components/DialogForms/StartDialog.vue";
import RuleDialog from "@/components/DialogForms/RuleDialog.vue";
import EndDialog from "@/components/DialogForms/EndDialog.vue";
import {scopedEval} from "@/core/parser/Scope.js";
import {ReportError} from "@/core/utils/feedback.js";
import {recurseExecute, recurseExecuteDebug, systemEnv} from "@/config/system.js";
import {deepClone} from "@meta2d/core";
import {setGoto} from "@/core/parser/diagram.js";

export const BasicIcon = [
    {
        name: 'rectangle',
        icon: 'l-rectangle',
        text: '开始/输入',
        data:{
            name: 'rectangle',
            width: 200,
            height: 50,
            text:'开始/输入',
            borderRadius: 20,
            rule:{
                type:'start',
                input:'',
                goto:[],
                code:''
            }
        }
    },
    {
        name: 'circle',
        icon: 'l-circle',
        text: '结束',
        data:{
            name: 'circle',
            width: 100,
            height: 100,
            text:'结束',
            rule:{
                type:'end',
                goto:[],
                input:'',
                code:''
            }
        }
    },
    {
        name: 'diamond',
        icon: 'l-diamond',
        text: '判断',
        data:{
            name: 'diamond',
            width: 200,
            height: 100,
            text:'判断',
            rule:{
                type:'if',
                goto:[],
                input:'',
                code:''
            }
        }
    },
    {
        name: 'rectangle',
        icon: 'l-rectangle',
        text: '行为',
        size: '100px',
        data:{
            name: 'rectangle',
            width: 200,
            height: 50,
            text:'行为',
            rule:{
                type:'action',
                goto:[],
                input:'',
                code:'data.index += 1',
                data:{
                    code:''
                }
            }
        }
    }
]

export const IconsForm = {
    'action':[
        {
            label: '代码',
            type: 'input',
            event:'change',
            func:(...args)=>{
                console.log(args)
                console.log('代码改变了')
            }
        }
    ]
}

// TODO 此对象仿佛多余了
export let IconComponentMap = {
    'action': ActionDialog,
    'start': StartDialog,
    'end': EndDialog,
    'if': RuleDialog,
}

// 定义每个图元的行为
export let IconBehaviourMap = {

    'action': {
        /**
         * @description 此行为执行函数，可以为用户定义的函数，也可以为用户设置的逻辑行为
         * */
        behavior:(env,rule,id)=>{
            let curCode = rule.code
            let res = scopedEval(env,curCode,id)
            return res
        }
    },

    'start': {
        /**
         * @description 此处进行代码的递归执行*/
        behavior:(env,rule,id)=>{
            if (systemEnv.env === 'run'){
                // 开始往下执行
                let result = null
                setGoto(id)
                let goto = rule.goto;
                goto.forEach(item =>{
                    result = recurseExecute(env,meta2d.findOne(item).rule,item)
                })
                return result
            }else {
                return {
                    result:deepClone(env),
                    type:'success',
                    id
                }}

        },
        debug(env,rule,id){
            return recurseExecuteDebug(env,meta2d.findOne(id).rule,id)
        }
    },

    'end': {
        behavior:(env,rule,id)=>{

        }
    },

    'if': {
        behavior:(env,rule,id)=>{

        }
    },
}
