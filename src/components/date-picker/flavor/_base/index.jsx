import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
/**
 *  <DatePickerContainer>
 *      <DatePicker Header/>
 *      <Day Calendar /> || <Year Calendar /> || <Month Calender />
 *      <Extend Function Footer />
 *  </DatePickerContainer>
 */
export const langs = {
    weeks: {
        mo: '一',
        tu: '二',
        we: '三',
        th: '四',
        fr: '五',
        sa: '六',
        su: '日'
    },
    year: '年',
    month: '月'
};

export const DatePickerContainer = ({className, children, ...others}) => (
    <div {...others} className={classname('mcds-datepicker', className)}>
        {children}
    </div>);

DatePickerContainer.propTypes = {
    children: PropTypes.any.isRequired,

    className: PropTypes.string,
    others: PropTypes.any
};

export const DatePickerHeader = ({className, children, ...others}) =>
    <div {...others} className={classname('mcds-datepicker__header', className)}>
        {children}
    </div>;

DatePickerHeader.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string
};

export const DatePickerHeaderColumn = ({className, children, ...others}) =>
    <div {...others} className={classname('mcds-datepicker__header-column', className)}>
        {children}
    </div>;

DatePickerHeaderColumn.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string
};

export const DatePickerDayCalendar = props => {
    return (
        <div {...props} className={classname('mcds-datepicker__calendar mcds-datepicker__calendar-day')}>
            {props.children}
        </div>
    );
};

DatePickerDayCalendar.propTypes = {
    children: PropTypes.any.isRequired
};

export const DatePickerYearCalendar = props => {
    return (
        <div {...props} className={classname('mcds-datepicker__calendar mcds-datepicker__calendar-year', props.className)}>
            {props.children}
        </div>
    );
};

DatePickerYearCalendar.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any.isRequired
};

// 日期控件 月份
export const DatePickerMonthCalendar = ({className, children, ...others}) => {
    return (
        <div {...others} className={classname('mcds-datepicker__calendar mcds-datepicker__calendar-month', className)}>
            {children}
        </div>
    );
};

DatePickerMonthCalendar.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any.isRequired
};

// 日期控件 底部功能区容器
export const DatePickerBottomFuns = props =>
    <div {...props} className={classname('mcds-datepicker__foot mcds-datepicker__foot-funs', props.className)}>
        {props.children}
    </div>;

DatePickerBottomFuns.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any.isRequired
};

export const DatePickerBottomFunsColumn = props =>
    <div {...props} className={classname('mcds-datepicker__foot-funs-column', props.className)}>
        {props.children}
    </div>;

DatePickerBottomFunsColumn.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any.isRequired
};
