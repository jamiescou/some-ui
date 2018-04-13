
import React from 'react';
import PropTypes from 'prop-types';
import color from './../utils/color';

import {EditableInput} from './../utils';
export default class SketchFields extends React.Component {
    static propTypes={
        onChange: PropTypes.func,
        hsl: PropTypes.object,
        rgb: PropTypes.object,
        rgba: PropTypes.string,
        hex: PropTypes.string
    };
    constructor() {
        super();
        this.handleChange=this.handleChange.bind(this);
    }
    // 直接输入十六进位hex值
    handleChange(data) {
        if (data.hex) {
            if (color.isValidHex(data.hex)) {
                this.props.onChange(data.hex);
            }
        } else if (data.r || data.g || data.b) {
            this.props.onChange({
                r: data.r || this.props.rgb.r,
                g: data.g || this.props.rgb.g,
                b: data.b || this.props.rgb.b,
                a: this.props.rgb.a
            });
        } else if (data.a) {
            if (data.a < 0) {
                data.a=0;
            } else if (data.a > 100) {
                data.a=100;
            }
            data.a=data.a / 100;
            this.props.onChange({
                h: this.props.hsl.h,
                s: this.props.hsl.s,
                l: this.props.hsl.l,
                a: data.a
            });
        }
    }

    render() {
        let style={
            fields: {
                display: 'flex',
                paddingTop: '4px'
            },
            single: {
                flex: '1',
                paddingLeft: '6px'
            },
            double: {
                flex: '2'
            },
            hexHolder: {
                width: '100%'
            },
            only: {
                flex: '1'
            }
        };
        let elem=(
            <div style={ style.fields } className="flexbox-fix">
                <div style={ style.double }>
                    <EditableInput label="hex" value={ this.props.hex.replace('#', '') } onChange={ this.handleChange } />
                </div>
            </div>);
        return (elem);
    }

}
