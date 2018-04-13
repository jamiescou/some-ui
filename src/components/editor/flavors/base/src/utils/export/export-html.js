import { Entity } from 'draft-js';

import getEntityRanges from './get-entity-ranges';
import { FONT_SIZE_MAP } from '../../plugins/font-size';
import { COLOR_MAP } from '../../plugins/color';

const exportToHTML = (contentState) => {
    let output = [];
    const blocks = contentState.getBlocksAsArray();
    let inBlockList = false;
    for (let i = 0, length = blocks.length; i < length; i++) {
        const prevBlockType = blocks[i - 1] && blocks[i - 1].getType();
        const nextBlockType = blocks[i + 1] && blocks[i + 1].getType();
        const block = blocks[i];
        const type = block.getType();
        if (['ordered-list-item', 'unordered-list-item'].indexOf(type) !== -1) {
            if (!inBlockList && prevBlockType !== type) {
                output = output.concat(getWrapperTagBegin(type));
                inBlockList = true;
            }
            output = output.concat(processBlock(block, 'list-item'));
            if (inBlockList && type !== nextBlockType) {
                output = output.concat(getWrapperTagEnd(type));
                inBlockList = false;
            }
        } else {
            output = output.concat(processBlock(block));
        }
    }
    return output.join('');
};

export default exportToHTML;

const processBlock = (block, type) => {
    let aType = type || block.getType();
    let output = [];
    let content = getContent(block);
    let tagBegin = getWrapperTagBegin(aType);
    // if (!content.length && tagBegin === '<div>') {
    //     tagBegin = '<div data-role="new-line">';
    // }
    // 暂时通过设定div最小高度来控制空行
    output.push(tagBegin);
    output.push(content);
    output.push(getWrapperTagEnd(aType));
    return output;
};

const getContent = (block) => {
    const text = block.getText();
    if (text === '') {
        return '';
    }
    const charMetaList = block.getCharacterList();
    const entityPieces = getEntityRanges(text, charMetaList);
    return entityPieces.map(([entityKey, stylePieces]) => {
        let newContent = stylePieces.map(([t, style]) => {
            let content = encodeContent(t);
            if (style.has('BOLD')) {
                content = `<strong>${content}</strong>`;
            }
            if (style.has('ITALIC')) {
                content = `<em>${content}</em>`;
            }
            if (style.has('UNDERLINE')) {
                content = `<u>${content}</u>`;
            }
            const otherInlineStyles = style.filter(x => x.startsWith('F_') || x.startsWith('C_'));
            if (otherInlineStyles.size > 0) {
                let attrs = [];
                for (const inlineStyle of otherInlineStyles) {
                    if (inlineStyle.startsWith('F_')) {
                        attrs.push(`font-size: ${FONT_SIZE_MAP[inlineStyle].fontSize}`);
                    } else if (inlineStyle.startsWith('C_')) {
                        attrs.push(`color: ${COLOR_MAP[inlineStyle].color}`);
                    }
                }
                content = `<span style="${attrs.join(';')}">${content}</span>`;
            }
            return content;
        }).join('');
        let entity = entityKey ? Entity.get(entityKey) : null;
        let entityType = (entity === null) ? null : entity.getType();
        if (entityType !== null && entityType === 'LINK') {
            const url = entity.get('data').url;
            newContent = `<a target="_blank" href="${encodeAttr(url)}">${newContent}</a>`;
        }
        if (entityType !== null && entityType === 'IMAGE') {
            const src = entity.get('data').src;
            newContent = `<img style="max-width: 100%" src="${encodeAttr(src)}" />`;
        }
        return newContent;
    }).join('');
};

const getWrapperTagBegin = (blockType) => {
    return wrapStyleIfNeed(_getWrapperTag(blockType));
};

const getWrapperTagEnd = (blockType) => {
    return `</${_getWrapperTag(blockType)}>`;
};

const _getWrapperTag = (blockType) => {
    return blockTypeMap[blockType] || 'div';
};

const blockTypeMap = {
    'ordered-list-item': 'ol',
    'unordered-list-item': 'ul',
    'list-item': 'li',
    'header-four': 'h4',
    'header-five': 'h5',
    'header-six': 'h6'
};

const encodeContent = text => (
    text
        .split('&').join('&amp;')
        .split('<').join('&lt;')
        .split('>').join('&gt')
        .split(' ').join('&nbsp;')
        .split('\xA0').join('&nbsp;')
        .split('\n').join('<br /> \n')
);

const encodeAttr = (text) => (
    text
        .split('&').join('&amp;')
        .split('<').join('&lt')
        .split('>').join('&gt')
        .split('"').join('&quot;')
);

const wrapStyleIfNeed = tag => {
    if (['h4', 'h5', 'h6'].indexOf(tag) !== -1) {
        return `<${tag} style="font-size: 14px;font-weight: normal;margin: 0;padding: 0;text-align: ${alignMap[tag]}">`;
    }
    return `<${tag}>`;
};

const alignMap = {
    h4: 'left',
    h5: 'center',
    h6: 'right'
};
