/**
 * https://www.lightningdesignsystem.com/components/datepickers/
 * 时间选择器,时间段选择器。时间选择器和日期选择器应该是分开的,便于维护,但是两个东西应该是可以组合起来使用的组件
 */


import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Input } from '../form';
import { DropDown, DropDownTrigger } from '../dropdown';
import { ButtonSmallIcon } from '../button-icon';
import moment from 'moment';
// window.moment = moment;



class TimePicker extends React.Component {
    static defaultProps = {
        callback: (val) => {
            return val;
        },
        init: Date.parse(new Date())
    }
    constructor(props) {
        let { init } = props;
        super(props);
        this.state = {
            init, // 初始定义的时间
            momentTime: moment(init), // 转换后的moment对象
            showType: 'Summary', // 显示的阶段 Summary, Minute, Hours,
            active: false,
            display: 'none', // 为了让dropdown隐藏的时候不占位
            part: '' // 模拟input中 时间部份 显示被选中的部份 hour||minute
        };
        this.input = null;
        this.close = this.close.bind(this);
        this.show = this.show.bind(this);
        this.getValue = this.getValue.bind(this);
    }


    show() {
        this.setState({display: 'block'});
        setTimeout(() => {
            this.setState({active: true });
        }, 300);
    }

    close() {
        this.setState({active: false, part: ''});
        setTimeout(() => {
            this.setState({display: 'none'});
        }, 300);
    }

    handleHourCellClick(num) {
        this.setHour(null, num);
        this.setShowType('Summary');
    }

    handleMinutesCellClick(num) {
        this.setMinute(null, num);
        this.setShowType('Summary');
    }

    handleInputPartClick(part) {
        this.setState({part});
    }

    handleOnChange(v) {
        this.props.onChange(v);
    }
    /**
     * 设置小时数
     * @param {[type]} type [up||down||null]
     * @param {[type]} num  [null||null||num]
     */
    setHour(type, num) {
        let momentTime = this.state.momentTime;
        let hour = momentTime.hour();

        if (type === 'up') {
            hour += 1;
        } else if (type === 'down') {
            hour -= 1;
        } else {
            hour = num;
        }

        hour = hour > 24 ? 1 : hour;

        momentTime.hour(hour);

        this.setState({
            momentTime: momentTime
        });
        this.handleOnChange(momentTime.format('x'));
        setTimeout(() => {
            this.handleInputPartClick('hour');
        }, 1);
    }

    setShowType(type) {
        let { part } = this.state;
        if (type === 'Hours') {
            if (part !== 'hour') {
                this.handleInputPartClick('hour');
            }
        }
        if (type === 'Minutes') {
            if (part !== 'minute') {
                this.handleInputPartClick('minute');
            }
        }
        this.setState({
            showType: type
        });
    }

    setMinute(type, num) {
        let momentTime = this.state.momentTime;
        let minute = momentTime.minute();
        if (type === 'up') {
            minute += 1;
        } else if (type === 'down') {
            minute -= 1;
        } else {
            minute = num;
        }
        minute = minute > 60 ? 1 : minute;

        momentTime.minute(minute);
        this.setState({
            momentTime: momentTime
        });
        this.handleOnChange(momentTime.format('x'));
        setTimeout(() => {
            this.handleInputPartClick('minute');
        }, 1);
    }
    getValue() {
        let { momentTime } = this.state;
        return momentTime.format('x');
    }
    renderSummary() {
        let { momentTime } = this.state;
        let hour;
        let minute;
        hour = momentTime.hour();
        minute = momentTime.minute();

        return (
            <div className="mcds-timepicker__wrap mcds-layout__column">
                <div className="left">
                    <ButtonSmallIcon
                        onClick={this.setHour.bind(this, 'up')}
                        className="mcds-timepicker__button mcds-timepicker__button-top mcds-m__r-44 mcds-m__t-15" icon="mcds-icon__rotate-180 mcds-icon__triangle-solid-14" />
                    <Input
                        ref="hours"
                        readOnly="readonly"
                        value={hour < 10 ? '0' + hour : hour}
                        className="mcds-m__r-30 mcds-m__t-12 mcds-m__b-12"
                        onClick={this.setShowType.bind(this, 'Hours')} />
                    <ButtonSmallIcon
                        onClick={this.setHour.bind(this, 'down')}
                        className="mcds-timepicker__button mcds-timepicker__button-bottom mcds-m__r-44" icon="mcds-icon__triangle-solid-14" />
                </div>
                <div className="middle">:</div>
                <div className="right">
                    <ButtonSmallIcon
                        onClick={this.setMinute.bind(this, 'up')}
                        className="mcds-timepicker__button mcds-timepicker__button-top mcds-m__l-44 mcds-m__t-15" icon="mcds-icon__triangle-solid-14 mcds-icon__rotate-180" />
                    <Input
                        ref="minutes"
                        readOnly="readonly"
                        value={minute < 10 ? '0' + minute : minute}
                        className="mcds-m__l-30 mcds-m__t-12 mcds-m__b-12"
                        onClick={this.setShowType.bind(this, 'Minutes')} />
                    <ButtonSmallIcon
                        onClick={this.setMinute.bind(this, 'down')}
                        className="mcds-timepicker__button mcds-timepicker__button-bottom mcds-m__l-44" icon="mcds-icon__triangle-solid-14" />
                </div>
            </div>
        );
    }
    renderHours() {
        let hours = [];
        let now = this.state.momentTime.hour();

        for (let i = 0; i < 24; i++) {
            let tmp = i + 1;
            if (tmp < 10) {
                tmp = '0' + tmp;
            } else {
                tmp += '';
            }
            hours.push(tmp);
        }
        let Hours = hours.map((v, i) => {
            return <HouerCell key={i} className={classnames({selected: now === parseInt(v)})} onClick={this.handleHourCellClick.bind(this, v)}>{v}</HouerCell>;
        });
        return (
            <div className="mcds-timepicker__hours">
                {Hours}
            </div>
        );
    }
    renderMinutes() {
        let minutes = [];
        let now = this.state.momentTime.minute();
        for (let i = 0; i < 60; i += 5) {
            let tmp = i;
            if (tmp < 10) {
                tmp = '0' + tmp;
            } else {
                tmp += '';
            }
            minutes.push(tmp);
        }
        let MinuteCells = minutes.map((v, i) => {
            return <MinuteCell key={i} className={classnames({selected: now === parseInt(v)})} onClick={this.handleMinutesCellClick.bind(this, v)}>{v}</MinuteCell>;
        });
        return (
            <div className="mcds-timepicker__minutes">
                {MinuteCells}
            </div>
        );
    }

    render(){
        let { className, placement, target, error } = this.props;
        let { showType, momentTime, part } = this.state;
        let inputHourValue = momentTime.format('HH');
        let inputMinuteValue = momentTime.format('mm');
        return (
            <DropDownTrigger
                ref="trigger"
                onOpen={::this.show}
                synchWidth={false}
                placement={placement}
                target={target}
                className={classnames('mcds-timepicker', className)}
                closeOnOutsideClick={true}
                onClose={() => {
                    this.setState({active: false, part: ''});
                }} >
                <div className={classnames('mcds-input__container mcds-timepicker__context', {'mcds-element__border': error})}>
                    <div className="mcds-form__control">
                        <div
                            className={classnames('mcds-timepicker__input', {
                                focus: this.state.active
                            })}>
                            <span
                                onClick={this.handleInputPartClick.bind(this, 'hour')}
                                className={classnames('mcds-timepicker__input-hour', {active: part === 'hour'})} >
                                {inputHourValue}
                            </span>
                            <span className="mcds-m__l-5 mcds-m__r-5">:</span>
                            <span
                                onClick={this.handleInputPartClick.bind(this, 'minute')}
                                className={classnames('mcds-timepicker__input-minute', {active: part === 'minute'})} >
                                {inputMinuteValue}
                            </span>
                        </div>
                        <span className="mcds-icon__time-line-20 mcds-search__right" />
                    </div>
                </div>
                <DropDown className="mcds-timepicker__dropdown" >
                    {this[`render${showType}`]()}
                </DropDown>
            </DropDownTrigger>
        );
    }
}

TimePicker.propTypes = {
    init: PropTypes.number,
    className: PropTypes.string,
    target: PropTypes.string,
    onChange: PropTypes.func,
    placement: PropTypes.string,
    error: PropTypes.bool
};
TimePicker.defaultProps = {
    placement: 'bottom-right',
    target: 'body',
    onChange: () => {}
};
export default {
    TimePicker
};


const HouerCell = props => <div {...props} className={classnames('mcds-timepicker__hours-hour', props.className)}>{props.children}</div>;
HouerCell.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any
};
const MinuteCell = props => <div {...props} className={classnames('mcds-timepicker__minutes-minute', props.className)}>{props.children}</div>;
MinuteCell.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any
};

