import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

import { DatePickerMonthCalendar } from '../_base';


/*
    <DayCalendar
        init = {
            year:2016,
            month:1,
            day:1,
        }|| timestamp;
    />
 */
const Cell = props => <div {...props} className={classname('mcds-datepicker__calendar-month-onemonth', props.className)}>{props.children}</div>;

Cell.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string
};

export default class monthCalendar extends React.Component {
    constructor(props){
        super(props);
        let init = {};

        if (typeof props.init === 'number') {
            let _init = moment(props.init);
            init = {
                year: _init.year(),
                month: _init.month(),
                day: _init.day()
            };
        } else {
            init = props.init;
        }

        this.state = {
            init
        };
        this.checkIsNow = this.checkIsNow.bind(this);
        this.checkSelected = this.checkSelected.bind(this);

        this.cellClick = this.cellClick.bind(this);
    }

    checkIsNow(month) {
        let now = moment();
        let {year} = this.state.init;
        if (now.month() === month && now.year() === year) {
            return true;
        }
        return false;
    }

    checkSelected(month) {
        if (month === this.state.init.month + 1){
            return true;
        }
        return false;
    }

    cellClick(month) {
        let {year} = this.state.init;
        this.props.cellChanged({year, month});
    }

    renderMonths() {
        let month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let arrs = [];
        let component = [];
        // 每七天分为一组week
        month.forEach((v, index, _month) => {
            if (index % 4 === 0) {
                let one_row = [];
                for (let i = index; i < index + 4; i++) {
                    one_row.push(_month[i]);
                }
                arrs.push(one_row);
            }
        });
        arrs.forEach((_week, index) => {
            let cells = _.map(_week, (_v, _index) =>
                <Cell
                    className={classname({
                        now: this.checkIsNow(_v-1),
                        selected: this.checkSelected(_v)
                    })}
                    key={_index}
                    onClick={() => { this.cellClick(_v); }}>{_v}月</Cell>);

            component.push(
                <div key={index} className="mcds-datepicker__calendar-months">
                    {cells}
                </div>
            );
        });
        return component;
    }
    render() {
        return (
            <DatePickerMonthCalendar>
                {this.renderMonths()}
            </DatePickerMonthCalendar>
        );
    }
}

monthCalendar.propTypes = {
    className: PropTypes.string,
    cellChanged: PropTypes.func,
    init: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number
    ])
};

monthCalendar.defaultProps = {
    init: Date.parse(new Date()),
    cellChanged: () => {}
};

