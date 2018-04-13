import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {ButtonIcon} from '../../../button-icon';
class Process extends Component {
    static propTypes ={
        stepArr: PropTypes.array.isRequired,
        currentStep: PropTypes.number.isRequired,
        activeStep: PropTypes.number,
        // 右侧button各种状态下按钮内容
        // buttontext为正常文本
        // curButtonText为当前选中和当前节点一致时文本
        // closeButtonText是关闭或者什么都没选的文本
        buttonText: PropTypes.string,
        curButtonText: PropTypes.string,
        closedButtonText: PropTypes.string,
        children: PropTypes.any,
        onBefore: PropTypes.func,
        onAfter: PropTypes.func,
        isOpen: PropTypes.bool,
        haveButton: PropTypes.bool,
        haveTab: PropTypes.bool
    }

    static defaultProps = {
        stepArr: [
            {text: 'Unqualified'},
            {text: 'New'},
            {text: 'Working'},
            {text: 'Nurturing'},
            {text: 'Closed'}],
        buttonText: '更改为此阶段',
        curButtonText: '阶段完成',
        closedButtonText: '已结束',
        // choseText: '选择此状态',
        currentStep: 0,
        activeStep: 0,
        isOpen: true,
        haveButton: true,
        haveTab: true
    }

    constructor(props) {
        super(props);
        this.state = {
            stepArr: props.stepArr,
            currentStep: props.currentStep,
            activeStep: props.activeStep || props.currentStep,
            isOpen: props.isOpen,
            showOption: null
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentStep !== this.props.currentStep) {
            let NewCurrentStep = nextProps.currentStep;
            this.setState({currentStep: NewCurrentStep});
        }
        if (nextProps.activeStep !== this.props.activeStep) {
            let NewActiveStep = nextProps.activeStep;
            this.setState({activeStep: NewActiveStep});
        }
    }

    _changeClassname(index) {
        let { currentStep, activeStep, stepArr} = this.state;
        let className = stepArr[index].className;
        if ( className ) {
            return className;
        }
        if (index === activeStep) {
            return 'mcds-process__is-incurrent-active';
        }
        if (index === currentStep) {
            return 'mcds-process__is-current';
        } else if (index > currentStep ) {
            return 'mcds-process__is-incomplete';
        } else if (index < currentStep) {
            return 'mcds-process__is-complete';
        }
        if (index === stepArr.length && currentStep === stepArr.length ) {
            return 'mcds-process__closed-won';
        } else if (index === stepArr.length-1 && currentStep === -1) {
            return 'mcds-process__closed-lost';
        }
    }

    _changeActiveStep(index) {
        this.setState({activeStep: index});
    }

    _changecurrentStep() {
        let {currentStep, activeStep} = this.state;
        let {stepArr, onBefore, onAfter} = this.props;
        let _act = activeStep;
        let _cur = currentStep;
        // 当前步骤和选中步骤一样，向前走一步（当前和选中都加一）
        if (_cur === _act && _act < stepArr.length) {
            _act ++;
        }
        let promise = new Promise((resolve, reject) =>{
            if (onBefore(_act, _cur)) {
                resolve();
            } else {
                reject();
            }
        });
        // 没有修改state之前触发onBefore
        if (onBefore) {
            promise.then(()=>{
                this.setState({currentStep: _act, activeStep: _act}, ()=>{
                    if (onAfter) {
                        onAfter(_act, _cur);
                    }
                });
            }, ()=>{});
        }
        // 修改state之后异步触发onAfter

    }

    _changeToggle() {
        let isOpen = this.state.isOpen;
        this.setState({isOpen: !isOpen});
    }

    _renderTab() {
        let {activeStep, isOpen} = this.state;
        let {children} = this.props;
        let childrenElement = null;
        if (isOpen) {
            childrenElement = React.Children.map(children, (element, index) => {
                if (element.type === ProcessTabContent && index === activeStep) {
                    return element;
                }
                return null;
            });
        }
        return childrenElement;
    }

    _renderPath() {
        let { stepArr } = this.props;
        let { activeStep, currentStep, showOption } = this.state;
        return stepArr.map((step, index) => {
            let optionVal = step.text;
            if (showOption !== index && currentStep > index && activeStep !== index) {
                optionVal = <icon className="mcds-process__icon mcds-text__size-20 mcds-icon__checked-solid-20" />;
            }
            return (
                <li key={index} className={classnames('mcds-process__path-item', this._changeClassname(index))} onClick={this._changeActiveStep.bind(this, index)}>
                    <a
                        className="mcds-process__path-link"
                        onMouseEnter={()=>this.setState({showOption: index})}
                        onMouseLeave={()=>this.setState({showOption: null})}>
                        <span className="mcds-process__path-title">
                            {optionVal}
                        </span>
                    </a>
                </li>
            );
        });
    }
    render() {
        let { buttonText, curButtonText, closedButtonText, haveButton, haveTab, stepArr } = this.props;
        let {currentStep, activeStep, isOpen} = this.state;
        let length = stepArr.length;
        let isCurrent = currentStep === activeStep && activeStep < length;
        let text = buttonText;
        if (isCurrent) {
            text = curButtonText;
        } else if (activeStep >= length) {
            text = closedButtonText;
        }
        let buttonElement = (
            <button
                className={classnames('mcds-process__button', { 'mcds-process__button-is-won': activeStep >= length, 'mcds-process__button-is-incurrent': activeStep < length })}
                onClick={this._changecurrentStep.bind(this)}>
                {isCurrent ? <i className="mcds-process__icon mcds-text__size-20 mcds-icon__checked-solid-20" /> : null}
                {text}
            </button>
        );
        return (
            <div className="mcds-process">
                <div className="mcds-grid mcds-process__path-wraper">
                    {
                        haveTab ? <ButtonIcon className={classnames('mcds-icon__container mcds-icon__container-32 mcds-button-icon__more mcds-process__trigger', {'mcds-process__trigger-open': isOpen})} icon="mcds-icon__arrow-line-20" onClick={this._changeToggle.bind(this)} /> : null
                    }
                    <div className="mcds-process__path">
                        <ul className="mcds-process__path-nav">
                            {this._renderPath()}
                        </ul>
                    </div>
                    {
                        haveButton ? buttonElement : null
                    }
                </div>
                {
                    haveTab ? this._renderTab() : null
                }
            </div>
        );
    }
}

const ProcessTabContent = ({className, children, ...others}) => (
    <div {...others} className={classnames('mcds-grid mcds-process__tab', className)}>
        {children}
    </div>
);

ProcessTabContent.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any
};

export default {
    Process,
    ProcessTabContent
};
