const ErrorSuggest = {
    'MaximumCallStackSizeExceeded':'似乎某个地方有死循环了，快检查一下',
    'InvalidOrUnexpectedToken': '代码书写错啦，检测一下吧',
    'Default': '似乎哪里出错了，再检查一下吧'
}

export function getErrorSuggest(message) {
    return ErrorSuggest[camelize(message)] || ErrorSuggest.Default
}

function camelize(str) {
    return str.split(' ').map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join('');
}