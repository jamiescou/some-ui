/* eslint-disable */
import React, {Component} from 'react'
import classnames from 'classnames';
import {notify} from '../../src';
export default class main extends Component {
    constructor(props) {
      super(props);
      // console.log("notify",notify);
      this.state = {
        show:false,
        value: ''
      }
    }
    copy() {
        let _markdown = document.getElementById('markdown-editor-area');
        let _markdowntmp = document.getElementById('_markdown-editor-area');

        let markdown = JSON.stringify(_markdown.value.replace(/\n/g,"\r\n"));
        markdown = markdown.replace(/^["]/,"'"); 
        markdown = markdown.replace(/["]$/,"'"); 
        _markdowntmp.value = markdown;
        let copy  =document.getElementById("_markdown-editor-area");
         copy.select(); // 选择对象
         document.execCommand("Copy"); // 执行浏览器复制命令
         notify.add({message:'已复制好，可贴粘。'});
    }
    toggle() {
      this.setState({
        show:!this.state.show
      })
    }

    changeCode() {
      let _markdown = document.getElementById('markdown-editor-area');
      this.setState({value:_markdown.value})
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    render() {
        return (
            <div id="markdown-editor">
                <p onClick={this.toggle.bind(this)}>markdown编译器</p>
                <div className={classnames('editor',{active:this.state.show})}>
                    <textarea value={this.state.value} onChange={this.handleChange.bind(this)} id='markdown-editor-area' />
                    <input type='text' id='_markdown-editor-area' style={{width:'1px',height:'1px',opacity:'0'}} />
                   <button onClick={this.copy.bind(this)}>复制到粘贴板</button>
                </div>
              
            </div>
        );
    }
}