import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Editor from './flavors/base/index';
// import MyAjax from 'utils/my-ajax';
// import { notify } from 'components_new/setting/self-service/utils';

// 这个样式文件能够定义 编辑器的某些默认样式。
// import './index.css';
const maxSize = 5 * 1000 * 1000;
const EMPTY = '<div></div>';

class MyEditor extends Component {

    constructor() {
        super();
        this.getValue = this.getValue.bind(this);
    }
    handleError(msg) {
        // notify.custom(msg, 'error');
        console.log(msg, 'error');
    }
    /**
     * [handleUpload description]
     * @param  {[type]} file [参数文件]
     * @return {[type]}      [description]
     */
    handleUpload() {
        // return new Promise(resolve => {
        //     MyAjax.uploadImage({
        //         url: '/upload',
        //         file: file,
        //         error: () => {
        //             resolve();
        //         },
        //         success: response => {
        //             resolve(response.photo_url);
        //         },
        //         progress: progress => {
        //             this.refs.editor.setUploadProgress(progress);
        //         }
        //     });
        // });
        console.log('success');
    }
    getValue() {
        return this.refs.editor.getValue();
    }
    focus() {
        if (this.refs.editor) {
            this.refs.editor.focus();
        }
    }
    html(value) {
        if (value === undefined) {
            return this.exportToHTML();
        }
        this.refs.editor.changeDefaultValue(arguments[0]);
        return this;
    }
    isEmpty() {
        return this.html() === EMPTY;
    }
    empty() {
        this.html(EMPTY);
    }
    contentEmpty() {
        let cleanText = this.html().replace(/<\/?[^>]+(>|$)/g, '');
        cleanText = cleanText.replace(/(\s|&nbsp;|\u00a0)/g, '');
        return cleanText.length === 0;
    }
    exportToHTML() {
        return this.refs.editor.exportToHTML();
    }
    render() {
        const { defaultValue, onChange, miniStyle = false } = this.props;
        return (
            <Editor
                error={true}
                ref="editor"
                defaultValue={defaultValue}
                miniStyle={miniStyle}
                uploadMaxSize={maxSize}
                onUpload={::this.handleUpload}
                onChange={onChange}
                onError={::this.handleError} />
        );
    }
}

MyEditor.propTypes = {
    miniStyle: PropTypes.bool,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func
};

export default {
    Editor: MyEditor
};
