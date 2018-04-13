import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Tab = ({className, children}) => (
    <div className={className}>
        <ul className="mcds-tab__items mcds-list__horizontal">
            {React.Children.map(children, (element) => {
                if (element.type === TabItem) {
                    return element;
                }
                return null;
            })}
        </ul>
        {React.Children.map(children, (element) => {
            if (element.type === TabContent) {
                return element;
            }
        })}
    </div>
);

Tab.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    elements: function(props) {
        const typeList = ['Tab', 'TabItem', 'TabContent'];
        let flag = false;
        props.children.forEach((element)=> {
            if (typeof element.type === 'string') {
                flag = true;
            }
        });
        if (flag) {
            return new Error(`Tab children must one of ${typeList}`);
        }
    }
};

const TabItem = ({className, children, ...others}) => (
    <li {...others} className={classnames('mcds-tab__item mcds-list__item', className)}>
        {children}
    </li>
);

TabItem.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any
};

const TabContent = ({className, children, ...others}) => (
    <div {...others} className={classnames('mcds-content__item', className)}>
        {children}
    </div>
);

TabContent.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any
};

export default {
    Tab,
    TabItem,
    TabContent
};
