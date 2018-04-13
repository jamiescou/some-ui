/**
 * 把多个方法组合成一个方法
 * const fun = createChainedFunction((a, b) => console.log(a + b),
 *                                   (a, b) => console.log(a - b))
 *
 * fun(3, 1)
 * >> 4
 * >> 2
 */

 /* eslint-disable */
export default function createChainedFunction(...funs) {
    return funs.filter(x => typeof x === 'function').reduce((acc, fn) => {
        if (acc === null) {
        	return fn;
        }
        return (...args) => {
            acc.apply(this, args);
            fn.apply(this, args);
        };
    }, null);
}
