import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Portal from '../../../../base-components/portal';

/*
    提供参数{
        isActive,是否显示的标示
        dismissAfter,定时隐藏,需要配合onDismiss回调方法使用
        activeClassName,成功时候的样式名,
        theme,主题色['base,info,success,warning,error'],
        closed:true,false 是否显示右侧关闭按钮
    }
 */
class Notification extends Component {

    constructor(props) {
        super(props);

        this.getBarStyle = this.getBarStyle.bind(this);
        this.getActionStyle = this.getActionStyle.bind(this);
        this.handleClosedClick = this.handleClosedClick.bind(this);
        this.getTheme = this.getTheme.bind(this);

        if (props.onDismiss && props.isActive) {
            this.dismissTimeout = setTimeout(
                props.onDismiss,
                props.dismissAfter
            );
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dismissAfter === false) {
            return;
        }

        if (!{}.hasOwnProperty.call(nextProps, 'isLast')) {
            clearTimeout(this.dismissTimeout);
        }

        if (nextProps.onDismiss) {
            if (
                (nextProps.isActive && !this.props.isActive) || (nextProps.dismissAfter && this.props.dismissAfter === false)
            ) {
                this.dismissTimeout = setTimeout(
                    nextProps.onDismiss,
                    nextProps.dismissAfter
                );
            }
        }
    }

    componentWillUnmount() {
        if (this.props.dismissAfter) {
            clearTimeout(this.dismissTimeout);
        }
    }

    getBarStyle() {
        if (this.props.style === false) {
            return {};
        }

        const { isActive, barStyle, activeBarStyle } = this.props;

        const baseStyle = {};

        return isActive ? Object.assign({}, baseStyle, barStyle, activeBarStyle) : Object.assign({}, baseStyle, barStyle);
    }

    getTheme() {
        return 'mcds-notification__theme-' + this.props.theme;
    }

    getActionStyle() {
        return this.props.style !== false ? Object.assign({}, {
        }, this.props.actionStyle) : {};
    }

    handleClosedClick() {
        if (this.props.onDismiss && this.props.isActive) {
            this.props.onDismiss();
        }
    }

    render() {
        let className = 'mcds-notification ' + this.getTheme();
        let closed = '';
        if (this.props.isActive) {
            className += ` mcds-notification__active ${this.props.activeClassName}`;
        }
        if (this.props.className) {
            className += ` ${this.props.className}`;
        }
        if (this.props.closed) {
            closed = <span onClick={this.handleClosedClick} className="mcds-notification__close mcds-icon__close-line-20" />;
        }
        return (
            <Portal isOpened={true}>
                <div className={className} style={this.getBarStyle()}>
                    <div className="mcds-notification__wrapper">
                        <div className="mcds-notification__message">
                            {this.props.message}
                        </div>
                        {closed}
                    </div>
                </div>
            </Portal>);
    }
}

Notification.propTypes = {
    message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]).isRequired,
    style: PropTypes.bool,
    actionStyle: PropTypes.object,
    barStyle: PropTypes.object,
    activeBarStyle: PropTypes.object,
    dismissAfter: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number
    ]),
    closed: PropTypes.bool,
    theme: PropTypes.oneOf(['info', 'error', 'base', 'warning', 'success']),
    onDismiss: PropTypes.func,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    isActive: PropTypes.bool
};

Notification.defaultProps = {
    isActive: false,
    dismissAfter: 3000,
    activeClassName: 'notification-bar-active',
    theme: 'base',
    closed: true
};


export default Notification;
