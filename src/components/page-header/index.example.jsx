/**
 * 存放示例
 */
import React, {Component} from 'react';

import { ButtonGroup, ButtonIcon, Button, DropDownTrigger, DropDownItemHeader, BreadCrumbs, Crumb, StatefulButton, Th, DropDown, DropDownList, DropDownItem } from './../index';

class ObjectHome extends Component {
    constructor(){
        super();
        this.state = {
            open_single: false
        };
    }

    _toggle() {
        this.setState({open_single: !this.state.open_single});
    }
    render() {
        return (
            <div className="mcds-pageheader">
                <div className="mcds-grid mcds-pageheader__header">
                    <div className="mcds-pageheader__header-left">
                        <div className="mcds-media">
                            <div className="mcds-m__r-30 mcds-p__t-6">
                                <div className="mcds-pageheader__header-left-icon" />
                            </div>
                            <div className="mcds-media__body">
                                <p className="mcds-pageheader__header-left-text">线索</p>
                                <DropDownTrigger className="">
                                    <Button className="mcds-text__line-28 mcds-pageheader__title">
                                            我的线索
                                            <i className="mcds-icon__triangle-solid-14" />
                                    </Button>
                                    <DropDown>
                                        <DropDownList>
                                            <DropDownItemHeader >线索列表</DropDownItemHeader>
                                            <DropDownItem>
                                                1
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
                            </div>
                        </div>
                    </div>
                    <div className="mcds-pageheader__header-right">
                        <ButtonGroup>
                            <Button className="mcds-button__item">
                                New Lead
                            </Button>
                            <Button className="mcds-button__item">
                                Import Leads
                            </Button>
                            <ButtonIcon className="mcds-pageheader__header-right-icon" icon="mcds-icon__triangle-tiny">
                                Save
                            </ButtonIcon>
                        </ButtonGroup>
                    </div>
                </div>
                <div className="mcds-grid mcds-pageheader__body">
                    <div>
                        <DropDownTrigger>
                            <ButtonIcon hasDropdown={true} className="mcds-button-icon__more" icon="mcds-icon__settings" />
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
                        <ButtonIcon hasDropdown={true} className="mcds-button-icon__more" icon="mcds-icon__note-line" />
                        <ButtonIcon className="mcds-button__item" icon="mcds-icon__delete-solid-14" />
                        <ButtonIcon className="mcds-button__item" icon="mcds-icon__funnel-solid-14" />
                        <ButtonGroup>
                            <ButtonIcon className="mcds-button__item" icon="mcds-icon__delete-solid-14" />
                            <ButtonIcon className="mcds-button__item" icon="mcds-icon__funnel-solid-14" />
                        </ButtonGroup>
                    </div>
                </div>
                <div className="mcds-grid mcds-pageheader__footer">
                    <div className="mcds-pageheader__footer-left">
                        <ul className="mcds-list__horizontal mcds-text__weak mcds-text__size-12">
                            <li className="mcds-list__item">6个项目</li>
                            <li className="mcds-list__item mcds-p__l-7 mcds-p__r-7">•</li>
                            <li className="mcds-list__item">按名称排序</li>
                            <li className="mcds-list__item mcds-p__l-7 mcds-p__r-7">•</li>
                            <li className="mcds-list__item">最后更新</li>
                            <li className="mcds-list__item mcds-p__l-5">02/08/2017</li>
                            <li className="mcds-list__item mcds-p__l-10">15:40</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const ObjectHomeCode = `
    constructor(){
        super();
        this.state = {
            open_single: false
        };
    }

    _toggle() {
        this.setState({open_single: !this.state.open_single});
    }
    render() {
        return (
            <div className="mcds-pageheader">
                    <div className="mcds-grid mcds-pageheader__header">
                        <div className="mcds-pageheader__header-left">
                            <div className="mcds-media">
                                <div className="mcds-media__figure mcds-p__t-6">
                                    <div className="mcds-pageheader__header-left-icon" />
                                </div>
                                <div className="mcds-media__body">
                                    <span className="mcds-pageheader__header-left-text">线索</span>
                                    <DropDownTrigger className=''>
                                        <Button className="mcds-text__line-28 mcds-pageheader__title">
                                                我的线索
                                                <i className="mcds-icon__triangle-solid-14" />
                                        </Button>
                                        <DropDown>
                                            <DropDownList>
                                                <DropDownItemHeader >线索列表</DropDownItemHeader>
                                                <DropDownItem>
                                                    1
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
                                </div>
                            </div>
                        </div>
                        <div className="mcds-pageheader__header-right">
                            <ButtonGroup>
                                <Button className="mcds-button__item">
                                    New Lead
                                </Button>
                                <Button className="mcds-button__item">
                                    Import Leads
                                </Button>
                                <ButtonIcon className="mcds-pageheader__header-right-icon" icon="mcds-icon__triangle-tiny">
                                    Save
                                </ButtonIcon>
                            </ButtonGroup>
                        </div>
                    </div>
                    <div className="mcds-grid mcds-pageheader__body">
                        <div>
                            <DropDownTrigger>
                                <ButtonIcon hasDropdown={true} className="mcds-button-icon__more" icon="mcds-icon__settings" />
                                <DropDown>
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
                            
                            <ButtonIcon hasDropdown={true} className="mcds-button-icon__more" icon="mcds-icon__note-line" />
                            <ButtonIcon className="mcds-button-icon__more" icon="mcds-icon__edit-line" />
                            <ButtonIcon className="mcds-button-icon__more" icon="mcds-icon__reopen-tiny" />
                            <ButtonGroup>
                                <ButtonIcon className="mcds-button-icon__more" icon="mcds-icon__binding-small" />
                                <ButtonIcon className="mcds-button-icon__more" icon="mcds-icon__funnel-line" />
                            </ButtonGroup>
                        </div>
                    </div>
                    <div className="mcds-grid mcds-pageheader__footer">
                        <div className="mcds-pageheader__footer-left">
                            <ul className="mcds-list__horizontal mcds-text__weak mcds-text__size-12">
                                <li className='mcds-list__item'>6个项目</li>
                                <li className='mcds-list__item mcds-p__l-7 mcds-p__r-7'>•</li>
                                <li className='mcds-list__item'>按名称排序</li>
                                <li className='mcds-list__item mcds-p__l-7 mcds-p__r-7'>•</li>
                                <li className='mcds-list__item'>最后更新</li>
                                <li className='mcds-list__item mcds-p__l-5'>02/08/2017</li>
                                <li className='mcds-list__item mcds-p__l-10'>15:40</li>
                            </ul>
                        </div>
                    </div>
                </div>
        );
    }`;

let RecordHome = () => {
    return (
        <div className="mcds-pageheader">
            <div className="mcds-grid mcds-pageheader__header">
                <div className="mcds-pageheader__header-left">
                    <div className="mcds-media">
                        <div style={{paddingTop: '6px'}} className="mcds-media__figure">
                            <div className="mcds-pageheader__header-left-icon" />
                        </div>
                        <div className="mcds-media__body mcds-m__l-30">
                            <span className="mcds-pageheader__header-left-text">Record Type</span>
                            <div className="mcds-pageheader__title">
                                Record Title
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mcds-pageheader__header-right">
                    <StatefulButton>
                        Following
                    </StatefulButton>
                    <ButtonGroup>
                        <Button className="mcds-button__item">
                            Edit
                        </Button>
                        <Button className="mcds-button__item">
                            Delete
                        </Button>
                        <Button className="mcds-button__item">
                            Clone
                        </Button>
                        <ButtonIcon className="mcds-pageheader__header-right-icon" icon="mcds-icon__triangle-tiny" />
                    </ButtonGroup>
                </div>
            </div>
            <div className="mcds-m__t-30">
                <table className="mcds-table mcds-table mcds-table-fixed__layout">
                    <thead>
                        <tr>
                            <Th className="mcds-is__sortable">
                                Field
                            </Th>
                            <Th className="mcds-is__sortable" icon="mcds-icon__triangle-small">
                                Field(3)
                            </Th>
                            <Th className="mcds-is__sortable">
                                Field
                            </Th>
                            <Th className="mcds-is__sortable">
                                Field
                            </Th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="mcds-truncate">
                                Description tha demonstrates truncation with a lo…
                            </td>
                            <td className="mcds-truncate">
                                Multiple Values
                            </td>
                            <td className="mcds-truncate">
                                Hyperlink
                            </td>
                            <td className="mcds-truncate">
                                Description (2-line truncat…
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const RecordHomeCode = `
            <div className="mcds-pageheader">
            <div className="mcds-grid mcds-pageheader__header">
                <div className="mcds-pageheader__header-left">
                    <div className="mcds-media">
                        <div style={{paddingTop: '6px'}} className="mcds-media__figure">
                            <div className="mcds-pageheader__header-left-icon" />
                        </div>
                        <div className="mcds-media__body">
                            <span className="mcds-pageheader__header-left-text">Record Type</span>
                            <div className="mcds-pageheader__title">
                                Record Title
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mcds-pageheader__header-right">
                    <StatefulButton>
                        Following
                    </StatefulButton>
                    <ButtonGroup>
                        <Button className="mcds-button__item">
                            Edit
                        </Button>
                        <Button className="mcds-button__item">
                            Delete
                        </Button>
                        <Button className="mcds-button__item">
                            Clone
                        </Button>
                        <ButtonIcon className="mcds-pageheader__header-right-icon" icon="mcds-icon__triangle-tiny" />
                    </ButtonGroup>
                </div>
            </div>
            <div className="mcds-m__t-30">
                <table class="mcds-table mcds-table-fixed__layout">
                    <thead>
                        <tr>
                            <Th className="mcds-is__sortable">
                                Field
                            </Th>
                            <Th className="mcds-is__sortable" icon="mcds-icon__triangle-small">
                                Field(3)
                            </Th>
                            <Th className="mcds-is__sortable">
                                Field
                            </Th>
                            <Th className="mcds-is__sortable">
                                Field
                            </Th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="mcds-truncate">
                                Description tha demonstrates truncation with a lo…
                            </td>
                            <td className="mcds-truncate">
                                Multiple Values
                            </td>
                            <td className="mcds-truncate">
                                Hyperlink
                            </td>
                            <td className="mcds-truncate">
                                Description (2-line truncat…
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>`;

let RelatedList = () => {
    return (
        <div className="mcds-pageheader">
            <div className="mcds-grid mcds-pageheader__header">
                <div className="mcds-pageheader__header-left">
                    <BreadCrumbs>
                        <Crumb>
                            <a href="javascript:void(0);">
                                Accounts
                            </a>
                        </Crumb>
                        <Crumb>
                            <a href="javascript:void(0);">
                                Company One
                            </a>
                        </Crumb>
                    </BreadCrumbs>
                    <div className="mcds-pageheader__title">
                        Contacts (will truncate)
                    </div>
                </div>
                <div className="mcds-pageheader__header-right" >
                    <div className="pull-right mcds-m__b-10">
                        <ButtonGroup>
                            <Button className="mcds-button__item">
                                Add Contact
                            </Button>
                            <ButtonIcon className="mcds-pageheader__header-right-icon" icon="mcds-icon__triangle-tiny" />
                        </ButtonGroup>
                    </div>
                    <div>
                        <ButtonIcon hasDropdown={true} className="mcds-button-icon__more" icon="mcds-icon__note-line" />
                        <ButtonGroup>
                            <ButtonIcon className="mcds-button__item" icon="mcds-icon__delete-solid-14" />
                            <ButtonIcon className="mcds-button__item" icon="mcds-icon__funnel-solid-14" />
                            <ButtonIcon hasDropdown={true} className="mcds-button-icon__more" icon="mcds-icon__settings-line-20" />
                        </ButtonGroup>
                    </div>
                </div>
            </div>
            <div className="mcds-grid mcds-pageheader__footer">
                <p>10 items • Sorted by Name</p>
            </div>
        </div>
    );
};

const RelatedListCode = `
            <div className="mcds-pageheader">
            <div className="mcds-grid mcds-pageheader__header">
                <div className="mcds-pageheader__header-left">
                    <BreadCrumbs>
                        <Crumb>
                            <a href="javascript:void(0);">
                                Accounts
                            </a>
                        </Crumb>
                        <Crumb>
                            <a href="javascript:void(0);">
                                Company One
                            </a>
                        </Crumb>
                    </BreadCrumbs>
                    <div className="mcds-pageheader__title">
                        Contacts (will truncate)
                    </div>
                </div>
                <div className="mcds-pageheader__header-right" >
                    <div style={{marginBottom: '10px'}} className="pull-right">
                        <ButtonGroup>
                            <Button className="mcds-button__item">
                                Add Contact
                            </Button>
                            <ButtonIcon className="mcds-pageheader__header-right-icon" icon="mcds-icon__triangle-tiny" />
                        </ButtonGroup>
                    </div>
                    <div>
                        <ButtonIcon hasDropdown={true} className="mcds-button-icon__more" icon="mcds-icon__note-line" />
                        <ButtonGroup>
                            <ButtonIcon className="mcds-button-icon__more" icon="mcds-icon__binding-small" />
                            <ButtonIcon className="mcds-button-icon__more" icon="mcds-icon__funnel-line" />
                            <ButtonIcon hasDropdown={true} className="mcds-button-icon__more" icon="mcds-icon__settings" />
                        </ButtonGroup>
                    </div>
                </div>
            </div>
            <div className="mcds-grid mcds-pageheader__footer">
                <p>10 items • Sorted by Name</p>
            </div>
        </div>`;

export default [
    {
        id: 'ObjectHome',
        element: <ObjectHome />,
        intro: '有一些图标样式没有，用其他代替的，等设计出crm最新图标再换上;一些不确定的样式我用的行内样式来写的，没放到class中',
        code: ObjectHomeCode
    },
    {
        id: 'RecordHome',
        element: <RecordHome />,
        intro: 'Follow这个按钮样式hover会有些问题，table这里也是没有找到特别合适的样式，我修改了一下td的样式，改成单行文本溢出省略了',
        code: RecordHomeCode
    },
    {
        id: 'RelatedList',
        element: <RelatedList />,
        intro: 'RelatedListCode',
        code: RelatedListCode
    }
];
