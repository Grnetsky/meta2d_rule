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
            }
        }
    }
]