import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const FlexTable = ({className, children, ...others}) => (
    <div {...others} className={classnames('mcds-flex__table', className)}>
        {children}
    </div>
);

FlexTable.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any
};

FlexTable.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any
};
