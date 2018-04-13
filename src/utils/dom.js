
let isWindow = (obj) => obj !== null && obj === obj.window;
let getWindow = (ele) => isWindow(ele) ? ele : ele.nodeType === 9 && ele.defaultView;

const getWindowsSize = () => {
    let result = {};
    // 获取窗口宽度
    if (window.innerWidth) {
        result.winWidth = window.innerWidth;
    } else if ((document.body) && (document.body.clientWidth)) {
        result.winWidth = document.body.clientWidth;
    }

    // 获取窗口高度
    if (window.innerHeight) {
        result.winHeight = window.innerHeight;
    } else if ((document.body) && (document.body.clientHeight)) {
        result.winHeight = document.body.clientHeight;
    }
    // 通过深入 Document 内部对 body 进行检测，获取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        result.winHeight = document.documentElement.clientHeight;
        result.winWidth = document.documentElement.clientWidth;
    }

    return result;
};
/**
 * [获取浏览k器中dom节点的位置与宽高]
 * @param  {[domElement]} element [dom节点]
 * @return {[Object]}         [{top,left,width,height}]
 */
const getDomOffset = (element) => {
    let doc = element && element.ownerDocument;
    let box = {top: 0, left: 0};
    let docElement;
    let win;
    if (!doc) {
        return null;
    }
    docElement = doc.documentElement;

    if (typeof element.getBoundingClientRect !== (typeof undefined)) {
        box = element.getBoundingClientRect();
    }

    win = getWindow(doc);
    return {
        top: box.top + win.pageYOffset - docElement.clientTop,
        left: box.left + win.pageXOffset - docElement.clientLeft,
        width: box.width,
        height: box.height
    };
};
const hasClass = (obj, className) => {
    if (!obj.className) {
        return false;
    }
    return obj.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

const removeClass = (obj, className) => {
    if (hasClass(obj, className)) {
        let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
};

const addClass = (obj, className) => {
    if (hasClass(obj, className)) {
        return false;
    }

    if (obj.className === '') {
        obj.className = className;
    } else {
        obj.className += ' ' + className;
    }
};
export default {
    getDomOffset,
    getWindowsSize,
    hasClass,
    removeClass,
    addClass
};
