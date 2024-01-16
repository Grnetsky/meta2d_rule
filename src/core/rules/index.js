// 基本规则
export const BasicMathRules = [
    // 加
    {
        type:"ADD", // type为类型
        symbol:"+", // 符号
        priority:1, // 优先级
        LHS:null, // 左操作数
        RHS:null // 右操作数
    },
    // 减
    {
        type:"SUB",
        symbol:"-",
        priority:1,
        LHS:null,
        RHS:null
    },
    // 乘
    {
        type:"MUL",
        symbol:"*",
        priority:1,
        LHS:null,
        RHS:null
    },
    // 除
    {
        type:"DIV",
        symbol:"/",
        priority:1,
        LHS:null,
        RHS:null
    }
]
// 基本关系规则
export const BasicRelationRules = [
    // 小于
    {
         type: "LT", // lower than
         symbol: "<",
         LHS: null,
         RHS: null
     },
    // 小于等于
    {
        type: "TE",
        symbol: "<=",
        LHS: null,
        RHS: null
    },
    // 大于
    {
         type: "GT",
         symbol: ">",
         LHS: null,
         RHS: null
    },
    // 大于等于
    {
        type: "GE",
        symbol: ">=",
        LHS: null,
        RHS: null
    },
    // 等于
    {
        type: "GQ",
        symbol: "==",
        LHS: null,
        RHS: null
    },
]

