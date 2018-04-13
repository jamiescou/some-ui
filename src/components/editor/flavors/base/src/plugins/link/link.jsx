import React from 'react';
import PropTypes from 'prop-types';
import { Entity } from 'draft-js';

const Link = ({ entityKey, children }) => {
    const { url } = Entity.get(entityKey).getData();
    return (
        <a href={url} style={{color: '#3b5998'}}>
            {children}
        </a>
    );
};

Link.propTypes = {
    entityKey: PropTypes.string,
    children: PropTypes.node
};

export default Link;
