import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const ButtonIcon = ({className, icon, hasDropdown, ...others}) => {
    let icons = typeof icon === 'string' ? <i className={classnames('mcds-icon', icon)} /> : icon;
    return (
        <button {...others} className={classnames('mcds-button', className)}>
            {icons}
            { hasDropdown ? <i className="mcds-icon mcds-icon__triangle-solid-14 mcds-dropdown__left" /> : null }
        </button>
    );
};

export const ButtonSmallIcon = ({className, icon, ...others}) => {
    let icons = typeof icon === 'string' ? <i className={classnames('mcds-icon', icon)} /> : icon;
    return (
        <button {...others} className={classnames('mcds-button__small', className)}>
            {icons}
        </button>
    );
};

ButtonIcon.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string,
    hasDropdown: PropTypes.bool
};

ButtonSmallIcon.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string
};
