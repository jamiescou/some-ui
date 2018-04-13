import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notification from '../base/notification';

class StackedNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false
        };

    }

    componentDidMount() {
        setTimeout(this.setState.bind(this, {
            isActive: true
        }), 10);

        this.dismiss(this.props.dismissAfter);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dismissAfter !== this.props.dismissAfter) {
            this.dismiss(nextProps.dismissAfter);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.dismissTimeout);
    }

    dismiss(dismissAfter) {
        if (dismissAfter === false) {
            return false;
        }

        // this.dismissTimeout = setTimeout(this.setState.bind(this, {
        //     isActive: false
        // }), dismissAfter);
    }


    render() {
        return (
            <Notification
                {...this.props}
                isActive={this.state.isActive} />
        );
    }

}
StackedNotification.propTypes = {
    dismissAfter: PropTypes.number
};

export default StackedNotification;
