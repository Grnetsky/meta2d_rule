import {setLifeCycleFunc} from "@meta2d/core";
import {DialogPlugin} from "tdesign-vue-next";
import {IconComponentMap, IconsForm} from "@/config/icons.js";
import DialogForms from "@/components/DialogForms.vue";
export let dialog = getDialogInstance()
export function init() {
    meta2d.on('add',(pens)=>{
        pens.forEach((pen)=>{
            if(!pen.type){
                if(!pen.rule){
                    console.error('pen must have rule prop')
                    return
                }
                pen.rule.index = meta2d.store.data.pens.length
                pen.rule.id = pen.id
                if(!pen.rule.dialogData){
                    pen.rule.dialogData = {
                        header:pen.id,
                        body:(h)=>{
                            return h(IconComponentMap[pen.rule.type],{
                                onUpdate:updatePenProp
                            })
                        },
                        onConfirm(){
                            console.log('写入数据')
                            dialog(pen).hide()
                        }
                    }
                }
                combineLifeCycle(pen);
            }
        })
    })
}
function getDialogInstance() {
    let target = null;
    let dialog = DialogPlugin()
    dialog.hide()
    return (pen = null)=>{
        target = pen;
        return dialog
    }
}
function combineLifeCycle(pen) {
    let onClick = (pen)=>{
        // 显示弹出层
        dialog(pen).update(pen.rule.dialogData)
        dialog(pen).show()
    }
    setLifeCycleFunc(pen,'onClick',onClick)
}

function updatePenProp() {
    console.log('updateProp')
}