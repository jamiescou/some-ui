// 这个组件,集合了多选与单选
import React from 'react';
import PropTypes from 'prop-types';

import Portal from '../../../../base-components/portal';
import SingleSelect from './single-select';
import MultiSelect from './multi-select';
import { getDomOffset } from '../../../../utils/dom';
import _ from 'lodash';
import classnames from 'classnames';

const MenuWidth = 130;
// 弹出菜单宽度，因为弹出之前是无法获取的，向左弹出需要计算宽度，在这里定义一下
export default class Cascader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            defaultValue: props.defaultValue,
            placement: props.placement
        };
        this.portalNode = null;
        this._setPosition = this._setPosition.bind(this);
        this._getPositionInfo = this._getPositionInfo.bind(this);
        this._calculatePortalPosition = this._calculatePortalPosition.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.getValue =this.getValue.bind(this);
    }


    componentDidMount() {
        document.addEventListener('scroll', this.onScroll.bind(this), true);
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isUndefined(nextProps.defaultValue)) {
            this.setState({defaultValue: nextProps.defaultValue});
        }
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.onScroll.bind(this));
    }

    onScroll() {
        // 43-48是问题代码
        // if (onScrollTimer) return ;
        // onScrollTimer = true;
        // setTimeout(() => {
        //     this._setPosition(this.refs.portal.node);
        //     onScrollTimer = false;
        // }, scrollWaitTime)
        let portal = this.refs.portal;
        if (portal && portal.node) {
            this._setPosition(this.refs.portal.node);
        }
    }
    // 设置portal中显示div的top,left
    _setPosition(portalNode){

        if (!portalNode) {
            return ;
        }
        let triggerInfo = this._getPositionInfo(); // 获取位置信息
        let portal = portalNode;// portal 在root节点的元素
        let menu = portal.querySelector('.mcds-select__root'); // 获取到的portal中第一个menu;
        let menuInfo = getDomOffset(menu);
        let {left, top} = this._calculatePortalPosition(triggerInfo, menuInfo);
        menu.style.left = left + 'px';
        menu.style.top = top + 5 + 'px';
        menu.style.position = 'fixed';
        menu.style.zIndex = 9999;
    }

    // 获取触发元素的按钮位置信息 {left,top,width,height}
    _getPositionInfo(){
        let trigger = this.node; // 暂时找不到同好的办法获取children的dom节点
        let childrenTarget = trigger.children || [];
        let positionInfo = {};
        if (childrenTarget.length === 1) {
            positionInfo = getDomOffset(childrenTarget[0]);
        } else {
            positionInfo = getDomOffset(trigger);
        }
        return positionInfo;
    }
    _getNewPlacement(targetInfo) {
        let body = document.body;
        let bodyRect = body.getBoundingClientRect();
        let { placement } = this.props;
        if (placement === 'right') {
            if (targetInfo.left + MenuWidth > bodyRect.width) {
                placement = 'left';
            }
        } else if (targetInfo.left + targetInfo.width - MenuWidth < 0 ) {
            placement = 'right';
        }
        return placement;
    }
    /**
     * [计算出portal中显示div的 top与 left]
     * @param  {[obj]} targetInfo  [target的位置信息]
     * @param  {[obj]} menuInfo    [portal元素的尺寸]
     * @return {[obj]}             [{left,top}]
     */
    _calculatePortalPosition(targetInfo) {
        let result = {};

        let placement = this._getNewPlacement(targetInfo);
        this.setState({
            placement: placement
        });
        switch (placement) {
        case 'right':
            result.top = targetInfo.top + targetInfo.height;
            result.left = targetInfo.left;
            break;
        case 'left':
            result.top = targetInfo.top + targetInfo.height;
            result.left = targetInfo.left + targetInfo.width - MenuWidth;
            break;
        default :
            console.warn('no placement please check props.placement');
        }
        return result;
    }

    getValue() {
        return this.state.defaultValue;
    }
    // 用来接收单选或者多选的回调,并且返回给父类组件
    handleOnChange(param){
        if (this.props.type === 'single') {
            let newParam = _.clone(param);
            // 单选的param是每一层的数据的value数组
            this.setState({defaultValue: newParam.reverse()[0]});
        } else {
            this.setState({defaultValue: param});
        }

        this.props.onChange(param);
    }

    render() {
        let {children, triggerBy, data, type, className, error} = this.props;
        let {placement, defaultValue} = this.state;
        let Trigger = React.cloneElement(children);
        let select;
        if (type === 'single') {
            select = <SingleSelect data={data} defaultValue={defaultValue} className={className} onChange={this.handleOnChange} placement={placement} />;
        } else {
            select = <MultiSelect data={data} defaultValue={defaultValue} className={className} onChange={this.handleOnChange} placement={placement} />;
        }
        return (
            <Portal
                ref="portal"
                openByClickOn={triggerBy === 'click' ? <div ref={node => this.node = node} className={classnames({'mcds-element__border': error})}>{Trigger}</div> : null}
                closeOnOutsideClick={true}
                closeOnEsc={true}
                onOpen={(node) => {
                    this.portalNode = node;
                    this._setPosition(node);
                }} >
                {select}
            </Portal>
        );
    }
}

Cascader.propTypes = {
    triggerBy: PropTypes.oneOf(['click']), // 触发方式
    type: PropTypes.oneOf(['single', 'multi']), // 单选或者多选,默认为单选
    placement: PropTypes.string, // 默认弹出窗口,位置 用来做计算
    data: PropTypes.array.isRequired, // 数据
    defaultValue: PropTypes.any, // 默认选中的值可能为数组 单选为字符||数字 多选为数组
    onChange: PropTypes.func, // 父亲传入的回调
    children: PropTypes.any, // select触发区域
    className: PropTypes.string,
    error: PropTypes.bool
};

Cascader.defaultProps = {
    triggerBy: 'click',
    placement: 'right',
    type: 'single',
    onChange: ()=>{}
};
