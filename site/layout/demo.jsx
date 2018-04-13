/* eslint-disable */
import React from 'react';
import classnames from 'classnames';
import {notify,Button} from '../../src';

const Demo = props => 
    <section {...props} className="component">
        {props.children}
    </section>

const DemoHeader = props => <h1>{props.children}</h1>;

const DemoExample = props => {
    return (
        <div className='example' id={props.id}>
            {props.children}
            <a className='toggle' onClick={() => {
               props.toggle();
            }}>show/hide</a>
        </div>);
}
const DemoItem = props => <h3 className='h3'>{props.children}</h3>;

const DemoCode = props => 
    <div className="example-code">
        <Button className="mcds-button__brand" onClick={copyCode}>复制代码</Button>
        {props.children}
    </div>;

function copyCode(e) {
    let current = e.currentTarget;

    let parent  = current.parentElement;

    let textarea = parent.querySelector('textarea');

    textarea.select();
    document.execCommand("Copy"); // 执行浏览器复制命令
    notify.show('代码复制完成');
}

class DemoBlock extends React.Component {
    
    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.state = {
            show : false
        }
    }

    toggle(state = this.state) {
        this.setState({show:!state.show})
    }

    render(props = this.props) {
        let childrens = [];
        let showCode = this.state.show;
        React.Children.forEach(props.children,(child,index) => {
            childrens.push(React.cloneElement(child, {key:index, toggle: this.toggle }));
        })
        return (
            <div {...props} className={classnames('example-block',{
                'show-code':showCode
            })}>
                {childrens}
            </div>
        );
    }
}
export default {
    Demo,
    DemoHeader,
    DemoBlock,
    DemoItem,
    DemoExample,
    DemoCode
}