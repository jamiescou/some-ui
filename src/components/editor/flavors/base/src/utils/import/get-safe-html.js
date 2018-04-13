const getSafeHTML = html => {
    if (document.implementation && document.implementation.createHTMLDocument) {
        let doc = document.implementation.createHTMLDocument('foo');
        doc.documentElement.innerHTML = html;
        // 目前编辑器不支持多层块状元素嵌套(块状元素里面只能有行内元素)
        // 所以判断一下是否存在这种情况，存在的话移除多余的块状元素
        // －－ 发现后端在处理 HTML 的时候多嵌套了一层 div
        const body = doc.getElementsByTagName('body')[0];
        const children = resolveHtml(body.firstChild);
        if (children !== body.firstChild) {
            console.warn('resolved');
            body.innerHTML = '';
            Array.from(children).forEach(d => body.appendChild(d));
        }
        return body;
    }
    return null;
};

/**
 * 简单的一个移除嵌套 div
 * <div><div><div>1</div><div>2</div></div></div>
 * >> <div>1</div><div>2</div>
 */
const resolveHtml = tag => {
    if (!tag) {
        return tag;
    }
    // 如果本身是一个块状元素，并且第一个子元素也是一个块状元素
    if (isBlock(tag.tagName) && tag.nextElementSibling === null && isBlock(tag.firstChild && tag.firstChild.tagName)) {
        if (tag.firstChild.nextElementSibling === null) {
            return resolveHtml(tag.firstChild);
        }
        return tag.childNodes;
    }
    return tag;
};

const blockTags = ['div', 'ol', 'ul', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const isBlock = tag => tag ? blockTags.indexOf(tag.toLocaleLowerCase()) !== -1 : false;

export default getSafeHTML;
