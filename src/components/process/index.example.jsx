import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import { Process, ProcessTabContent } from './index';

let stepArr = [
    {text: 'Unqualified'},
    {text: 'New'},
    {text: 'Working'},
    {text: 'Nurturing'},
    {text: 'Closed'}
];
class Example extends Component{
    constructor(props) {
        super(props);
    }
    handleBefore(i, j) {
        console.log('onBefore', i, j);
        return true;
    }
    handleAfter(i, j) {
        console.log('onAfter', i, j);
    }
    render() {
        let a = 1;
        const section = [
            <section className="mcds-process__tab-grid" key="123">
                <div className="mcds-layout__column mcds-divider__top mcds-divider__bottom mcds-process__tab-grid-item mcds-text__weak">
                    <div className="mcds-layout__item">关键字段</div>
                    <div className="mcds-layout__right">
                        <span className="mcds-text__link mcds-cursor__pointer mcds-text__size-13">编辑</span>
                    </div>
                </div>
                <div className="mcds-layout__column mcds-layout__middle mcds-divider__bottom mcds-process__tab-grid-item mcds-text__weak">
                    <div className="mcds-layout__item ">邮箱</div>
                    <div className="mcds-layout__right mcds-text mcds-text__size-13">
                        <span className="mcds-readonly__span">ppp@ppp1.com</span>
                    </div>
                </div>
                <div className="mcds-layout__column mcds-layout__middle mcds-divider__bottom  mcds-process__tab-grid-item mcds-text__weak">
                    <div className="mcds-layout__item">员工数</div>
                    <div className="mcds-layout__right">
                        <i className="mcds-icon__edit-line-20 mcds-text__size-20 mcds-cursor__pointer" />
                    </div>
                </div>
            </section>,
            <section className="mcds-process__tab-grid  mcds-text__weak" key="456">
                <div className="mcds-divider__top mcds-divider__bottom mcds-process__tab-grid-item">
                    指导
                </div>
                <div className="mcds-p__l-20 mcds-p__t-20 mcds-p__b-20 mcds-text__size-13 mcds-divider__bottom mcds-process__tab-grid-richtext">
                    Regularly cross-sell related products <a href="javascript:void(0);">using cross-sell tactics and principles.</a> Prepare demo deck using the <a href="javascript:void(0);">latest template</a> and review with Marketing and Sales teams. Review demo copy with Legal and Doc team.
                </div>
            </section>
        ];
        return (
            <div>
                <Process
                    stepArr={stepArr}
                    currentStep={a}
                    activeStep={a}
                    onBefore={this.handleBefore}
                    onAfter={this.handleAfter}
                    isOpen={true}
                    haveButton={true}
                    haveTab={false} >
                    <ProcessTabContent>
                        {section}
                    </ProcessTabContent>
                    <ProcessTabContent>
                        {section}
                    </ProcessTabContent>
                    <ProcessTabContent>
                        {section}
                    </ProcessTabContent>
                    <ProcessTabContent>
                        {section}
                    </ProcessTabContent>
                    <ProcessTabContent>
                        {section}
                    </ProcessTabContent>
                </Process>
            </div>
        );
    }
}
const intro = '\r\n#### Process 进度条 支持传入\r\n\r\n-  currentStep 进度条当前状态（unmber类型，初始状态为0，Won状态为进度条项目数，Lose状态为-1）\r\n-  buttonText 右侧按钮的文本内容\r\n-  stepArr 可传入每个选项框的属性 text和className\r\n-  onBefore 进入其他进度前调用的函数，需返回布尔值判断是否进入，参数依次为activeStep和currentStep，即当前要进入的步骤（当前活动的步骤）和此时进度条所在的步骤\r\n- 这里的例子为进度位于1（第二个格子），活动模块位于3（第四个格子），若上方input为空，则进度不能跳到3\r\n- 增加isOpentab页内容是否开启 （布尔值，默认为开启）\r\n- 增加haveButton是否有右侧按钮 （布尔值，默认为有）';
export default [
    {
        id: 'Process',
        element: <Example />,
        intro: <ReactMarkdown className="markdown" source={intro} />,
        code: '123'
    }
];
