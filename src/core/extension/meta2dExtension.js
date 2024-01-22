import {setLifeCycleFunc} from "@meta2d/core";
import {dialog} from "@/core/utils/dialog.js";
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
function combineLifeCycle(pen) {
    let onClick = (pen)=>{
        // 显示弹出层
        dialog(pen).show()
    }
    setLifeCycleFunc(pen,'onClick',onClick)
}


