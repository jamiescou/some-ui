/**
 * resize table 分两种使用情况，这里拿具体的业务来说
 * 1.审批流：收尾没有需要固定的单元格，这时候使用简单，直接拿去用
 * 2.标准对象列表页：首部有两个固定的单元格，尾部有一个固定的单元格
 * 这种情况使用的时候必须要三个 props：wrapWidth，fixedWidth，columnSize
 * wrapWidth：整个外层的宽度，根据实际使用情况来定，记住 tr 的宽度只有第一次才会给，所以当这种使用情况的时候你需要先知道你的容器有多宽，至于怎么知道，本组件不关心
 * fixedWidth： 若干固定宽度的单元的总宽度
 * columnSize： 除了固定宽度的单元格以为的总个数
 * 此拖拽实现还有待优化，参考 salesforce 的做法，目前先这样解决，老板需要开始卖产品了，目前的实现方式只是对开发来说不是那么的友好
 */

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class TableResize extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false, // 是否显示标示线
            resizing: false // table是否可调整列宽
        };
        this.resizeData = {
            tdWidth: 0, // 当前td在调整前的宽度
            isMousedown: false, // 标识鼠标是否为按下状态
            startX: 0, // 点击时记录的开始位置
            targetId: null, // 当前在调整列宽的td
            tableWidth: 0 // 拖动前整个table 宽度
        };
        this._changeTransform = this._changeTransform.bind(this);
        this.onmousedown = this.onmousedown.bind(this);
        this.onmouseup = this.onmouseup.bind(this);
    }

    componentDidMount() {
        let dividerBefore = this.refs.divider;
        dividerBefore.style.height = (this.refs.table.offsetHeight - 30) + 'px';

        let elem = this.refs.loadData;

        elem.addEventListener('scroll', _.throttle(() => {
            this._changeTransform(this.refs.thead_tr.children, elem);
        }));
    }

    componentWillUnmount() {
        let elem = this.refs.loadData;
        elem.removeEventListener('scroll', _.throttle);
    }

    _changeTransform(children, elem) {
        _.map(children, (v) => {
            v.children[0].style.transform = `translate3d(${-elem.scrollLeft}px, 0px, 0px)`;
        });
    }

    onmousedown(event) {
        let scroller = this.refs.loadData;

        // 外层的位置
        let position = scroller.getBoundingClientRect();

        // resize 出现的位置和起始位置
        let startX = event.clientX - position.left;
        this.resizeData = Object.assign(this.resizeData, {
            isMousedown: true,
            // 存储 down 的时候 td 的 width
            tdWidth: event.target.parentElement.parentElement.offsetWidth,
            startX: startX,
            targetId: event.target.parentElement,
            tableWidth: this.refs.table.offsetWidth
        });

        this.setState({
            active: true,
            resizing: true
        });

        scroller.style.overflow = 'hidden';
        let divider = this.refs.resizable_divider;
        divider.style.transform = `translate3d(${startX}px, 0px, 0px)`;
    }

    onmouseup(event) {
        // 还原 scroll 样式
        let scroller = this.refs.loadData;
        scroller.style.overflow = 'auto';

        // 计算移动的距离,当前指针相对于浏览器左边的宽度 - scroller 相对于左边的宽度 - 初始值，结果有可能是正的，也有可能是负的
        let position = scroller.getBoundingClientRect();
        let deltaX = event.clientX - position.left - this.resizeData.startX;

        this.resizeData = Object.assign(this.resizeData, {
            isMousedown: false
        });

        this.setState({
            active: false,
            resizing: false
        }, () => {

            // 还原 divider 位置
            let divider = this.refs.resizable_divider;
            divider.style.transform = 'translate3d(0px, 0px, 0px)';



            // 修改当前拖动元素的位置
            let targetId = this.resizeData.targetId;
            // 保持最小宽度 50
            let curWidth = this.resizeData.tdWidth + deltaX;
            if (curWidth < 50) {
                deltaX = deltaX + (50 - curWidth);
                curWidth = 50;
            }

            targetId.style.width = curWidth + 'px';
            targetId.parentElement.style.width = curWidth + 'px';

            // 重新设置新的 table 的宽度
            let table = this.refs.table;
            table.style.width = (this.resizeData.tableWidth + deltaX) + 'px';
        });
    }

    onmousemove(event) {
        if (this.resizeData.isMousedown) {
            // 外层的位置
            let position = this.refs.loadData.getBoundingClientRect();

            let divider = this.refs.resizable_divider;
            divider.style.transform = `translate3d(${event.clientX - position.left}px, 0px, 0px)`;
        }
    }

    _renderTh(childrenTh) {
        let resizeNum = 0;
        React.Children.toArray(childrenTh).forEach(v => {
            if (v.props.resizable) {
                resizeNum++;
            }
        });

        let columnWidth = 0;
        // 列数量和固定的宽度确定的时候才是需要初始化给平均分配宽度的情况
        if (this.props.columnSize && this.props.fixedWidth && this.props.wrapWidth) {
            // 每一列的宽度 = 外层宽度 - 固定位置的宽度 / resize 的 column 的总数
            // console.log(this.props.wrapWidth, this.props.fixedWidth, this.props.columnSize)
            columnWidth = ((this.props.wrapWidth - this.props.fixedWidth) / this.props.columnSize).toFixed(2);
            // 每一列最小宽度 100
            columnWidth = Math.max(columnWidth, 100);
            // console.log('columnWidth:', columnWidth);
        }

        return React.Children.toArray(childrenTh).map(v => {
            if (v.props.resizable) {
                return React.cloneElement(v, {
                    'data-columnWidth': columnWidth,
                    onMouseDown: this.onmousedown,
                    onMouseUp: this.onmouseup
                });
            }
            return v;
        });
    }

    render() {
        return (
            <div className="mcds-table__resize">
                <div className="mcds-table__resize-container">
                    <div className="mcds-table__resize-display">
                        <div ref="loadData" className="mcds-table__resize-scroller">
                            <div ref="resizable_divider" className={classnames('mcds-indicator', {'mcds-indicator__active': this.state.active})} onMouseUp={::this.onmouseup}>
                                <span ref="divider" className="mcds-resizable__divider" />
                            </div>
                            <table ref="table" className={classnames('mcds-table mcds-table__bordered', {resizing: this.state.resizing}, this.props.className)}>
                                {
                                    React.Children.map(this.props.children, (v) => {
                                        if (v && v.type === 'thead') {
                                            return (
                                                <thead onMouseMove={::this.onmousemove}>
                                                    <tr ref="thead_tr">
                                                        {this._renderTh(v.props.children.props.children)}
                                                    </tr>
                                                </thead>
                                            );
                                        }
                                        return v;
                                    })
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TableResize.propTypes = {
    className: PropTypes.string,
    wrapWidth: PropTypes.number,    // 列表总宽度
    fixedWidth: PropTypes.number,   // 首尾固定的单元格宽度
    columnSize: PropTypes.number,   // 总共的需要支持 resize 的列数
    children: PropTypes.any
};

TableResize.defaultProps = {
    fixedWidth: 0
};

export default {
    TableResize
};
