import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { mergeClassName } from '../../utils';

export default class IconButton extends Component {
    render() {
        const {
            active,
            name,
            onClick,
            className,
            style
        } = this.props;
        return (
            <i
                onClick={onClick}
                style={style}
                className={mergeClassName(className, name, 'mcds-editor__icon-button-root', active ? 'mcds-editor__icon-button-active' : '')} />
        );
    }
}

IconButton.propTypes = {
    active: PropTypes.bool,
    name: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object
};
