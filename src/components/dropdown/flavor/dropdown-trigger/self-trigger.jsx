import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {  calculateSelfPosition, getPosition } from './util';
import { hasClass } from '../../../../utils/dom';
// 定义位置
// const Target = ['self', 'body'];
// const Direction = [
//     'top-left',
//     'top-right',
//     'right-top',
//     'right-bottom',
//     'bottom-left',
//     'bottom-right',
//     'left-top',
//     'left-bottom'
// ]


export default class SelfDropDownTrigger extends React.Component {

    static propTypes = {
        children: PropTypes.any.isRequired,
        className: PropTypes.string,
        placement: PropTypes.string, // 方向
        onClose: PropTypes.func,
        closeOnOutsideClick: PropTypes.bool,
        synchWidth: PropTypes.bool,
        offset: PropTypes.number,
        onOpen: PropTypes.func,
        autoCloseTag: PropTypes.string
    };

    constructor(){
        super();
        this.state = {
            open: false,
            display: 'none'
        };
        this.handleOutsideMouseClick = this.handleOutsideMouseClick.bind(this);
        this.node = null;
        this.close = this.close.bind(this);
    }

    componentWillMount() {
        try {
            let counts = React.Children.count(this.props.children);
            if (counts !== 2) {
                throw new Error('DropDownTrigger children must be two,like\r\n<DropDownTrigger>\r\n\t<any>click</any>\r\n\t<Dropdown />\r\n</DropDownTrigger>');
            }
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        let { closeOnOutsideClick } = this.props;
        if (closeOnOutsideClick) {
            document.addEventListener('mouseup', this.handleOutsideMouseClick);
            document.addEventListener('touchstart', this.handleOutsideMouseClick);
        }
        this.isMount = true;

    }
    componentWillUnmount() {
        let { closeOnOutsideClick } = this.props;
        if (closeOnOutsideClick) {
            document.removeEventListener('mouseup', this.handleOutsideMouseClick);
            document.removeEventListener('touchstart', this.handleOutsideMouseClick);
        }
        this.isMount = false;
    }
    handleOutsideMouseClick(e) {

        if (!this.state.open) { return; }
        const root = this.refs.triggerWrap;
        this.handleCheckAutoClose(e);
        if (root.contains(e.target) || (e.button && e.button !== 0)) { return; }
        e.stopPropagation();
        this.close();
    }
    handleCheckAutoClose(e) {
        let { autoCloseTag } = this.props;
        if (!autoCloseTag) { return false; }
        let path = e.path || (e.composedPath && e.composedPath());
        let hasClose = false;
            for (let i = 0; i< path.length; i++ ) {
                hasClose = hasClass(path[i], autoCloseTag);
                if (hasClose) {
                    break;
                }
            }
        
        // 如果路径上有,关闭的tag
        if (hasClose) {
            this.close();
        }
    }
    _handleToggle(e) {
        let { display } = this.state;
        if (display === 'none') {
            this.open();
        } else {
            this.close();
        }
        e.stopPropagation();
    }
    open() {
        let display = 'block';
        this.setState({display});

        setTimeout(() => {
            this.props.onOpen();
            this.setPosition();
            if (this.isMount) {
                this.setState({open: !this.state.open});
            }
        }, 100);
    }

    close() {
        this.setState({open: false});
        setTimeout(() => {
            this.props.onClose();
            if (this.isMount) {
                this.setState({display: 'none'});
            }
        }, 100);
    }
    getTargetPosition() {
        let trigger = this.refs.triggerWrap; // 暂时找不到同好的办法获取children的dom节点
        let childrenTarget = trigger.children[0] || [];
        let positionInfo = getPosition(childrenTarget);
        return positionInfo;
    }
    getDropDownPosition() {
        let wrap = this.refs.triggerWrap;
        let dropdown = wrap.querySelector('.___dropdown');
        // console.log("dropdown", dropdown);
        let positionInfo = getPosition(dropdown);

        return positionInfo;
    }
    setPosition() {
        let { placement, offset, synchWidth} = this.props;
        // 容器div
        let wrap = this.refs.triggerWrap;
        // 按钮位置信息
        let buttonPos = this.getTargetPosition();
        // 下拉的位置信息
        let dropDownPos = this.getDropDownPosition();

        let dropDownEle = wrap.querySelector('.___dropdown');

        let position = calculateSelfPosition(placement, buttonPos, dropDownPos, offset) ;

        dropDownEle.style.left = position.left + 'px';
        dropDownEle.style.top = position.top + 'px';
        dropDownEle.style.marginTop = 0;
        if (synchWidth) {
            dropDownEle.style.width = buttonPos.width + 'px';
            dropDownEle.style.minWidth = 'initial';
            dropDownEle.style.maxWidth = 'initial';
        }

    }
    renderTrigger() {
        let children = React.Children.toArray(this.props.children);
        if (!children[0]) { return false; }
        // let oldOnClick =
        let onClickFun = (e) => {
            if (children[0].props.onClick) {
                children[0].props.onClick(e);
            }
            this._handleToggle(e);
        };
        let firstChild = React.cloneElement(children[0], {onClick: onClickFun});
        return firstChild;
    }

    renderDropdown() {
        let children = React.Children.toArray(this.props.children);
        if (!children[1]) { return false; }
        let className = classnames(children[1].props.className, {open: this.state.open, ___dropdown: true});
        let secondChild = React.cloneElement(children[1], {className: className, style: {display: this.state.display}});
        return secondChild;
    }

    render() {
        let { className } = this.props;
        return (
            <div ref="triggerWrap" className={classnames('mcds-dropdown__trigger', className)}>
                {this.renderTrigger()}
                {this.renderDropdown()}
            </div>);
    }
}
SelfDropDownTrigger.defaultProps = {
    onClose: () => {},
    onOpen: () => {},
    placement: 'right'
};
