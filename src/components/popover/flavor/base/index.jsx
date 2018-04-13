import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getPosition } from '../_base/index';
import Portal from '../../../../base-components/portal';
import { hasClass, addClass } from '../../../../utils/dom';
/*
 * <PopoverTrigger container={this} placement="top" triggerBy={triggerBy}>
 */



export default class PopoverTrigger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        this.node = null;
        this.trigger = React.cloneElement(props.children);
        this.overlay = React.cloneElement(props.overlay);
        this.placement = props.placement || 'left';
    }

    componentDidMount() {
        document.addEventListener('scroll', this.onScroll.bind(this), true);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.onScroll.bind(this));
        this.portalNode = null;
    }

    onScroll() {
        if (this.state.show) {
            this._setPosition();
        }
    }
    onOpen(node) {
        this.portalNode = node;
        this._setPosition(node);
        setTimeout(() => {
            this.setState({show: true});
        }, 100);
    }
    onClose() {
        this.props.onClose.bind(this);
    }
    /**
     * [用来翻转placement方向的方法]
     * @param  {[string]} direction [direction可以为'left','right','']
     * @return {[type]}           [description]
     */
    _reverseDirection(direction) {
        let reverse = {
            left: 'right',
            right: 'left',
            top: 'bottom',
            bottom: 'top'
        };
        let _dirArray = direction.split('-');

        _dirArray.forEach((v, index) => {
            _dirArray[index] = reverse[v];
        });

        return _dirArray.join('-');
    }
    /**
     * [_getPositionInfo 获取触发器的dom位置]
     * @return {[type]} [description]
     */
    _getPositionInfo() {
        let trigger = this.node; // 暂时找不到同好的办法获取children的dom节点
        let childrenTarget = trigger.children || [];
        let positionInfo = {};
        if (childrenTarget.length === 1) {
            positionInfo = getPosition(childrenTarget[0]);
        } else {
            positionInfo = getPosition(trigger);
        }
        positionInfo = getPosition(trigger);

        return positionInfo;
    }
    /**
     * 设置portal下边的popover的top.left
     * @param {react.node} portalNode
     */
    _setPosition(portalNode = this.portalNode) {
        if (!portalNode) {
            return false;
        }
        let {placement} = this.props;
        let arrow = 'mcds-popover__arrow__' + this._reverseDirection(placement); // 箭头前缘
        let positionInfo = this._getPositionInfo(); // 触发元素的dom位置
        let portal = portalNode; // portal 在root节点的元素

        let popover = portal.querySelector('.mcds-popover'); // 获取到的portal中显示的popover

        if (popover && !hasClass(popover, arrow)) {
            addClass(popover, arrow);
        }

        if (!popover) { return null; }
        let popoverPositionInfo = getPosition(popover); // 获取popover元素在dom中的位置信息与尺寸信息

        let {top, left} = this._calculatePosition(positionInfo, popoverPositionInfo);
        popover.style.top = top + 'px';
        popover.style.left = left + 'px';
    }
    /**
     * 计算位置,可以通过case扩展
     * @param  {[type]} targetInfo  [description]
     * @param  {[type]} popoverInfo [description]
     * @return {[type]}             [description]
     */
    _calculatePosition(targetInfo, popoverInfo) {
        let { placement = 'left'} = this.props;
        let offset = 5;
        let result = {};
        let arrow = 12;
        switch (placement) {
        case 'left':
            result.top = targetInfo.top + (targetInfo.height - popoverInfo.height) / 2;
            result.left = targetInfo.left - popoverInfo.width - arrow - offset;
            break;
        case 'top':
            result.left = targetInfo.left + (targetInfo.width - popoverInfo.width) / 2;
            result.top = targetInfo.top - popoverInfo.height - arrow - offset;
            break;
        case 'right':
            result.top = targetInfo.top + (targetInfo.height - popoverInfo.height) / 2;
            result.left = targetInfo.left + targetInfo.width + offset;
            break;
        case 'bottom':
            result.left = targetInfo.left + (targetInfo.width - popoverInfo.width) / 2;
            result.top = targetInfo.top + targetInfo.height + offset;
            break;
        case 'left-top':
            result.top = targetInfo.top + targetInfo.height / 2 - popoverInfo.height + 24;
            result.left = targetInfo.left - popoverInfo.width - arrow - offset;
            break;
        case 'left-bottom':
            result.top = targetInfo.top + targetInfo.height / 2 - 24;
            result.left = targetInfo.left - popoverInfo.width - arrow - offset;
            break;
        case 'top-left':
            result.top = targetInfo.top - popoverInfo.height - arrow - offset;
            result.left = targetInfo.left + targetInfo.width / 2 - popoverInfo.width + 24;
            break;
        case 'top-right':
            result.top = targetInfo.top - popoverInfo.height - arrow - offset;
            result.left = targetInfo.left + (targetInfo.width - 48) / 2;
            break;
        case 'right-top':
            result.top = targetInfo.top + targetInfo.height / 2 - popoverInfo.height + 24;
            result.left = targetInfo.left + targetInfo.width + arrow + offset;
            break;
        case 'right-bottom':
            result.left = targetInfo.left + targetInfo.width + arrow + offset;
            result.top = targetInfo.top + targetInfo.height / 2 - 24;
            break;
        case 'bottom-left':
            result.top = targetInfo.top + targetInfo.height + offset;
            result.left = targetInfo.left + targetInfo.width / 2 - popoverInfo.width + 24;
            break;
        case 'bottom-right':
            result.top = targetInfo.top + targetInfo.height + offset;
            result.left = targetInfo.left + (targetInfo.width - 48) / 2;
            break;
        default :
            console.log('no placement');
        }
        return result;
    }

    render() {
        let trigg_buton = this.props.children;
        let { triggerBy, onMouseOver, onMouseOut} = this.props;
        let className = classnames(this.props.className, {'mcds-popover__show': this.state.show});
        return (
            <div ref={ node => this.node = node} className="mcds-popover-trigger mcds-popover-trigger__open mcds-truncate" >
                <Portal
                    ref="portal"
                    openByClickOn={triggerBy ==='click' ? trigg_buton : null }
                    openByHoverOn={triggerBy ==='hover' ? trigg_buton : null }
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
                    closeOnOutsideClick={triggerBy ==='click' ? true : false }
                    onOpen={::this.onOpen}
                    beforeClose={(node, resetPortalState) => {
                        this.setState({show: false});
                        this.props.onClose();
                        setTimeout(resetPortalState, 100);
                    }} >
                    <div className={className}>
                        {this.props.overlay}
                    </div>
                </Portal>
            </div>
        );
    }
}

PopoverTrigger.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    overlay: PropTypes.element.isRequired,
    trigger: PropTypes.string,
    placement: PropTypes.string,
    onClose: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    triggerBy: PropTypes.oneOf(['click', 'hover'])
};

PopoverTrigger.defaultProps = {
    onOpen: () => {},
    onClose: () => {},
    onUpdate: () => {},
    triggerBy: 'hover',
    className: ''
};


