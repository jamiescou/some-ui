/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactDOM from 'react-dom';

import { IconButton, ClickOutside } from '../../components';

export default class Panel extends Component {
    componentDidMount() {
        this.setUrl(this.props.url);
    }
    handleKeyDown(e) {
        const url = this.refs.url.value.trim();
        if (e.keyCode === 13 && url) {
            this.handleChange(resolveUrl(url));
        }
    }
    handleChange(url) {
        this.props.onChange(url);
    }
    handleClickOutside() {
        const url = this.refs.url.value;
        if (url) {
            this.handleChange(resolveUrl(url));
        }
    }

    setUrl(url) {
        this.refs.url.value = url;
        const btnDom = ReactDOM.findDOMNode(this.refs.cancelBtn);
        if (btnDom) {
            if (url) {
                btnDom.style.display = '';
            } else {
                btnDom.style.display = 'none';
            }
        }
    }
    focus() {
        ReactDOM.findDOMNode(this.refs.url).focus();
    }
    render() {
        const { url } = this.props;
        return (
            <ClickOutside onClickOutside={::this.handleClickOutside}>
                <div className="mcds-editor__link-root">
                    <label>链接地址：</label>
                    <input
                        type="text"
                        ref="url"
                        defaultValue={url}
                        onKeyDown={::this.handleKeyDown} />
                    <IconButton onClick={() => this.handleChange('')} ref="cancelBtn" style={{marginLeft: 16}} name="mcds-icon__unlink-18" />
                </div>
            </ClickOutside>
        );
    }
}

Panel.propTypes = {
    url: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

const REG_URL = /^https?:\/\//;

const resolveUrl = url => {
    if (REG_URL.test(url)) {
        return url;
    }
    return `http://${url}`;
};
