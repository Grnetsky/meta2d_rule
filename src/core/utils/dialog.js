import {isPen} from "@/core/utils/is.js";
import {reactive} from "vue";
import {deepClone, setter} from "@meta2d/core";
import {IconComponentMap} from "@/config/icons.js";
import {DialogPlugin} from "tdesign-vue-next";

export let dialog = getDialogInstance()

export function getDialogInstance() {
    let target = null;
    let dialog = null;
    return (pen)=>{
        target = pen;
        let init = undefined
        isPen(target)?
            init = getDialogData(pen)
            :
            init = target
        if(dialog){
            dialog.destroy()
        }
        dialog = DialogPlugin(init)
        dialog.hide()
        return dialog
    }
}

function getDialogData(pen) {
    let reactivePen = reactive(deepClone(pen))
    switch (pen.rule.type){
        case 'action':
            return {
                header:pen.id,
                body:(h)=>{
                    return h(IconComponentMap[pen.rule.type],{
                        pen:reactivePen,
                        onUpdateValue:updatePenProp(reactivePen)
                    })
                },
                width:'50%',
                onConfirm(){
                    console.log('写入数据')
                    save(reactivePen,pen)
                    dialog(pen).hide()
                }
            }
        case 'start':
            return {
                header:pen.id,
                body:(h)=>{
                    return h(IconComponentMap[pen.rule.type],{
                        pen:reactivePen,
                        onUpdateValue:updatePenProp(reactivePen)
                    })
                },
                width:'50%',
                onConfirm(){
                    console.log('写入数据')
                    save(reactivePen,pen)
                    dialog(pen).hide()
                }
            }
        case 'rule':
            return {
                header:pen.id,
                body:(h)=>{
                    return h(IconComponentMap[pen.rule.type],{
                        pen:reactivePen,
                        onUpdateValue:updatePenProp(reactivePen)
                    })
                },
                width:'50%',
                onConfirm(){
                    console.log('写入数据')
                    save(reactivePen,pen)
                    dialog(pen).hide()
                }
            }
        case 'end':
            return {
                header:pen.id,
                body:(h)=>{
                    return h(IconComponentMap[pen.rule.type],{
                        pen:reactivePen,
                        onUpdateValue:updatePenProp(reactivePen)
                    })
                },
                width:'50%',
                onConfirm(){
                    console.log('写入数据')
                    save(reactivePen,pen)
                    dialog(pen).hide()
                }
            }
    }
}

function updatePenProp(reactivePen) {
    return (v)=>{
        // let originPen = meta2d.findOne(reactivePen.id)
        // meta2d.setValue({
        //     id:originPen.id,
        //     [v.prop]:v.value
        // })
        !reactivePen.changeMap && (reactivePen.changeMap = new Map())
        reactivePen.changeMap.set(v.prop,v.value)
        setter(reactivePen,v.prop,v.value)
    }
}
function save(reactivePen,pen) {
    let changeMap = reactivePen.changeMap
    if(changeMap){
        changeMap.forEach((v,k)=>{
            setter(pen,k,v)
        })
    }
}