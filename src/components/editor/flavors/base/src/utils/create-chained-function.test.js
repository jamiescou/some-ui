import assert from 'assert';
import createChainedFunction from './create-chained-function';

export default function test() {
    testNull();
    testOneFun();
    testMoreFun();
}

function testNull() {
    assert(createChainedFunction() === null);
    assert(createChainedFunction(null) === null);
}

function testOneFun() {
    const fn1 = (a, b) => a + b;
    const fn = createChainedFunction(fn1);
    assert.equal(fn, fn1);
}

function testMoreFun() {
    let sum = 0;
    const fn1 = (a, b) => sum += a + b;
    const fn2 = (a, b) => sum += a * b;
    const fn = createChainedFunction(fn1, 1, '2', /./, null, undefined, [], fn2);
    assert.equal(sum, 0);
    fn(2, 5);
    assert.equal(sum, 17);
}
