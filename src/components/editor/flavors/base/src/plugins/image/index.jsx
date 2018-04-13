import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImageButton from './button';
import Loading from './loading';
import mediaBlockRenderer from './render';
import insertImage from './insert-image';

export default class Image extends Component {
    handleChange(e) {
        const { onUpload, onChange, editorState } = this.props;
        const file = e.target.files[0];
        this.refs.btn.clear();
        if (onUpload) {
            const promise = onUpload(file);
            if (!promise.then) {
                throw new Error('onUpload mast return a promise');
            }
            promise.then(src => {
                if (src) {
                    onChange(insertImage(editorState, src));
                }
            });
        }
    }
    render() {
        return (
            <ImageButton ref="btn" onChange={::this.handleChange} />
        );
    }
}

Image.propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired
};

export {
    ImageButton,
    Loading,
    mediaBlockRenderer,
    insertImage
};
