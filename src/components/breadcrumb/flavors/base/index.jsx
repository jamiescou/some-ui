import React from 'react';
import PropTypes from 'prop-types';

const Crumb = ({children, ...others}) => (
    <li {...others} className="mcds-breadcrumb__item mcds-text-title__caps">
        {children}
    </li>
);

Crumb.propTypes = {
    children: PropTypes.any
};

const BreadCrumbs = ({children, ...others}) => (
    <nav {...others} role="navigation" aria-label="Breadcrumbs">
        <ol className="mcds-breadcrumb mcds-list--horizontal">
            {children}
        </ol>
    </nav>
);
BreadCrumbs.propTypes = {
    children: PropTypes.any
};

export default {
    BreadCrumbs,
    Crumb
};
