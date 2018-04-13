import React, {Component} from 'react';
import Main from './main';
import Sidebar from './sidebar';
import MarkdownEditor from './markdown';

export default class app extends Component {

    _renderHeader() {
        return (
            <header id="header">
                <div className="title">Meiqia UI Design System</div>
            </header>
        );
    }

    render() {
        return (
            <div>
                {this._renderHeader()}
                <Main />
                <Sidebar />
                <MarkdownEditor />
            </div>
        );
    }
}
