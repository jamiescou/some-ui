
import React from 'react';
import {Editor} from './index';
import ReactMarkdown from 'react-markdown';

let EditorExampleCode = `
class EditorExample extends React.Component {
    componentWillMount() {
        this.state = {
            text: ''
        };   
    }
    onChange() {
        this.setState({
            text:this.refs.editor.html()
        });
    }
    render() {
        return (
            <div>
                <Editor 
                    ref="editor"
                    onChange={::this.onChange}
                />
                <div style={{border:'1px solid #333',minHeight:'100px'}}>{this.state.text}</div>
            </div>
        )
    }
}`;

class EditorExample extends React.Component {
    componentWillMount() {
        this.state = {
            text: ''
        };
    }
    onChange() {
        this.setState({
            text: this.refs.editor.html()
        });
    }
    render() {
        return (
            <div>
                <Editor
                    error={true}
                    ref="editor"
                    onChange={::this.onChange} />
                <div style={{border: '1px solid #333', minHeight: 100, marginTop: 10}}>{this.state.text}</div>
            </div>
        );
    }
}

const Intro = '##### 这里是富文本组件\r\n\r\n- 可以通过fontSizeStyle参数来决定有无字体按钮\r\n\t- 下面是输出的内容，放到innerHTML里就好，在此不细表\r\n\t- 空行暂时用<div></div>标签，有了全局样式的空行再行修改\r\n\t- color使用颜色组件，会有一些问题，暂时没用，后续会进行修改\t\r\n\t- 去链接在点开链接弹出框后面，没有放在编辑器上方\r\n';
export default [
    {
        id: 'Editor',
        element: <EditorExample />,
        intro: <ReactMarkdown className="markdown" source={Intro} />,
        code: EditorExampleCode
    }
];
