/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const FONT_SIZE_MAP = [12, 13, 14, 16, 18, 20, 24];

export default class Panel extends Component {
    render() {
        const { onClick } = this.props;
        return (
            <ul className="mcds-editor__font-size-root">
                { FONT_SIZE_MAP.map(c => (
                    <PanelItem key={`fontSize${c}`} val={c} onClick={onClick} />
                ))}
            </ul>
        );
    }
}


Panel.propTypes = {
    val: PropTypes.object,
    onClick: PropTypes.func
};
const PanelItem = ({ val, onClick }) => (
    <li
        onClick={onClick.bind(this, val)}
        style={{fontSize: `${val}px`}}>
        {val} px
    </li>
);
PanelItem.propTypes = {
    val: PropTypes.number,
    onClick: PropTypes.func
};
