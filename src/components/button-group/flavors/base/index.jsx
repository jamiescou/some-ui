import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const ButtonGroup = ({children, className}) => {
    return (
        <div className={classnames('mcds-button__group', className)} >
            {
                React.Children.map(children, (item, index) => {
                    let vaild = React.isValidElement(item);
                    if (vaild) {
                        return (
                            <span key={index}>
                                {item}
                            </span>
                        );
                    }
                })
            }
        </div>
    );
};

ButtonGroup.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    props: PropTypes.any
};
