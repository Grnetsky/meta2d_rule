// 图表解析，生成程序关系
export default class DiagramParser {
    map =  {}
    constructor() {
    }

    /**
     * @description 通过此方法来将meta2d中的图形转换为对应的程序
     * @param map { Meta2dData } 图纸信息
     * @return sting 返回程序关系信息*/
    parse(map){
        this.map = map;
        return ''
    }
}