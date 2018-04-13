import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const Navigation = ({className, children, ...others}) =>
    <div {...others} className={classnames('mcds-navigation-list__vertical', className)}>
        { children }
    </div>;

Navigation.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any
};

export const NavTitle = ({id, className, children, ...others}) =>
    <h2 {...others} className={classnames('mcds-text-title__caps mcds-p-around__medium', className)} id={id}>
        { children }
    </h2>;

NavTitle.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any
};

export const NavList = ({className, children, ...others}) =>
    <ul {...others} className={ className }>
        { children }
    </ul>;

NavList.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any
};

export const NavItem = ({id, className, children, ...others}) =>
    <li {...others} className={ className }>
        <span className="mcds-navigation-list__vertical-action mcds-text-link__reset" id={id}>
            { children }
        </span>
    </li>;

NavItem.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any
};
