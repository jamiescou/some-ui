/**
 * 存放示例
 */
import React from 'react';
import ReactMarkdown from 'react-markdown';

import {
    DropDown,
    DropDownList,
    DropDownItem,
    DropDownTrigger
} from './index';
import { Button } from '../index';

const Directions = [
    'left',
    'right',
    'bottom',
    'top',
    'top-left',
    'top-right',
    'right-top',
    'right-bottom',
    'bottom-left',
    'bottom-right',
    'left-top',
    'left-bottom'
];
const TableIconRight = <span className="mcds-icon__right mcds-icon__arrow-right" />;

class Test extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            index: 0
        };
    }
    handleToggle() {
        let { index } = this.state;
        let length = Directions.length;
        if (index + 1 < length) {
            index += 1;
        } else {
            index = 0;
        }
        this.setState({index});
    }
    close() {
        console.log('this.refs.', this.refs.DropDownTrigger.close());
    }
    open() {
        console.log('this.refs.', this.refs.DropDownTrigger.open());
    }
    render() {
        return (
            <div>
                <p>target: body</p>
                <DropDownTrigger
                    ref="DropDownTrigger"
                    onClose={::this.handleToggle}
                    autoCloseTag="close"
                    autoPlacement={true}
                    target="body"
                    placement={Directions[this.state.index]} >
                    <Button className="mcds-button__neutral" >body-toggleDirection</Button>
                    <DropDown>
                        <DropDownList>
                            <DropDownItem isSelected={true} className="close">被选中的加入isSelected属性</DropDownItem>
                            <DropDownItem>2</DropDownItem>
                            <DropDownItem onClick={::this.open}>open</DropDownItem>
                            <DropDownItem onClick={::this.close}>close</DropDownItem>
                        </DropDownList>
                    </DropDown>
                </DropDownTrigger>
                <p>target: self</p>
                <DropDownTrigger target="self" autoCloseTag="close" placement={Directions[this.state.index]}>
                    <Button className="mcds-button__neutral" onClick={::this.handleToggle}>self-toggleDirection</Button>
                    <DropDown>
                        <DropDownList>
                            <DropDownItem isSelected={true} iconRight={TableIconRight} className="close">
                                被选中的加入isSelected属性
                            </DropDownItem>
                            <DropDownItem isSelected={true} iconRight={TableIconRight}>
                                被选中的加入isSelected属性
                            </DropDownItem>
                            <DropDownItem>3</DropDownItem>
                            <DropDownItem>4</DropDownItem>
                        </DropDownList>
                    </DropDown>
                </DropDownTrigger>
            </div>
        );
    }
}

let intro = '* DropDown(声明组件)\r\n* DropDownList(List容器)\r\n* DropDownItem(单条窗口)\r\n* DropDownTrigger(触发器)\r\n* DropDownItemHeader(item的名称或者分类)\r\n* DropDownItemDivider(分割线)\r\n\r\n##### DropDown\r\nDropdown的open样式是显示的状态.反之隐藏\r\n\r\n```\r\n\t// 封装好的样式\r\n\t<Dropdown className=\"open\"\">\r\n\t\t<DropDownList>\r\n\t\t\t<DropDownItem>1</DropDownItem>\r\n\t\t\t<DropDownItem>1</DropDownItem>\r\n\t\t\t<DropDownItem>1</DropDownItem>\r\n\t\t\t<DropDownItem>1</DropDownItem>\r\n\t\t</DropDownList>\r\n\t</DropDown>\r\n```\r\n\r\n##### DropDownTrigger相关\r\nDropDownTrigger __配合Dropdown使用__.用来做触发器 自身提供 close,open接口方法\r\n\r\n- onOpen     打开的时候的回调\r\n- onClose    关闭时候的回调\r\n- target     挂载点的配置,[body, self]\r\n- autoPlacement 是否自动调整位置(仅适用于target=self)\r\n- offset     弹出框距离target的偏移量\r\n- className  弹出框上追加的className\r\n- autoCloseTag 自动关闭的标识className\r\n- placement  打开的位置\r\n\r\n```\r\n\t// 支持的位置信息\r\n\tconst Direction = [\r\n    \"left\",\r\n    \"right\",\r\n    \"bottom\",\r\n    \"top\",\r\n    \"top-left\",\r\n    \"top-right\",\r\n    \"right-top\",\r\n    \"right-bottom\",\r\n    \"bottom-left\",\r\n    \"bottom-right\",\r\n    \"left-top\",\r\n    \"left-bottom\"\r\n\t]\r\n\t<DropDownTrigger>\r\n\t\t<Any /> //任意触发开关\r\n\t\t<DropDown />\r\n\t</DropDownTrigger>\r\n```\r\n\r\n*className=mcds-dropdown__position-right* 弹出位置为左侧 __已废弃__\r\n\r\n*className=mcds-dropdown__min-no || mcds-dropdown__max-no* 取消下拉最小或最大宽度 \r\n\r\n\r\n##### DropDown,DropDownList,支持传入任意基本属性 DropDownList支持嵌套\r\n\r\n##### DropDownItem支持下以自定义属性\r\n\r\n- iconLeft (左侧图标)\r\n- iconRight (右侧图标)\r\n- isSelected (是否被选中)\r\n\r\n##### DropDownItemDivider不支持传入属性,如果更改样式,可以DropDown追加样式去更改子类\"mcds-dropdown__divider\"的样式\r\n';
export default [
    {
        id: 'DropDown',
        element: <Test />,
        intro: <ReactMarkdown className="markdown" source={intro} />
    }
];
// "###提供以下几种组件

// *   DropDown
// *   DropDownList,
// *   DropDownItem
// *   DropDownItemHeader,
// *   DropDownItemDivider"
