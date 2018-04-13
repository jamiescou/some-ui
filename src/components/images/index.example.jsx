import React from 'react';
import { Image } from './index';

import ReactMarkdown from 'react-markdown';

const ImageCard = (
    <div style={{ width: '320px' }}>
        <Image
            className="mcds-image__card"
            cropClass="mcds-image__crop-4-by-3"
            titleClass="mcds-image__title-ard"
            imgSrc="https://www.lightningdesignsystem.com/assets/images/placeholder-img@16x9.jpg"
            image />
    </div>
);

const ImageOverlay = (
    <div className="demo-only" style={{ width: '20rem' }}>
        <Image
            className="mcds-image__card"
            cropClass="mcds-image__crop-16-by-9"
            titleClass="mcds-image__title-overlay mcds-align__absolute-center mcds-text-heading__large"
            title="22+"
            imgSrc="https://www.lightningdesignsystem.com/assets/images/placeholder-img@16x9.jpg"
            image />
    </div>
);

const ImageActions = (
    <div className="demo-only" style={{ width: '20rem' }}>
        <Image
            className="mcds-image__card"
            cropClass="mcds-image__crop-1-by-1"
            titleClass="mcds-image__title-card"
            imgSrc="https://www.lightningdesignsystem.com/assets/images/placeholder-img@16x9.jpg"
            image
            actions />
    </div>
);

const ImageIcon = (
    <div style={{ width: '320px' }}>
        <Image
            className="mcds-image__card"
            cropClass="mcds-image__crop-4-by-3"
            titleClass="mcds-image__title-card"
            imgIcon="mcds-icon__open-folder"
            iconClass="mcds-icon__size-48" />
    </div>
);

const intro = '#### cropClass \r\n    控制大小,有三种样式\r\n    1. mcds-image__crop-1-by-1\r\n    2. mcds-image__crop-4-by-3\r\n    3. mcds-image__crop-16-by-9\r\n\r\n#### titleClass \r\n    控制标题显示位置及背景色等\r\n    1. mcds-image__title-ard\r\n    2. 标题居中 mcds-image__title-overlay \r\n                mcds-align__absolute-center \r\n                mcds-text-heading__large\r\n\r\n#### image\r\n    值为bool 控制显示图片还是icon\r\n    \r\n#### imgSrc \r\n    值为要显示的图片链接\r\n\r\n#### imgIcon\r\n    icon图标\r\n\r\n#### iconClass\r\n    图片位置icon 字体大小\r\n    \r\n#### actions\r\n    值为bool 控制是否显示按钮组';

export default [
    {
        id: 'ImageCard',
        element: ImageCard,
        intro: <ReactMarkdown className="markdown" source={intro} />
    },
    {
        id: 'ImageOverlay',
        element: ImageOverlay
    },
    {
        id: 'ImageActions',
        element: ImageActions
    },
    {
        id: 'ImageIcon',
        element: ImageIcon
    }
];
