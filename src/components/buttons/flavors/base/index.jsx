import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const Button = ({className, children, disabled, active, ...others}) => (
    <button {...others} className={classnames('mcds-button', className, {active})} disabled={disabled}>
        {children}
    </button>
);

Button.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.any,
    className: PropTypes.string,
    disabled: PropTypes.bool
};
