import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { COLOR_MAP } from './index';

export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = { currentColor: ''};
    }
    setCurrentColor(color) {
        if (color !== this.state.currentColor) {
            this.setState({ currentColor: color });
        }
    }
    render() {
        const { onClick } = this.props;
        const { currentColor } = this.state;
        return (
            <div className="mcds-editor__color-root">
                { Object.keys(COLOR_MAP).map(c => (
                    <PanelItem
                        active={currentColor === c}
                        key={`color${c}`}
                        color={COLOR_MAP[c].color}
                        onClick={onClick.bind(this, c)} />
                ))}
            </div>
        );
    }
}
Panel.propTypes = {
    onClick: PropTypes.func
};

const PanelItem = ({ color, onClick, active }) => (
    <span
        className={classnames('mcds-editor__color-btn', {'mcds-editor__color-active': active})}
        style={{backgroundColor: color}}
        onClick={onClick} />
);
PanelItem.propTypes = {
    color: PropTypes.string,
    active: PropTypes.bool,
    onClick: PropTypes.func
};
