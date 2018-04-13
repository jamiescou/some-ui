import React from 'react';
import PropTypes from 'prop-types';

function Loading({ progress }) {
    return (
        <div className="mcds-editor__image-root">
            <div style={{width: `${progress}%`}} />
        </div>
    );
}

Loading.propTypes = {
    progress: PropTypes.number
};

Loading.defaultProps = {
    progress: 1
};

export default Loading;
