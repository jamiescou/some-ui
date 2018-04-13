import React from 'react';

import { Button, ButtonSmallIcon } from '../../index';
import {
    DropDown,
    DropDownList,
    DropDownItem,
    DropDownTrigger
} from '../dropdown';

const iconAvatar = (
    <span className="mcds-avatar mcds-avatar__small mcds-media__figure">
        <img src="http://cdnimg103.lizhi.fm/audio_cover/2016/06/30/29596504232305031_320x320.jpg" />
    </span>
);
const normalButtonDropdown = (
    <DropDownTrigger placement="bottom-left" target="self">
        <Button className="mcds-button__neutral">New</Button>
        <DropDown className="mcds-dropdown__position-right">
            <DropDownList>
                <DropDownItem isSelected={true}>
                    被选中的加入isSelected属性
                </DropDownItem>
                <DropDownItem>
                    2
                </DropDownItem>
                <DropDownItem>
                    3
                </DropDownItem>
                <DropDownItem>
                    4
                </DropDownItem>
            </DropDownList>
        </DropDown>
    </DropDownTrigger>
);
const smallButtonDropdown = (
    <DropDownTrigger>
        <ButtonSmallIcon icon="mcds-icon__triangle-solid-14" />
        <DropDown className="mcds-dropdown__position-right">
            <DropDownList>
                <DropDownItem isSelected={true}>
                    被选中的加入isSelected属性
                </DropDownItem>
                <DropDownItem>
                    2
                </DropDownItem>
                <DropDownItem>
                    3
                </DropDownItem>
                <DropDownItem>
                    4
                </DropDownItem>
            </DropDownList>
        </DropDown>
    </DropDownTrigger>
);
const CardDefault = (
    <div>
        <article className="mcds-card">
            <div className="mcds-card__header mcds-grid">
                <header className="mcds-media mcds-card__media">
                    {iconAvatar}
                    <div className="mcds-media__body">
                        <a href="javascript:void(0);" className="slds-card__header-link mcds-truncate">
                          body
                        </a>
                    </div>
                </header>
                <div>
                    {normalButtonDropdown}
                </div>
            </div>
            <div className="mcds-card__body">
                body
            </div>
            <div className="mcds-card__footer">
                foot
            </div>
        </article>

    </div>
);

const CardMedium = (
    <article className="mcds-card mcds-card__medium">
        <div className="mcds-card__header mcds-grid">
            <header className="mcds-media mcds-card__media">
                {iconAvatar}
                <div className="mcds-media__body">
                    <a href="javascript:void(0);" className="slds-card__header-link mcds-truncate">
                      body
                    </a>
                </div>
            </header>
            <div>
                {normalButtonDropdown}
            </div>
        </div>
    </article>
);

const CardSmall = (
    <article className="mcds-card mcds-card__small">
        <div className="mcds-card__header mcds-grid">
            <header className="mcds-media mcds-card__media">
                {iconAvatar}
                <div className="mcds-media__body">
                    <a href="javascript:void(0);" className="slds-card__header-link mcds-truncate">
                      body
                    </a>
                </div>
            </header>
            <div>
                {smallButtonDropdown}
            </div>
        </div>
    </article>
);

const CardList = (
    <ul className="mcds-list mcds-card__list">
        <li className="mcds-list__item mcds-card__list-item">
            <article className="mcds-card mcds-card__small">
                <div className="mcds-card__header mcds-grid">
                    <header className="mcds-media mcds-card__media">
                        {iconAvatar}
                        <div className="mcds-media__body">
                            <p className="mcds-truncate">
                              body
                            </p>
                        </div>
                    </header>
                    <div>
                        {smallButtonDropdown}
                    </div>
                </div>
            </article>
        </li>
        <li className="mcds-list__item mcds-card__list-item">
            <article className="mcds-card mcds-card__small">
                <div className="mcds-card__header mcds-grid">
                    <header className="mcds-media mcds-card__media">
                        {iconAvatar}
                        <div className="mcds-media__body">
                            <p className="mcds-truncate">
                              body
                            </p>
                        </div>
                    </header>
                    <div>
                        {smallButtonDropdown}
                    </div>
                </div>
            </article>
        </li>
    </ul>
);

export default [
    {
        id: 'Card',
        element: CardDefault
    },
    {
        id: 'Medium-card',
        element: CardMedium
    },
    {
        id: 'Small-card',
        element: CardSmall
    },
    {
        id: 'List-card',
        element: CardList
    }
];
