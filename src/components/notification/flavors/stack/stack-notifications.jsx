/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OrderedSet } from 'immutable';

import StackedNotification from './notification';
import Portal from '../../../../base-components/portal';

function defaultStyleFactory(index, style) {
    return Object.assign(
        {},
        style,
        { top: `${1 + (index * 4)}rem` }
    );
}

class NotificationStack extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications: OrderedSet(),
            count: 0
        };
        this.add = this.add.bind(this);
        this.del = this.del.bind(this);
    }

    add(notify) {
        const { notifications, count } = this.state;
        const newCount = count + 1;
        notify.key = newCount;
        return this.setState({
            count: newCount,
            notifications: notifications.add(notify)
        });
    }

    del(notify) {
        let notifications = this.state.notifications;
        this.setState({notifications: notifications.delete(notify)});
    }

    render(props = this.props) {
        return (
            <Portal isOpened={true}>
                <div className="notification-list">
                    {this.state.notifications.toArray().map((notification, index) => {
                        const isLast = index === 0 && this.state.notifications.length === 1;
                        // const dismissNow = isLast || !props.dismissInOrder;

                        // Handle styles
                        const barStyle = props.barStyleFactory(index, notification.barStyle);
                        const activeBarStyle = props.activeBarStyleFactory(index, notification.activeBarStyle);

                        let { dismissAfter } = notification;

                        if (dismissAfter !== false) {
                            if (dismissAfter) {
                                dismissAfter = notification.dismissAfter;
                            }
                            let beforeDismiss = 0;
                            for (let i = 0;i < index; i++) {
                                beforeDismiss += this.state.notifications.toArray()[i].dismissAfter;
                            }
                            dismissAfter += beforeDismiss;
                        }

                        return (
                            <StackedNotification
                                {...notification}
                                key={notification.key}
                                isLast={isLast}
                                message={`${notification.message}`}
                                action={notification.action || props.action}
                                dismissAfter={dismissAfter}
                                className={ 'mcds-notification__toast '+ props.className}
                                onDismiss={() => { this.del(notification); }}
                                activeBarStyle={activeBarStyle}
                                barStyle={barStyle} />
                        );
                    })}
                </div>
            </Portal>
        );
    }
}

NotificationStack.propTypes = {
    activeBarStyleFactory: PropTypes.func,
    barStyleFactory: PropTypes.func,
    className: PropTypes.string,
    dismissInOrder: PropTypes.bool,
    onClick: PropTypes.func,
    action: PropTypes.string
};

NotificationStack.defaultProps = {
    activeBarStyleFactory: defaultStyleFactory,
    barStyleFactory: defaultStyleFactory,
    dismissInOrder: true,
    onClick: () => {}
};


export default NotificationStack;
