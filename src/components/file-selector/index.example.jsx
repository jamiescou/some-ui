import React from 'react';
import ReactMarkdown from 'react-markdown';
import { FileSelector, IntegratedFileSelector } from './index';

const IntegratedDefault = (
    <div style={{ width: '320px', height: '320px' }}>
        <IntegratedFileSelector>
            这是file-selector.这是file-selector.这是file-selector.这是file-selector.这是file-selector.这是file-selector.这是file-selector.这是file-selector.这是file-selector.
        </IntegratedFileSelector>
    </div>
);

const IntegratedDrag = (
    <div style={{ width: '320px', height: '320px' }}>
        <IntegratedFileSelector drag dropContent="或者拖放文件">
            这是file-selector.这是file-selector.这是file-selector.这是file-selector.这是file-selector.这是file-selector.这是file-selector.这是file-selector.这是file-selector.
        </IntegratedFileSelector>
    </div>

);

const IntegratedDragover = (
    <div style={{ width: '320px', height: '320px' }}>
        <IntegratedFileSelector drag draggover dropContent="或者拖放文件">
            这是file-selector.这是file-selector.这是file-selector.这是file-selector.这是file-selector.这是file-selector.这是file-selector.这是file-selector.这是file-selector.
        </IntegratedFileSelector>
    </div>
);

const IntegratedDragoverError = (
    <div style={{ width: '320px', height: '320px' }}>
        <IntegratedFileSelector drag draggoverError errorMsg="错误信息写在这里">
            这是file-selector.这是file-selector.这是file-selector.这是file-selector.这是file-selector.这是file-selector.这是file-selector.这是file-selector.这是file-selector.
        </IntegratedFileSelector>
    </div>
);

export default [
    {
        id: 'FilesSel',
        element: <FileSelector
            label="Account Name"
            drop
            Icon="mcds-icon__upload-line-20"
            error="File type not supported"
            accept="image/png"
            iconContent="上传数据文件"
            dropContent="或拖放数据文件到这里" />,
        intro: <ReactMarkdown className="markdown" source={'#### FileSelector\r\n* 支持传入 label \r\n* drop 是否支持拖拽\r\n* Icon 图标\r\n* error 错误信息\r\n* accept 支持上传的格式  默认为\"image/png\"\r\n* iconContent icon右面的文字\r\n* dropContent 拖放数据文件到这里'} />
    },
    {
        id: 'NoBorderFiles',
        element: <FileSelector label="Account Name" Icon="mcds-icon__upload-line-20" error="File type not supported" accept="image/png" iconContent="上传数据文件" />
    },
    {
        id: 'Image',
        element: <FileSelector
            drop
            className="mcds-file-selector__images mcds-data__import"
            label="Account Name"
            Icon="mcds-icon__upload-line-20"
            error="File type not supported"
            accept="image/png"
            iconContent="上传数据文件"
            dropContent="或拖放数据文件到这里" />
    },
    {
        id: 'IntegratedDefault',
        element: IntegratedDefault,
        intro: <ReactMarkdown className="markdown" source={'#### FileSelector\r\n* 支持传入 label \r\n* drop 是否支持拖拽\r\n* draggover 值为true/false 用来判断是否添加文件拖拽到固定区域的样式\r\n* draggoverError 为true时 errorMsg生效  值为:错误信息\r\n* accept 支持上传的格式  默认为\"image/png\"\r\n* dropContent 拖放数据文件到这里'} />
    },
    {
        id: 'IntegratedDrag',
        element: IntegratedDrag
    },
    {
        id: 'IntegratedDragover',
        element: IntegratedDragover
    },
    {
        id: 'IntegratedDragoverError',
        element: IntegratedDragoverError
    }
];
