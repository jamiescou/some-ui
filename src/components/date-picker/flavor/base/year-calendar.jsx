import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import { DatePickerYearCalendar } from '../_base';
import _ from 'lodash';
import moment from 'moment';

const Cell = props => <div {...props} className={classname('mcds-datepicker__calendar-year-oneyear', props.className)}>{props.children}</div>;

Cell.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string
};

export default class YearCalendar extends React.Component {

    constructor(props){
        super(props);
        let init = {};

        if (typeof props.init === 'number') {
            let _init = moment(props.init);
            init = {
                year: _init.year()
            };
        } else {
            init = props.init;
        }

        this.cellClick = this.cellClick.bind(this);
        this._checkNow = this._checkNow.bind(this);
        this._checkSelected = this._checkSelected.bind(this);
        this.state = {
            init
        };
    }

    _getYearInfo(){
        let startYear = 1899;
        let endYear = 2100;
        return {
            from: startYear,
            to: endYear
        };
    }

    cellClick(year){
        this.props.cellChanged({year});
    }

    _checkSelected(year){
        if (year === this.state.init.year) {
            return true;
        }
        return false;
    }

    _checkNow(year){
        if (year === moment().year()) {
            return true;
        }
        return false;
    }

    renderYears() {
        let component = [];
        let arrs = [];
        let years_range = this._getYearInfo();
        let {from, to } = years_range;
        for (let i = to;i > from; i--) {
            if (i % 5 === 0) {
                let _arr = [];
                for (let index = i;index > i-5;index--) {
                    _arr.push(index);
                }
                arrs.push(_arr);
            }
        }
        arrs.forEach((v, index) => {

            let cells = _.map(v, (_v, _index) =>
                (<Cell
                    onClick={() => this.cellClick(_v) }
                    className={classname({
                        now: this._checkNow(_v),
                        selected: this._checkSelected(_v)
                    })}
                    key={_index} >{_v}</Cell>));

            component.push(
                <div key={index} className="mcds-datepicker__calendar-years">
                    {cells}
                </div>
            );
        });
        return component;
    }
    render() {
        return (
            <DatePickerYearCalendar>
                {this.renderYears()}
            </DatePickerYearCalendar>
        );
    }
}

YearCalendar.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    cellChanged: PropTypes.func,
    init: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number
    ])
};

YearCalendar.defaultProps = {
    init: Date.parse(new Date()),
    cellChanged: () => {}
};

