// 图表解析，生成程序关系

/**
 * @description 通过此方法来将meta2d中的图形转换为对应的程序，如何设计？是否可拓展？？
 * @param map { Meta2dData } 图纸信息
 * @return start { Pen } 返回首个start图元*/
export function DiagramParse (map){
    // 图论
    let pens = map.pens.filter(pen=>!pen.type);
    let start =  pens.filter(pen=>pen.rule.type === 'start');

    // 判断起始点是否合法
    if(start.length !== 1){
        return {
            error:'起始点不唯一',
            suggest:'请确保起始点唯一'
        }
    }
    let startPen = start[0];
    // 按照index排列执行顺序
    return startPen
    // return ''
}


export function setGoto(id) {
    let pen = meta2d.findOne(id)
    let lines = pen.connectedLines

    lines.forEach(i=>{
        let line = meta2d.findOne(i.lineId)
        let from = line.anchors[0].connectTo
        let to =line.anchors.length > 1?line.anchors[line.anchors.length - 1]?.connectTo:undefined
        let fromPen = meta2d.findOne(from)
        let  toPen = meta2d.findOne(to)
        // 若头尾都有链接，则认为此通道有效
        if(from === id && toPen){
            pen.rule.goto.push(toPen.id)
        }
    })

    // 按照index排列执行顺序
    pen.rule.goto.sort(id=>meta2d.findOne(id).rule.index)
    return [
        ...pen.rule.goto
     ]
}