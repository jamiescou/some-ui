import React from 'react';
import PropTypes from 'prop-types';

import  {
    PopoverTrigger,
    Popover,
    // PopoverHead,
    PopoverBody
} from './index.jsx';

import ReactMarkdown from 'react-markdown';

import {Button} from '../index';

let Demo = props =>
    <section id="Popover" className="component">
        <h1>Popover</h1>
        <div className="example">
            <div className="example-content">
                {props.children}
            </div>
        </div>
    </section>;

Demo.propTypes = {
    children: PropTypes.any
};

// 最基本的popover
let PopoverDemo = props => {
    return (
        <Popover className={props.className}>
            <PopoverBody>
                i am the content;
            </PopoverBody>
        </Popover>
    );
};

PopoverDemo.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
};

// 主题色为info的popover
let PopoverDemoThemeInfo = props =>
    <Popover theme="info" className={props.className}>
        <PopoverBody>
            theme为info
        </PopoverBody>
    </Popover>;

PopoverDemoThemeInfo.propTypes = {
    className: PropTypes.string
};


// 主题色为error的popover
let PopoverDemoThemeError = props =>
    <Popover theme="error" className={props.className}>
        <PopoverBody>
            theme为error
            <p>123</p>
            <p>123</p>
            <p>123</p>
            <p>123</p>
        </PopoverBody>
    </Popover>;

PopoverDemoThemeError.propTypes = {
    className: PropTypes.string
};

// 主题色为warning的popover
let PopoverDemoThemeWarning = props =>
    <Popover theme="warning" className={props.className}>
        <PopoverBody>
           theme为warning
        </PopoverBody>
    </Popover>;

PopoverDemoThemeWarning.propTypes = {
    className: PropTypes.string
};

// 主题色为success的popover
let PopoverDemoThemeSuccess = props =>
    <Popover theme="success" className={props.className}>
        <PopoverBody>
           theme为info
        </PopoverBody>
    </Popover>;

PopoverDemoThemeSuccess.propTypes = {
    className: PropTypes.string
};

const PopoverDefault = () => (
    <div>
        <div>
            <p>单一方向如left,top,right,bottom</p>
            <PopoverTrigger triggerBy="click" placement={'top'} overlay={<PopoverDemo />}>
                <Button style={{marginLeft: '0px'}} className="mcds-button__neutral">top</Button>
            </PopoverTrigger>
            <PopoverTrigger triggerBy="click" placement={'right'} overlay={<PopoverDemo />}>
                <Button style={{marginLeft: '0px'}} className="mcds-button__neutral" >right</Button>
            </PopoverTrigger>
            <PopoverTrigger triggerBy="click" placement={'bottom'} overlay={<PopoverDemo />}>
                <Button style={{marginLeft: '0px'}} className="mcds-button__neutral" >bottom</Button>
            </PopoverTrigger>
            <PopoverTrigger triggerBy="click" placement={'left'} overlay={<PopoverDemo />}>
                <Button style={{marginLeft: '0px'}} className="mcds-button__neutral" >left</Button>
            </PopoverTrigger>
        </div>
        <div>
            <p>复合方向 top/bottom</p>
            <PopoverTrigger triggerBy="click" placement={'top-right'} overlay={<PopoverDemoThemeError />}>
                <Button style={{marginLeft: '40px'}} className="mcds-button__neutral" >top-right</Button>
            </PopoverTrigger>
            <PopoverTrigger triggerBy="click" placement={'top-left'} overlay={<PopoverDemoThemeError />}>
                <Button style={{marginLeft: '40px'}} className="mcds-button__neutral" >top-left</Button>
            </PopoverTrigger>
            <PopoverTrigger triggerBy="click" placement={'bottom-left'} overlay={<PopoverDemoThemeError />}>
                <Button style={{marginLeft: '40px'}} className="mcds-button__neutral">bottom-left</Button>
            </PopoverTrigger>
            <PopoverTrigger triggerBy="click" placement={'bottom-right'} overlay={<PopoverDemoThemeError />}>
                <Button style={{marginLeft: '40px'}} className="mcds-button__neutral">bottom-right</Button>
            </PopoverTrigger>
        </div>
        <div>
            <p>复合方向 left/right</p>
            <PopoverTrigger triggerBy="click" placement={'left-top'} overlay={<PopoverDemoThemeError />}>
                <Button style={{marginLeft: '40px'}} className="mcds-button__neutral" >left-top</Button>
            </PopoverTrigger>
            <PopoverTrigger triggerBy="click" placement={'left-bottom'} overlay={<PopoverDemoThemeError />}>
                <Button style={{marginLeft: '40px'}} className="mcds-button__neutral" >left-bottom</Button>
            </PopoverTrigger>
            <PopoverTrigger triggerBy="click" placement={'right-top'} overlay={<PopoverDemoThemeError />}>
                <Button style={{marginLeft: '40px'}} className="mcds-button__neutral" >right-top</Button>
            </PopoverTrigger>
            <PopoverTrigger triggerBy="click" placement={'right-bottom'} overlay={<PopoverDemoThemeError />}>
                <Button style={{marginLeft: '40px'}} className="mcds-button__neutral" >right-bottom</Button>
            </PopoverTrigger>
        </div>
    </div>
);

const PopoverDefaultCode = `
let PopoverDemo = props => {
    return (
        <Popover className={props.className}>
            <PopoverBody>
                i am the content;
            </PopoverBody>
        </Popover>
    );
};
class Example extends React.Component {
    ...
    render() {
        return (
            <div>
                <PopoverTrigger triggerBy="click" placement={'top'} overlay={<PopoverDemo />}>
                    <Button style={{marginLeft: '0px'}} className="mcds-button__neutral" >top</Button>
                </PopoverTrigger>
                <PopoverTrigger triggerBy="click" placement={'right'} overlay={<PopoverDemo />}>
                    <Button style={{marginLeft: '0px'}} className="mcds-button__neutral" >right</Button>
                </PopoverTrigger>
                <PopoverTrigger triggerBy="click" placement={'bottom'} overlay={<PopoverDemo />}>
                    <Button style={{marginLeft: '0px'}} className="mcds-button__neutral" >bottom</Button>
                </PopoverTrigger>
                <PopoverTrigger triggerBy="click" placement={'left'} overlay={<PopoverDemo />}>
                    <Button style={{marginLeft: '0px'}} className="mcds-button__neutral" >left</Button>
                </PopoverTrigger>

                <PopoverTrigger triggerBy="click" placement={'top-right'} overlay={<PopoverDemoThemeError />}>
                    <Button style={{marginLeft: '0px'}} className="mcds-button__neutral" >top-right</Button>
                </PopoverTrigger>
                <PopoverTrigger triggerBy="click" placement={'top-left'} overlay={<PopoverDemoThemeError />}>
                    <Button style={{marginLeft: '0px'}} className="mcds-button__neutral" >top-left</Button>
                </PopoverTrigger>
                <PopoverTrigger triggerBy="click" placement={'bottom-left'} overlay={<PopoverDemoThemeError />}>
                    <Button style={{marginLeft: '0px'}} className="mcds-button__neutral">bottom-left</Button>
                </PopoverTrigger>
                <PopoverTrigger triggerBy="click" placement={'bottom-right'} overlay={<PopoverDemoThemeError />}>
                    <Button style={{marginLeft: '0px'}} className="mcds-button__neutral">bottom-right</Button>
                </PopoverTrigger>
                
                <PopoverTrigger triggerBy="click" placement={'left-top'} overlay={<PopoverDemoThemeError />}>
                    <Button style={{marginLeft: '0px'}} className="mcds-button__neutral" >left-top</Button>
                </PopoverTrigger>
                <PopoverTrigger triggerBy="click" placement={'left-bottom'} overlay={<PopoverDemoThemeError />}>
                    <Button style={{marginLeft: '0px'}} className="mcds-button__neutral" >left-bottom</Button>
                </PopoverTrigger>
                <PopoverTrigger triggerBy="click" placement={'right-top'} overlay={<PopoverDemoThemeError />}>
                    <Button style={{marginLeft: '0px'}} className="mcds-button__neutral" >right-top</Button>
                </PopoverTrigger>
                <PopoverTrigger triggerBy="click" placement={'right-bottom'} overlay={<PopoverDemoThemeError />}>
                    <Button style={{marginLeft: '0px'}} className="mcds-button__neutral" >right-bottom</Button>
                </PopoverTrigger>
            </div>
        );
    }
}
`;

const PopoverThemes = () => (
    <div>
        <PopoverTrigger
            triggerBy="hover"
            onMouseOver={(open)=> {
                setTimeout(() => {
                    open();
                }, 3000);
            }}
            onMouseOut={(close)=> {
                setTimeout(() => {
                    close();
                }, 3000);
            }}
            placement={'top'} overlay={<PopoverDemoThemeInfo />}>
            <Button style={{marginLeft: '0px'}} className="mcds-button__neutral" children="info" />
        </PopoverTrigger>
        <PopoverTrigger triggerBy="hover" placement={'top'} overlay={<PopoverDemoThemeSuccess />}>
            <Button style={{marginLeft: '0px'}} className="mcds-button__neutral" children="success" />
        </PopoverTrigger>
        <PopoverTrigger triggerBy="hover" placement={'top'} overlay={<PopoverDemoThemeWarning />}>
            <Button style={{marginLeft: '0px'}} className="mcds-button__neutral" children="warn" />
        </PopoverTrigger>
        <PopoverTrigger triggerBy="hover" placement={'top'} overlay={<PopoverDemoThemeError />}>
            <Button style={{marginLeft: '0px'}} className="mcds-button__neutral" children="error" />
        </PopoverTrigger>
    </div>
);
const PopoverThemesCode = `
let PopoverDemoThemeInfo = props =>
    <Popover theme="info" className={props.className}>
        <PopoverBody>
            theme为info
        </PopoverBody>
    </Popover>;
// 主题色为error的popover
let PopoverDemoThemeError = props =>
    <Popover theme="error" className={props.className}>
        <PopoverBody>
           theme为error
        </PopoverBody>
    </Popover>;
// 主题色为warning的popover
let PopoverDemoThemeWarning = props =>
    <Popover theme="warning" className={props.className}>
        <PopoverBody>
           theme为warning
        </PopoverBody>
    </Popover>;
// 主题色为success的popover
let PopoverDemoThemeSuccess = props =>
    <Popover theme="success" className={props.className}>
        <PopoverBody>
           theme为info
        </PopoverBody>
    </Popover>;
class Example extends React.Component {
    ...
    render() {
        return (
            <div>
                <PopoverTrigger triggerBy="hover" onMouseOver={() => {
                    alert('123123')
                    console.log("onMouseOver")
                }} placement={'top'} overlay={<PopoverDemoThemeInfo />}>
                    <ButtonIcon style={{marginLeft: '0px'}} className="mcds-button__neutral" icon="mcds-icon__settings-line" />
                </PopoverTrigger>
                <PopoverTrigger triggerBy="hover" placement={'top'} overlay={<PopoverDemoThemeSuccess />}>
                     <ButtonIcon style={{marginLeft: '0px'}} className="mcds-button__neutral" icon="mcds-icon__settings-line" />
                </PopoverTrigger>
                <PopoverTrigger triggerBy="hover" placement={'top'} overlay={<PopoverDemoThemeWarning />}>
                    <ButtonIcon style={{marginLeft: '0px'}} className="mcds-button__neutral" icon="mcds-icon__settings-line" />
                </PopoverTrigger>
                <PopoverTrigger triggerBy="hover" placement={'top'} overlay={<PopoverDemoThemeError />}>
                    <ButtonIcon style={{marginLeft: '0px'}} className="mcds-button__neutral" icon="mcds-icon__settings-line" />
                </PopoverTrigger>
            </div>
        );
    }
}
`;
const intro = '\r\n#### popover 这里的popover将tooltip,popover,overlay等集中在一起.具体使用场景,自行组装\r\n\r\n-  PopoverTrigger 触发器\r\n-  Popover 声明\r\n-  PopoverHead head\r\n-  PopoverBody body\r\n\r\n###### Popover,PopoverHead,PopoverBody用来做弹出层样式的控制可以传入基本的属性如className,style等\r\n\r\n###### PopoverTrigger是popover的触发器 使用方式如下\r\n\r\n```\r\n<PopoverTrigger ...>\r\n\t<anyElemment>                    \r\n</PopoverTrigger>\r\n```\r\n###### PopoverTrigger支持传与以下属性\r\n\r\n- triggerBy 触发方式\r\n\t- click\r\n\t- hover\r\n- placement 弹出层位置信息\r\n\t- top[-,[left,right]]\r\n\t- right[-,[top,bottom]]\r\n\t- bottom[-,[left,right]]\r\n\t- left[-,[top,bottom]]\r\n- overlay 弹出层显示的内容\r\n\r\n##### Popover 支持传入\r\n- theme\r\n\t- success\r\n\t- warning\r\n\t- error\r\n\t- info\r\n\r\noverlay常用以下方式进行拼装\r\n\r\n```\r\n<Popover>\r\n\t<PopoverHead></PopoverHead>\r\n\t<PopoverBody></PopoverBody>\t\r\n</Popover>\r\n```\r\n';
export default [
    {
        id: 'popover',
        element: <PopoverDefault />,
        intro: <ReactMarkdown className="markdown" source={intro} />,
        code: PopoverDefaultCode
    },
    {
        id: 'popoverThemes',
        element: <PopoverThemes />,
        // intro: 'popover 暂时支持 theme = success, warning, error, info',
        code: PopoverThemesCode
    }
];
