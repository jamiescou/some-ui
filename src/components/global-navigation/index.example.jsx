/**
 * 存放示例
 */
import React from 'react';
// import ReactMarkdown from 'react-markdown';
import {Tab, TabItem} from '../tab';
import {InputSearch} from '../form';
import {
    DropDown,
    DropDownList,
    DropDownItem,
    DropDownItemHeader
    // DropDownItemDivider
} from '../dropdown';
const tmpStyle = {
    height: '400px'
};

const icon = (
    <div className="mcds-icon__container mcds-icon__container-24 mcds-m__r-12">
        <span className="mcds-icon__telephone-line mcds-timeline__icon-inside" />
    </div>
);

const AvatarItem = (
    <DropDownItem>
        <div className="mcds-tile mcds-media" >
            <div className="mcds-media__figure">
                <span className="mcds-avatar mcds-avatar__medium mcds-avatar__circle">
                    <img src="http://cdnimg103.lizhi.fm/audio_cover/2016/06/30/29596504232305031_320x320.jpg" />
                </span>
            </div>
            <div className="mcds-media__body mcds-tile__detail">
                <h3 className="mcds-truncate mcds-tile__head" title="title">
                   Avatar tile
                </h3>
                <div className="mcds-tile__detail">
                    <ul className="mcds-tile__detail-list">
                        <li className="mcds-tile__item mcds-tile__detail-weak mcds-text__weak mcds-truncate">123</li>
                    </ul>
                </div>
            </div>
        </div>
    </DropDownItem>
);
const Navigation = (
    <div className="mcds-container" style={tmpStyle}>
        <div className="mcds-media mcds-globalnavigation">
            <div className="mcds-media__body">
                <Tab className="mcds-list__item mcds-tab__default">
                    <TabItem className="mcds-globalnavigation__logo">
                        {/* <img src="http://p3.ifengimg.com/haina/2017_08/8ac15c9b5ffa87a_w503_h300.png" />*/}
                        MEIQIA PRO
                    </TabItem>
                    <TabItem>
                      Item One
                    </TabItem>
                    <TabItem className="mcds-tab__active">
                      Item Tow
                    </TabItem>
                    <TabItem>
                      Item Three
                    </TabItem>
                    <TabItem>
                        <div>More
                            <span className="mcds-tab-right-small__icon mcds-icon__triangle-small" />
                            <DropDown className="open">
                                <DropDownList>
                                    <DropDownItem iconLeft={icon}>
                                        icon
                                    </DropDownItem>
                                    <DropDownItem>123</DropDownItem>
                                    <DropDownItem>123</DropDownItem>
                                    <DropDownItem>123</DropDownItem>
                                </DropDownList>
                            </DropDown>
                        </div>
                    </TabItem>
                </Tab>
            </div>
            <div className="mcds-globalnavigation__actions mcds-m__t-14">
                <ul className="mcds-list__horizontal">
                    <li className="mcds-list__item mcds-globalnavigation__actions-search mcds-m__r-30">
                        <InputSearch autoComplete="off" placeholder="Placeholder text" search="right" />
                        <DropDown className="open">
                            <DropDownList>
                                <DropDownItemHeader>RECENT ACCOUNT</DropDownItemHeader>
                                {AvatarItem}
                                {AvatarItem}
                                {AvatarItem}
                                {AvatarItem}
                                {AvatarItem}
                            </DropDownList>
                        </DropDown>
                    </li>
                    <li className="mcds-list__item mcds-m__r-20">
                        <span className="mcds-icon__help-large mcds-icon__size-18" />
                    </li>
                    <li className="mcds-list__item mcds-m__r-20">
                        <span className="mcds-icon__help-large mcds-icon__size-18" />
                    </li>
                    <li className="mcds-list__item mcds-m__r-20">
                        <span className="mcds-icon__help-large mcds-icon__size-18" />
                    </li>
                    <li className="mcds-list__item mcds-m__r-20">
                        <span className="mcds-avatar mcds-avatar__medium mcds-avatar__circle">
                            <img src="http://cdnimg103.lizhi.fm/audio_cover/2016/06/30/29596504232305031_320x320.jpg" />
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
);

export default [
    {
        id: 'global-navigation',
        element: Navigation,
        intro: 'good'
    }
];
