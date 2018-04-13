import { getDomOffset, getWindowsSize } from '../../../../utils/dom';

const Direction = [
    'left',
    'right',
    'bottom',
    'top',
    'top-left',
    'top-right',
    'right-top',
    'right-bottom',
    'bottom-left',
    'bottom-right',
    'left-top',
    'left-bottom'
];

export const getPosition = (target) => {
    if (target) {
        return getDomOffset(target);
    }
};

let OFFSET = 5;
/**
 * 计算位置 x,y 以触发区域左上角为基准
 * @param  {[type]} direction    [方向]
 * @param  {[type]} targetInfo   [触发区域的位置信息]
 * @param  {[type]} dropdown     [下拉的尺寸信息]
 * @return {[type]}              [description]
 */

export const calculatePortalPosition = (direction, targetInfo, dropdown, offset) => {
    let result = {};

    if (!targetInfo.width || !dropdown.width ) {
        return 0;
    }

    if (offset || offset === 0) {
        OFFSET = offset;
    }

    result.width = dropdown.width;
    result.height = dropdown.height;

    switch (direction) {
    case 'left':
        result.top = targetInfo.top + (targetInfo.height - dropdown.height) / 2;
        result.left = targetInfo.left - dropdown.width - OFFSET;
        break;
    case 'top':
        result.left = targetInfo.left + (targetInfo.width - dropdown.width) / 2;
        result.top = targetInfo.top - dropdown.height - OFFSET;
        break;
    case 'right':
        result.top = targetInfo.top + (targetInfo.height - dropdown.height) / 2;
        result.left = targetInfo.left + targetInfo.width + OFFSET;
        break;
    case 'bottom':
        result.left = targetInfo.left + (targetInfo.width - dropdown.width) / 2;
        result.top = targetInfo.top + targetInfo.height + OFFSET;
        break;

    case 'left-top':
        result.top = targetInfo.top + targetInfo.height - dropdown.height;
        result.left = targetInfo.left - dropdown.width - OFFSET;
        break;
    case 'left-bottom':
        result.top = targetInfo.top;
        result.left = targetInfo.left - dropdown.width - OFFSET;
        break;

    case 'top-left':
        result.top = targetInfo.top - dropdown.height - OFFSET;
        result.left = targetInfo.left + targetInfo.width - dropdown.width;
        break;
    case 'top-right':
        result.top = targetInfo.top - dropdown.height - OFFSET;
        result.left = targetInfo.left ;
        break;

    case 'right-top':
        result.top = targetInfo.top + targetInfo.height - dropdown.height;
        result.left = targetInfo.left + targetInfo.width + OFFSET;
        break;
    case 'right-bottom':
        result.left = targetInfo.left + targetInfo.width + OFFSET;
        result.top = targetInfo.top;
        break;

    case 'bottom-left':
        result.top = targetInfo.top + targetInfo.height + OFFSET;
        result.left = targetInfo.left + targetInfo.width - dropdown.width ;
        break;
    case 'bottom-right':
        result.top = targetInfo.top + targetInfo.height + OFFSET;
        result.left = targetInfo.left;
        break;
    default :
        console.error('dropdown-trigger need a placement in ', Direction);
    }

    return result;
};

export const calculateSelfPosition = (direction, targetInfo, dropdown) => {
    let result = {};

    if (!targetInfo.width || !dropdown.width ) {
        return 0;
    }

    result.width = dropdown.width;
    result.height = dropdown.height;

    switch (direction) {
    case 'left':
        result.top = 0 + (targetInfo.height - dropdown.height) / 2;
        result.left = 0 - dropdown.width - OFFSET;
        break;
    case 'top':
        result.left = 0 + (targetInfo.width - dropdown.width) / 2;
        result.top = 0 - dropdown.height - OFFSET;
        break;
    case 'right':
        result.top = 0 + (targetInfo.height - dropdown.height) / 2;
        result.left = 0 + targetInfo.width + OFFSET;
        break;
    case 'bottom':
        result.left = 0 + (targetInfo.width - dropdown.width) / 2;
        result.top = 0 + targetInfo.height + OFFSET;
        break;

    case 'left-top':
        result.top = 0 + targetInfo.height - dropdown.height;
        result.left = 0 - dropdown.width - OFFSET;
        break;
    case 'left-bottom':
        result.top = 0;
        result.left = 0 - dropdown.width - OFFSET;
        break;

    case 'top-left':
        result.top = 0 - dropdown.height - OFFSET;
        result.left = 0 + targetInfo.width - dropdown.width;
        break;
    case 'top-right':
        result.top = 0 - dropdown.height - OFFSET;
        result.left = 0;
        break;

    case 'right-top':
        result.top = 0 + targetInfo.height - dropdown.height;
        result.left = 0 + targetInfo.width + OFFSET;
        break;
    case 'right-bottom':
        result.left = 0 + targetInfo.width + OFFSET;
        result.top = 0;
        break;

    case 'bottom-left':
        result.top = 0 + targetInfo.height + OFFSET;
        result.left = 0 + targetInfo.width - dropdown.width ;
        break;
    case 'bottom-right':
        result.top = 0 + targetInfo.height + OFFSET;
        result.left = 0;
        break;
    default :
        console.error('dropdown-trigger need a placement in ', Direction);
    }
    return result;
};

/**
 * 计算子是否超出了父亲
 * @param  {[type]} children [description]
 * @param  {[type]} parent   [description]
 * @return {[type]}          [description]
 */
export const calculateOutOfParent = (children, container) => {
    let parent = {};

    if (!container) {
        let result = getWindowsSize();
        parent = {
            x1: 0, y1: 0,
            x2: result.winWidth, y2: 0,
            x3: result.winWidth, y3: result.winHeight,
            x4: 0, y4: result.winHeight
        };
    }
    const checkIn = (x, y, wrap) => {
        if ((x > wrap.x1 && x < wrap.x2) && (y > wrap.y2 && y < wrap.y3)) {
            return true;
        }
        return false;
    };

    for (let i = 0; i < 4; i++) {
        let flag = checkIn(children[`x${i + 1}`], children[`y${i + 1}`], parent);
        // console.log("flag", i, flag);
        if (!flag) {
            return true;
        }
    }
    return false;
};
