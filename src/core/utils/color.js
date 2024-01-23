import {deepClone} from "@meta2d/core";
import {startAnimation} from "@/core/utils/animate.js";

export function colorTransition(startColor, endColor, frames) {
    // 初始化颜色值
    const startRgb = hexToRgb(startColor);
    const endRgb = hexToRgb(endColor);

    // 计算每个颜色通道的步进值
    const stepR = calculateStep(startRgb.r, endRgb.r, frames);
    const stepG = calculateStep(startRgb.g, endRgb.g, frames);
    const stepB = calculateStep(startRgb.b, endRgb.b, frames);

    let transitionColors = [];

    // 生成每一帧的颜色
    for (let i = 0; i <= frames; i++) {
        const r = Math.round(startRgb.r + (stepR * i));
        const g = Math.round(startRgb.g + (stepG * i));
        const b = Math.round(startRgb.b + (stepB * i));
        transitionColors.push(rgbToHex({r, g, b}));
    }

    return transitionColors;
}

function hexToRgb(hex) {
    const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return rgb ? {
        r: parseInt(rgb[1], 16),
        g: parseInt(rgb[2], 16),
        b: parseInt(rgb[3], 16)
    } : null;
}


// 将RGB颜色转换为hex颜色
function rgbToHex({r, g, b}) {
    function componentToHex(c) {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }
    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function calculateStep(startValue, endValue, steps) {
    return (endValue - startValue) / steps;
}

/**
 * @description 闪烁图元动画
 * @param id {string} 图元id
 * @param config {Object} 动画配置
 * @param config.startColor {string} 起始颜色
 * @param config.endColor {string} 结束颜色
 * @param config.duration {number} 动画持续时间（毫秒）
 * @param config.frames {number} 动画帧数
 * @param config.alternate {boolean} 是否交替
 ** */
export function flushPen(id,config) {
    let {startColor,endColor,duration,frames,alternate} = config
    let pen = meta2d.findOne(id)
    let colors = colorTransition(startColor,endColor,frames)
    let colorFrames = colors.map((color)=>{
        return {duration: duration/frames,shadowBlur:50/frames,shadowColor:color, visible: true, flipX: false, flipY: false, color}
    })
    alternate?
        colorFrames = colorFrames.concat(deepClone(colorFrames).reverse()):''
    pen.frames = colorFrames
    // 执行动画
    startAnimation(pen.id)
}

