import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from 'draft-js';

import {
    OrderedListButton,
    UnorderedListButton,
    AlignLeftButton,
    AlignCenterButton,
    AlignRightButton
} from '../buttons';

const Wrap = WrapedComponent => type => {
    class WrapComponent extends Component {
        handleChange() {
            const { editorState, onChange } = this.props;
            onChange(RichUtils.toggleBlockType(editorState, type));
        }
        render() {
            const editorState = this.props.editorState;
            const selection = editorState.getSelection();
            const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();
            return (
                <WrapedComponent
                    {...this.props}
                    active={blockType === type}
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

const OrderedListComponent = Wrap(OrderedListButton)('ordered-list-item');
const UnorderedListComponent = Wrap(UnorderedListButton)('unordered-list-item');
const AlignLeftComponent = Wrap(AlignLeftButton)('header-four');
const AlignCenterComponent = Wrap(AlignCenterButton)('header-five');
const AlignRightComponent = Wrap(AlignRightButton)('header-six');

export {
    OrderedListComponent,
    UnorderedListComponent,
    AlignLeftComponent,
    AlignCenterComponent,
    AlignRightComponent
};
