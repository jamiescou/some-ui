
import React from 'react';
import ReactMarkdown from 'react-markdown';

import { ButtonSmallIcon } from '../../index';

const Base = (
    <div className="mcds-tile">
        <h3 className="mcds-truncate mcds-tile__head" title="title">
            <a href="javascript:void(0);">base tile</a>
        </h3>
        <div className="mcds-tile__detail">
            <dl className="mcds-tile__detail-list">
                <dt className="mcds-tile__item-label mcds-truncate" title="First Label">First Label:</dt>
                <dd className="mcds-tile__item-detail mcds-truncate">Description for first label</dd>

                <dt className="mcds-tile__item-label mcds-truncate" title="First Label">First Label:</dt>
                <dd className="mcds-tile__item-detail mcds-truncate">Description for first label</dd>

                <dt className="mcds-tile__item-label mcds-truncate" title="First Label">First Label:</dt>
                <dd className="mcds-tile__item-detail mcds-truncate">Description for first label</dd>

                <dt className="mcds-tile__item-label mcds-truncate" title="First Label">First Label:</dt>
                <dd className="mcds-tile__item-detail mcds-truncate">Description for first label</dd>
            </dl>
        </div>
    </div>
);
const BaseFun = (
    <div className="mcds-tile">
        <h3 className="mcds-truncate mcds-tile__head mcds-tile__fun" title="title">
            <a href="javascript:void(0);" className="mcds-tile__fun-block">base tile</a>
            <ButtonSmallIcon icon="mcds-icon__triangle-solid-14" />
        </h3>
        <div className="mcds-tile__detail">
            <dl className="mcds-tile__detail-list">
                <dt className="mcds-tile__item-label mcds-truncate" title="First Label">First Label:</dt>
                <dd className="mcds-tile__item-detail mcds-truncate">Description for first label</dd>

                <dt className="mcds-tile__item-label mcds-truncate" title="First Label">First Label:</dt>
                <dd className="mcds-tile__item-detail mcds-truncate">Description for first label</dd>

                <dt className="mcds-tile__item-label mcds-truncate" title="First Label">First Label:</dt>
                <dd className="mcds-tile__item-detail mcds-truncate">Description for first label</dd>

                <dt className="mcds-tile__item-label mcds-truncate" title="First Label">First Label:</dt>
                <dd className="mcds-tile__item-detail mcds-truncate">Description for first label</dd>
            </dl>
        </div>
    </div>
);


const Icon = (
    <div className="mcds-tile mcds-media" >
        <div className="mcds-media__figure mcds-icon__container">
            <span className="mcds-icon__robot-line-medium" />
        </div>
        <div className="mcds-media__body mcds-tile__detail">
            <h3 className="mcds-truncate mcds-tile__head" title="title">
                <a href="javascript:void(0);">Icon tile</a>
            </h3>
            <div className="mcds-tile__detail">
                <dl className="mcds-tile__detail-list">
                    <dt className="mcds-tile__item-label mcds-truncate" title="First Label">First Label:</dt>
                    <dd className="mcds-tile__item-detail mcds-truncate">Description for first label</dd>

                    <dt className="mcds-tile__item-label mcds-truncate" title="First Label">First Label:</dt>
                    <dd className="mcds-tile__item-detail mcds-truncate">Description for first label</dd>

                    <dt className="mcds-tile__item-label mcds-truncate" title="First Label">First Label:</dt>
                    <dd className="mcds-tile__item-detail mcds-truncate">Description for first label</dd>

                    <dt className="mcds-tile__item-label mcds-truncate" title="First Label">First Label:</dt>
                    <dd className="mcds-tile__item-detail mcds-truncate">Description for first label</dd>
                </dl>
            </div>
        </div>
    </div>
);

const Avatar  = (
    <div className="mcds-tile mcds-media" >
        <div className="mcds-media__figure">
            <span className="mcds-avatar mcds-avatar__medium mcds-avatar__circle">
                <img src="http://cdnimg103.lizhi.fm/audio_cover/2016/06/30/29596504232305031_320x320.jpg" />
            </span>
        </div>
        <div className="mcds-media__body mcds-tile__detail">
            <h3 className="mcds-truncate mcds-tile__head mcds-tile__fun" title="title">
                <a href="javascript:void(0);" className="mcds-tile__fun-block">Avatar tile</a>
                <div className="">123</div>
            </h3>
            <div className="mcds-tile__detail">
                <dl className="mcds-tile__detail-list">
                    <dt className="mcds-tile__item-label mcds-truncate" title="First Label">First Label:</dt>
                    <dd className="mcds-tile__item-detail mcds-truncate">Description for first label</dd>

                    <dt className="mcds-tile__item-label mcds-truncate" title="First Label">First Label:</dt>
                    <dd className="mcds-tile__item-detail mcds-truncate">Description for first label</dd>

                    <dt className="mcds-tile__item-label mcds-truncate" title="First Label">First Label:</dt>
                    <dd className="mcds-tile__item-detail mcds-truncate">Description for first label</dd>

                    <dt className="mcds-tile__item-label mcds-truncate" title="First Label">First Label:</dt>
                    <dd className="mcds-tile__item-detail mcds-truncate">Description for first label</dd>
                </dl>
            </div>
        </div>
    </div>
);

const Task = (
    <div className="mcds-tile mcds-media" >
        <div className="mcds-media__figure">
            <input type="checkbox" />
        </div>
        <div className="mcds-media__body mcds-tile__detail">
            <h3 className="mcds-truncate mcds-tile__head" title="title">
                <a href="javascript:void(0);">Task tile</a>
            </h3>
            <div className="mcds-tile__detail">
                <p className="mcds-truncate">Assignee</p>
            </div>
        </div>
    </div>
);

const Article = (
    <div className="mcds-tile">
        <h3 className="mcds-truncate mcds-tile__head" title="title">
            <a href="javascript:void(0);">Article tile</a>
        </h3>
        <div className="mcds-tile__detail">
            <p>by me</p>
            <ul className="mcds-tile__detail-list">
                <li className="mcds-tile__item mcds-tile__detail-weak mcds-truncate">123</li>
                <li className="mcds-tile__item mcds-tile__detail-weak mcds-truncate">123</li>
                <li className="mcds-tile__item mcds-tile__detail-weak mcds-truncate">123</li>
            </ul>
        </div>
    </div>
);

const List = (
    <ul className="mcds-list mcds-list__divider-bottom">
        <li className="mcds-list__item">
            <div className="mcds-tile mcds-media" >
                <div className="mcds-media__figure">
                    <span className="mcds-avatar mcds-avatar__medium">
                        <img src="http://cdnimg103.lizhi.fm/audio_cover/2016/06/30/29596504232305031_320x320.jpg" />
                    </span>
                </div>
                <div className="mcds-media__body mcds-tile__detail">
                    <h3 className="mcds-truncate mcds-tile__head" title="title">
                        <a href="javascript:void(0);">List.zip</a>
                    </h3>
                    <div className="mcds-tile__detail">
                        <ul className="mcds-tile__detail-list">
                            <li className="mcds-tile__item mcds-tile__detail-weak mcds-truncate">May 9th,2015-1 day ago</li>
                        </ul>
                    </div>
                </div>
            </div>
        </li>
        <li className="mcds-list__item">
            <div className="mcds-tile mcds-media" >
                <div className="mcds-media__figure">
                    <span className="mcds-avatar mcds-avatar__medium">
                        <img src="http://cdnimg103.lizhi.fm/audio_cover/2016/06/30/29596504232305031_320x320.jpg" />
                    </span>
                </div>
                <div className="mcds-media__body mcds-tile__detail">
                    <h3 className="mcds-truncate mcds-tile__head" title="title">
                        <a href="javascript:void(0);">List.zip</a>
                    </h3>
                    <div className="mcds-tile__detail">
                        <ul className="mcds-tile__detail-list">
                            <li className="mcds-tile__item mcds-tile__detail-weak mcds-truncate">May 9th,2015-1 day ago</li>
                        </ul>
                    </div>
                </div>
            </div>
        </li>
    </ul>
);

const Board = (
    <ul className="mcds-list mcds-list__divider-around">
        <li className="mcds-list__item">
            <div className="mcds-tile">
                <h3 className="mcds-truncate mcds-tile__head" title="title">
                    <a href="javascript:void(0);">base tile</a>
                </h3>
                <div className="mcds-tile__detail">
                    <p className="mcds-truncate" title="Company One"><a href="javascript:void(0);">Company One</a></p>
                    <p className="mcds-truncate">Closing 9/30/2015</p>
                </div>
            </div>
        </li>

        <li className="mcds-list__item">
            <div className="mcds-tile">
                <h3 className="mcds-truncate mcds-tile__head" title="title">
                    <a href="javascript:void(0);">base tile</a>
                </h3>
                <div className="mcds-tile__detail">
                    <p className="mcds-truncate" title="Company One"><a href="javascript:void(0);">Company One</a></p>
                    <p className="mcds-truncate">Closing 9/30/2015</p>
                </div>
            </div>
        </li>

        <li className="mcds-list__item">
            <div className="mcds-tile">
                <h3 className="mcds-truncate mcds-tile__head" title="title">
                    <a href="javascript:void(0);">base tile</a>
                </h3>
                <div className="mcds-tile__detail">
                    <p className="mcds-truncate" title="Company One"><a href="javascript:void(0);">Company One</a></p>
                    <p className="mcds-truncate mcds-tile__fun">
                        <span className="mcds-tile__fun-block">Closing 9/30/2015</span>
                        <span className="mcds-icon__robot-line-medium" />
                    </p>
                </div>
            </div>
        </li>
    </ul>
);
const baseIntro = '##### Tiles(提供一套样式)\r\n\r\n###### 基本使用方式\r\n\r\n\r\n```\r\n<div className=\"mcds-tile\">\r\n\t<h3 className=\"mcds-truncate mcds-tile__head\" title=\"title\">\r\n    \t<a href=\"javascript:void(0);\">base tile</a>\r\n    </h3>\r\n    <div className=\"mcds-tile__detail\">\r\n        \t...\r\n    </div>\r\n</div>\r\n\r\n```\r\n\r\n###### 提供一个class:mcds-tile__fun, 使用方式如下.可以实现左侧一整块,右侧图标功能区的显示效果\r\n\r\n```\r\n<div class=\"mcds-tile__fun\"\">\r\n\t<any class=\"mcds-tile__fun-block\">\r\n\tleft block\r\n\t</any>\r\n\t<any>\r\n\t\ticon\r\n\t</any>\r\n</div>\r\n```\r\n\r\n###### mcds-tile__detail 下提供一个class:mcds-tile__detail-weak \r\n\r\n```\r\n<div className=\"mcds-tile__detail\">\r\n\t//p标签的颜色会变淡一点\r\n   <p className=\"mcds-tile__detail-weak\">weak</p>\r\n</div>\r\n\r\n```';
export default [
    {
        id: 'Base',
        element: Base,
        intro: <ReactMarkdown className="markdown" source={baseIntro} />
    },
    {
        id: 'BaseFun',
        element: BaseFun
    },
    {
        id: 'Icon',
        element: Icon
    },
    {
        id: 'Avatar',
        element: Avatar
    },
    {
        id: 'Task',
        element: Task
    },
    {
        id: 'Article',
        element: Article
    },
    {
        id: 'List',
        element: List
    },
    {
        id: 'Board',
        element: Board
    }
];
