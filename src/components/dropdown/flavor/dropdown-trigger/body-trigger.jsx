import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Portal from '../../../../base-components/portal';
import { calculatePortalPosition, getPosition, calculateOutOfParent } from './util';
import { hasClass } from '../../../../utils/dom';


// 定义位置

const Direction = [
    'left',
    'right',
    'bottom',
    'top',
    'top-left',
    'top-right',
    'right-top',
    'right-bottom',
    'bottom-left',
    'bottom-right',
    'left-top',
    'left-bottom'
];
/*
     通过getBoundingClientRect得到的数据计算四个点的坐标
     x1,y1        x2,y2
     x4,y4        x3,y3
 */
const getCoordinates = (visualPos) => {
    // 四个顶点的坐标
    let result = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        x3: 0,
        y3: 0,
        x4: 0,
        y4: 0
    };
    result.x1 = visualPos.left;
    result.y1 = visualPos.top;

    result.x2 = visualPos.left + visualPos.width;
    result.y2 = visualPos.top;

    result.x3 = visualPos.left + visualPos.width;
    result.y3 = visualPos.top + visualPos.height;

    result.x4 = visualPos.left;
    result.y4 = visualPos.top + visualPos.height;
    return result;
};

export default class PortalDropDownTrigger extends React.Component {

    static propTypes = {
        children: PropTypes.any.isRequired,
        className: PropTypes.string,
        placement: PropTypes.string, // 方向
        autoPlacement: PropTypes.bool,
        synchWidth: PropTypes.bool,
        autoCloseTag: PropTypes.string,
        onClose: PropTypes.func,
        offset: PropTypes.number,
        onOpen: PropTypes.func,
        closeOnOutsideClick: PropTypes.bool,
        target: PropTypes.string // 代码目标 self body
    };

    constructor(){
        super();
        this.state = {
            open: false
        };
        this.node = null;
        // close 与 open 暴露给外层使用
        this.close = ::this.close;
        this.open = ::this.open;
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
        let { autoCloseTag } = this.props;
        document.addEventListener('scroll', this._onScroll.bind(this), true);
        if (autoCloseTag){
            document.addEventListener('mouseup', ::this.handleAutoClose, false);
            document.addEventListener('touchstart', ::this.handleAutoClose, false);
        }
    }

    componentWillUnmount() {
        let { autoCloseTag } = this.props;
        document.removeEventListener('scroll', this._onScroll.bind(this));
        if (autoCloseTag) {
            document.removeEventListener('mouseup', ::this.handleAutoClose);
            document.removeEventListener('touchstart', ::this.handleAutoClose);
        }
    }

    handleAutoClose(e) {
        let { autoCloseTag } = this.props;
        if (!this.state.open) { return; }
        let { path } = e;
        let hasClose = false;

        for (let i = 0; i< path.length; i++ ) {
            hasClose = hasClass(path[i], autoCloseTag);
            if (hasClose) {
                break;
            }
        }
        if (hasClose) {
            this.close();
        }
        e.stopPropagation();
    }

    close() {
        if (this.portal && this.portal.node) {
            // 隐藏的时候.会自动触发onClose方法所以,这里不加入onClose
            this.portal.closePortal();
        }
    }

    open() {
        if (this.portal && !this.portal.node) {
            this.portal.openPortal();
            // 这里openPOrtal不会触发onOpen方法,所以特意加上.
            this.onOpen();
        }
    }
    // 本可不必,但是为了dropdown显示的时候的动画.
    _handleToggle(e) {

        let { open } = this.state;
        if (!open) {
            this.onOpen();
        }
        if (e) {
            e.stopPropagation();
        }
    }

    _onScroll(){
        if (!this.state.open) { return false; }
        let { placement } = this.props;
        this._setPosition(placement);
    }

    getTargetPosition() {
        let trigger = this.refs.triggerWrap; // 暂时找不到同好的办法获取children的dom节点
        let childrenTarget = trigger.children[0] || [];
        let positionInfo = getPosition(childrenTarget);
        return positionInfo;
    }

    getDropDownPosition() {
        let portal = this.portal.node;
        let dropdown = portal.querySelector('.___dropdown');
        let positionInfo = getPosition(dropdown);

        return positionInfo;
    }
    checkTargetButtonIsOutOfVisual() {
        let trigger = this.refs.triggerWrap; // 暂时找不到同好的办法获取children的dom节点
        let childrenTarget = trigger.children[0];
        let triggerButtonInfo = childrenTarget.getBoundingClientRect();
        let targetCoordinates = {};

        targetCoordinates = getCoordinates(triggerButtonInfo);
        // 是否超出windows
        if (calculateOutOfParent(targetCoordinates)) {
            return true;
        }
        return false;
    }
    _setPosition(direction) {
        // 如果portal不存在,证明没有代理到body上
        if (!this.portal) { return false; }
        let { placement, offset, synchWidth } = this.props;

        if (direction && typeof direction === 'string') {
            placement = direction;
        }
        let portal = this.portal.node;
        if (!portal || !this.portal) {
            return false;
        }
        let target = this.getTargetPosition();

        let dropdownEle = portal.querySelector('.___dropdown');
        // 这块的逻辑只能放在这
        if (synchWidth) {
            dropdownEle.style.minWidth = 'initial';
            dropdownEle.style.maxWidth = 'initial';
            dropdownEle.style.width = target.width + 'px';
        }

        let dropdown = this.getDropDownPosition();


        let positionInfo = calculatePortalPosition(placement, target, dropdown, offset);

        dropdownEle.style.top = positionInfo.top + 'px';
        dropdownEle.style.marginTop = 0 + 'px';
        dropdownEle.style.left = positionInfo.left + 'px';


        // 以下的代码都是用来做自动调整位置的
        let visualPos = dropdownEle.getBoundingClientRect();

        // 触发区域已经离开视窗
        let isOutOfVisual = this.checkTargetButtonIsOutOfVisual();

        if (!this.props.autoPlacement) {
            return false;
        }

        if (isOutOfVisual) {
            return false;
        }

        // 自动调整位置
        let newDir = '';

        let visualCoordinate = getCoordinates(visualPos);

        if (calculateOutOfParent(visualCoordinate)) {
            newDir = this.resetVisualPos(dropdownEle, target, dropdown, offset);
            // console.log("newDir", newDir);
            if (newDir && newDir !== placement) {
                return this._setPosition(newDir);
            }
        }
    }

    // 动态计算新的位置
    resetVisualPos(ele, target, dropdown, offset) {
        let { synchWidth } = this.props;
        if (!ele) {
            return false;
        }
        let domEle = ele.cloneNode(true);
        // domEle.style.visibility = 'hidden';
        document.body.appendChild(domEle);
        for (let i = 0; i < Direction.length ;i ++) {
            if (synchWidth) {
                domEle.style.width = target.width + 'px';
                domEle.style.minWidth = 'initial';
                domEle.style.maxWidth = 'initial';
            }
            let newDropDown = domEle.getBoundingClientRect();
            let positionInfo = calculatePortalPosition(Direction[i], target, newDropDown, offset);
            domEle.style.top = positionInfo.top + 'px';
            domEle.style.marginTop = 0 + 'px';
            domEle.style.left = positionInfo.left + 'px';

            let visualPos = domEle.getBoundingClientRect();
            let visualCoordinate = getCoordinates(visualPos);
            let isOutOfWindow = calculateOutOfParent(visualCoordinate);
            if (!isOutOfWindow) {
                document.body.removeChild(domEle);
                return Direction[i];
            }
        }
        document.body.removeChild(domEle);
        return false;
    }
    onOpen() {
        setTimeout(() => {
            this.props.onOpen();
            this.setState({open: true});
        }, 100);
    }

    onClose() {
        this.setState({open: false});
        this.props.onClose();
    }

    renderTrigger() {
        let children = React.Children.toArray(this.props.children);
        if (!children[0]) { return false; }
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

        let secondChild = React.cloneElement(children[1], {className, style: {display: 'block'}});
        return secondChild;
    }

    render() {
        let {className, onClose, closeOnOutsideClick, ...others} = this.props;
        delete others.onOpen;
        return (
            <div className={classnames('mcds-dropdown__trigger', className)} ref="triggerWrap">
                <Portal
                    openByClickOn={this.renderTrigger()}
                    {...others}
                    ref={(node) => { this.portal = node; }}
                    closeOnOutsideClick={closeOnOutsideClick}
                    closeOnEsc={true}

                    onOpen={::this._setPosition}
                    beforeClose={(node, resetPortalState) => {
                        this.setState({open: false});
                        onClose();
                        setTimeout(resetPortalState, 100);
                    }} >
                    <div>
                        {this.renderDropdown()}
                    </div>
                </Portal>
            </div>
        );
    }
}

PortalDropDownTrigger.defaultProps = {
    onClose: () => {},
    onOpen: () => {},
    placement: 'right'
};
