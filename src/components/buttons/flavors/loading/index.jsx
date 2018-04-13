import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const ButtonLoading = ({className, children, isLoading, ...others}) => {
    let iconNode = isLoading ? <i className="mcds-icon__left mcds-icon__robot-line-medium" /> : null;
    return (
        <button {...others} className={classnames('mcds-button', className)} >
            {iconNode}{children}
        </button>
    );
};

ButtonLoading.propTypes = {
    className: PropTypes.string,
    iconNode: PropTypes.string,
    children: PropTypes.any,
    isLoading: PropTypes.bool
};
