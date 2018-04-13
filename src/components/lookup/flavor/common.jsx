import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
    DropDown,
    DropDownTrigger,
    DropDownList,
    DropDownItem
} from '../../dropdown';

import {
    Input
} from '../../form';

const Single = 'single';
const Multi = 'multi';
const emptyDefault = <div> empty </div>;

const buildObejctName = (param) => {
    if (typeof param === 'string') {
        return param;
    }

    if (_.isArray(param)) {
        return param[0].value;
    }
};

export default class Lookup extends React.Component {
    static defaultProps = {
        objectList: [],
        onKeyDown: () => {}
    }
    constructor(props) {
        super(props);
        let { valueStack, objectStack } = this.buildState(true, props);
        let objName = buildObejctName(props.objectList || props.objName);
        this.state = {
            objName,
            valueStack,
            active: false, // 组件是否处于编辑的状态
            searchListOpen: false, // 搜索的下拉是否处理激活的状态
            data: props.data,
            objectStack
        };
        this.handleOutsideMouseClick = this.handleOutsideMouseClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mouseup', this.handleOutsideMouseClick);
        document.addEventListener('touchstart', this.handleOutsideMouseClick);
    }

    componentWillReceiveProps(nextProps) {
        let oldData = this.state.data;
        let newData = nextProps.data;
        if (!_.isEqual(oldData, newData)) {
            this.setState({data: newData});
        }

        if (!_.isEqual(nextProps.value, this.props.value)) {
            let { valueStack, objectStack } = this.buildState(false, nextProps);
            this.setState({
                valueStack,
                objectStack
            });
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mouseup', this.handleOutsideMouseClick);
        document.removeEventListener('touchstart', this.handleOutsideMouseClick);
    }

    buildState(init = false, props = this.props) {
        let { defaultValue, value } = props;

        if (!init || !_.isUndefined([value])) {
            defaultValue = value || [];
        }
        let valueStack = new Set();
        let objectStack  = {};

        _.map(defaultValue, v => {
            if (v && v.id) {
                valueStack.add(v.id);
                objectStack[v.id] = v;
            }
        });
        return {
            valueStack,
            objectStack
        };
    }

    // 下拉数据开关的控制
    searchListTrigger(open = false) {
        let trigger = this.refs.searchListTrigger;
        if (open) {
            trigger.open();
        } else {
            trigger.close();
        }
    }

    handleSearchListTriggerState(searchListOpen = false) {
        this.setState({searchListOpen});
        // 当下拉展示的时候,显示左侧的对象列表
        if (searchListOpen) {
            this.setState({active: true});
        }
    }

    handleObjectListTriggerState(objectListOpen = false){
        this.setState({objectListOpen});
        if (objectListOpen) {
            this.setState({active: true});
        }
    }

    handleOnChange() {
        let { valueStack, objectStack, objName } = this.state;
        let result = [];
        let setObj = valueStack;

        for (let item of setObj.values()) {
            result.push(item);
        }

        this.props.onChange({objName, result, objectStack});
    }

    handleOutsideMouseClick(e) {
        if (!this.state.searchListOpen || !this.state.active) { return; }
        const root = this.refs.searchList;
        if (root.contains(e.target) || (e.button && e.button !== 0)) { return; }
        e.stopPropagation();
        this.searchListTrigger(false);
        this.setState({active: false});
    }

    // 搜索列表内容点击事件
    handleSearchListClick(id) {
        let { valueStack, objectStack, data } = this.state;
        let { type } = this.props;
        if (valueStack.has(id)) {
            return false;
        }

        if (type === Single) {
            valueStack = new Set();
            objectStack = {};
            objectStack[id] = _.find(data, v => {
                return v.id === id;
            });
            valueStack = valueStack.add(id);
        }
        if (type === Multi) {
            valueStack = valueStack.add(id);
            objectStack[id] = _.find(data, v => {
                return v.id === id;
            });
        }

        this.setState({
            valueStack,
            objectStack
        }, () => {
            this.handleOnChange();
        });
    }

    // 对象列表触发图标的fclick事件
    handleObjectListTriggerClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.searchListTrigger(false);
    }

    // 搜索框按键
    handleSearchKeydown(e){
        let result = {};
        result.event = e;
        result.value = e.target.value;
        result.objName = this.state.objName;

        e.stopPropagation();
        this.props.onKeyDown(result);
    }
    // 搜索框得到焦点
    handleSearchOnFocuse(e){
        e.preventDefault();
        e.stopPropagation();
        this.refs.searchListTrigger.open();
    }

    // 删除已选中数据
    handleSelectItemClose(id, e) {
        e.stopPropagation();
        let { valueStack, objectStack } = this.state;
        if (!valueStack.delete(id)){
            return false;
        }

        delete objectStack[id];

        this.setState({
            valueStack,
            objectStack
        }, () => {
            this.handleOnChange();
        });
    }


    renderSeachListCell({avatar, name, id}) {
        return (
            <DropDownItem key={id} onClick={this.handleSearchListClick.bind(this, id)}>
                <div className="mcds-tile mcds-media" >
                    <div className={classnames('mcds-media__figure', {hide: !avatar})}>
                        <span className="mcds-avatar mcds-avatar__medium mcds-avatar__circle mcds-lookup__avatar">
                            <img src={avatar} />
                        </span>
                    </div>
                    <div className="mcds-media__body mcds-tile__detail">
                        <h3 className="mcds-truncate mcds-tile__head mcds-text__default mcds-text__size-12" title="title">
                            {name}
                        </h3>
                        <div className="mcds-tile__detail">
                            <ul className="mcds-tile__detail-list">
                                <li className="mcds-tile__item mcds-tile__detail-weak mcds-text__weak mcds-truncate">{name}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </DropDownItem>
        );
    }
    renderSelectItemsOnInput() {
        return this._renderSelectItems();
    }
    renderSelectItemsOnInputBottom(){
        let items = this._renderSelectItems();

        if (!items) {
            return null;
        }

        return (
            <div className="mcds-media mcds-divider__top mcds-lookup__row mcds-p__l-5" >
                {items}
            </div>
        );
    }
    _renderSelectItems() {
        let { valueStack } = this.state;
        let { type } = this.props;
        let data = this.state.objectStack;

        if (valueStack.size === 0) {
            return null;
        }
        let items = [];
        for (let i of valueStack) {
            let item = _.find(data, v => v && v.id === i);

            if (item) {
                items.push(
                    <li key={i} className="mcds-list__item mcds-lookup__item mcds-m__r-5">
                        <div className="mcds-media" >
                            {
                                item.avatar ? <div className="mcds-media__figure mcds-avatar mcds-avatar__size-18 mcds-lookup__avatar">
                                    <img src={item.avatar} />
                                </div> : null
                             }
                            <div className="mcds-media__body mcds-truncate">
                                {item.name || item.Name}
                            </div>
                            <div className="mcds-lookup__close mcds-m__l-5">
                                <div onClick={this.handleSelectItemClose.bind(this, i)} className="mcds-icon__container mcds-icon__container-14 mcds-icon__container-noborder mcds-m__t-3">
                                    <span className="mcds-icon__close-line-20" />
                                </div>
                            </div>
                        </div>
                    </li>
                );
            }
        }
        return (
            <ul className={classnames('mcds-list mcds-list__horizontal mcds-lookup__row-list', {'mcds-lookup__single': type === Single})} >
                {items}
            </ul>
        );
    }
    renderSearchList() {
        let { data } = this.state;
        let { empty } = this.props;
        let items = [];
        _.map(data, (v) => {
            items.push(this.renderSeachListCell(v));
        });

        if (items && items.length === 0) {
            items = empty;
        }

        return (
            <DropDownList>
                {items}
            </DropDownList>
        );
    }

    render() {
        let { searchListOpen, valueStack, active } = this.state;
        let { type, error } = this.props;
        let wrapClass = classnames({'mcds-lookup__active': active});
        let inputClassName = classnames('mcds-layout__item', {hide: valueStack.size && type === Single && !searchListOpen});

        let placeholder = this.props.placeholder;
        return (
            <div ref="searchList" className={wrapClass}>
                <DropDownTrigger
                    target="body"
                    synchWidth={true}
                    className="mcds-lookup"
                    ref="searchListTrigger"
                    placement="bottom-right"
                    closeOnOutsideClick={false}
                    onOpen={this.handleSearchListTriggerState.bind(this, true)}
                    onClose={this.handleSearchListTriggerState.bind(this, false)} >
                    <div>
                        <div ref="looup_div" tabIndex="0" className={classnames('mcds-layout__column mcds-p__t-4 mcds-p__l-4 mcds-p__r-4 mcds-p__b-4 mcds-lookup__row', {'mcds-element__border': error})}>
                            <Input
                                active={this.props.active}
                                className={inputClassName}
                                autoComplete="off"
                                type="text"
                                iconRight={<span className="mcds-icon__search-line-20" />}
                                placeholder={placeholder}
                                onClick={::this.handleSearchOnFocuse}
                                onKeyUp={::this.handleSearchKeydown} />
                            {!searchListOpen ? this.renderSelectItemsOnInput() : null}
                        </div>
                        { /* searchListOpen ? this.renderSelectItemsOnInputBottom() : null */ }
                    </div>
                    <DropDown className="mcds-lookup__list">
                        {this.renderSearchList()}
                    </DropDown>
                </DropDownTrigger>
            </div>
        );
    }
}

Lookup.propTypes = {
    onKeyDown: PropTypes.func,
    onChange: PropTypes.func,
    type: PropTypes.oneOf([Single, Multi]),     // 单选或者多选,默认为单选
    placeholder: PropTypes.string,
    objName: PropTypes.string,
    className: PropTypes.string,
    data: PropTypes.array,
    defaultValue: PropTypes.array,              // 初始化默认的值,只使用一次
    value: PropTypes.array,                     // 一直可以更新变化的值
    objectList: PropTypes.array,
    error: PropTypes.bool,
    empty: PropTypes.element,
    active: PropTypes.bool
};

Lookup.defaultProps = {
    onChange: ()=> {},
    defaultValue: [],
    type: 'single',
    placeholder: 'placeholder',
    empty: emptyDefault
};


