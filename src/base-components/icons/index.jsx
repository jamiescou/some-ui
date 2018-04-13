import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const iconPrefix = 'mcds-icon__';

// 以后使用直接用图标名字就可以
const Icon = ({className, icon = 'none', ...others}) =>{
    let cls = classnames(iconPrefix + icon, className);
    return <span {...others} className={cls} />;
};

Icon.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string
};

export default Icon;
