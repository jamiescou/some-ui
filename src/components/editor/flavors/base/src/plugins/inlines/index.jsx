import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { RichUtils } from 'draft-js';

import { BoldButton, ItalicButton, UnderlineButton } from '../buttons';

const Wrap = WrapedComponent => style => {
    class WrapComponent extends Component {
        handleChange() {
            const { editorState, onChange } = this.props;
            onChange(RichUtils.toggleInlineStyle(editorState, style));
        }
        render() {
            const currentStyle = this.props.editorState.getCurrentInlineStyle();
            return (
                <WrapedComponent
                    {...this.props}
                    active={currentStyle.has(style)}
                    onClick={::this.handleChange} />
            );
        }
    }
    WrapComponent.propTypes = {
        editorState: PropTypes.object,
        onChange: PropTypes.func
    };
    return WrapComponent;
};

const BoldComponent = Wrap(BoldButton)('BOLD');
const ItalicComponent = Wrap(ItalicButton)('ITALIC');
const UnderlineComponent = Wrap(UnderlineButton)('UNDERLINE');

export {
    BoldComponent,
    ItalicComponent,
    UnderlineComponent
};
