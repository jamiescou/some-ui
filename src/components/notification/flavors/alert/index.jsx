import React, { Component } from 'react';
import Notification from '../base/notification';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            isActive: false
        };
        this.show = this.show.bind(this);
    }

    show(options) {
        let onDismiss = this.onDismiss.bind(this);
        this.setState({
            ...options,
            isActive: true,
            onDismiss
        });
    }
    onDismiss(){
        this.setState({
            isActive: false
        });
    }
    render() {
        return (
            <Notification {...this.state} />
        );
    }

}


export default Alert;
