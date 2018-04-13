import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

import _ from 'lodash';
import moment from 'moment';

import {DatePickerContainer, DatePickerHeader, DatePickerHeaderColumn, DatePickerBottomFuns, DatePickerBottomFunsColumn} from '../_base';

import DayCalendar from './day-calendar';
import YearCalendar from './year-calendar';
import MonthCalendar from './month-calendar';
const _renderState = ['Year', 'Month', 'Day'];

export default class MiniCalendar extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            show: false,
            renderState: 'Day',
            init: props.init,
            tmpValue: props.init
        };

        this.getValue = this.getValue.bind(this);
        // this.handleOnOpen = this.handleOnOpen.bind(this);
        this.handleOnClose = this.handleOnClose.bind(this);
        this._handleTrigger = this._handleTrigger.bind(this);
        this._setToday = this._setToday.bind(this);
        this._yearCellChanged = this._yearCellChanged.bind(this);
    }

    renderYear(pointer = this){
        return <YearCalendar init={pointer.state.init} cellChanged={pointer._yearCellChanged.bind(pointer)} />;
    }

    renderMonth(pointer = this) {
        return <MonthCalendar init={pointer.state.init} cellChanged={pointer._monthCellChanged.bind(pointer)} />;
    }

    renderDay(pointer = this) {
        return <DayCalendar init={pointer.state.init} rangeSelected={true} cellChanged={pointer._dayCellChanged.bind(pointer)} />;
    }

    _yearCellChanged(param) {
        this._CellChanged(param);
    }

    _monthCellChanged(param) {
        this._CellChanged(param);
    }

    _dayCellChanged(param) {

        const timestamp = moment(`${param.year}-${param.month}-${param.day}`, 'YYYY-MM-DD').format('x');
        this._CellChanged(param);
        this.props.onChange(timestamp);
        this.setState({tmpValue: timestamp});
    }

    _CellChanged(param) {
        let {year, month, day} = param;
        if (year === moment().year()) { // 处理当前年份为本年,月份默认是当前月||本年,本月,则当前月份是当日.
            if (_.isUndefined(month)) {
                month = moment().month() + 1;
            } else if (month === moment().month() + 1 && _.isUndefined(day)){
                day = new Date().getDate();
            }
        } else {
            if (!month) {
                month = 1;
            }
            if (!day) {
                day = 1;
            }
        }

        let _array = [year, month, day];
        let array = [];
        // 构建月份 不足10的.做成02,03的形式
        _array.forEach(v => {
            if (!_.isUndefined(v)) {
                array.push(v >= 10 ? String(v): '0' + v);
            }
        });

        let stringDate = array.join('-');
        let init = moment(stringDate).valueOf();
        let renderStateIndex = _.indexOf(_renderState, this.state.renderState);
        if (_renderState[renderStateIndex + 1]) {
            this.setState({renderState: _renderState[renderStateIndex + 1], init});
        } else {
            this.setState({init});
        }
    }

    _handleTrigger(param = 'Year'){
        this.setState({renderState: param});
    }

    _setToday() {
        this.setState({
            init: moment().valueOf()
        }, () => {
            let timestamp = moment(this.state.init).format('x');
            this.props.onChange(timestamp);
        });
    }

    getValue() {
        return this.state.tmpValue;
    }

    handleOnClose() {
        let timestamp = this.state.init;
        this.props.onClose(timestamp);
    }

    render(state = this.state) {
        let renderState = state.renderState;
        let renderFun = this[`render${renderState}`];
        let renderBottom = '';
        if (state.renderState === 'Day') {
            renderBottom = (
                <DatePickerBottomFuns>
                    <DatePickerBottomFunsColumn onClick={() => { this._setToday(); }} className={classname({hide: state.renderState !== 'Day'})}>
                          今天
                    </DatePickerBottomFunsColumn>
                </DatePickerBottomFuns>);
        }
        renderFun.bind(this);
        return (
            <DatePickerContainer className="mcds-datepicker">
                <DatePickerHeader>
                    <DatePickerHeaderColumn className={classname({selected: state.renderState === 'Year'})} onClick={() => { this._handleTrigger('Year'); }}>
                        {moment(state.init).year()}年
                    </DatePickerHeaderColumn>
                    <DatePickerHeaderColumn className={classname({selected: state.renderState === 'Month'})} onClick={() => { this._handleTrigger('Month'); }}>
                        {moment(state.init).month() + 1}月
                    </DatePickerHeaderColumn>
                </DatePickerHeader>
                {renderFun(this)}
                {renderBottom}
            </DatePickerContainer>
        );
    }
}

MiniCalendar.propTypes = {
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    init: PropTypes.oneOfType([
        PropTypes.number
    ])
};

MiniCalendar.defaultProps = {
    init: Date.parse(new Date()), // 时间戳
    // yearRange: '1990,2030', // 年份范围
    // monthRange: '3,12', // 月份范围
    // rangeSelected: false, // 范围选择
    onChange: ()=>{},
    onClose: () => {}
};
