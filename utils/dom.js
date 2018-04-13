
let isWindow = (obj) => obj !== null && obj === obj.window;
let getWindow = (ele) => isWindow(ele) ? ele : ele.nodeType === 9 && ele.defaultView;
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
    hasClass,
    removeClass,
    addClass
};
