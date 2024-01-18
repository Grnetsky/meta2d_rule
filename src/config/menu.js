import {DiagramParse} from "@/core/parser/diagram.js";

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
        title:'生成规则',
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
        event:'click',
        func(){
            DiagramParse(meta2d.data())
        }
    }]
}