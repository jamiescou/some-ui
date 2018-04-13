import React from 'react';
import PropTypes from 'prop-types';

// import ReactDOM from 'react-dom';
import { Editor as DraftEditor,
         EditorState,
         ContentState,
         // Entity,
         CompositeDecorator,
         RichUtils
         // Modifier,
         // AtomicBlockUtils
} from 'draft-js';

import classnames from 'classnames';
// import './editor.css';
import {
    BoldComponent,
    ItalicComponent,
    UnderlineComponent
} from './src/plugins/inlines';
import {
    OrderedListComponent,
    UnorderedListComponent,
    AlignLeftComponent,
    AlignCenterComponent,
    AlignRightComponent
} from './src/plugins/blocks';
import ColorControl, { COLOR_MAP } from './src/plugins/color';
import FontSizeControl, { FONT_SIZE_MAP } from './src/plugins/font-size';
import LinkControl, { getDecorator as getLinkDecorator } from './src/plugins/link';
import ImageControl, { Loading, mediaBlockRenderer } from './src/plugins/image';
import { Separator } from './src/components';
import blockStyleFn from './src/utils/block-style';
import { exportToHTML, importFromHTML, displaySize } from './src/utils';

const customStyleMap = Object.assign({}, FONT_SIZE_MAP, COLOR_MAP);
const decorator = new CompositeDecorator([getLinkDecorator()]);

export default class Editor extends React.Component {
    static defaultProps = {
        fontSizeStyle: true
    }
    constructor(props) {
        super(props);
        let editorState;
        if (props.defaultValue) {
            const newBlocks = importFromHTML(props.defaultValue);
            const newContent = ContentState.createFromBlockArray(newBlocks);
            editorState = EditorState.createWithContent(newContent, decorator);
        } else {
            editorState = EditorState.createEmpty(decorator);
        }
        this.state = {
            editorState,
            uploading: false,
            uploadProgress: 0,
            onfocus: false
        };
    }
    onChange(editorState) {
        this.setState({editorState}, () => this.props.onChange && this.props.onChange(this.exportToHTML()));
    }
    changeDefaultValue(value) {
        let editorState;
        const newBlocks = importFromHTML(value || '<div></div>');
        const newContent = ContentState.createFromBlockArray(newBlocks);
        editorState = EditorState.createWithContent(newContent, decorator);
        this.onChange(editorState);
    }
    exportToHTML() {
        const content = this.state.editorState.getCurrentContent();
        return exportToHTML(content);
    }
    importHtml(html) {
        const newBlocks = importFromHTML(html);
        const newContent = ContentState.createFromBlockArray(newBlocks);
        const editorState = EditorState.createWithContent(newContent, decorator);

        this.setState({editorState});
    }
    change(nextEditorState) {
        this.onChange(nextEditorState);
        this.focus();
    }
    uploadImage(imageFile) {
        const { onError, onUpload, uploadMaxSize } = this.props;
        if (imageFile.size > uploadMaxSize) {
            onError(`上传图片不能超过 ${displaySize(uploadMaxSize)}`);
            return new Promise(resolve => resolve());
        }
        this.setState({ uploading: true });
        return onUpload(imageFile).then(src => (this.setState({ uploading: false }), src));
    }
    setUploadProgress(progress) {
        this.setState({ uploadProgress: progress.percent });
    }
    focus() {
        // this.setState({onfocus: true});
        dely(this.refs.editor.focus);
    }
    handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }
    // handleOnBlur() {
    //     this.setState({onfocus:false})
    // }
    // componentDidMount() {
    //     window.addEventListener('keyup', this._handleKeyUp);
    // }
    // componentWillUnmount() {
    //     window.removeEventListener('keyup', this._handleKeyUp);
    // }
    // _handleSelect = e => {
    //     const show  = this.state.show;
    //     if (!show) {
    //         return;
    //     }
    //     const active = this.state.active;
    //     if (e.which === 38 || e.which === 9) {
    //         if (active === 0) {
    //             this.setState({active: this.items.length - 1});
    //         } else {
    //             this.setState({active: active - 1});
    //         }
    //     }
    //     if (e.which === 40) {
    //         if (active >= this.items.length - 1) {
    //             this.setState({active: 0});
    //         } else {
    //             this.setState({active: active + 1});
    //         }
    //     }
    //     if (e.which === 27 && show) {
    //         this.setState({show: false});
    //     }
    //     if (e.which === 13 && show) {
    //         const reply = this.items[active];
    //         this.runWithType(reply);
    //         e.stopPropagation();
    //         e.preventDefault();
    //     }
    // }
    // _handleKeyUp = e => {
    //     const code = e.which;
    //     if ([38, 9, 40, 13, 27].indexOf(code) !== -1) {
    //         this._handleSelect(e);
    //         return;
    //     }
    //     let value = this.refs.editor.exportToHTML();
    //     console.log('value')
    //     let index = value.lastIndexOf('@');
    //     if (index !== -1) {
    //         const query = this.query = value.slice(index + 1);
    //         if (!query) {
    //             this.setState({show: false});
    //             return;
    //         }
    //         const replies = props.replies.toJS();
    //         const groups = replies.reduce((c, r) => {
    //             if (~r.title.toLowerCase().indexOf(query.toLowerCase())) {
    //                 c.title.push(r);
    //             } else if (~r.content.toLowerCase().indexOf(query.toLowerCase())) {
    //                 c.content.push(r);
    //             }
    //             return c;
    //         }, {title: [], content: []});
    //         const items = this.items = groups.title.concat(groups.content);
    //         this.setState({show: items.length > 0, active: 0});
    //     }
    // }
    // _handleSelected(content) {
    //     const query = this.query;
    //     if (query) {
    //         const editor = this.refs.wraped.getWraped();
    //         const value = editor.getValue();
    //         const reg = new RegExp(`@ *${query}\n?`);
    //         const result = value.replace(reg, '');
    //         editor.setValue(result + (result === '' ? '' : ' ') + content);
    //         let isFocus = editor.isFocus();
    //         if (!isFocus) {
    //             editor.focus();
    //         };
    //     }
    // }
    // _handleKeyDown(e) {
    //     if (e.which === 13 && this.state.show) {
    //         e.stopPropagation();
    //         e.preventDefault();
    //     } else {
    //         this.props.onKeyDown && this.props.onKeyDown(e);
    //     }
    // }

    render() {
        let { editorState, uploading, uploadProgress, onfocus} = this.state;
        let {miniStyle, fontSizeStyle, error} = this.props;
        return (
            <div className={classnames('mcds-editor__wrap', {'mcds-editor__wrap-focus': onfocus})}>
                <div ref="toolbar" className={miniStyle ? 'mcds-editor__toolbar-mini' : 'mcds-editor__toolbar'}>
                    { fontSizeStyle ? <FontSizeControl editorState={editorState} onChange={::this.change} /> : null }
                    <BoldComponent editorState={editorState} onChange={::this.change} />
                    <ItalicComponent editorState={editorState} onChange={::this.change} />
                    <UnderlineComponent editorState={editorState} onChange={::this.change} />
                    <ColorControl editorState={editorState} onChange={::this.change} />
                    { miniStyle ? null : <Separator /> }
                    <AlignLeftComponent editorState={editorState} onChange={::this.change} />
                    <AlignCenterComponent editorState={editorState} onChange={::this.change} />
                    <AlignRightComponent editorState={editorState} onChange={::this.change} />
                    { miniStyle ? null : <Separator /> }
                    <OrderedListComponent editorState={editorState} onChange={::this.change} />
                    <UnorderedListComponent editorState={editorState} onChange={::this.change} />
                    { miniStyle ? null : <Separator /> }
                    <LinkControl editorState={editorState} onChange={::this.change} />
                    <ImageControl onUpload={this.uploadImage.bind(this)} editorState={editorState} onChange={::this.change} />
                </div>
                <div className={classnames('mcds-editor__root', {'mcds-element__border': error})} onClick={::this.focus}>
                    <DraftEditor
                        ref="editor"
                        customStyleMap={customStyleMap}
                        editorState={editorState}
                        onChange={::this.onChange}
                        blockStyleFn={blockStyleFn}
                        handleKeyCommand={::this.handleKeyCommand}
                        blockRendererFn={mediaBlockRenderer} />
                </div>
                { uploading ? <Loading progress={uploadProgress} /> : '' }
            </div>
        );
    }
}

Editor.propTypes = {
    defaultValue: PropTypes.string,
    onUpload: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    uploadMaxSize: PropTypes.number,
    miniStyle: PropTypes.bool,
    fontSizeStyle: PropTypes.bool,
    error: PropTypes.bool
};

const dely = (fn, time = 0) => window.setTimeout(fn, time);
