import React, { Component } from 'react' ;
import ReactMarkdown from 'react-markdown';

import {Button} from '../index';

import {Notifications, notify} from './index';

const ExampleCode = `
import Notifications, {notify} from '***';
...
class Example extends Component{
    constructor(props) {
        super(props);
    }
    add() {
        notify.add({
            message: 'Notification',
            theme: 'info',
            dismissAfter: 3000
        });
    }
    show() {
        notify.show('12313');
    }
    render() {
        return (
            <div>
                <div>
                    <p>这是一个队列提示信息.</p>
                    <Button
                        className="mcds-button__neutral"
                        onClick={this.add.bind(this)}>toast</Button>
                </div>

                <div>
                    <p>这是单挑的提示信息.</p>
                    <Button className="mcds-button__neutral" onClick={this.show.bind(this)}>alert</Button>
                </div>
                //Notifications 声明一次就好,最好在外层组件中调用 
                <Notifications />
            </div>
        );
    }
}
`;

class Example extends Component{
    constructor(props) {
        super(props);
    }
    add() {
        notify.add({
            message: 'Notification',
            theme: 'info',
            dismissAfter: 3000
        });
    }
    show() {
        notify.show('12313');
    }
    render() {
        return (
            <div>
                <div>
                    <p>这是一个队列提示信息.</p>
                    <Button
                        className="mcds-button__neutral"
                        onClick={this.add.bind(this)}>toast</Button>
                </div>

                <div>
                    <p>这是单挑的提示信息.</p>
                    <Button className="mcds-button__neutral" onClick={this.show.bind(this)}>alert</Button>
                </div>
                <Notifications />
            </div>
        );
    }
}
const intro = "##### Notifications有二种表现形式\r\n\r\n- alert\r\n- toast\r\n\r\n###### alert是长期提醒,必须手动才可以关闭 调用方式 \r\n\r\n```\r\nimport {notify} from 'somewhere';\r\nnotify.show('something');\r\n```\r\n或者\r\n\r\n```\r\nwindow.notify.show('abc');\r\n或者\r\nwindow.notify.show({message:'abc',theme,dismissAfter})\r\n```\r\n\r\n###### toast是自动显示和隐藏的\r\n```\r\nimport {notify} from 'somewhere';\r\nnotify.add('something');\r\n```\r\n或者\r\n\r\n```\r\nwindow.notify.add('abc');\r\n或者\r\nwindow.notify.add({message:'abc',theme,dismissAfter})\r\n```\r\n\r\n##### options常用属性\r\n\r\n- message 提示的内容\r\n- theme 主题\r\n\t- info\r\n\t- error \r\n\t- base\r\n\t- warning\r\n\t- success\r\n- dismissAfter  多少毫秒后消失 如果为false默认为不消失\r\n- closed 是否显示右侧关闭图标\r\n- activeClassName\t显示后的样式,可以自定义\r\n";
export default [
    {
        id: 'Notifications',
        element: <Example>123</Example>,
        intro: <ReactMarkdown className="markdown" source={intro} />,
        code: ExampleCode
    }
];
