/**
 * https:// www.lightningdesignsystem.com/components/modals/
 * 弹出框
 */
/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Portal from '../../base-components/portal';
import Utils from '../../utils/dom';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: Math.random().toString(36).substring(7)
        };
        this.closeModal = this.closeModal.bind(this);
    }
    closeModal() {
        this.fade();
    }

    _handleOnOpen() {
        this.show();
    }

    fade() {
        let modal = document.getElementById(this.state.id);
        Utils.addClass(modal, 'mcds-modal__fade');
        Utils.removeClass(modal, 'mcds-modal__in');
        setTimeout(() => {
            if (this && this.node && this.node.closePortal) {
                this.node.closePortal();
            }
        }, 300);
    }

    show() {
        let modal = document.getElementById(this.state.id);
        setTimeout(function() {
            Utils.removeClass(modal, 'mcds-modal__fade');
            Utils.addClass(modal, 'mcds-modal__in');
        }, 100);
    }

    render() {
        let {show , trigger = null, onOpen, closeOnEsc = true, onClose, ...others} = this.props;
        let classNames = classnames('mcds-modal', others.className);
        return (
            <Portal
                isOpened={show}
                openByClickOn={ trigger }
                closeOnOutsideClick={false}
                className="mcds-modal__portal"
                closeOnEsc={closeOnEsc}
                onOpen={this._handleOnOpen.bind(this)}
                onClose={onClose}
                ref={(node) => { this.node = node; }} >
                <div {...others} id={this.state.id} className={classNames} >
                    <div className="mcds-modal__dialog">
                        <div className="mcds-modal__content">
                            {others.children}
                        </div>
                    </div>
                </div>
            </Portal>
        );
    }
}

Modal.propTypes = {
    show: PropTypes.bool, // 是否显示
    trigger: PropTypes.element, // 如果不设置show, 可以通过trigger按钮控制展示与否.他不可以和show一同使用
    children: PropTypes.any,
    className: PropTypes.string,
    closeOnEsc: PropTypes.bool, // 是否esc按键关闭
    onOpen: PropTypes.func, // 在打开的时候回调
    onClose: PropTypes.func// 关闭的回调
};

Modal.defaultProps = {
    onOpen: () => {},
    onClose: () => {}
};

class ModalTrigger extends React.Component {
    componentWillMount() {
        try {
            let counts = React.Children.count(this.props.children);
            if (counts !== 2) {
                throw new Error('ModalTrigger children must be two,like\r\n<ModalTrigger>\r\n\t<any>click</any>\r\n\t<Modal />\r\n</ModalTrigger>');
            }
        } catch (e) {
            console.error(e);
        }
    }
    _handleToggle(e) {
        if (Utils.hasClass(e.target, 'close')) {
            this.modal.closeModal();
        }
    }
    renderTrigger() {
        let children = React.Children.toArray(this.props.children);
        if (!children[0]) { return false; }
        let firstChild = React.cloneElement(children[0]);
        return firstChild;
    }

    renderModal() {
        let children = React.Children.toArray(this.props.children);
        if (!children[1]) { return false; }
        let className = classnames(children[1].props.className);
        let secondChild = React.cloneElement(children[1], {className: className, ref: (modal) => { this.modal = modal; }, trigger: this.renderTrigger(), onClick: ::this._handleToggle});
        return secondChild;
    }
    render(){
        return (
            this.renderModal()
        );
    }
}

ModalTrigger.propTypes = {
    children: PropTypes.any
};



const ModalHeader = ({className, children, ...others}) => (
    <div {...others} className={classnames('mcds-modal__header', className)}>{children}</div>
);

ModalHeader.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
};


const ModalBody = ({className, children, ...others}) => (
    <div {...others} className={classnames('mcds-modal__body', className)}>{children}</div>
);

ModalBody.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
};

const ModalFoot = ({className, children, ...others}) => (
    <div {...others} className={classnames('mcds-modal__footer', className)}>{children}</div>
);

ModalFoot.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
};

export default {
    ModalTrigger,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFoot
};
