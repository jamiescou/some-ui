import React from 'react';
import PropTypes from 'prop-types';

import Checkboard from './Checkboard';

export default class Alpha extends React.Component {
    static propTypes={
        a: PropTypes.number,
        onChange: PropTypes.func,
        hsl: PropTypes.object,
        rgb: PropTypes.object,
        radius: PropTypes.string,
        shadow: PropTypes.string,
        pointer: PropTypes.object
    }
    constructor() {
        super();
        this.handleChange=this.handleChange.bind(this);
        this.handleMouseDown=this.handleMouseDown.bind(this);
        this.handleMouseUp=this.handleMouseUp.bind(this);
    }

    handleChange(e, skip) {
        if (!skip) {
            e.preventDefault();
        }
        let container=this.refs.container;
        let containerWidth=container.clientWidth;
        let left=(e.pageX || e.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset);

        let a;
        if (left < 0) {
            a=0;
        } else if (left > containerWidth) {
            a=1;
        } else {
            a=Math.round(left * 100 / containerWidth) / 100;
        }

        if (this.props.a !== a) {
            this.props.onChange({ h: this.props.hsl.h, s: this.props.hsl.s, l: this.props.hsl.l, a: a });
        }
    }

    handleMouseDown(e) {
        this.handleChange(e, true);
        window.addEventListener('mousemove', this.handleChange);
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    handleMouseUp() {
        window.removeEventListener('mousemove', this.handleChange);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    render() {
        let style={
            alpha: {
                position: 'absolute',
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
                borderRadius: this.props.radius
            },
            checkboard: {
                position: 'absolute',
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
                overflow: 'hidden'
            },
            gradient: {
                position: 'absolute',
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
                background: 'linear-gradient(to right, rgba(' + this.props.rgb.r + ', ' + this.props.rgb.g + ', ' + this.props.rgb.b + ', 0) 0%, rgba(' + this.props.rgb.r + ', ' + this.props.rgb.g + ', ' + this.props.rgb.b + ', 1) 100%)',
                boxShadow: this.props.shadow,
                borderRadius: this.props.radius
            },
            container: {
                position: 'relative',
                zIndex: '2',
                height: '100%',
                margin: '0 3px'
            },
            pointer: {
                zIndex: '2',
                position: 'absolute',
                left: this.props.rgb.a * 100 + '%'
            },
            slider: {
                width: '4px',
                borderRadius: '1px',
                height: '8px',
                boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
                background: '#fff',
                marginTop: '1px',
                transform: 'translateX(-2px)'
            }
        };
        if (this.props.pointer) {
            pointer=<this.props.pointer {...this.props} />;
        }
        let pointer=<div style={style.slider } />;
        return (
            <div style={style.alpha }>
                <div style={style.checkboard }>
                    <Checkboard />
                </div>
                <div style={style.gradient } />
                <div style={style.container } ref="container" onMouseDown={ this.handleMouseDown } onTouchMove={ this.handleChange }>
                    <div style={style.pointer } ref="pointer">
                        { pointer }
                    </div>
                </div>
            </div>
        );
    }
}
