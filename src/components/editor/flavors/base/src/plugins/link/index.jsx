import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils, Entity } from 'draft-js';

import { Popover } from '../../components';
import { LinkButton } from '../buttons';
import Panel from './panel';
import getDecorator from './decorator';

export default class Link extends Component {
    componentWillReceiveProps(nextProps) {
        const url = getUrlFromEditorState(nextProps.editorState);
        const orgUrl = getUrlFromEditorState(this.props.editorState);
        if (orgUrl !== url) {
            this.refs.panel.setUrl(url);
        }
    }
    handleChange(url) {
        this.refs.pop.hide();
        const { editorState } = this.props;
        if (url === getUrlFromEditorState(editorState)) {
            return;
        }
        let entityKey = null;
        if (url) {
            entityKey = Entity.create('LINK', 'MUTABLE', {url});
        }
        this.props.onChange(RichUtils.toggleLink(
            editorState,
            editorState.getSelection(),
            entityKey
        ));
    }
    handleShow() {
        if (this.refs.panel) {
            this.refs.panel.focus();
        }
    }
    render() {
        const { editorState } = this.props;
        const url = getUrlFromEditorState(editorState);
        return (
            <Popover
                ref="pop"
                placement="bottom"
                onShow={::this.handleShow}
                content={
                    <Panel
                        ref="panel"
                        url={url}
                        onChange={::this.handleChange} />}>
                <LinkButton />
            </Popover>
        );
    }
}

Link.propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

const hasLink = editorState => RichUtils.currentBlockContainsLink(editorState);

/**
 * 获取选中文本中的 url
 */
const getUrlFromEditorState = editorState => {
    if (!hasLink(editorState)) {
        return '';
    }
    const startKey = editorState.getSelection().getAnchorKey();
    const offset = editorState.getSelection().getStartOffset();
    const linkKey = editorState
        .getCurrentContent()
        .getBlockForKey(startKey)
        .getEntityAt(offset);
    if (!linkKey) {
        return '';
    }
    const linkInstance = Entity.get(linkKey);
    return linkInstance.getData().url || '';
};

export {
    getDecorator
};
