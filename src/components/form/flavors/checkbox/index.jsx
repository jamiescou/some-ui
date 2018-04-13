import React from 'react';
import PropTypes from 'prop-types';

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: !!this.props.checked
        };
    }

    componentWillReceiveProps(nextProps) {
        this.state = {
            checked: !!nextProps.checked
        };
    }

    handleChange(e){
        this.setState({checked: e.target.checked});
        this.props.onChange(e.target.checked);
    }

    handleClick() {
        this.setState({
            checked: !this.state.checked
        });
    }

    _renderCheckbox(){
        let checked = this.state.checked;
        let className = checked ? 'mcds-checkbox mcds-checkbox__checked' : 'mcds-checkbox';
        return (
            <div className={this.props.className}>
                <label className="mcds-checkbox__wrapper ">
                    <span className={className}>
                        <input
                            className="mcds-checkbox__input"
                            type="checkbox"
                            id={this.props.id}
                            name={this.props.name}
                            checked={checked}
                            disabled={this.props.disabled}
                            onChange={::this.handleChange}
                            ref="checkbox"
                            onClick={::this.handleClick} />
                        <span className="mcds-checkbox__inner" />
                    </span>
                    { this.props.label ? <span>{this.props.label}</span> : null }
                </label>
            </div>
        );
    }

    _renderRequiredCheckbox(){
        let checked = this.state.checked;
        let className = checked ? 'mcds-checkbox mcds-checkbox__checked' : 'mcds-checkbox';
        return (
            <div className={this.props.className}>
                <label className="mcds-checkbox__wrapper ">
                    <span className={className}>
                        <input
                            className="mcds-checkbox__input"
                            type="checkbox"
                            id={this.props.id}
                            name={this.props.name}
                            checked={checked}
                            disabled={this.props.disabled}
                            onChange={::this.handleChange}
                            ref="checkbox"
                            onClick={::this.handleClick} />
                        <span className="mcds-checkbox__inner" />
                    </span>
                    { this.props.label ? <span>{this.props.label}</span> : null }
                </label>
                { this.props.errorMsg ? <span className="mcds-span__required">{this.props.errorMsg}</span> : null }
            </div>
        );
    }

    _renderIndeterminateCheckbox() {
        let checked = this.state.checked;
        let className = checked ? 'mcds-checkbox mcds-checkbox__indeterminate' : 'mcds-checkbox';
        return (
            <div className={this.props.className}>
                <label className="mcds-checkbox__wrapper">
                    <span className={className}>
                        <input
                            className="mcds-checkbox__input"
                            type="checkbox"
                            id={this.props.id}
                            name={this.props.name}
                            checked={checked}
                            disabled={this.props.disabled}
                            onChange={::this.handleChange}
                            ref="checkbox"
                            onClick={::this.handleClick} />
                        <span className="mcds-checkbox__inner" />
                    </span>
                    { this.props.label ? <span>{this.props.label}</span> : null }
                </label>
            </div>
        );
    }

    render(){

        if (this.props.indeterminate) {
            return this._renderIndeterminateCheckbox();
        }
        if (this.props.required) {
            return this._renderRequiredCheckbox();
        }
        return this._renderCheckbox();
    }
}

Checkbox.defaultProps = {
    handleClick: () => {},
    onChange: () => {}
};

Checkbox.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    errorMsg: PropTypes.string,
    className: PropTypes.string,
    checked: PropTypes.bool,
    indeterminate: PropTypes.bool,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    handleClick: PropTypes.func,
    onChange: PropTypes.func
};

const CheckboxGroup = ({groupLable, className, children}) => (
    <div className={className}>
        <span className="mcds-ckeckbox-group__label">{groupLable}</span>
        <div>
            {children}
        </div>
    </div>
);

CheckboxGroup.propTypes = {
    groupLable: PropTypes.string,
    children: PropTypes.any,
    className: PropTypes.string
};

const RequiredCheckboxGroup = ({groupLable, children, errorMsg, className}) => (
    <div className={className}>
        <span className="mcds-ckeckbox-group__label">
            <span className="mcds-span__required">*</span>
            {groupLable}
        </span>
        <div>
            {children}
            <span className="mcds-span__required">{errorMsg}</span>
        </div>
    </div>
);

RequiredCheckboxGroup.propTypes = {
    groupLable: PropTypes.string,
    errorMsg: PropTypes.string,
    children: PropTypes.any,
    className: PropTypes.string
};

export default {
    Checkbox,
    CheckboxGroup,
    RequiredCheckboxGroup
};
