import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

import { langs, DatePickerDayCalendar } from '../_base';


/*
    <DayCalendar
        init = {
            year:2016,
            month:1,
            day:1,
        }|| timestamp;
    />
 */
const Cell = props => <div {...props} className={classname('mcds-datepicker__calendar-day-weeks-day', props.className)}>{props.children}</div>;

Cell.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string
};

export default class DayCalendar extends React.Component {
    constructor(props){
        super(props);
        this.cellClick = this.cellClick.bind(this);
        this._checkNow = this._checkNow.bind(this);
        this._checkSelected = this._checkSelected.bind(this);
        this.state = this.getInitState(props);
    }

    componentWillReceiveProps(nextProps) {
        let state = this.getInitState(nextProps);
        this.setState(state);
    }

    getInitState(props) {
        let init = {};
        let selected = null;
        if (typeof props.init === 'number') {
            let _init = moment(props.init);
            init = {
                year: _init.year(),
                month: _init.month(),
                day: _init.toDate().getDate()
            };
            selected = init.day;
        } else {
            init = props.init;
        }
        return {init, selected};
    }

    cellClick(selected) {
        let {year, month, day = 1} = this.state.init;
        // console.log('start', year, month, day, selected);
        let time;
        month =parseInt(month) + 1;
        if (month < 10) {
            month = '0' + month;
        }
        time = moment([year, month].join('-'));
        // 击的部份是前一个还是后一个
        // console.log('before', year, month, day, selected);
        if (selected.type === 'next') {
            time.month(time.month() + 1);
        }
        if (selected.type === 'previous') {
            time.month(time.month() - 1);
        }

        year = time.year();
        month = time.month() + 1;
        day = selected.value;
        // console.log('after', year, month, day, selected);
        this.setState({init: {year, month: month - 1, day}, selected: day});
        setTimeout(() => {
            this.props.cellChanged({year, month, day});
        }, 100);
    }
    _checkSelected(selected) {
        let {day} = this.state.init;
        if (selected && selected.value === day && selected.type === 'current' && selected.value === this.state.selected) {
            return true;
        }
        return false;
    }
    _checkNow(day) {
        let {year, month} = this.state.init;
        let now = new Date().getDate();
        if (year === moment().year() && month === moment().month() && now === day.value ){
            return true;
        }
        return false;
    }
    _getDayInfo(state=this.state){
        let dateArray = [];
        // 初始化moment对象
        let {year, month} = state.init;
        let curMonth = moment().year(year).month(month);
        // console.log("当前月", curMonth.format('YYYY MM'));
        let preMonth = moment().year(year).month(month - 1);
        let preMonth_days = preMonth.daysInMonth();
        let curMonth_days = curMonth.daysInMonth();
        let curFirstDay = curMonth.date(1).day(); // 获取当前月第一天的星期数  1-7 7
        let curLastDay = curMonth.date(curMonth_days).day(); // 获取当前月最后一天星期几 1-7

        let preNeed = curFirstDay === 0 ? 6 : curFirstDay -1;
        let nextNeed = curLastDay === 0 ? 0 : 7 - curLastDay;
        for (let i = 0; i < preNeed; i++) {
            let v = preMonth_days - preNeed + 1 + i;
            dateArray.push({type: 'previous', value: v});
        }
        for (let i = 0; i < curMonth_days; i++) {
            let v= i + 1;
            dateArray.push({type: 'current', value: v});
        }
        for (let i = 0; i < nextNeed; i++) {
            let v = i + 1;
            dateArray.push({type: 'next', value: v});
        }
        return dateArray;
    }
    renderNames() {
        let names = _.map(langs.weeks, (v, i) => {
            return <div key={i} className="mcds-datepicker__calendar-day-name">{v}</div>;
        });
        return names;
    }
    renderWeeks() {
        let days = this._getDayInfo();
        let arrs = [];
        let component = [];
        // 每七天分为一组week
        days.forEach((v, index, _days) => {
            if (index % 7 === 0) {
                let _week = [];
                for (let i = index; i < index + 7; i++) {
                    _week.push(_days[i]);
                }
                arrs.push(_week);
            }
        });
        arrs.forEach((_week, index) => {
            let cells = _.map(_week, (_v, _index) =>
                <Cell
                    key={_index}
                    className={classname(_v.type, {now: this._checkNow(_v), selected: this._checkSelected(_v)})}
                    onClick={() => this.cellClick(_v)}>
                    {_v.value}</Cell>);
            component.push(
                <div key={index} className="mcds-datepicker__calendar-day-weeks">
                    {cells}
                </div>
            );
        });
        return component;
    }
    render() {
        return (
            <DatePickerDayCalendar>
                <div className="mcds-datepicker__calendar-day-names">
                    {this.renderNames()}
                </div>
                {this.renderWeeks()}
            </DatePickerDayCalendar>
        );
    }
}

DayCalendar.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    cellChanged: PropTypes.func,
    init: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number
    ])
};

DayCalendar.defaultProps = {
    init: Date.parse(new Date()),
    cellChanged: () => {}
};

