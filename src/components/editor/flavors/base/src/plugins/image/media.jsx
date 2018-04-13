/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { Entity } from 'draft-js';

function Media(props) {
    const entity = Entity.get(props.block.getEntityAt(0));
    const { src } = entity.getData();
    return <Img src={src} />;
}

Media.propTypes = {
    block: PropTypes.object
};

export default Media;

function Img(props) {
    return (
        <img
            src={props.src}
            style={{maxWidth: '100%'}} />
    );
}

Img.propTypes = {
    src: PropTypes.string.isRequired
};
