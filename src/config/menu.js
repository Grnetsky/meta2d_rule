import {DiagramParse} from "@/core/parser/diagram.js";
import {dialog} from "@/core/utils/dialog.js";
import {executeMode, systemInit} from "@/core/system/system.js";
import {ReportError} from "@/core/utils/feedback.js";

export const basicMaterials = [
    {
        title:'配置规则',
        icon:'map-ruler',
        value:'0',
        route:'configRule',
        event: 'click',
        func(instance){
            instance.emit('setCollapsed',false)
        }
    },
    // {
    //     title:'调度平台',
    //     icon:'',
    //     value:'1',
    //     children:[
    //         {
    //             title:'二级菜单1',
    //             icon:'',
    //             value:'1-0',
    //             route:'plant1'
    //         },
    //         {
    //             title:'二级菜单2',
    //             icon:'',
    //             value:'1-1',
    //             children:[
    //                 {
    //                     title:'三级菜单1',
    //                     icon:'',
    //                     value:'1-0',
    //                     route:'plant1-1'
    //                 },
    //                 {
    //                     title:'三级菜单2',
    //                     icon:'',
    //                     value:'1-1',
    //                     route:'plant1-2'
    //                 }
    //             ]
    //         },
    //     ]
    // },
    {
        title:'设计流程',
        icon:'edit-2',
        value:'1',
        route:'design',
        event:'click',
        func(instance){
            instance.emit('setCollapsed',true)
        }
    },
]
export const basicNavList = {
    logo:{
        src:'https://assets.le5lecdn.com/2d/img/logo.png',
        height:40,
        alt:'logo'
    },
    defaults:[{
        title:'生成代码',
        icon:'',
        value:'1-1',
        event:'click',
        func(){
            alert('click')
        }
    },],
    operations:[{
        icon:'play-circle',
        size:'25px',
        value:'2-1',
        event:'click',
        func(){
            systemInit()
            let start = DiagramParse(meta2d.store.data);
            // TODO 此处返回值永远不会为error
            if(start.error){
                ReportError('parse',{message:start.error,suggest:start.suggest})
                return
            }
            let result = executeMode.run(start)
            if(result.error){
                ReportError('runtime',{message:result.error,suggest:result.suggest,})
            }else {
                let d = dialog({
                        body:"执行结果为: " + JSON.stringify(result),
                        header:"成功",
                        theme:"success",

                    },
                )
                d.show()
            }
        }
    },{
        icon:'bug',
        size:'25px',
        value:'2-2',
        event:'click',
        func(){
            systemInit()
            let start = DiagramParse(meta2d.store.data)
            if(start.error){
                ReportError('parse',{message:start.error,suggest:start.suggest})
                return
            }
            executeMode.debug(start).then(()=>{
                console.log('debug over')
            }) // 执行debug
        }
    }]
}