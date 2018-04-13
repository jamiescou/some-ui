import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const FromMultiSelect = ({className, label, children, ...others}) => (
    <div {...others} className={classnames('mcds-input__container', className)}>
        <span className="mcds-label">{label}</span>
        <div className="mcds-picklist">
            <ul className="mcds-picklist__options">
                {children}
            </ul>
        </div>
    </div>
);

FromMultiSelect.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.any
};
