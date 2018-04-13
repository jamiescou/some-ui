import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const Badge = ({className, label, ...others}) => (
    <span {...others} className={classnames('mcds-badge', className)}>{label}</span>
);

Badge.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string
};
