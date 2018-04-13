import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Radio extends React.Component {
    static defaultProps = {
        onChange: () => {}
    };

    constructor() {
        super();
    }

    handleOnChange() {
        this.props.onChange(this.node.value);
    }

    render() {

        let {id, name, className, disabled, checked, label, ...others} = this.props;
        return (
            <label className={classnames(className, 'mcds-radio__block')}>
                <span className="mcds-radio__checked">
                    <input
                        {...others}
                        id={id}
                        ref={ (node)=>{ this.node = node; } }
                        onChange={::this.handleOnChange}
                        className="mcds-radio"
                        type="radio"
                        name={name}
                        disabled={disabled}
                        defaultChecked={checked} />
                    <span className="mcds-radio__inner" />
                </span>
                {label}
            </label>
        );
    }
}

Radio.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.any,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func
};

const RadioGroup = ({groupLable, children, className}) => (
    <div className={className}>
        <span className="mcds-radio__group-label">{groupLable}</span>
        <div>
            {children}
        </div>
    </div>
);

RadioGroup.propTypes = {
    groupLable: PropTypes.string,
    children: PropTypes.any,
    className: PropTypes.string
};

const RequiredRadioGroup = ({groupLable, children, errorMsg, className}) => (
    <div className={className}>
        <span className="mcds-radio__group-label"><span className="mcds-span__required">*</span>{groupLable}</span>
        <div>
            {children}
            <span className="mcds-span__required">{errorMsg}</span>
        </div>
    </div>
);

RequiredRadioGroup.propTypes = {
    groupLable: PropTypes.string,
    errorMsg: PropTypes.string,
    children: PropTypes.any,
    className: PropTypes.string
};

export default {
    Radio,
    RadioGroup,
    RequiredRadioGroup
};
