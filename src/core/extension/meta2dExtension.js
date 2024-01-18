import {deepClone, setLifeCycleFunc} from "@meta2d/core";
import {DialogPlugin} from "tdesign-vue-next";

let dialog = getDialogInstance()
export function init() {
    meta2d.on('add',(pens)=>{
        pens.forEach((pen)=>{
            if(!pen.type){
                if(!pen.rule){
                    console.error('pen must have rule')
                    return
                }
                pen.rule.index = meta2d.store.data.pens.length
                if(!pen.rule.dialogData){
                    pen.rule.dialogData = {
                        body:pen.name+pen.rule.index,
                        onConfirm(){
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
    return (pen)=>{
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
    let onConnectLine = (pen,e)=>{
        // 根据连接关系设置顺序
    }
    setLifeCycleFunc(pen,'onClick',onClick)
    setLifeCycleFunc(pen,'onConnectLine',onConnectLine)
}