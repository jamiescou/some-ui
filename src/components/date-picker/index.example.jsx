import React from 'react';
import { DatePicker, MiniCalendar } from './index';
import { Input } from '../form';
import ReactMarkdown from 'react-markdown';

let DatePickerExampleCode = `
class Example extends React.Component {
    ...
    onChanged(v) {
        console.log('onChanged',v);
    }
    render() {
        return (
            <DatePicker onChanged={this.onChanged.bind(this)} >
                <Button className="mcds-button__brand">
                    时间选择器
                </Button>
            </DatePicker>
        );
    }
}`;

class DatePickerExample extends React.Component {

    onChange(v) {
        console.log('onChanged', v);
    }

    render() {
        return (
            <DatePicker error={true} onChange={this.onChange.bind(this)} closeOnOutsideClick={true}>
                <Input
                    iconRight={<span onClick={() => { console.log('span click'); }} className="mcds-icon__data-line-20" />}
                    ref="input" />
            </DatePicker>
        );
    }
}

const MiniCalendarExample = () => (
    <MiniCalendar />
);

const Intro = '##### DatePicker提供以下参数\r\n\r\n- DatePicker\r\n\t- init 初始化时间戳(默认为当前时间点)\r\n\t- onChanged 结束回调\r\n\t- onClose 关闭时候的回调\t\r\n\t- onOpen 展示这前回调\r\n\t- placement 打开的位置\r\n';
export default [
    {
        id: 'datePicker',
        element: <DatePickerExample />,
        intro: <ReactMarkdown className="markdown" source={Intro} />,
        code: DatePickerExampleCode
    },
    {
        id: 'miniCalendar',
        element: <MiniCalendarExample />,
        code: MiniCalendarExample
    }
];
