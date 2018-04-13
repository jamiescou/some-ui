import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DropDown = ({className, children, ...others}) =>(
    <div {...others} className={classnames('mcds-dropdown', className)}>
        {children}
    </div>);

DropDown.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string
};

const DropDownList = ({className, children, ...others}) =>(
    <ul {...others} className={classnames('mcds-dropdown__list', className)} role="menu">
        {children}
    </ul>);

DropDownList.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string
};

const DropDownItemHeader = ({className, children}) => <li className={classnames('mcds-dropdown__item mcds-dropdown__header', className)} >{children}</li>;

DropDownItemHeader.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
};

const DropDownItem = props => {
    let {iconLeft, iconRight, isSelected, tabIndex, className, ...others} = props;
    return (
        <li {...others} className={classnames('mcds-dropdown__item', className)} role="presentation">
            <span className={classnames('mcds-dropdown__item-a', {selected: isSelected})} tabIndex={ tabIndex || '-1' }>
                <span className="mcds-truncate">
                    { iconLeft ? iconLeft : null }
                    { props.children }
                </span>
                { iconRight ? iconRight : null }
            </span>
        </li>
    );
};

DropDownItem.propTypes = {
    children: PropTypes.any,
    disabled: PropTypes.bool,
    iconLeft: PropTypes.element,
    iconRight: PropTypes.element,
    isSelected: PropTypes.bool,
    tabIndex: PropTypes.number,
    className: PropTypes.string
};

const DropDownItemDivider = () => (<li className="mcds-dropdown__divider" role="separator" />);

export default {
    DropDown,
    DropDownItem,
    DropDownList,
    DropDownItemHeader,
    DropDownItemDivider
};
