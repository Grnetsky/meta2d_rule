const ErrorSuggest = [
    { pattern: /maximum.*call.*stack.*exceeded/i, message: '似乎某个地方有死循环了，快检查一下' },
    { pattern: /invalid.*or.*unexpected.*token/i, message: '代码书写错啦，检测一下吧' },
    { pattern: /.*is.*not defined/i, message: '变量未定义呀' },
];

const DefaultMessage = '似乎哪里出错了，再检查一下吧';

export function getErrorSuggest(message) {
    const suggestion = ErrorSuggest.find(entry => entry.pattern.test(message));
    return suggestion ? suggestion.message : DefaultMessage;
}
