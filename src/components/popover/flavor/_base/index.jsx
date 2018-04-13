/**
 * 这是一个popover的基础,所有的popover都是基于base文件衍生出来的
 * base 提供显示功能,不做逻辑功能,不对外开放.
 * props{
 *     direction:{ //方向参数
 *         top:{
 *             left,
 *             right,
 *         }
 *         bottom:{
 *             left,
 *             right;
 *         }
 *         left:{
 *             top,
 *             bottom,
 *         }
 *         right:{
 *             top,
 *             bottom
 *         }
 *     }
 * }
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getDomOffset } from '../../../../utils/dom';

/**
 * [获取目标节点在dom中的位置]
 * @param  {[reactdom/dom]} target    [react节点.或者dom节点]
 * @param  {[direction]} direction [暂时无用]
 * @return {[object]}           [{top,left,width,height}}]
 */
export const getPosition = (target) => {
    // console.log(typeof target,'target',ReactDOM.findDOMNode(target));
    if (!target) { return null; }
    let _target = target;
    return getDomOffset(_target);
};
/**
 * popover的关部样式
 * @param  {[type]} options.children  [description]
 * @param  {[type]} options.className [description]
 * @return {[type]}                   [description]
 */
export const PopoverHead = ({children, className, ...others}) => (
    <div {...others} className={classnames('mcds-popover__header', className)}>
        {children}
    </div>
);

PopoverHead.propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string
};

export const PopoverBody = ({className, children, ...others}) =>
    <div {...others} className={classnames('mcds-popover__body', className)}>
        {children}
    </div>;

PopoverBody.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string
};

export const Popover = ({theme, className, type, children, ...others} ) => (
    <div {...others} data-type={type} className={classnames(`mcds-popover mcds-popover__${theme}`, className)}>
        {children}
    </div>
);
Popover.defaultProps = {
    theme: 'default',
    type: 'popover'
};
Popover.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    theme: PropTypes.oneOf(['default', 'info', 'error', 'warning', 'success']),
    type: PropTypes.oneOf(['tooltip', 'panel', 'popover'])
};

export const Trigger = class Trigger extends React.Component {
    render() {
        let {className, children, ...others} = this.props;
        return (
            <div {...others} ref={ node => this.node = node} className={classnames('mcds-popover-trigger mcds-popover-trigger__open', className)}>
                {children}
            </div>
        );
    }
};

Trigger.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string
};
