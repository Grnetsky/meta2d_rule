import ActionDialog from "@/components/DialogForms/ActionDialog.vue";
import StartDialog from "@/components/DialogForms/StartDialog.vue";
import RuleDialog from "@/components/DialogForms/RuleDialog.vue";
import EndDialog from "@/components/DialogForms/EndDialog.vue";

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
                type:'rule',
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
    'rule': RuleDialog,
}
