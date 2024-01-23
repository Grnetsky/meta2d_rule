// 日志系统
let  log = []
export function setLog(logData) {
    let time = Date.now().toLocaleString() // 本地化事件
    log.push({ time, data: logData })
}

export function getAllLog() {
    return log
}

export function getLogByDate(startTime, endTime) {
    return log.filter(log => log.time >= startTime && log.time <= endTime)
}

export function getLogByLevel(level) {
    return log.filter(log => log.level === level)
}
