/* eslint-disable */
/**
 * 气泡卡片
 * const content = (
 * 	<div> content1 </div>
 * 	<div> content2 </div>
 * )
 * <Popover content={content} position="bottom">
 * 	<button>点击弹出<button>
 * </Popover>
 */

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import ClickOutside from '../click-outside';
import { getOffset, createChainedFunction, show, hide} from '../../utils';
import getRelativePosition from './util';
// const DEFAULT_TOP = -10000;
// const DEFAULT_LEFT = -10000;

export default class Popover extends Component {
    componentDidMount() {
        // render to body
        this.mountNode = document.createElement('div');
        this.mountNode.style.position = 'absolute';
        this.mountNode.style.zIndex = 9999;
        const content = (
            <ClickOutside onClickOutside={() => this.hide()}>
                <div className="mcds-editor__popover">{cloneElement(this.props.content)}</div>
            </ClickOutside>
        );
        ReactDOM.unstable_renderSubtreeIntoContainer(this, content, this.mountNode);
        this.hide();
        document.body.appendChild(this.mountNode);
    }
    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.mountNode);
        document.body.removeChild(this.mountNode);
        this.mountNode = null;
    }
    setPosition() {
        const target = ReactDOM.findDOMNode(this);
        const { placement, position } = this.props;
        const eleOffset = getOffset(this.mountNode);
        const offset = getOffset(target);
        if (offset && eleOffset) {
            const {top, left} = getRelativePosition(offset, eleOffset, placement);
            this.mountNode.style.top = top + (position && position.top || 0) + 'px';
            this.mountNode.style.left = left + (position && position.left || 0) + 'px';
        }
    }
    hide() {
        hide(this.mountNode);
        if (this.props.onHide) {
            this.props.onHide();
        }
    }
    show() {
        show(this.mountNode);
        this.setPosition();
        if (this.props.onShow) {
            this.props.onShow();
        }
    }
    render() {
        const trigger  = React.Children.only(this.props.children);
        const props = {
            onClick: createChainedFunction(trigger.props.onClick, ::this.show)
        };
        return cloneElement(trigger, props);
    }
}

Popover.propTypes = {
    children: PropTypes.node,
    content: PropTypes.node,
    style: PropTypes.object,
    placement: PropTypes.string,
    position: PropTypes.object,
    onShow: PropTypes.func,
    onHide: PropTypes.func
};

Popover.defaultProps = {
    placement: 'bottom',
    style: {}
};
