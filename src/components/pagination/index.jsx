import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Input} from '../form';
import {Button} from '../buttons';
import { PopoverTrigger, Popover, PopoverHead } from '../popover';
import {DropDownList, DropDownItem} from '../dropdown';
import {Select} from '../form';

// 默认显示的数量 15个 最小为8
const defaultShowCell = 15;
const defaultOptions = {
    showPrevious: true,
    showNext: true,
    showJumpPage: true,
    showPerPageCount: true,

    previousText: '上一页',
    nexText: '下一页',
    GotoText: '跳转',
    goToPlaceHoler: '页数',
    PerPageCountTemp: '`每页 ${count} 条`'
};
/* eslint no-new-func: off */
function getPerPageCountTemp(count, temp){
    let str  = 'return ' + temp;
    let func = new Function('count', str);
    if (count) {
        return func(count);
    }
}

class Pagination extends Component {

    static propTypes = {
        showTotal: PropTypes.bool,
        current: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        onChange: PropTypes.func
    };

    static defaultProps = {
        onChange: () => null
    };

    componentWillMount() {
        this.options = Object.assign(defaultOptions, this.props.options);
    }

    componentDidMount() {
        let parent = this.refs.pagination;
        let input =  parent.querySelector('input');
        this.input = input;
        document.addEventListener('keydown', this.onEnterKeyDown.bind(this));
    }

    componentWillUnmount() {
        delete this.input;
        document.removeEventListener('keydown', this.onEnterKeyDown.bind(this));
    }

    // 回车跳页
    onEnterKeyDown(e) {
        if (e.keyCode === 13 && document.activeElement === this.input) {
            this.jumpPage();
        }
    }
    // 当每页显示数量改变
    onPerPageChange(count) {
        this.setState({perPageCountValue: getPerPageCountTemp(count, this.options.PerPageCountTemp)});
        this.props.onPerPageChange(count);
    }

    changePage(pageNum) {
        if (pageNum !== this.props.current) {
            this.props.onChange(pageNum);
        }
    }

    renderPagination(pageNum) {
        let className = pageNum === this.props.current ? 'active' : '';
        return (
            <li key={pageNum} className={className + ' mcds-list__item'} onClick={this.changePage.bind(this, pageNum)}>{pageNum}</li>
        );
    }

    /**
     * 生成省略号部分
     * @Author   HX
     * @DateTime 2017-02-22T15:32:13+0800
     * @param    {array}                         range 范围 [0,100]
     * @return   {element}                       [description]
     */
    renderOmit(from, to) {
        let items = [];
        if (to - from <= 0) {
            return false;
        }
        for (let i = from ;i < to; i++) {
            items.push(<DropDownItem key={i} onClick={this.changePage.bind(this, i)}>{i}</DropDownItem>);
        }
        let key = from === 2 ? 'from' : 'to';
        let overlay = (
            <Popover>
                <PopoverHead>
                    <DropDownList>
                        {items}
                    </DropDownList>
                </PopoverHead>
            </Popover>
        );
        return (
            <li className="mcds-list__item" key={key}>
                <PopoverTrigger className="mcds-popselect mcds-pagination__omit" triggerBy="click" placement="top" overlay={overlay}>
                    <div>...</div>
                </PopoverTrigger>
            </li>
        );
    }

    renderPages() {
        let {current, total} = this.props;
        let start = 2;
        let end  = 0;

        // 中心点
        if (total > defaultShowCell) {
            if (current <= Math.ceil(defaultShowCell / 2)) {
                start = 2;
                end = start + defaultShowCell - 3;
            } else if (current > total - Math.ceil(defaultShowCell / 2)) {
                start = total - defaultShowCell + 3;
                end = total;
            } else {
                start = current - Math.ceil((defaultShowCell - 4) / 2);
                end = start + defaultShowCell - 4;
            }
        } else {
            start = 2;
            end = total;
        }

        let pagination = [];

        const first = this.renderPagination(1);
        const last =  this.renderPagination(total);

        pagination.push(first);
        pagination.push(this.renderOmit(2, start));

        for (let i = start; i < end; i++) {
            pagination.push(this.renderPagination(i));
        }

        pagination.push(this.renderOmit(end, total));
        if (total !== 1) {
            pagination.push(last);
        }
        return pagination;
    }

    // 每页展示数
    renderPerPage() {
        let perPage = [];
        let defaultValue = getPerPageCountTemp(this.props.perPageCountValue, this.options.PerPageCountTemp);
        this.props.perPage.forEach((v) => {
            perPage.push(<option key={`counts-${v}`} value={v}>{v}</option>);
        });
        return (
            <Select value={defaultValue} onChange={::this.onPerPageChange}>
                {perPage}
            </Select>
        );
    }
    // 上一页
    prePage() {
        let {current} = this.props;
        if (current > 1) {
            this.changePage(current - 1);
        }
    }

    // 下一页
    nextPage() {
        let {current, total} = this.props;
        if (current < total) {
            this.changePage(current + 1);
        }
    }
    // 跳页
    jumpPage() {
        let pageNumber = parseInt(this.input.value);
        if (!isNaN(pageNumber)) {
            this.changePage(pageNumber);
        }
    }

    // 对跳转页进行限制
    _handleOnKeyUp() {
        let {total} = this.props;
        const input = this.input;
        if (input.value.length === 1) {
            input.value=input.value.replace(/[^1-9]+/, '');
        } else {
            input.value=input.value.replace(/\D/g, '');
        }

        if (input.value > total ) {
            input.value = total;
        }
    }

    render() {
        let {current, total, className} = this.props;
        let perPage = this.renderPerPage();
        let showPrev = false;
        let showNext = false;

        if (current > 1) {
            showPrev = true;
        }

        if (current < total) {
            showNext = true;
        }
        return (
            <div className={classnames('mcds-pagination', className)} ref="pagination" id="pagination">
                <ul className="mcds-pagination__pages mcds-list__horizontal">

                    <li className={classnames('mcds-pagination__pre mcds-list__item', {weak: !showPrev, hide: !this.options.showPrevious})} onClick={::this.prePage}>
                        <i className="mcds-icon__left mcds-icon__previous mcds-icon__size-15" />
                        <span>{this.options.previousText}</span>
                    </li>
                    {this.renderPages()}
                    <li className={classnames('mcds-pagination__next mcds-list__item', {weak: !showNext, hide: !this.options.showNext})} onClick={::this.nextPage}>
                        <span>{this.options.nexText}</span>
                        <i className="mcds-icon__right mcds-icon__next mcds-icon__size-15" />
                    </li>

                    <li className={classnames('mcds-list__item mcds-pagination__jump', {hide: !this.options.showJumpPage})}>
                        <Input className="mcds-pagination__jump" onKeyUp={::this._handleOnKeyUp} placeholder={this.options.goToPlaceHoler} />
                    </li>
                    <li className={classnames('mcds-list__item mcds-pagination__submite', {hide: !this.options.showPerPageCount})} onClick={::this.jumpPage}>
                        <Button>
                            {this.options.GotoText}
                        </Button>
                    </li>
                    <li className="mcds-list__item mcds-pagination__perpage">
                        {perPage}
                    </li>
                </ul>
            </div>
        );
    }
}
Pagination.propTypes = {
    current: PropTypes.number.isRequired,
    className: PropTypes.string,
    options: PropTypes.object,
    perPage: PropTypes.array,
    total: PropTypes.number.isRequired,
    perPageCountValue: PropTypes.number,
    onChange: PropTypes.func,
    onPerPageChange: PropTypes.func
};

Pagination.defaultProps = {
    onChange: () => {},
    perPage: [15, 25, 50],
    onPerPageChange: () => {}
};

export default {
    Pagination
};
