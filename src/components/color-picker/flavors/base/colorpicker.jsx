import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import merge from './../utils/merge';
import color from './../utils/color';
import Sketch from './sketch';

export default class ColorPicker extends React.Component {
    static propTypes={
        color: PropTypes.string,
        display: PropTypes.bool,
        onClose: PropTypes.func,
        onChangeComplete: PropTypes.func,
        onChange: PropTypes.func
    }
    constructor(props) {
        super();
        this.state=merge(color.toState(props.color, 0), {
            visible: props.display
        });
        this.debounce=_.debounce(function(fn, data) {
            fn(data);
        }, 100);
        this.handleChange=this.handleChange.bind(this);
        this.handleHide=this.handleHide.bind(this);
        this.handleAccept=this.handleAccept.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState(merge(color.toState(nextProps.color, this.state.oldHue), {
            visible: nextProps.display
        }));
    }
    handleHide() {
        if (this.state.visible === true) {
            this.setState({
                visible: false
            });
            if (this.props.onClose) {
                this.props.onClose({
                    hex: this.state.hex,
                    hsl: this.state.hsl,
                    rgb: this.state.rgb
                });
            }
        }
    }
    handleAccept() {
        this.handleHide();
    }
    handleCancel() {
        if (this.state.visible === true) {
            this.setState({
                visible: false
            });
        }
    }
    handleChange(value) {
        let data=color.simpleCheckForValidColor(value);
        if (data) {
            let colors=color.toState(data, data.h || this.state.oldHue);
            this.setState(colors);
            if (this.props.onChangeComplete) {
                this.debounce(this.props.onChangeComplete, colors);
            }
            if (this.props.onChange) {
                this.props.onChange(colors);
            }
        }
    }

    render() {
        let style={
            picker: {
                zIndex: '2',
                position: 'relative'
            },
            cover: {
                position: 'fixed',
                top: '0px',
                bottom: '0px',
                left: '0px',
                right: '0px'
            }
        };
        if (this.state.visible === true) {
            // 选色框的位置，可以手动改这里
            let vStyle={
                wrap: {
                    zIndex: '999',
                    position: 'absolute',
                    display: 'block',
                    left: '10%',
                    marginLeft: '20px',
                    top: '100px'
                }
            };
            let comStyle=style;
            style=merge(comStyle, vStyle);
        } else if (this.state.visible === false) {
            let vStyle={
                wrap: {
                    zIndex: '999',
                    position: 'absolute',
                    display: 'none'
                }
            };
            let comStyle=style;
            style=merge(comStyle, vStyle);
        }
        return (
            <div style={ style.wrap }>
                <div style={ style.picker }>
                    <Sketch {...this.props } {...this.state } onChange={ this.handleChange } onAccept={ this.handleAccept } onCancel={this.handleCancel } />
                </div>
                <div style={ style.cover } onClick={ this.handleHide } />
            </div>);
    }
}
ColorPicker.defaultProps={
    color: {
        h: 250,
        s: 0.50,
        l: 0.20,
        a: 1
    },
    display: true,
    rgba: 'hide'
};
