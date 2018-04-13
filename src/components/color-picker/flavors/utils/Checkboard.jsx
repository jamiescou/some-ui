
import React from 'react';
import PropTypes from 'prop-types';



export default class Checkboard extends React.Component {
    static propTypes = {
        grey: PropTypes.string,
        white: PropTypes.string,
        size: PropTypes.number
    }
    componentWillMount() {
        this._checkboardCache = {};
    }

    renderCheckboard(c1, c2, size) {
        if (typeof document === 'undefined') {
            return null;
        }
        // Dont Render On Server
        let canvas: any = document.createElement('canvas');
        canvas.width = canvas.height = size * 2;
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = c1;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = c2;
        ctx.fillRect(0, 0, size, size);
        ctx.translate(size, size);
        ctx.fillRect(0, 0, size, size);
        return canvas.toDataURL();
    }

    getCheckboard(c1, c2, size) {
        let key = c1 + ',' + c2 + ',' + size;

        if (this._checkboardCache[key]) {
            return this._checkboardCache[key];
        }
        let checkboard = this.renderCheckboard(c1, c2, size);
        this._checkboardCache[key] = checkboard;
        return checkboard;
    }
    render() {
        let background = this.getCheckboard(this.props.white, this.props.grey, this.props.size);
        let style = {
            grid: {
                position: 'absolute',
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
                background: 'url(' + background + ') center left'
            }
        };
        return (
            <div style={ style.grid } ref="grid" />
        );
    }
}

Checkboard.defaultProps = {
    size: 8,
    white: '#fff',
    grey: '#e6e6e6'
};
