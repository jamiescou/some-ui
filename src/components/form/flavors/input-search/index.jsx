import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Input extends Component {
    static propTypes = {
        label: PropTypes.string,
        name: PropTypes.string.isRequired,
        search: PropTypes.oneOf([
            'left', 'right'
        ]),
        clear: PropTypes.oneOf([
            'right'
        ]),
        className: PropTypes.string,
        placeholder: PropTypes.string,
        iconClass: PropTypes.string,
        searchCallback: PropTypes.func,
        onClickCallback: PropTypes.func,
        error: PropTypes.bool
    }
    static defaultProps = {
        name: 'name',
        search: null,
        clear: null,
        searchCallback: () => {},
        onClickCallback: () => {}
    }

    handleSearchClick(e){
        this.props.onClickCallback(e);
    }
    handleSearchChange(){
        this.inputNode.focus();
        this.props.searchCallback(this.inputNode.value);
    }

    clearClick(){
        this.inputNode.value = '';
    }

    render(){
        let { error, search, clear, searchCallback, onClickCallback, ...others } = this.props;
        const inputClassName = search === 'left' ? 'mcds-left__search' : 'mcds-input';
        const clearClassName = clear ? <span className="mcds-clear__right" onClick={::this.clearClick}><i className="mcds-icon__white mcds-icon__clear-solid-14" /></span> : null;
        // 用来关闭浏览器默认的提示信息.TODO 其他的input是否以后要加上
        return (
            <div className={classnames('mcds-input__container', this.props.className, {'mcds-input__border': error})}>
                { this.props.label ? <label className="mcds-label">{this.props.label}</label> : null }
                <div className="mcds-form__control">
                    <input
                        {...others}
                        className={inputClassName}
                        autoComplete="off"
                        ref={(inputNode) => { this.inputNode = inputNode; }}
                        name={this.props.name}
                        type="text"
                        onChange={::this.handleSearchChange}
                        placeholder={this.props.placeholder} />
                    <span className={`mcds-search__${this.props.search}`} onClick={::this.handleSearchClick}><i className={classnames(this.props.iconClass ? this.props.iconClass : 'mcds-icon__search-line-20')} /></span>{clearClassName}
                </div>
            </div>
        );
    }
}
