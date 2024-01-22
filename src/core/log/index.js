// 日志系统
let  log = []
function setLog(logData) {
    let time = Date.now().toLocaleString() // 本地化事件
    log.push({ time, data: logData })
}