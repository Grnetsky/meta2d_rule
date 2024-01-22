import {deepClone, setLifeCycleFunc, setter} from "@meta2d/core";
import {DialogPlugin} from "tdesign-vue-next";
import {IconComponentMap} from "@/config/icons.js";
import {reactive} from "vue";
import {isPen} from "@/utils.js";
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
                combineLifeCycle(pen);
            }
        })
    })
}

/**
 * @description 获取dialog实例对象 若传参为pen对像*/
function getDialogInstance() {
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
function combineLifeCycle(pen) {
    let onClick = (pen)=>{
        // 显示弹出层
        dialog(pen).show()
    }
    setLifeCycleFunc(pen,'onClick',onClick)
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
            break;
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
            break;
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
            break;
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
            break;
        case 'cascader':
    }
}