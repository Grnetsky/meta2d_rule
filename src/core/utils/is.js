export function isPen(target) {
    return target && target.id && target.name
}

export function isChange(v1,v2){
    return Object.is(v1,v2)
}