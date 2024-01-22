// 图表解析，生成程序关系
import Graph from "@/core/parser/Graph.js";
import {scopedEval} from "@/core/parser/Scope.js";
import {ReportError} from "@/core/utils/error.js";
/**
 * @description 通过此方法来将meta2d中的图形转换为对应的程序
 * @param map { Meta2dData } 图纸信息
 * @return sting 返回程序关系信息 自定义的语法规则*/
export function DiagramParse (map){
    // 图论
    let graph = new Graph()
    let pens = map.pens
    // pens.forEach(pen=>{
    //     if(!pen.type){
    //         graph.addVertexes(pen.id) //添加节点
    //     }
    // })
    let lines = pens.filter(pen=>pen.type)
    lines.forEach((linePen)=>{
        let from = linePen.anchors[0].connectTo
        let to = linePen.anchors[linePen.anchors.length - 1].connectTo
        let fromPen = meta2d.findOne(from)
        let toPen = meta2d.findOne(to)
        //TODO
        !graph.vertexesExists(fromPen.id) && graph.addVertexes(fromPen.id)
        !graph.vertexesExists(toPen.id) && graph.addVertexes(toPen.id)
        if(from && to){
            graph.addEdges(fromPen.id,toPen.id)
        }
    })
    let queue = graph.topologicalSort()
    // 先处理一个输入的
    return queue;
    // return ''
}
