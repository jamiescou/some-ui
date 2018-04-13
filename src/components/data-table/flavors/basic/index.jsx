import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const Table = ({className, children, ...others}) => (
    <table {...others} className={classnames('mcds-table mcds-table__bordered', className)}>
        {children}
    </table>
);

/* class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mousedown: false,
            resizeable: false,
            screenXStart: 0,
            tdWidth: 0,
            headerWidth: 0,
            targetTd: null
        };
    }

    onmousedown(event) {
        if (this.state.resizeable === true) {
            this.setState({
                mousedown: true,
                screenXStart: event.screenX,
                tdWidth: this.state.targetTd.offsetWidth,
                headerWidth: this.refs.table_column.offsetWidth
            });
        }
        event.preventDefault();
    }

    onmousemove(event) {
        let curEle = event.target.parentElement;
        while (curEle.nodeName !== 'TR' && curEle.nodeName !== 'TH') {
            curEle = curEle.parentElement;
        }
        let offsetX = event.clientX - curEle.getBoundingClientRect().left;
        let table = this.refs.table_column;

            let curTr = table.rows[0];
            if (curEle.offsetWidth - offsetX <= 4) {
                this.setState({
                    targetTd: curEle,
                    resizeable: true
                });
            } else if (offsetX <= 4 && curEle.cellIndex > 0) {
                this.setState({
                    targetTd: curTr.cells[curEle.cellIndex - 1],
                    resizeable: true
                });
            } else {
                this.setState({
                    resizeable: false
                });
            }
    }


    onmouseup(event) {
        let table = this.refs.table_column;
        if (this.state.mousedown === true) {
            let width = this.state.tdWidth + (event.screenX - this.state.screenXStart) + 'px';
            let targetEle = this.state.targetTd;
            targetEle.style.width = width;
            table.style.width = this.state.headerWidth + (event.screenX - this.state.screenXStart) + 'px'; // 调整整个table的宽度
        }
        this.setState({
            targetTd: null,
            resizeable: false,
            mousedown: false
        });
        event.preventDefault();
    }

    renderTh(thead) {
        let ths = [];
        let { resize } = this.props;
        React.Children.map(thead, (curTh, index) => {
            if (resize) {
                ths.push(React.cloneElement(curTh, {
                    key: index,
                    onMouseDown: this.onmousedown.bind(this),
                    onMouseMove: this.onmousemove.bind(this),
                    onMouseUp: this.onmouseup.bind(this)
                }));
            } else {
                ths.push(React.cloneElement(curTh, {key: index}));
            }
        });
        return ths;
    }

    render() {
        let {className, children } = this.props;
        return (
            <table ref="table_column" className={classnames('mcds-table mcds-table__bordered', className)}>
                {React.Children.map(children, v => {
                    if (v.type === 'thead') {
                        return <thead><tr>{this.renderTh(v.props.children.props.children)}</tr></thead>;
                    }
                    return v;
                })}
            </table>
        );
    }
} */

Table.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    resize: PropTypes.bool
};
