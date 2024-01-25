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
export default class Graph {
    // 属性 顶点（数组）/ 边（字典或对象或map）
    #vertexes = []  //点
    #edges = new Map() // 边
    addVertexes(v) {
        this.#vertexes.push(v) //
        this.#edges.set(v, []) // 初始化
    }

    /**
     * @param v1 第一个顶点
     * @param v2 第二个顶点*/
    addEdges(v1, v2) {
        this.#edges.get(v1).push(v2) // 有向图 单向
        // this.#edges.get(v2).push(v1) // 无向图 双向
    }

    getVertexes() {
        return this.#vertexes
    }
    vertexesExists(v) {
        return this.#vertexes.includes(v)
    }

    //图的打印
    toString() {
        this.#vertexes.forEach(item => {
            let result = item + '->'
            this.#edges.get(item).forEach((i) => {
                result += ' ' + i
            })
            console.log(result)
        })
    }

    // 图的遍历

    // 初始化颜色  用颜色来代表不同状态
    initializeColor() {
        let color = ['white', 'grey', 'black'] // 初始化状态颜色  白色：未访问   灰色：访问未探索   黑色：访问且探索
        this.#vertexes.forEach((item) => { // 初始化状态颜色  白色：未访问   灰色：访问未探索   黑色：访问且探索
            color[item] = color[0]
        })
        return color
    }

    // 广度优先搜索（BFS） 算法思路：基于队列
    bfs(v, handler) { // v为初始位置
        let color = this.initializeColor()
        let queue = new Queue()
        queue.enQueue(v)
        while (!queue.isEmpty()) {  // 判断队列是否为空
            let n = queue.deQueue() // 取出顶点
            let vList = this.#edges.get(n) // 获取与之关联的节点
            vList.forEach((item) => {
                if (color[item] === color[0]) {
                    color[item] = color[1]
                    queue.enQueue(item)
                }
            })
            handler(n)
            color[n] = color[2]
        }
    }

    // 深度优先搜索（DFS） 类似于二叉树的先序遍历
    dfs(v, handler) {  // 访问开始点  处理函数
        let color = this.initializeColor()  // 初始化颜色
        return this.dfsVisit(v, color, handler)
    }

    dfsVisit(v, color, handler,list = []) {//当前访问节点  当前颜色  处理函数
        color[v] = color[1] // 颜色设置为灰色
        handler?.(v)  // 处理该顶点
        list.push(v)
        let vList = this.#edges.get(v)  // 获取该顶点的其他顶点
        vList.forEach((item) => {
            if (color[item] === color[0]) {
                this.dfsVisit(item, color, handler,list)
            }
        })
        color[v] = color[2]
        return list
    }

    // 拓扑排序（Topological Sort） 针对有向无环图（DAG）
    topologicalSort() {
        let inDegree = {}; // 存储每个顶点的入度
        let count = 0; // 计数，记录当前排序的顶点数
        let queue = new Queue(); // 队列，用于保存入度为0的顶点
        let sortedOrder = []; // 存储排序后的顶点列表

        // 初始化入度为0
        this.#vertexes.forEach(vertex => {
            inDegree[vertex] = 0;
        });

        // 计算所有顶点的入度
        this.#vertexes.forEach(vertex => {
            let neighbors = this.#edges.get(vertex);
            neighbors.forEach(neighbor => {
                inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
            });
        });

        // 将所有入度为0的顶点入队
        for (let vertex in inDegree) {
            if (inDegree[vertex] === 0) {
                queue.enQueue(vertex);
            }
        }

        // 开始排序
        while (!queue.isEmpty()) {
            let vertex = queue.deQueue();
            sortedOrder.push(vertex);
            count++;

            // 对当前顶点的所有邻接点减少入度
            this.#edges.get(vertex).forEach(neighbor => {
                inDegree[neighbor]--;
                // 如果入度变为0，加入队列
                if (inDegree[neighbor] === 0) {
                    queue.enQueue(neighbor);
                }
            });
        }

        // 检查是否所有顶点都被排序了，如果没有，说明图中存在环
        if (count !== this.#vertexes.length) {
            return {
                error:"出现了环形图。不合法"
            }
        }

        return sortedOrder;
    }
}