import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// import {Button} from '../../../buttons/index';
// import {Menu, MenuList, MenuItem} from '../base/index';
import {
    DropDown,
    DropDownList,
    DropDownItem
} from '../../../dropdown';

const MenuWidth = 130;
// 每级菜单左||右偏移量
const MenuOffsetLeft = 12;
// 每级菜单上偏移
const MenuOffsetTop = 32;

const buildStyle = (path = [], width = MenuWidth) => {
    let marginTop = 0;
    let marginLeft = 0;
    let left = 0;

    path.forEach(v => {
        // console.log('v', v);
        marginTop += v.index * MenuOffsetTop + 5 - v.scrollTop;
        switch (v.direction) {
        case 'left':
            marginLeft += MenuOffsetLeft;
            left -= MenuWidth;
            break;
        case 'right':
            marginLeft -= MenuOffsetLeft;
            left += MenuWidth;
            break;
        default:
            marginLeft -= MenuOffsetLeft;
            left += MenuWidth;
        }
    });

    return {
        width,
        marginTop,
        marginLeft,
        left,
        position: 'absolute'
    };
};

const Path = {
    addPath: (path = [], index, level, scrollTop) => {
        path.push({level, index, scrollTop});
        return path;
    },
    // 退回到同一层的路径的上一个节点
    back: (path =[], index, level) => {
        let start = 0;
        let end;
        for (let i = 0; i < path.length; i++) {
            if (path[i].level === level) {
                end = i;
            }
        }
        let newPath = path.slice(start, end);
        return newPath;
    }
};

const getCoordinates = (visualPos) => {
    // 四个顶点的坐标
    let result = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        x3: 0,
        y3: 0,
        x4: 0,
        y4: 0
    };
    result.x1 = visualPos.left;
    result.y1 = visualPos.top;

    result.x2 = visualPos.left + visualPos.width;
    result.y2 = visualPos.top;

    result.x3 = visualPos.left + visualPos.width;
    result.y3 = visualPos.top + visualPos.height;

    result.x4 = visualPos.left;
    result.y4 = visualPos.top + visualPos.height;
    return result;
};

// checked有二种 true false;
export default class MultiSelect extends React.Component {
    constructor(props) {
        super(props);
        let data = this.buildDate(props.data, props.defaultValue);
        this.state = {
            data,
            select: props.defaultValue,
            path: []                   // 交互中展示的路径
        };
        this.onMouseClick = this.onMouseClick.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        document.addEventListener('scroll', this._onScroll.bind(this), true);
    }
    componentWillReceiveProps(props) {
        let data = this.buildDate(props.data, props.defaultValue);
        this.setState({data, defaultValue: props.defaultValue});
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', this._onScroll.bind(this));
    }
    _onScroll() {
        if (this.refs.menus) {
            this.buildMenu();
        }
        return false;
    }
    // 构建级联关系数据
    buildDate(originDate, select) {
        let data = _.cloneDeep(originDate);
        let loop = (_data, _p) => {
            _data.forEach(d => {
                d.parent = _p;
                d.checked = select && select.indexOf ? select.indexOf(d.value) > -1 : false;
                d.all = true; // 是否全选
                if (d.children) {
                    loop(d.children, d);
                }
            });
        };
        loop(data, null);
        this.buildInitCheck(data);
        return data;
    }
    checkAllChildren(data, checked) {
        let loop = _data => {
            _data.forEach(_d => {
                _d.checked = !!checked;
                _d.all = !!checked ? true : false;
                if (_d.children) {
                    loop(_d.children);
                }
            });
        };
        if (data.children) {
            loop(data.children);
        }
    }
    buildInitCheck(data) {
        let loop = _data => {
            _data.forEach(_d => {
                if (_d.checked) {
                    this.checkAllChildren(_d, true);
                } else if (_d.children) {
                    loop(_d.children);
                }
            });
        };
        loop(data);
        this.syncCheckedToParent(data);
    }

    syncCheckedToParent(data) {
        let loop = _data => {
            _data.forEach(_d => {
                if (_d.children) {
                    loop(_d.children);
                } else {
                    this.checkParent(_d);
                }
            });
        };
        loop(data);
    }

    checkParent(data) {
        if (data.parent) {
            let parentChildren = data.parent.children;
            let parentChildCheckeds = parentChildren.filter(v => v.checked === true);
            if (parentChildCheckeds.length === parentChildren.length) {
                data.parent.all = true;
                data.parent.checked = true;
            } else if (parentChildCheckeds.length === 0) {
                data.parent.all = false;
                data.parent.checked = false;
            } else {
                data.parent.all = false;
                data.parent.checked = true;
            }
            this.checkParent(data.parent);
        }
    }

    onMouseClick(e, item) {
        e.stopPropagation();
        e.preventDefault();
        item.checked = !item.checked;
        item.all = item.checked ? true : false;
        this.checkAllChildren(item, item.checked);
        this.checkParent(item);
        this.setState({data: this.state.data});
        setTimeout(this._onChange.bind(this), 1);
    }
    handleOnMouseOver(item, pathIndex, level, e) {
        let { path } = this.state;
        let ulNode =  e.currentTarget.parentElement;
        path = Path.back(path, pathIndex, level);
        path = Path.addPath(path, pathIndex, level, ulNode.scrollTop);

        this.setState({path});
    }
    buildMenu(arrayDate = this.state.data) {
        let { path } = this.state;

        let menu = (data, level, style) => {
            let items = data.map((_data, index) => {
                let iconLeft;
                if (_data.checked === true) {
                    iconLeft = _data.all ? CheckBox : CheckBoxPart;
                } else {
                    iconLeft = CheckBoxPlace;
                }
                return (
                    <DropDownItem
                        iconLeft={iconLeft}
                        iconRight={_data.children ? TableIconRight : null }
                        onClick={(e) => { this.onMouseClick(e, _data); }}
                        onMouseOver={this.handleOnMouseOver.bind(this, _data, index, level)}
                        key={index}
                        children={_data.name} />
                );
            });
            return (
                <DropDown className="mcds-select__single open" key={level} style={style}>
                    <DropDownList>
                        {items}
                    </DropDownList>
                </DropDown>
            );
        };
        let menus = [menu(arrayDate, 0)];
        path.forEach((v, index) => {
            let hierarchyArray = _.clone(path).slice(0, index + 1);
            let findChildren = (data, array) => {
                let result = data;
                array.forEach((p) => {
                    result = result[p.index].children;
                });
                return result;
            };

            let children = findChildren(arrayDate, hierarchyArray);
            if (children) {
                let newDir = this._getNewDir(index, hierarchyArray);
                hierarchyArray[index].direction = newDir;
                let menuNode = menu(children, index + 1, buildStyle(hierarchyArray));
                menus.push(menuNode);
            }
        });
        return menus;

    }
    _getNewDir(index, hierarchyArray) {
        let { placement } = this.props;
        let body = document.body;
        let menuEle = this.refs.menu;
        let bodyRect = body.getBoundingClientRect();
        let menuRect = menuEle.getBoundingClientRect();
        let getMenuPos = getCoordinates(menuRect);
        let menuChildren = menuEle.children[index];
        let menuChildrenRect = menuChildren.getBoundingClientRect();
        let getPos = getCoordinates(menuChildrenRect);
        let newDir = placement;
        if (index === 0) {
            if (placement === 'right') {
                if (getMenuPos.x2 + MenuWidth - MenuOffsetLeft > bodyRect.width) {
                    newDir = 'left';
                }
            } else if (placement === 'left') {
                if (getMenuPos.x1 - MenuWidth + MenuOffsetLeft < 0){
                    newDir = 'right';
                }
            }
        } else if (hierarchyArray[index-1].direction === 'right') {
            if (getPos.x2 + MenuWidth - MenuOffsetLeft > bodyRect.width) {
                newDir = 'left';
            } else {
                newDir = 'right';
            }
        } else if (hierarchyArray[index-1].direction === 'left') {
            if (getPos.x1 - MenuWidth + MenuOffsetLeft < 0){
                newDir = 'right';
            } else {
                newDir = 'left';
            }
        }
        return newDir;
    }
    _onChange() {
        let selectedArray = [];
        // 遍历最底层孩子节点.找到 checked= true的值
        let loop = (_data) => {
            _data.forEach(v => {
                if (v.children) {
                    loop(v.children);
                } else if (v.checked === true) {
                    selectedArray.push(v.value);
                }
            });
        };
        loop(this.state.data, selectedArray);
        this.props.onChange(selectedArray);
    }
    _cancle() {
        this.props.closePortal();
    }
    render() {
        let menu = this.buildMenu();
        let { className } = this.props;
        return <div className={classnames('mcds-select__root', className)} children={menu} ref="menu" />;
    }
}
MultiSelect.propTypes = {
    data: PropTypes.array.isRequired,
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    closePortal: PropTypes.func,
    className: PropTypes.string,
    placement: PropTypes.string
};

MultiSelect.defaultProps = {
    onChange: ()=>{},
    data: [],
    defaultValue: []
};

const CheckBox = <span className="mcds-icon__container mcds-icon__container-14 mcds-select__multi-checkbox mcds-m__r-6 mcds-m__l-3"><span className="mcds-icon__check-12 mcds-dropdown__checkbox" /></span>;
const CheckBoxPart = <span className="mcds-icon__container mcds-icon__container-14 mcds-select__multi-checkbox mcds-m__r-6 mcds-m__l-3 "><span className="mcds-icon__subtraction-13 mcds-dropdown__checkbox" /></span>;
const CheckBoxPlace = <span className="mcds-icon__container mcds-icon__container-14 mcds-select__multi-checkbox mcds-select__multi-checkbox-place mcds-m__r-6 mcds-m__l-3"><span className="mcds-icon__checked mcds-dropdown__checkbox mcds-dropdown__checkbox-place" /></span>;
const TableIconRight = <span className="mcds-icon__right mcds-icon__triangle-solid-14 mcds-icon__rotate-270" />;
