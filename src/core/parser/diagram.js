// 图表解析，生成程序关系

/**
 * @description 通过此方法来将meta2d中的图形转换为对应的程序
 * @param map { Meta2dData } 图纸信息
 * @return sting 返回程序关系信息 自定义的语法规则*/
export function DiagramParse (map){
    // 图论
    let graph = new Graph()
    console.log('parser',map)
    let pens = map.pens
    // 先处理一个输入的
    let startPen = pens.find(pen=>pen.rule?.type === 'start')
    return '';
}

// 基于数组的队列(性能不高)
class Queue{
    //属性
    item = []
    //方法
    enQueue(ele){
        this.item.push(ele)
    }
    deQueue(){
        return this.item.shift() //删除后元素会自动往前移 性能不高
    }
    front(){
        return this.item[0]
    }
    isEmpty(){
        return this.item.length === 0
    }
    size(){
        return this.item.length
    }
    toString(){
        return this.item.join(' ')
    }
}
class Graph{
    // 属性 顶点（数组）/ 边（字典或对象或map）
    #vertexes = []  //点
    #edges = new Map() // 边
    addVertexes(v){
        this.#vertexes.push(v) //
        this.#edges.set(v,[]) // 初始化
    }
    /**
     * @param v1 第一个顶点
     * @param v2 第二个顶点*/
    addEdges(v1,v2){
        this.#edges.get(v1).push(v2) // 有向图 单向
        // this.#edges.get(v2).push(v1) // 无向图 双向
    }
    getVertexes(){
        return this.#vertexes
    }
    //图的打印
    toString(){
        this.#vertexes.forEach(item=>{
            let result = item + '->'
            this.#edges.get(item).forEach((i)=>{
                result += ' '+ i
            })
            console.log(result)
        })
    }

    // 图的遍历

    // 初始化颜色  用颜色来代表不同状态
    initializeColor(){
        let color = ['white','grey','black'] // 初始化状态颜色  白色：未访问   灰色：访问未探索   黑色：访问且探索
        this.#vertexes.forEach((item)=>{ // 初始化状态颜色  白色：未访问   灰色：访问未探索   黑色：访问且探索
            color[item] = color[0]
        })
        return color
    }
    // 广度优先搜索（BFS） 算法思路：基于队列
    bfs(v,handler){ // v为初始位置
        let color = this.initializeColor()
        let queue = new Queue()
        queue.enQueue(v)
        while (!queue.isEmpty()){  // 判断队列是否为空
            let n =  queue.deQueue() // 取出顶点
            let vList = this.#edges.get(n) // 获取与之关联的节点
            vList.forEach((item)=>{
                if(color[item] === color[0]){
                    color[item] = color[1]
                    queue.enQueue(item)
                }
            })
            handler(n)
            color[n] = color[2]
        }
    }

    // 深度优先搜索（DFS） 类似于二叉树的先序遍历
    dfs(v,handler){  // 访问开始点  处理函数
        let color = this.initializeColor()  // 初始化颜色
        this.dfsVisit(v,color,handler)
    }
    dfsVisit(v,color,handler){//当前访问节点  当前颜色  处理函数
        color[v] = color[1] // 颜色设置为灰色
        handler(v)  // 处理该顶点
        let vList = this.#edges.get(v)  // 获取该顶点的其他顶点
        vList.forEach((item)=>{
            if(color[item] === color[0]){
                this.dfsVisit(item,color,handler)
            }
        })
        color[v] = color[2]
    }
}
