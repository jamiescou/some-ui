/**
 * 转换 React style 为 DOM 需要的 style 格式
 * {position: 'relative', fontSize: '12px'} => "position: relative; font-size: 12px"
 */
// export function resolveDOMStyle(style) {
//     if (!style) return '';
//     return Object.keys(style).reduce((str, key) =>
//         `${str && `${str}; `}${convertCamelCaseToHyphens(key)}: ${style[key]}`, ''
//     ).toLocaleLowerCase();
// }
//
// function convertCamelCaseToHyphens(str) {
//     return str.replace(/([a-z])(?=[A-Z])/g, '$1-');
// }

/**
 * 获取相对于目标元素的位置
 * @param  {[dom]} tarOffset [相对定位的目标元素]
 * @param  {[dom]} eleOffset [被定位的元素]
 * @param  {[string]} placement [定位的方向]
 * @return {[object]}           [返回 {left, top}]
 */
export default function getRelativePosition(offset, eleOffset, placement) {
    let left = 0;
    let top = 0;
    if (placement === 'right') {
        top = offset.top + offset.height / 2 - eleOffset.height / 2;
        left = offset.left + offset.width + 10;
    }
    if (placement === 'left') {
        top = offset.top + offset.height / 2 - eleOffset.height / 2;
        left = offset.left - eleOffset.width - 10;
    }
    if (placement === 'top') {
        top = offset.top - eleOffset.height - 10;
        left = offset.left + offset.width / 2 - eleOffset.width / 2;
    }
    if (placement === 'bottom') {
        top = offset.top + offset.height + 10;
        left = offset.left + offset.width / 2 - eleOffset.width / 2;
    }
    // return fixPosition({left, top, eleOffset});
    return {left, top};
}

/**
 * 修复一下定位, 避免会定位到屏幕之外
 */
// function fixPosition({left, top, eleOffset}) {
//     const body = document.documentElement || document.body;
//     const bodyRect = body.getBoundingClientRect();
//     const [maxWidth, maxHeight] = [bodyRect.width + body.scrollLeft, bodyRect.height + body.scrollTop];
//     //修复离左边最少 10 个像素
//     left = min(10 + body.scrollLeft)(left);
//     //修复离上面最少 10 个像素
//     top = min(10 + body.scrollTop)(top);
//     // 修复离右边最少 10 个像素
//     if (left + eleOffset.width > maxWidth) {
//         left = maxWidth - eleOffset.width - 10;
//     }
//     // 修复离底部最少 10 个像素
//     if (top + eleOffset.height > maxHeight) {
//         top = maxHeight - eleOffset.height - 10;
//     }
//     return {
//         left,
//         top
//     };
// }
// const min = min => num => num < min ? min : num;
