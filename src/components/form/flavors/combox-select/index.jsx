/**
 * 相当于select组件的衍生版.样式存放在select/css
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
    DropDown,
    DropDownTrigger,
    DropDownList,
    DropDownItem
    } from '../../../dropdown';

import { Input } from '../input/index';

class ComboxSelect extends React.Component {
    constructor(props){
        super(props);
        // 这里干掉buildDate是考虑到效率问题,每次build挺慢的
        this.state = {
            // 不要在这里加入data.更新问题会很多
            display: 'none',
            defaultValue: '',
            value: typeof(this.props.value) !== 'undefined' ? this.props.value : '-1',
            searchData: this.props.children,
            open: false
        };
        // 用来获取编辑的值.
        this.getValue = this.getValue.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // 干掉的原因,是为了select 显示的内容并非是option显示的内容,
        let defaultValue = typeof(nextProps.value) !== 'undefined' ? nextProps.value : '请选择';
        // if (defaultValue == this.state.defaultValue) {
        this.setState({defaultValue});
        // }
    }


    getValue() {
        let { value, defaultValue } = this.state;
        let result = {};
        result.value = value;
        result.text = defaultValue;
        return result;
    }
     /**
     * 用来计算显示出来的文字 .
     * if defaultValue in children
     * value = child
     * else
     * value = props.defaultValue
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    getDefaultValue(defaultValue) {
        let child ;
        React.Children.forEach(this.props.children, (v) => {
            if (v.props.value === defaultValue) {
                child = v.props.children;
            }
        });
        if (!child) {
            child = defaultValue;
        }
        return child;
    }

    _handleOnChick(obj) {
        this.setState({
            defaultValue: obj.props.children,
            value: obj.props.value || obj.props.children
        });
        this.refs.select.close();
        this.props.onChange(obj.props.value || obj.props.children);
    }

    buildOptions(curVal) {
        let options = [];
        let children = Array.from(this.state.searchData);
        if (curVal) {
            children.length = 0;
            React.Children.forEach(this.props.children, v => {
                let reg = new RegExp(curVal, 'ig');
                if (reg.test(v.props.children)) {
                    children.push(v);
                }
            });
        } else {
            children = this.props.children;
        }
        React.Children.forEach(children, (v, index) => {
            let isSelected = v.props.value === this.state.value;
            if (typeof v.props.value === 'undefined') {
                // 如果没有传入value的话.用children去做判断
                isSelected = String(v.props.children) === String(this.state.value);
            }
            let tmp = <DropDownItem isSelected={isSelected} onClick={this._handleOnChick.bind(this, v)} key={index}>{v.props.children}</DropDownItem>;
            options.push(tmp);
        });

        let content = null;
        if (options.length === 0) {
            content = <span className="mcds-select__not-found">Not Found</span>;
        } else {
            content = <DropDownList>{options}</DropDownList>;
        }

        return (
            <DropDown className={classnames('mcds-select__options')}>
                {content}
            </DropDown>
        );
    }

    handleChange(val) {
        if (this.state.open) {
            this.setState({
                defaultValue: val,
                value: val
            });
        } else {
            this.refs.select.open();
            this.setState({
                defaultValue: val,
                value: val
            });
        }
    }
    renderDisable() {
        let { disabled = false } = this.props;
        if (disabled) {
            return <Input disabled={true} className="mcds-select__disabled" iconRight={<span className="mcds-icon__updown-triangles-solid-14" />} placeholder={this.props.placeholder} />;
        }
    }
    render() {
        let options = this.buildOptions(this.state.defaultValue);
        let { disabled, error } = this.props;
        const requiredSpan = this.props.required ? <span className="mcds-span__required">*</span> : null;
        const selectLabel = this.props.label ? <label className="mcds-label" htmlFor={this.props.id}>{this.props.label}</label> : null;
        return (
            <div className={classnames('mcds-element__container', this.props.className, {'mcds-input__border': error})} ref={(node) => { this.node = node; }}>
                {requiredSpan} { selectLabel }
                {
                    disabled ? this.renderDisable() : <DropDownTrigger
                        onOpen={() => {
                            this.setState({
                                open: true
                            });
                        }}
                        onClose={() => {
                            this.setState({
                                open: false
                            });
                        }}
                        target="body"
                        synchWidth={true}
                        ref="select"
                        className="mcds-select__control">
                        <Input iconRight={<span className="mcds-icon__updown-triangles-solid-14" />} placeholder={this.props.placeholder} value={this.state.defaultValue} onChange={this.handleChange.bind(this)} />
                        {options}
                    </DropDownTrigger>
                }
            </div>
        );
    }
}

ComboxSelect.propTypes = {
    id: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    label: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    children: PropTypes.any,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    error: PropTypes.bool
};

ComboxSelect.defaultProps = {
    onChange: () => {},
    placeHolder: '请选择'
};

export default ComboxSelect;

