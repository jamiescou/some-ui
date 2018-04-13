export function mergeClassName(...classNames) {
    return classNames.join(' ');
}

export function getOffset(ele) {
    const box = ele.getBoundingClientRect();
    return {
        top: box.top + window.scrollY,
        left: box.left + window.scrollX,
        width: box.width,
        height: box.height
    };
}

export function hide(ele) {
    ele.style.display = 'none';
}

export function show(ele) {
    ele.style.display = '';
}

export function toggle(ele) {
    if (ele.style.display === 'none') {
        show(ele);
    } else {
        hide(ele);
    }
}
