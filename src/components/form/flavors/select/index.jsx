import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
    DropDown,
    DropDownTrigger,
    DropDownList,
    DropDownItem
    } from '../../../dropdown';

const isAvailable = param => {
    let isUnavailable =  _.isNull(param) || _.isUndefined(param);
    return !isUnavailable;
};


class Select extends React.Component {
    constructor(props){
        super(props);
        // 这里干掉buildDate是考虑到效率问题,每次build挺慢的
        this.state = {
            // 不要在这里加入data.更新问题会很多
            display: 'none',
            defaultValue: isAvailable(this.props.value) ? this.getDefaultValue(this.props.value) : '请选择',
            value: typeof(this.props.value) !== 'undefined' ? this.props.value : '-1'
        };
    }

    componentDidMount() {
        this.mounted = true;
        let {active} = this.props;
        if (active === true && this.refs.select__wrap) {
            this.refs.select__wrap.focus();
        }
    }

    componentWillReceiveProps(nextProps) {
        // 干掉的原因,是为了select 显示的内容并非是option显示的内容,
        let defaultValue = typeof(nextProps.value) !== 'undefined' ? nextProps.value : '请选择';
        // if (defaultValue == this.state.defaultValue) {
        this.setState({defaultValue});
        // }
    }

    componentWillUnmount() {
        this.mounted = false;
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
        if (this.mounted) {
            this.setState({
                defaultValue: obj.props.children,
                value: obj.props.value || obj.props.children
            });
            let select = this.refs.select;
            if (select && select.close) {
                this.refs.select.close();
            }
        }
        this.props.onChange(obj.props.value || obj.props.children);
    }

    buildOptions() {
        let options = [];
        React.Children.forEach(this.props.children, (v, index) => {
            let isSelected = v.props.value === this.state.value;
            if (typeof v.props.value === 'undefined') {
                // 如果没有传入value的话.用children去做判断
                isSelected = String(v.props.children) === String(this.state.value);
            }
            let tmp = <DropDownItem isSelected={isSelected} onClick={this._handleOnChick.bind(this, v)} className="close" key={index} iconLeft={isSelected ? CheckBox : CheckBoxPlace}>{v.props.children}</DropDownItem>;
            options.push(tmp);
        });

        return (
            <DropDown className={classnames('mcds-select__options')}>
                <DropDownList>
                    {options}
                </DropDownList>
            </DropDown>
        );
    }
    renderDisable() {
        return (
            <div className="mcds-select__wrap mcds-select__disabled">
                {this.state.defaultValue}
            </div>
        );
    }
    render() {
        let options = this.buildOptions();
        let { placement, target, error } = this.props;
        const requiredSpan = this.props.required ? <span className="mcds-span__required">*</span> : null;
        const selectLabel = this.props.label ? <label className="mcds-label" htmlFor={this.props.id}>{this.props.label}</label> : null;
        return (
            <div className={classnames('mcds-element__container', this.props.className)} ref={(node) => { this.node = node; }}>
                {requiredSpan} { selectLabel }
                {
                    this.props.disabled ? this.renderDisable() : <DropDownTrigger
                        ref="select"
                        target={target}
                        offset={5}
                        synchWidth={true}
                        placement={placement}
                        className={classnames('mcds-select__control', {'mcds-element__border': error})} >
                        <div ref="select__wrap" tabIndex="0" className="mcds-select__wrap">
                            {this.state.defaultValue}
                        </div>
                        {options}
                    </DropDownTrigger>
                }
            </div>
        );
    }
}

Select.propTypes = {
    id: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    target: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    placement: PropTypes.string,
    children: PropTypes.any,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    error: PropTypes.bool,
    active: PropTypes.bool
};
// const iconLeft = <span className="mcds-icon__left mcds-icon__check-mark-small" />;
const CheckBox = <span className="mcds-icon__left mcds-icon__checked mcds-dropdown__checkbox mcds-icon__check-12" />;
const CheckBoxPlace = <span className="mcds-icon__left mcds-icon__checked mcds-dropdown__checkbox mcds-dropdown__checkbox-place" />;

Select.defaultProps = {
    target: 'body',
    onChange: () => {},
    placement: 'bottom-right'
};

export default Select;

