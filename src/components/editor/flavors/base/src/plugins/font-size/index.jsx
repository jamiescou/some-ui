import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modifier, EditorState, RichUtils } from 'draft-js';

import { Popover } from '../../components';
import { FontSizeButton } from '../buttons';
import Panel from './panel';

export default class FontSize extends Component {
    handleChange(fontSize) {
        this.refs.popover.hide();
        const newEditorState = changeFontSize(this.props.editorState, 'F_' + fontSize);
        this.props.onChange(newEditorState);
    }
    render() {
        return (
            <Popover
                ref="popover"
                placement="bottom"
                position={{left: 65, top: -14}}
                content={<Panel onClick={::this.handleChange} />} >
                <FontSizeButton />
            </Popover>
        );
    }
}

FontSize.propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object
};

const FONT_SIZE_MAP = {
    F_12: {
        fontSize: '12px'
    },
    F_13: {
        fontSize: '13px'
    },
    F_14: {
        fontSize: '14px'
    },
    F_16: {
        fontSize: '16px'
    },
    F_18: {
        fontSize: '18px'
    },
    F_20: {
        fontSize: '20px'
    },
    F_24: {
        fontSize: '24px'
    }
};

const changeFontSize = (editorState, size) => {
    const selection = editorState.getSelection();
    const nextContentState = Object.keys(FONT_SIZE_MAP)
        .reduce((contentState, key) => {
            return Modifier.removeInlineStyle(contentState, selection, key);
        }, editorState.getCurrentContent());
    let nextEditorState = EditorState.push(
        editorState,
        nextContentState,
        'change-inline-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    if (selection.isCollapsed()) {
        nextEditorState = currentStyle.reduce((state, key) => {
            return RichUtils.toggleInlineStyle(state, key);
        }, nextEditorState);
    }

    if (!currentStyle.has(size)) {
        nextEditorState = RichUtils.toggleInlineStyle(
            nextEditorState,
            size
        );
    }
    return nextEditorState;
};

export {
    FONT_SIZE_MAP
};
