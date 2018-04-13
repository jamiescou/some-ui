/**
 * 所以我们需要的一个通用组件，它做如下的事情：
 * 可以声明式的写在一个组件中
 * 并不真正render在被声明的地方
 * 支持过渡动画
 * 那么，像modal、tooltip、notification等组件都是可以基于这个组件的。我们叫这个组件为Portal。
 * Portal这个东西我不知道怎么给它一个合适的中文名，最初是在ReactBootstrap的项目里看到，之后React-conf又提到，那么相信应该是一个通用的概念了，由于这个组件并不真正render在它被声明的地方，姑且就翻译为『传送门』吧....
 *
 * 基本用法
 * <Portal closeOnEsc={true} closeOnOutsideClick={true} openByClickOn={button}>
 *     <TestModal>
 *     </TestModal>
 * </Portal>
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM, { findDOMNode } from 'react-dom';

const KEYCODES = {
    ESCAPE: 27
};

export default class Portal extends React.Component{

    constructor() {
        super();
        this.state = { active: false };
        this.handleWrapperClick = this.handleWrapperClick.bind(this);
        this.handleWrapperHover = this.handleWrapperHover.bind(this);
        this.handleWrapperHoverOut = this.handleWrapperHoverOut.bind(this);
        this.closePortal = this.closePortal.bind(this);
        this.handleOutsideMouseClick = this.handleOutsideMouseClick.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.portal = null;
        this.node = null;
    }

    componentDidMount() {
        if (this.props.closeOnEsc) {
            document.addEventListener('keydown', this.handleKeydown);
        }

        if (this.props.closeOnOutsideClick) {
            document.addEventListener('mouseup', this.handleOutsideMouseClick);
            document.addEventListener('touchstart', this.handleOutsideMouseClick);
        }

        if (this.props.isOpened) {
            this.openPortal();
        }
        this.mounted = true;
    }

    componentWillReceiveProps(newProps) {
        // portal's 'is open' state is handled through the prop isOpened
        if (typeof newProps.isOpened !== 'undefined') {
            if (newProps.isOpened) {
                if (this.state.active) {
                    this.renderPortal(newProps);
                } else {
                    this.openPortal(newProps);
                }
            }
            if (!newProps.isOpened && this.state.active) {
                this.closePortal();
            }
        }

        // portal handles its own 'is open' state
        if (typeof newProps.isOpened === 'undefined' && this.state.active) {
            this.renderPortal(newProps);
        }
    }

    componentWillUnmount() {
        if (this.props.closeOnEsc) {
            document.removeEventListener('keydown', this.handleKeydown);
        }

        if (this.props.closeOnOutsideClick) {
            document.removeEventListener('mouseup', this.handleOutsideMouseClick);
            document.removeEventListener('touchstart', this.handleOutsideMouseClick);
        }

        this.closePortal(true);
        this.mounted = false;
    }

    handleWrapperClick(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.state.active) { return; }
        if (this.props.isOpened !== false){
            this.openPortal();
        }
    }

    handleWrapperHover(e) {
        let { onMouseOver } = this.props;
        e.preventDefault();
        e.stopPropagation();
        if (this.state.active) { return; }
        if (onMouseOver) {
            onMouseOver(this.openPortal.bind(this));
        } else if (this.props.isOpened !== false) {
            this.openPortal();
        }
    }

    handleWrapperHoverOut() {
        let { onMouseOut } = this.props;
        if (onMouseOut) {
            onMouseOut(this.closePortal.bind(this));
        } else {
            this.closePortal();
        }
    }
    openPortal(props = this.props) {
        this.setState({ active: true });
        this.renderPortal(props);
        this.props.onOpen(this.node);
    }

    closePortal() {
        // console.log('close')
        const resetPortalState = () => {
            if (this.node) {
                ReactDOM.unmountComponentAtNode(this.node);
                document.body.removeChild(this.node);
            }
            this.portal = null;
            this.node = null;
            if (this.mounted) {
                this.setState({ active: false });
            }
        };

        if (this.state.active) {
            if (this.props.beforeClose) {
                this.props.beforeClose(this.node, resetPortalState);
            } else {
                resetPortalState();
            }
            this.props.onClose();
        }
    }

    handleOutsideMouseClick(e) {
        if (!this.state.active) { return; }

        const root = findDOMNode(this.portal);
        if (root.contains(e.target) || (e.button && e.button !== 0)) { return; }

        e.stopPropagation();
        this.closePortal();
    }

    handleKeydown(e) {
        if (e.keyCode === KEYCODES.ESCAPE && this.state.active) {
            this.closePortal();
        }
    }

    renderPortal(props) {
        if (!this.node) {
            this.node = document.createElement('div');
            this.node.className = props.className || '';
            document.body.appendChild(this.node);
        }

        let children = props.children;

        if (typeof props.children.type === 'function') {
            children = React.cloneElement(props.children, { closePortal: this.closePortal });
        }

        this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            children,
            this.node,
            this.props.onUpdate
        );
    }

    render() {
        if (this.props.openByClickOn) {
            let onClick = this.props.openByClickOn.props.onClick;
            if (!onClick) {
                onClick = () => {};
            }
            let newOnClick = (e) => {
                onClick(e);
                this.handleWrapperClick(e);
            };
            return React.cloneElement(this.props.openByClickOn, { onClick: newOnClick});
        }
        if (this.props.openByHoverOn) {
            return React.cloneElement(this.props.openByHoverOn, { onMouseOver: this.handleWrapperHover, onMouseOut: this.handleWrapperHoverOut });
        }
        return null;
    }
}

Portal.propTypes = {
    children: PropTypes.element.isRequired,
    openByClickOn: PropTypes.element,
    // <--这三个是用来做onHover触发的效果,
    openByHoverOn: PropTypes.element,
    // 提供open方法
    onMouseOver: PropTypes.func,
    // 提供close方法
    onMouseOut: PropTypes.func,
    // --->
    closeOnEsc: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool,
    isOpened: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    beforeClose: PropTypes.func,
    className: PropTypes.string,
    onUpdate: PropTypes.func
};

Portal.defaultProps = {
    onOpen: () => {},
    onClose: () => {},
    onUpdate: () => {}
};
