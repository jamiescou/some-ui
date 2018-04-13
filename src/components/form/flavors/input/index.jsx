/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function checkString(ele, className) {
    if (!ele) { return false; }
    if (typeof ele === 'string') {
        return <span className={`${ele} ${className}`} />;
    }
    let tmp = React.cloneElement(ele);
    return React.cloneElement(ele, {className: `${tmp.props.className} ${className || ''}` });
}

function handleLabel(label, id) {
    if (!label) { return false; }
    if (typeof label === 'string') {
        return <label className="mcds-label">{label}</label>;
    }
    return React.cloneElement(label, {className: 'mcds-label', htmlFor: id });
}

export class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: this.props.error};
    }
    
    componentWillReceiveProps(nextProps) {
        let error = nextProps.error;
        this.setState({error: error});
    }

    componentDidMount() {
        let {active} = this.props;
        if (active === true) {
            this.refs.node && this.refs.node.focus();
        }
    }
    
    handleChange() {
        this.props.onChange(this.refs.node.value);
    }

    render() {
        let {className, id, label, placeholder, iconLeft, onClick, iconRight, error, active, ...others} = this.props;
        return (
            <div className={classnames('mcds-input__container', className, {'mcds-input__border': error})}>
                {handleLabel(label, id)}
                {/* 为这个div加一个onClick事件,而不是加在input上. 是为了捕获iconLeft,iconRight,input的点击 */}
                <div className="mcds-form__control" onClick={onClick}>
                    {checkString(iconLeft, 'mcds-search__left')}
                    <input
                        {...others}
                        className={classnames('mcds-input', {'mcds-left__search': iconLeft, 'mcds-right__search': iconRight})}
                        id={id}
                        type="text"
                        placeholder={placeholder}
                        autoComplete="off"
                        ref="node"
                        onChange={::this.handleChange} />
                    {checkString(iconRight, 'mcds-search__right')}
                </div>
            </div>
        );
    }
}



Input.defaultProps = {
    onChange: ()=>{}
};

Input.propTypes = {
    id: PropTypes.string,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    iconRight: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    iconLeft: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    error: PropTypes.bool,
    active: PropTypes.bool
};

// disabled input
export const DisabledInput = ({id, className, label, placeholder, error, ...others}) => (
    <div className={classnames('mcds-input__container', className, {'mcds-input__border': error})}>
        { label ? <label className="mcds-label" htmlFor={id}>{label}</label> : null }
        <div>
            <input
                {...others}
                className="mcds-input mcds-disabled"
                id={id} type="text"
                placeholder={placeholder}
                autoComplete="off"
                disabled />
        </div>
    </div>
);

DisabledInput.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.bool
};

// 只读input
export const ReadOnlyInput = ({className, label, value, error}) => (
    <div className={classnames('mcds-input__container', className, {'mcds-input__border': error})} >
        { label ? <label className="mcds-label">{label}</label> : null }
        <div className="mcds-bottom__line">
            <span className="mcds-readonly__span">{value}</span>
        </div>
    </div>
);

ReadOnlyInput.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.any,
    error: PropTypes.bool
};

// 左右带符号的只读text
export const ReadOnlyFixedText = ({className, label, left, right, value, error}) => (
    <div className={classnames('mcds-input__container', className, {'mcds-input__border': error})} >
        { label ? <label className="mcds-label">{label}</label> : null }
        <div className="mcds-bottom__line">
            <span className="mcds-p__r-8 mcds-readonly-span__addon">{left}</span>
            <span className="mcds-readonly__span">{value}</span>
            <span className="mcds-p__l-8">{right}</span>
        </div>
    </div>
);

ReadOnlyFixedText.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string,
    value: PropTypes.any,
    error: PropTypes.bool
};

// 左右带符号的input
export const FixedInput = ({className, value, label, placeholder, left, right, onChange, error, ...others}) => (
    <div className={classnames('mcds-input__container', className, {'mcds-input__border': error})} >
        { label ? <label className="mcds-label">{label}</label> : null }
        <div className="mcds-fiexed__container">
            { left ? <span className="mcds-input-span__addon mcds-mg__right">{left}</span> : '' }
            <input
                value={value}
                className="mcds-input"
                type="text"
                placeholder={placeholder}
                onChange={(e) => {
                    onChange(e.target.value)
                }}
                autoComplete="off" />
            { right ? <span className="mcds-input-span__addon mcds-mg__left">{right}</span> : ''}
        </div>
    </div>
);

FixedInput.defaultProps = {
    onChange: ()=>{}
};

FixedInput.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string,
    value: PropTypes.any,
    placeholder: PropTypes.any,
    onChange: PropTypes.func,
    error: PropTypes.bool
};
