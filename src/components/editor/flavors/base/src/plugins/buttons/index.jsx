/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { IconButton } from '../../components';

class StyleComponent extends Component {
    render() {
        const { onClick, type, ...props } = this.props;
        return (
            <IconButton
                {...props}
                onClick={onClick}
                name={type} />
        );
    }
}
StyleComponent.propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.string
};
const Wrap = WrapedComponent => type => {
    class WrapComponent extends Component {
        render() {
            return React.createElement(WrapedComponent, {
                ...this.props,
                type
            });
        }
    }
    return WrapComponent;
};

const StyleComponentWrap = Wrap(StyleComponent);

const types = {
    color: 'font-color-18',
    fontSize: 'font-scale-18',
    bold: 'bold-18',
    italic: 'italic-18',
    underline: 'underline-18',
    orderedList: 'ordered-list-18',
    unorderedList: 'unordered-list-18',
    alignLeft: 'align-left-18',
    alignCenter: 'center-18',
    alignRight: 'align-right-18',
    link: 'insert-link-18',
    image: 'insert-image-18'
};
const PREFIX = 'mcds-icon';

const ColorButton = StyleComponentWrap(`${PREFIX}__${types.color}`);
const FontSizeButton = StyleComponentWrap(`${PREFIX}__${types.fontSize}`);
const BoldButton = StyleComponentWrap(`${PREFIX}__${types.bold}`);
const ItalicButton = StyleComponentWrap(`${PREFIX}__${types.italic}`);
const UnderlineButton = StyleComponentWrap(`${PREFIX}__${types.underline}`);
const OrderedListButton = StyleComponentWrap(`${PREFIX}__${types.orderedList}`);
const UnorderedListButton = StyleComponentWrap(`${PREFIX}__${types.unorderedList}`);
const AlignLeftButton = StyleComponentWrap(`${PREFIX}__${types.alignLeft}`);
const AlignCenterButton = StyleComponentWrap(`${PREFIX}__${types.alignCenter}`);
const AlignRightButton = StyleComponentWrap(`${PREFIX}__${types.alignRight}`);
const LinkButton = StyleComponentWrap(`${PREFIX}__${types.link}`);
const ImageButton = StyleComponentWrap(`${PREFIX}__${types.image}`);

export {
    ColorButton,
    FontSizeButton,
    BoldButton,
    ItalicButton,
    UnderlineButton,
    OrderedListButton,
    UnorderedListButton,
    AlignLeftButton,
    AlignRightButton,
    AlignCenterButton,
    LinkButton,
    ImageButton
};
