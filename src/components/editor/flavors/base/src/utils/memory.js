/**
 * 返回一个带记忆功能的函数
 * 函数执行一次后把结果缓存下来，下次参数一致的情况下，直接从缓存里面取
 * 用于计算较昂贵，并且调用频繁的函数
 * 以参数为键来缓存，目前只适合简单参数。
 *
 * const factorial = n => {
 *     if(n == 1) return 1
 *     return n * factorial(n - 1)
 * }
 *
 * const memoryFactorial = memory(factorial);
 *
 * memoryFactorial(10);
 * memoryFactorial(10);
 *
 */
export default function memory(fn) {
    if (!(typeof fn === 'function')) {
    	throw new ReferenceError('the argument muse be a function');
    }
    let struct = {};
    return (...args) => {
        const key = JSON.stringify(args);
        if (!struct[key]) {
        	struct[key] = fn.apply(null, args);
        	return struct[key];
        }
    };
}
