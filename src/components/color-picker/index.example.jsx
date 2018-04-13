import React from 'react';
import ColorPicker from './index';
import ReactMarkdown from 'react-markdown';
// const ReactElementToString = require('react-element-to-string');

class ColorPickerExample extends React.Component {
    componentWillMount() {
        this.state = {
            displayColorPicker: false,
            color: 'FC44A9'
        };
    }
    onShowColorPicker() {
        this.setState({
            displayColorPicker: true
        });
    }
    onColorChangeComplete(color) {
        let hex = color.hex;
        this.setState({
            color: hex
        });
    }
    onClose() {
        this.setState({
            displayColorPicker: false
        });
    }
    render() {
        const PresetColors = [
            'ff3b30',
            'ff9500',
            'ffcc00',
            '3ad531',
            '26e4cc',
            '5bcaff',
            '007aff',
            '8e44fc',
            'ff4981',
            '1f1f21'
        ];
        let colors = PresetColors.map(color => '#' + color);
        return (
            <div className="mcds-color__setting">
                <ColorPicker
                    presetColors={colors}
                    display={this.state.displayColorPicker}
                    color={'#' + this.state.color}
                    onChangeComplete={::this.onColorChangeComplete}
                    onClose={::this.onClose} />
                <label onClick={::this.onShowColorPicker} className="mcds-color__etting-label">
                    来试试颜色吧
                    <div className="mcds-color__preview" style={{backgroundColor: '#' + this.state.color}} />
                </label>
            </div>
        );
    }
}

let DataPickerExampleCode = `
class ColorPickerExample extends React.Component {
    componentWillMount() {
        this.state = {
            displayColorPicker: false,
            color: 'FC44A9'
        }       
    }
    onShowColorPicker() {
        this.setState({
            displayColorPicker: true
        });
    }
    onColorChangeComplete(color) {
        let hex = color.hex;
        this.setState({
            color: hex
        })
    }
    onClose() {
        this.setState({
            displayColorPicker: false
        });
    }
    render() {
        const PresetColors = [
            'ff3b30',
            'ff9500',
            'ffcc00',
            '3ad531',
            '26e4cc',
            '5bcaff',
            '007aff',
            '8e44fc',
            'ff4981',
            '1f1f21'
        ];
        let colors = PresetColors.map(color => '#' + color);
        return (
            <div className="mcds-color__setting">
                <ColorPicker
                    presetColors={colors}
                    display={this.state.displayColorPicker}
                    color={'#' + this.state.color}
                    onChangeComplete={::this.onColorChangeComplete}
                    onClose={::this.onClose} />
                <label onClick={::this.onShowColorPicker} className="mcds-color__etting-label">
                    来试试颜色吧
                    <div className="mcds-color__preview" style={{backgroundColor: '#' + this.state.color}}></div>
                </label>
            </div>
        );
    }
}`;


const Intro = '##### ColorPicker提供以下参数\r\n\r\n- ColorPicker\r\n\t- presetColors 基本选色（hex值通过数组形式传入）\r\n\t- display 是否显示（布尔值）\r\n\t- onClose 关闭时候的回调\t\r\n\t- onChangeComplete 改变颜色触发的函数，参数为当前组件颜色\t\r\n\t- color 当前颜色\r\n';
export default [
    {
        id: 'ColorPicker',
        element: <ColorPickerExample />,
        intro: <ReactMarkdown className="markdown" source={Intro} />,
        code: DataPickerExampleCode
    }
];
