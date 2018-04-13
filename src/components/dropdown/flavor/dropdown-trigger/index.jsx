import React from 'react';
import PropTypes from 'prop-types';

import SelfDropDownTrigger from './self-trigger';
import PortalDropDownTrigger from './body-trigger';
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
// 定义位置
export default class DropDownTrigger extends React.Component {
    constructor() {
        super();
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open() {
        this.refs.trigger.open();
    }

    close() {
        this.refs.trigger.close();
    }
    render() {
        let {target = 'self', autoPlacement, ...others} = this.props;
        let ref = 'trigger';

        if (target === 'self') {
            return <SelfDropDownTrigger ref={ref} {...others} />;
        }

        if (target === 'body') {
            return <PortalDropDownTrigger ref={ref} autoPlacement={autoPlacement} {...others} />;
        }

        return <div />;
    }
}

DropDownTrigger.propTypes = {
    target: PropTypes.oneOf(['body', 'self']),
    placement: PropTypes.oneOf(Direction),
    closeOnOutsideClick: PropTypes.bool,
    autoPlacement: PropTypes.bool,
    className: PropTypes.string,
    autoCloseTag: PropTypes.string,
    synchWidth: PropTypes.bool, // 同步弹出层的宽度
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    offset: PropTypes.number
};
DropDownTrigger.defaultProps = {
    onClose: () => {
        // alert("onClose");
    },
    onOpen: () => {
        // alert("onOpen");
    },
    closeOnOutsideClick: true,
    autoPlacement: true,
    synchWidth: false,
    target: 'self',
    placement: 'bottom-right',
    offset: 5 // 弹出层距离target的距离
};
