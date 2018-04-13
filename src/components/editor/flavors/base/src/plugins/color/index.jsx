import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modifier, EditorState, RichUtils } from 'draft-js';

import { Popover } from '../../components';
import { ColorButton } from '../buttons';
import Panel from './panel';
// import colorPicker from './../../../../../../color-picker/index';

export default class Color extends Component {
    handleClick(colorKey) {
        this.refs.popover.hide();
        const newEditorState = changeColor(this.props.editorState, colorKey);
        this.props.onChange(newEditorState);
    }
    handleChangeCurrentColor() {
        const { editorState } = this.props;
        const currentColor = editorState.getCurrentInlineStyle().toJS().filter(x => x && x.startsWith('C'))[0];
        this.refs.panel.setCurrentColor(currentColor);
    }
    render() {
        return (
            <Popover
                ref="popover"
                placement="bottom"
                content={<Panel ref="panel" onClick={::this.handleClick} />}>
                <ColorButton onClick={::this.handleChangeCurrentColor} />
            </Popover>
        );
    }
}

Color.propTypes = {
    editorState: PropTypes.object,
    onChange: PropTypes.func
};

const COLOR_MAP = {
    C_1: {
        color: 'rgb(87, 166, 255)'
    },
    C_2: {
        color: 'rgb(12, 209, 133)'
    },
    C_3: {
        color: 'rgb(119, 211, 83)'
    },
    C_4: {
        color: 'rgb(255, 186, 92)'
    },
    C_5: {
        color: 'rgb(184, 151, 126)'
    },
    C_6: {
        color: 'rgb(255, 144, 82)'
    },
    C_7: {
        color: 'rgb(249, 95, 98)'
    },
    C_8: {
        color: 'rgb(247, 127, 179)'
    },
    C_9: {
        color: 'rgb(151, 109, 208)'
    },
    C_10: {
        color: 'rgb(52, 63, 75)'
    },
    C_11: {
        color: 'rgb(90, 105, 120)'
    },
    C_12: {
        color: 'rgb(150, 159, 170)'
    },
    C_13: {
        color: 'rgb(198, 203, 208)'
    },
    C_14: {
        color: 'rgb(255, 255, 255)'
    }
};

const changeColor = (editorState, color) => {
    const selection = editorState.getSelection();
    const nextContentState = Object.keys(COLOR_MAP)
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

    if (!currentStyle.has(color)) {
        nextEditorState = RichUtils.toggleInlineStyle(
            nextEditorState,
            color
        );
    }
    return nextEditorState;
};

// const getColorKey = (maps, value) => {
//     const key = Object.keys(maps).find(k => maps[k].color === `rgb(${value})`);
//     return key;
// };

export {
    COLOR_MAP
};
