import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ImageButton } from '../buttons';

export default class UploadButton extends Component {
    clear() {
        this.refs.upload.value = '';
    }
    render() {
        return (
            <label style={{display: 'inline-block'}}>
                <input
                    ref="upload"
                    type="file"
                    accept="image/*"
                    style={{display: 'none'}}
                    onChange={this.props.onChange} />
                <ImageButton />
            </label>
        );
    }
}

UploadButton.propTypes = {
    onChange: PropTypes.func.isRequired
};
