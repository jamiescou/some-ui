import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

export default class Saturation extends React.Component {
    static propTypes = {
        onChange: PropTypes.func,
        hsl: PropTypes.object,
        hsv: PropTypes.object,
        rgb: PropTypes.object,
        radius: PropTypes.string,
        shadow: PropTypes.string,
        pointer: PropTypes.object
    }
    constructor() {
        super();

        this.throttle = _.throttle(function(fn, data) {
            fn(data);
        }, 50);

        this.handleChange = this.handleChange.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    handleChange(e, skip) {
        if (!skip) {
            e.preventDefault();
        }
        let container = this.refs.container;
        let containerWidth = container.clientWidth;
        let containerHeight = container.clientHeight;
        let left = (e.pageX || e.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset);
        let top = (e.pageY || e.touches[0].pageY) - (container.getBoundingClientRect().top + window.pageYOffset);

        if (left < 0) {
            left = 0;
        } else if (left > containerWidth) {
            left = containerWidth;
        } else if (top < 0) {
            top = 0;
        } else if (top > containerHeight) {
            top = containerHeight;
        }

        let saturation = left * 100 / containerWidth;
        let bright = -(top * 100 / containerHeight) + 100;

        this.throttle(this.props.onChange, {
            h: this.props.hsl.h,
            s: saturation,
            v: bright,
            a: this.props.hsl.a
        });
    }

    handleMouseDown(e: any) {
        this.handleChange(e, true);
        window.addEventListener('mousemove', this.handleChange);
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    handleMouseUp() {
        window.removeEventListener('mousemove', this.handleChange);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    render(){
        let style = {
            color: {
                position: 'absolute',
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
                background: 'hsl(' + this.props.hsl.h + ',100%, 50%)',
                borderRadius: this.props.radius
            },
            white: {
                position: 'absolute',
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
                background: 'linear-gradient(to right, #fff, rgba(255,255,255,0))'
            },
            black: {
                position: 'absolute',
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
                background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
                boxShadow: this.props.shadow
            },
            pointer: {
                position: 'absolute',
                right: '0px',
                bottom: '0px',
                top: -(this.props.hsv.v * 100) + 100 + '%',
                left: this.props.hsv.s * 100 + '%',
                cursor: 'default'
            },
            circle: {
                width: '4px',
                height: '4px',
                boxShadow: '0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4)',
                borderRadius: '50%',
                cursor: 'hand',
                transform: 'translate(-2px, -2px)'
            }
        };
        let pointer = <div style={ style.circle } />;

        if (this.props.pointer) {
            pointer=<this.props.pointer {...this.props} />;
        }

        return (
            <div style={ style.color } ref="container" onMouseDown={ this.handleMouseDown } onTouchMove={ this.handleChange }>
                <div style={ style.white }>
                    <div style={ style.black } />
                    <div style={ style.pointer } ref="pointer">
                        { pointer }
                    </div>
                </div>
            </div>
        );
    }
}
