import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class StatefulButton extends React.Component {
    static defaultProps = {
    };
    constructor() {
        super();
    }
    render(){
        let {className, icon, hoverIcon, ...others} =  this.props;
        return (
            <button {...others} className={classnames('mcds-button mcds-button__follow', className)}>
                <i className={classnames('mcds-stateful__selected mcds-icon__left', icon)} />
                <i className={classnames('mcds-stateful__not-selected mcds-icon__left', hoverIcon)} />
                {this.props.children}
            </button>
        );
    }
}

StatefulButton.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    icon: PropTypes.string,
    hoverIcon: PropTypes.string
};
