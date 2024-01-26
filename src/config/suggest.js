const ErrorSuggest = {
    'MaximumCallStackSizeExceeded':'似乎某个地方有死循环了，快检查一下',
}

export function getErrorSuggest(message) {
    return ErrorSuggest[camelize(message)]
}

function camelize(str) {
    return str.split(' ').map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join('');
}