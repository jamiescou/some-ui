import React from 'react';
import PropTypes from 'prop-types';

import {Saturation, Hue, Alpha, Checkboard} from './../utils';
import SketchFields from './sketchFields';
import SketchPresetColors from './sketchPresetColors';

export default class Sketch extends React.Component {
    static propTypes={
        a: PropTypes.number,
        onChange: PropTypes.func,
        hsl: PropTypes.object,
        rgb: PropTypes.object,
        width: PropTypes.number,
        presetColors: PropTypes.array
    }
    static defaultProps={
        presetColors: ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF'],
        width: 200
    }
    constructor() {
        super();
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(data) {
        this.props.onChange(data);
    }

    render() {
        var style={
            picker: {
                width: '200px',
                padding: '10px 10px 0',
                boxSizing: 'initial',
                background: '#fff',
                borderRadius: '4px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15)'
            },
            saturation: {
                width: '100%',
                paddingBottom: '75%',
                position: 'relative',
                overflow: 'hidden'
            },
            Saturation: {
                radius: '3px',
                shadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)'
            },
            controls: {
                display: 'flex'
            },
            sliders: {
                padding: '4px 0',
                flex: '1'
            },
            color: {
                width: '16px',
                height: '16px',
                position: 'relative',
                marginTop: '4px',
                marginLeft: '4px',
                borderRadius: '3px'
            },
            activeColor: {
                position: 'absolute',
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
                borderRadius: '2px',
                background: 'rgba(' + this.props.rgb.r + ', ' + this.props.rgb.g + ', ' + this.props.rgb.b + ', ' + this.props.rgb.a + ')',
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
                zIndex: '2'
            },
            hue: {
                position: 'relative',
                height: '16px',
                overflow: 'hidden'
            },
            Hue: {
                radius: '2px',
                shadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)'
            },
            alpha: {
                display: 'none'
            },
            Alpha: {
                radius: '2px',
                shadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)'
            }
        };
        return (
            <div style={ style.picker } >
                <div style={ style.saturation } >
                    <Saturation style={ style.Saturation } {...this.props } onChange={ this.handleChange } />
                </div>
                <div style={ style.controls} >
                    <div style={ style.sliders } >
                        <div style={ style.hue } >
                            <Hue style={ style.Hue } {...this.props } onChange={ this.handleChange } />
                        </div>
                        <div style={ style.alpha } >
                            <Alpha style={ style.Alpha } {...this.props } onChange={ this.handleChange } />
                        </div>
                    </div>
                    <div style={ style.color }>
                        <div style={ style.activeColor } />
                        <Checkboard />
                    </div>
                </div>
                <div style={ style.fields }>
                    <SketchFields {...this.props } onChange={ this.handleChange } />
                </div>
                <div style={ style.presets }>
                    <SketchPresetColors colors={ this.props.presetColors } onClick={ this.handleChange} />
                </div>
            </div>
        );
    }
}
