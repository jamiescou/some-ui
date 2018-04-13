import React from 'react';
import classnames from 'classnames';
import { Tab, TabItem, TabContent } from './index';
import ReactMarkdown from 'react-markdown';

const element = (
    <div className="mcds-container">
        <Tab className="mcds-tab__default">
            <TabItem>
                <span className="mcds-tab-left__icon mcds-icon__open-folder" />
                Item One
                <span className="mcds-tab-right__icon mcds-icon__close-medium" />
            </TabItem>
            <TabItem className="mcds-tab__active">
                <span className="mcds-tab-left__icon mcds-icon__open-folder" />
                Item Tow
                <span className="mcds-tab-right-small__icon mcds-icon-default__color mcds-icon__triangle-small" />
                <span className="mcds-tab-right__icon mcds-icon-default__color mcds-icon__close-medium" />
            </TabItem>
            <TabItem>
                Item Three
            </TabItem>
            <TabItem>
                More <span className="mcds-tab-right-small__icon mcds-icon__triangle-small" />
            </TabItem>

            <TabContent className="mcds-tab__active">
                Item Three Content
            </TabContent>
            <TabContent>
                Item Three Content
            </TabContent>
            <TabContent>
                Item Three Content
            </TabContent>
        </Tab>
    </div>
);

const Scoped = (
    <div className="mcds-container">
        <Tab className="mcds-tab__scoped">
            <TabItem>
                Item Tow
            </TabItem>
            <TabItem className="mcds-scoped__active">
                Item Three
            </TabItem>
            <TabItem >
                Item Three
            </TabItem>
            <TabItem>
                Item Three
            </TabItem>
            <TabContent className="mcds-content__scoped mcds-scoped__active">
                Item Three Content
            </TabContent>
        </Tab>
    </div>
);

const ElementScoped = (
    <div className="mcds-container">
        <Tab className="mcds-tab__default">
            <TabItem className="mcds-tab__active">
               Item One
            </TabItem>
            <TabItem>
                Item Tow
            </TabItem>
            <TabItem>
                Item Three
            </TabItem>

            <TabContent className="mcds-tab-scoped__padding mcds-tab__active">
                <Tab className="mcds-tab__scoped">
                    <TabItem>
                        Item Tow
                    </TabItem>
                    <TabItem className="mcds-scoped__active">
                        Item Three
                    </TabItem>
                    <TabItem>
                        Item Three
                    </TabItem>
                    <TabItem>
                        Item Three
                    </TabItem>
                    <TabContent className="mcds-content__scoped mcds-scoped__active">
                        Item Three Content
                    </TabContent>
                </Tab>
            </TabContent>

        </Tab>
    </div>
);

class TabChange extends React.Component {
    constructor() {
        super();
        this.state = {
            index: 2
        };
    }
    changeItem(i){
        this.setState({index: i});
    }
    render() {
        return (
            <Tab className="mcds-tab__default">
                <TabItem className={classnames(this.state.index === 1 ? 'mcds-tab__active' : null )} onClick={this.changeItem.bind(this, 1)}>
                    <span className="mcds-tab-left__icon mcds-icon__open-folder" />
                    Item One
                    <span className="mcds-tab-right__icon mcds-icon__close-medium" />
                </TabItem>
                <TabItem className={classnames(this.state.index === 2 ? 'mcds-tab__active' : null )} onClick={this.changeItem.bind(this, 2)}>
                    <span className="mcds-tab-left__icon mcds-icon__open-folder" />
                    Item Tow
                    <span className="mcds-tab-right-small__icon mcds-icon-default__color mcds-icon__triangle-small" />
                    <span className="mcds-tab-right__icon mcds-icon-default__color mcds-icon__close-medium" />
                </TabItem>
                <TabItem className={classnames(this.state.index === 3 ? 'mcds-tab__active' : null )} onClick={this.changeItem.bind(this, 3)}>
                    Item Three
                </TabItem>
                <TabItem className={classnames(this.state.index === 4 ? 'mcds-tab__active' : null )} onClick={this.changeItem.bind(this, 4)}>
                    More <span className="mcds-tab-right-small__icon mcds-icon__triangle-small" />
                </TabItem>

                <TabContent className={classnames(this.state.index === 1 ? 'mcds-tab__active' : null )}>
                    Item One Content
                </TabContent>
                <TabContent className={classnames(this.state.index === 2 ? 'mcds-tab__active' : null )}>
                    Item Tow Content
                </TabContent>
                <TabContent className={classnames(this.state.index === 3 ? 'mcds-tab__active' : null )}>
                    Item Three Content
                </TabContent>
                <TabContent className={classnames(this.state.index === 4 ? 'mcds-tab__active' : null )}>
                    Item More Content
                </TabContent>
            </Tab>
        );
    }
}

const TabChangeDemo = `
class TabChange extends React.Component {
    constructor() {
        super();
        this.state = {
            index: 2
        }
    }
    changeItem(i){
        this.setState({index: i});
    }
    render() {
        return (
            <Tab className="mcds-tab__default">
                <TabItem className={classnames(this.state.index === 1 ? 'mcds-tab__active' : null )} onClick={this.changeItem.bind(this,1)}>
                    <span className="mcds-tab-left__icon mcds-icon__open-folder" />
                    Item One
                    <span className="mcds-tab-right__icon mcds-icon__close-medium" />
                </TabItem>
                <TabItem className={classnames(this.state.index === 2 ? 'mcds-tab__active' : null )} onClick={this.changeItem.bind(this,2)}>
                    <span className="mcds-tab-left__icon mcds-icon__open-folder" />
                    Item Tow
                    <span className="mcds-tab-right-small__icon mcds-icon-default__color mcds-icon__triangle-small" />
                    <span className="mcds-tab-right__icon mcds-icon-default__color mcds-icon__close-medium" />
                </TabItem>
                <TabItem className={classnames(this.state.index === 3 ? 'mcds-tab__active' : null )} onClick={this.changeItem.bind(this,3)}>
                    Item Three
                </TabItem>
                <TabItem className={classnames(this.state.index === 4 ? 'mcds-tab__active' : null )} onClick={this.changeItem.bind(this,4)}>
                    More <span className="mcds-tab-right-small__icon mcds-icon__triangle-small" />
                </TabItem>

                <TabContent className={classnames(this.state.index === 1 ? 'mcds-tab__active' : null )}>
                    Item One Content
                </TabContent>
                <TabContent className={classnames(this.state.index === 2 ? 'mcds-tab__active' : null )}>
                    Item Tow Content
                </TabContent>
                <TabContent className={classnames(this.state.index === 3 ? 'mcds-tab__active' : null )}>
                    Item Three Content
                </TabContent>
                <TabContent className={classnames(this.state.index === 4 ? 'mcds-tab__active' : null )}>
                    Item More Content
                </TabContent>
            </Tab>
        );
    }
}`;


export default [
    {
        id: 'Tabs',
        element,
        intro: <ReactMarkdown className="markdown" source={'#### Tab 有两种样式\r\n* 一种为 mcds-tab__default 另一种mcds-tab__scoped\r\n* mcds-tab__default 选中样式为mcds-tab__active\r\n* mcds-tab__scoped 选中样式为mcds-scoped__active\r\n* mcds-tab__scoped TabContent需要加类名 mcds-content__scoped\r\n* TabItem 与 TabContent的关系可以使一对多，也可以是一对一\r\n\r\n'} />
    },
    {
        id: 'TabChangeDemo',
        element: <TabChange />,
        code: TabChangeDemo,
        intro: <ReactMarkdown className="markdown" source={'#### 点击切换Demo'} />
    },
    {
        id: 'Scoped',
        element: Scoped
    },
    {
        id: 'elementScoped',
        element: ElementScoped
    }
];
