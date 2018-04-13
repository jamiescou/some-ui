import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
    DropDown,
    DropDownList,
    DropDownItem,
    // DropDownItemHeader,
    DropDownItemDivider
} from '../../../dropdown';
// menu的宽度
const MenuWidth = 130;
// 每级菜单左||右偏移量
const MenuOffsetLeft = 12;
// 每级菜单上偏移是不是
const MenuOffsetTop = 32;


const buildStyle = (path = [], isSelected, width = MenuWidth) => {
    let marginTop = 0;
    let marginLeft = 0;
    let left = 0;
    path.forEach(v => {
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
export default class SingleSelect extends React.Component {
    constructor(props) {
        super(props);
        let data = this.buildDate(props.data, props.defaultValue);
        // let direction = calculateDirection(data);
        this.state = {
            data,                        // 构建的数据结构
            path: [],                    // 交互中展示的路径
            select: props.defaultValue   // 选中的值
            // direction                    // menu弹出方向
        };
        // this.onMouseClick = this.onMouseClick.bind(this);
    }

    componentWillReceiveProps(props) {
        let data = this.buildDate(props.data, props.defaultValue);
        this.setState({data, select: props.defaultValue});
    }

    buildDate(originDate, selects) {
        let data = _.cloneDeep(originDate);
        // 遍历所有数组,找到被选中的节点,记录每一次下标,例[0,0,1]则为array[0].children[0].children[1]的元素
        let checkChildChecked = (obj, select, indexArray = []) => {
            let _indexArray = _.cloneDeep(indexArray);
            for (let i = 0 ;i < obj.length;i++) {
                _indexArray.push(i);

                if (obj[i].value === select) {
                    return _indexArray;
                }

                let _array = _.cloneDeep(_indexArray);
                if (obj[i].children) {
                    let inChild = checkChildChecked(obj[i].children, select, _array);
                    if (inChild) {
                        return inChild;
                    }
                    _indexArray.pop();
                } else {
                    _indexArray.pop();
                }
            }
        };
        // 根据记录的选中下标,遍历数组,将最后孩子节点的的check设为true
        let setCheckedByIndex = (_data, _array) => {
            if (_array && !_.isEqual(_array, []) && _data instanceof Array) {
                let index = _array.shift();
                if (_data[index].children) {
                    setCheckedByIndex(_data[index].children, _array);
                } else {
                    // 没有子孩子 则设为true
                    _data[index].checked = true;
                }
            }
        };

        let loop = (_data, _p) => {
            _data.forEach(d => {
                if (!d.value) {
                    d.value = d.name;
                }
                d.parent = _p;
                d.checked = false;
                if (d.children) {
                    loop(d.children, d);
                }
            });
        };
        loop(data, null);
        if (selects) {
            let indexCheckArray = checkChildChecked(data, selects, []) || [];
            setCheckedByIndex(data, indexCheckArray);
        }
        return data;
    }
    // 鼠标点击item事件
    onMouseClick(item, e) {
        e.stopPropagation();
        e.preventDefault();

        let result = [];
        let findPath = (row) => {
            console.log('row.value', row.value);
            result.push(row.value);
            if (row.parent) {
                return findPath(row.parent);
            }
            return result;
        };

        findPath(item);

        if (!item.children){
            // 在内部不更新选中数据,依赖传进来的数据
            this.props.onChange(result.reverse());
            setTimeout(() => {
                this.props.closePortal();
            }, 100);
        }
    }
    handleOnMouseOver(item, pathIndex, level, e) {
        let { path } = this.state;
        let ulNode =  e.currentTarget.parentElement;
        path = Path.back(path, pathIndex, level);
        path = Path.addPath(path, pathIndex, level, ulNode.scrollTop);

        this.setState({path});
    }
    buildMenuHeader(arrayDate = this.state.data) {
        let content = '';
        let loop = _data => {
            _data.forEach(d => {
                if (d.children) {
                    loop(d.children);
                } else if (d.checked === true && d.parent ) {
                    content = d.name;
                }
            });
        };
        loop(arrayDate);
        if (content !== '') {
            return [<DropDownItem key="header" className="mcds-select__header" onMouseOver={() => { this.setState({path: []}); }} iconLeft={CheckBox}>{content}</DropDownItem>, <DropDownItemDivider key="divider" />];
        }
        return '';
    }

    buildMenu(arrayDate = this.state.data) {
        let { path } = this.state;
        let header = this.buildMenuHeader();
        let menu = (data, level, style) => {
            let items = data.map((_data, index) => {
                return (
                    <DropDownItem
                        isSelected={_data.checked}
                        onClick={this.onMouseClick.bind(this, _data)}
                        onMouseOver={this.handleOnMouseOver.bind(this, _data, index, level)}
                        iconLeft={!_data.parent && _data.checked ? CheckBox : CheckBoxPlace }
                        iconRight={_data.children ? TableIconRight : null }
                        key={index} >
                        {_data.name}
                    </DropDownItem>
                );

            });
            // 有选中的header, 除了根节点,其他向下偏移 40px;
            if (header && style) {
                style.marginTop += 40;
            }
            return (
                <DropDown className="mcds-select__single open" key={level} style={style}>
                    <DropDownList>
                        {level === 0 ? header : null}
                        {items}
                    </DropDownList>
                </DropDown>
            );
        };
        // 第一层根menu level=0
        let menus = [menu(arrayDate, 0)];
        // 通过路径分别找到每一个level对应的数据.然后平行输出div;
        path.forEach((v, index) => {
            // 每次的path,向前走一步
            let hierarchyArray = _.clone(path).slice(0, index + 1);
            let findChildren = (data, array) => {
                let result = data;
                array.forEach(j => {
                    result = result[j.index].children;
                });
                return result;
            };

            let children = findChildren(arrayDate, hierarchyArray);
            if (children) {
                let newDir = this._getNewDir(index, hierarchyArray);
                hierarchyArray[index].direction = newDir;
                let menuNode = menu(children, index + 1, buildStyle(hierarchyArray, this.props.defaultValue !== null));
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
        } else if (hierarchyArray[index-1] && hierarchyArray[index-1].direction && hierarchyArray[index-1].direction === 'right') {
            if (getPos.x2 + MenuWidth - MenuOffsetLeft > bodyRect.width) {
                newDir = 'left';
            } else {
                newDir = 'right';
            }
        } else if (hierarchyArray[index-1] && hierarchyArray[index-1].direction && hierarchyArray[index-1].direction === 'left') {
            if (getPos.x1 - MenuWidth + MenuOffsetLeft < 0){
                newDir = 'right';
            } else {
                newDir = 'left';
            }
        }
        return newDir;
    }
    render() {
        let { className } = this.props;
        let menu = this.buildMenu();

        return <div className={classnames('mcds-select__root', className)} ref="menu">{menu}</div>;
    }
}

SingleSelect.propTypes = {
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    closePortal: PropTypes.func,
    width: PropTypes.number,
    className: PropTypes.string,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    placement: PropTypes.string
};

SingleSelect.defaultProps = {
    onChange: ()=>{},
    closePortal: ()=>{},
    data: [],
    defaultValue: null
};
// 如果没有默认data就以这个为基础

const CheckBox = <span className="mcds-icon__left mcds-icon__checked mcds-dropdown__checkbox mcds-icon__check-12" />;
const CheckBoxPlace = <span className="mcds-icon__left mcds-icon__checked mcds-dropdown__checkbox mcds-dropdown__checkbox-place" />;
const TableIconRight = <span className="mcds-icon__right mcds-icon__triangle-solid-14 mcds-icon__rotate-270" />;
