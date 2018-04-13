 /* eslint-disable */
/**
 * 监听这个组件外部的点击事件
 *
 * <ClickOutSide onClickOutside={() => console.log('click outside')}> <Component /> </ClickOutSide>
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class ClickOutSide extends Component {
    componentDidMount() {
        document.addEventListener('click', this.handle.bind(this), true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handle.bind(this), true);
    }

    handle(e) {
        const {onClickOutside} = this.props;
        const el = this.refs.container;
        if (el && !el.contains(e.target)) {
            onClickOutside(e);
        }
    }
    render() {
        const {
            children,
            onClickOutside,
            ...props
        } = this.props;
        return <div {...props} ref="container">{children}</div>;
    }
}

ClickOutSide.propTypes = {
    onClickOutside: PropTypes.func.isRequired,
    children: PropTypes.any
};
