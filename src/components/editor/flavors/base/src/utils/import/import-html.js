/* eslint-disable no-unused-vars */
import {
    CharacterMetadata,
    ContentBlock,
    DefaultDraftBlockRenderMap,
    Entity,
    genKey
} from 'draft-js';
import {
    List,
    OrderedSet
} from 'immutable';

import getSafeHTML from './get-safe-html';
import sanitizaDraftText from './sanitize-draft-text';
import { COLOR_MAP } from '../../plugins/color';

const NBSP = '&nbsp;';
const SPACE = ' ';
const MAX_DEPTH = 4;
const REGEX_CR = new RegExp('\r', 'g');
const REGEX_LF = new RegExp('\n', 'g');
const REGEX_NBSP = new RegExp(NBSP, 'g');

const inlineTags = {
    b: 'BOLD',
    code: 'CODE',
    del: 'STRIKETHROUGH',
    em: 'ITALIC',
    i: 'ITALIC',
    s: 'STRIKETHROUGH',
    strike: 'STRIKETHROUGH',
    strong: 'BOLD',
    u: 'UNDERLINE'
};

let lastBlock;

function getColorName(val) {
    for (const key in COLOR_MAP) {
        if (COLOR_MAP.hasOwnProperty(key)) {
            if (COLOR_MAP[key].color === val) {
                return key;
            }
        }
    }
    return null;
}

function getEmptyChunk() {
    return {
        text: '',
        inlines: [],
        entities: [],
        blocks: []
    };
}

function getWhitespaceChunk(inEntity) {
    let entities = inEntity ? [inEntity] : [undefined];
    return {
        text: SPACE,
        inlines: [OrderedSet()],
        entities: entities,
        blocks: []
    };
}

function getSoftNewlineChunk() {
    return {
        text: '\n',
        inlines: [OrderedSet()],
        entities: new Array(1),
        blocks: []
    };
}

function getBlockDividerChunk(blockType, depth) {
    return {
        text: '\r',
        inlines: [OrderedSet()],
        entities: [undefined],
        blocks: [{
            type: blockType,
            depth: Math.max(0, Math.min(MAX_DEPTH, depth))
        }]
    };
}

function getListBlockType(tag, lastList) {
    if (tag === 'li') {
        return lastList === 'ol' ? 'ordered-list-item' : 'unordered-list-item';
    }
    return null;
}

function getBlockMapSupportedTags(blockRenderMap) {
    return blockRenderMap
        .map(config => config.element)
        .valueSeq()
        .toSet()
        .toArray()
        .sort();
}

function getMultiMatchedType(tag, lastList, multiMatchExtractor) {
    for (let ii = 0; ii < multiMatchExtractor.length; ii++) {
        const matchType = multiMatchExtractor[ii](tag, lastList);
        if (matchType) {
            return matchType;
        }
    }
    return null;
}

function getBlockTypeForTag(tag, lastList, blockRenderMap) {
    const matchedTypes = blockRenderMap
        .filter(config => config.element === tag || config.wrapper === tag)
        .keySeq()
        .toSet()
        .toArray()
        .sort();
    switch (matchedTypes.length) {
    case 0:
        return 'unstyled';
    case 1:
        return matchedTypes[0];
    default:
        return (
                getMultiMatchedType(tag, lastList, [getListBlockType]) || 'unstyled'
        );
    }
}

function processInlineTag(tag, node, currentStyle) {
    const styleToCheck = inlineTags[tag];
    let cStyle = currentStyle;
    if (styleToCheck) {
        cStyle = currentStyle.add(styleToCheck).toOrderedSet();
    } else if (node instanceof HTMLElement) {
        const htmlElement = node;
        cStyle = currentStyle.withMutations(style => {
            if (htmlElement.style.fontWeight === 'bold') {
                style.add('BOLD');
            }
            if (htmlElement.style.fontStyle === 'italic') {
                style.add('ItALIC');
            }
            if (htmlElement.style.textDecoration === 'underline') {
                style.add('UNDERLINE');
            }
            // todo add font-size
            const fontSize = htmlElement.style.fontSize;
            if (fontSize) {
                const fontSizeName = 'F_' + fontSize.replace('px', '');
                style.add(fontSizeName);
            }
            const color = htmlElement.style.color;
            const colorName = getColorName(color);
            if (colorName) {
                style.add(colorName);
            }
            // todo add color
        }).toOrderedSet();
    }
    return cStyle;
}

function joinChunks(A, B) {
    return {
        text: A.text + B.text,
        inlines: A.inlines.concat(B.inlines),
        entities: A.entities.concat(B.entities),
        blocks: A.blocks.concat(B.blocks)
    };
}

function containsSemanticBlockMarkup(html, blockTags) {
    return blockTags.some(tag => html.indexOf('<' + tag) !== -1);
}

function hasValidLinkText(link) {
    return link.protocol === 'http:' || link.protocol === 'https:';
}

function genFragment(
    node,
    inlineStyle,
    lastList,
    inBlock,
    blockTags,
    depth,
    blockRenderMap,
    inEntity
) {
    let nodeName = node.nodeName.toLowerCase();
    let newBlock = false;
    let nextBlockType = 'unstyled';

    // 针对图片 特殊处理一下
    if (node.firstChild && node.firstChild.nodeName.toLowerCase() === 'img') {
        const src = node.firstChild.src;
        const entityId = Entity.create('IMAGE', 'IMMUTABLE', {src});
        return {
            text: '\ri',
            inlines: [OrderedSet(), OrderedSet()],
            entities: [undefined, entityId],
            blocks: [{
                type: 'atomic',
                depth: depth
            }]
        };
    }
    if (nodeName === '#text') {
        let text = node.textContent;
        if (text.trim() === '' && inBlock !== 'pre') {
            return getWhitespaceChunk(inEntity);
        }
        if (inBlock !== 'pre') {
            text = text.replace(REGEX_LF, SPACE);
        }
        lastBlock = nodeName;
        return {
            text,
            inlines: Array(text.length).fill(inlineStyle),
            entities: Array(text.length).fill(inEntity),
            blocks: []
        };
    }
    lastBlock = nodeName;
    let chunk = getEmptyChunk();
    let newChunk = null;

    let iStyle = processInlineTag(nodeName, node, inlineStyle);

    let key = depth;
    let lList = lastList;
    let iBlock = inBlock;
    if (nodeName === 'ul' || nodeName === 'ol') {
        if (lastList) {
            key += 1;
        }
        lList = nodeName;
    }

    if (!inBlock && blockTags.indexOf(nodeName) !== -1) {
        chunk = getBlockDividerChunk(
            getBlockTypeForTag(nodeName, lList, blockRenderMap),
            key
        );
        iBlock = nodeName;
        newBlock = true;
        nextBlockType = lList === 'ul' ? 'unordered-list-item' : 'ordered-list-item';
    }
    let child = node.firstChild;
    if (child !== null) {
        nodeName = child.nodeName.toLowerCase();
    }

    let entityId = null;
    let href = null;

    while (child) {
        if (nodeName === 'a' && child.href && hasValidLinkText(child)) {
            href = child.href;
            entityId = Entity.create('LINK', 'MUTABLE', {url: href});
        } else {
            entityId = undefined;
        }

        newChunk = genFragment(
            child,
            iStyle,
            lList,
            iBlock,
            blockTags,
            key,
            blockRenderMap,
            entityId || inEntity
        );

        chunk = joinChunks(chunk, newChunk);
        let sibling = child.nextSibling;

        if (sibling && blockTags.indexOf(nodeName) >= 0 && iBlock) {
            chunk = joinChunks(chunk, getSoftNewlineChunk());
        }
        if (sibling) {
            nodeName = sibling.nodeName.toLowerCase();
        }
        child = sibling;
    }
    return chunk;
}

function getChunkForHTML(html, blockRenderMap) {
    let aHtml = html
        .trim()
        .replace(REGEX_CR, '')
        .replace(REGEX_NBSP, SPACE);

    const supportedBlockTags = getBlockMapSupportedTags(blockRenderMap);
    let safeBody = getSafeHTML(aHtml);
    if (!safeBody) {
        return null;
    }
    lastBlock = null;

    const workingBlocks = containsSemanticBlockMarkup(aHtml, supportedBlockTags) ? supportedBlockTags : ['div'];
    let chunk = genFragment(
        safeBody,
        OrderedSet(),
        'ul',
        null,
        workingBlocks,
        -1,
        blockRenderMap
    );
    // join with previous block to prevent weirdness on paste
    if (chunk.text.indexOf('\r') === 0) {
        chunk = {
            text: chunk.text.slice(1),
            inlines: chunk.inlines.slice(1),
            entities: chunk.entities.slice(1),
            blocks: chunk.blocks
        };
    }
    // Kill block delimiter at the end
    // if (chunk.text.slice(-1) === '\r') {
    //     chunk.text = chunk.text.slice(0, -1);
    //     chunk.inlines = chunk.inlines.slice(0, -1);
    //     chunk.entities = chunk.entities.slice(0, -1);
    //     chunk.blocks.pop();
    // }
    // If we saw no block tags, put an unstyled one in
    if (chunk.blocks.length === 0) {
        chunk.blocks.push({type: 'unstyled', depth: 0});
    }

    // Sometimes we start with text that isn't in a block, which is then
    // followed by blocks. Need to fix up the blocks to add in
    // an unstyled block for this content
    if (chunk.text.split('\r').length === chunk.blocks.length + 1) {
        chunk.blocks.unshift({type: 'unstyled', depth: 0});
    }
    return chunk;
}

function importHtml(html, blockRenderMap = DefaultDraftBlockRenderMap) {
    let chunk = getChunkForHTML(html, blockRenderMap);
    if (chunk === null) {
        return null;
    }
    let start = 0;
    return chunk.text.split('\r').map(
        (textBlock, ii) => {
            let text = sanitizaDraftText(textBlock);
            let end = start + text.length;
            let inlines = chunk.inlines.slice(start, end);
            let entities = chunk.entities.slice(start, end);
            let characterList = List(
                inlines.map((style, key) => {
                    let data = {
                        style,
                        entity: null
                    };
                    if (entities[key]) {
                        data.entity = entities[key];
                    }
                    return CharacterMetadata.create(data);
                })
            );
            start = end + 1;
            return new ContentBlock({
                key: genKey(),
                type: chunk.blocks[ii].type,
                depth: chunk.blocks[ii].depth,
                text: text,
                characterList
            });
        }
    );
}

export default importHtml;
