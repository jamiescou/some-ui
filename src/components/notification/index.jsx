/**
 * https://www.lightningdesignsystem.com/components/notifications/
 * 1. 提示通知横幅条
 * 2. 信息提示条
 * 3. 提示框
 * 4. 情景提示弹窗提示
 */
import React from 'react';


import Alert from './flavors/alert';

import NotificationStack from './flavors/stack/stack-notifications';


class Notify {
    setNotify(notify) {
        this.notify = notify;
    }
    setNotifyList(notifyList) {
        this.notifyList = notifyList;
    }

    add(options) {
        let op = {};
        if (typeof options === 'string') {
            op.message = options;
        } else {
            op = options;
        }

        if (options.dismissAfter === undefined) {
            op.dismissAfter = 5000;
        }

        this.notifyList.add(op);
    }

    show(options) {
        let op = options;
        if (typeof op === 'string') {
            op = { message: op, dismissAfter: false};
        } else {
            op.dismissAfter = false;
        }
        this.notify.show(op);
    }
}

const notify = new Notify();

const Notifications = () => {
    return (
        <div>
            <NotificationStack ref={ (node) => { notify.setNotifyList(node); }} />
            <Alert ref={(node) => { notify.setNotify(node); }} />
        </div>
    );
};
window.notify = notify;
// export {
//     notify
// };

// export default Notifications;
export default {
    Notifications,
    notify
};

