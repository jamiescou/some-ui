
import React from 'react';
import PropTypes from 'prop-types';

export default class Hue extends React.Component {
    static propTypes={
        onChange: PropTypes.func,
        hsl: PropTypes.object,
        hsv: PropTypes.object,
        rgba: PropTypes.string,
        radius: PropTypes.string,
        shadow: PropTypes.string,
        pointer: PropTypes.object,
        direction: PropTypes.string
    }
    constructor() {
        super();

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

        if (this.props.direction === 'vertical') {
            let h;
            if (top < 0) {
                h = 359;
            } else if (top > containerHeight) {
                h = 0;
            } else {
                let percent = -(top * 100 / containerHeight) + 100;
                h = (360 * percent / 100);
            }

            if (this.props.hsl.h !== h) {
                this.props.onChange({
                    h: h,
                    s: this.props.hsl.s,
                    l: this.props.hsl.l,
                    a: this.props.hsl.a
                });
            }
        } else {
            let h;
            if (left < 0) {
                h = 0;
            } else if (left > containerWidth) {
                h = 359;
            } else {
                let percent = left * 100 / containerWidth;
                h = (360 * percent / 100);
            }

            if (this.props.hsl.h !== h) {
                this.props.onChange({
                    h: h,
                    s: this.props.hsl.s,
                    l: this.props.hsl.l,
                    a: this.props.hsl.a
                });
            }
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
        let style = {};
        if (this.props.rgba === 'show') {
            style = {
                hue: {
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    right: '0px',
                    bottom: '0px',
                    background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
                    borderRadius: this.props.radius,
                    boxShadow: this.props.shadow
                },
                container: {
                    margin: '0 2px',
                    position: 'relative',
                    height: '100%'
                },
                pointer: {
                    zIndex: '2',
                    position: 'absolute',
                    left: (this.props.hsl.h * 100) / 360 + '%'
                },
                slider: {
                    marginTop: '1px',
                    width: '4px',
                    borderRadius: '1px',
                    height: '8px',
                    boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
                    background: '#fff',
                    transform: 'translateX(-2px)'
                }
            };
        } else {
            style = {
                hue: {
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    right: '0px',
                    bottom: '0px',
                    background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
                    borderRadius: this.props.radius,
                    boxShadow: this.props.shadow
                },
                container: {
                    margin: '0 2px',
                    position: 'relative',
                    height: '16px'
                },
                pointer: {
                    zIndex: '2',
                    position: 'absolute',
                    left: (this.props.hsl.h * 100) / 360 + '%'
                },
                slider: {
                    marginTop: '1px',
                    width: '4px',
                    borderRadius: '1px',
                    height: '14px',
                    boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
                    background: '#fff',
                    transform: 'translateX(-2px)'
                }
            };
        }
        let pointer=<div style={ style.slider } />;
        if (this.props.pointer) {
            pointer=<this.props.pointer {...this.props} />;
        }
        return (
            <div style={ style.hue }>
                <div style={ style.container } ref="container" onMouseDown={ this.handleMouseDown } onTouchMove={ this.handleChange }>
                    <div style={ style.pointer } ref="pointer">
                        { pointer }
                    </div>
                </div>
            </div>
        );
    }
}
