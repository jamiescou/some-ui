import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Th extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let th = this.refs.th;
        let cell = this.refs.cell;

        // 初始化的时候看上层组件有没有计算好宽度传递过来，如果有计算好的直接可以使用外层的宽度
        let width = window.getComputedStyle(th).width;
        if (this.props['data-columnWidth']) {
            width = this.props['data-columnWidth'] + 'px';
        }

        th.style.width = width;
        cell.style.width = width;
    }

    render() {
        let {children, className, onClick, icon, resizable, onMouseDown, onMouseUp, ...others} = this.props;

        return (
            <th ref="th" className={classnames('mcds-table__Th', className)} {...others}>
                <div ref="cell" className="mcds-table__resize-cell">
                    <a className="mcds-text__weak mcds-table__resize-action" onClick={onClick}>
                        <span className="mcds-truncate">{ children }</span>
                        {icon ? <span className={classnames('mcds-table__icon mcds-icon__right mcds-icon__height', icon)} /> : null}
                    </a>
                    {resizable ? <span className="mcds-resizable" onMouseDown={onMouseDown} onMouseUp={onMouseUp} /> : null}
                </div>
            </th>
        );
    }
}

Th.propTypes = {
    children: PropTypes.any,
    icon: PropTypes.string,
    resizable: PropTypes.bool,
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    className: PropTypes.string,
    'data-left': PropTypes.number,
    'data-columnWidth': PropTypes.number      // 单元格宽度
};

Th.defaultProps = {
    'data-columnWidth': 0,
    onClick: () => {}
};

export default {
    Th
};

