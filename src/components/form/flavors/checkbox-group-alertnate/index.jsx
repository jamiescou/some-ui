import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class AlternateCheckbox extends React.Component {
    static defaultProps = {
        callback: (val) => {
            return val;
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            checked: !!this.props.checked
        };
    }
    handleChange(e){
        this.setState({checked: e.target.checked});
        this.props.callback(e.target.checked);
    }
    render(){
        return (
            <span className={classnames('mcds-checkbox__button', this.props.className)}>
                <input
                    name={this.props.name}
                    type="checkbox"
                    id={this.props.id}
                    ref={this.props.id}
                    value={this.props.value}
                    disabled={this.props.disabled}
                    checked={this.state.checked}
                    onChange={::this.handleChange} />
                <label className="mcds-checkbox-button__label" htmlFor={this.props.id}>
                    <span className="mcds-checkbox__faux">
                        {this.props.children}
                    </span>
                </label>
            </span>
        );
    }
}

AlternateCheckbox.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.string,
    checked: PropTypes.string,
    children: PropTypes.any,
    callback: PropTypes.func
};

const AlternateCheckboxGroup = ({className, label, children}) => (
    <div className={classnames(className)}>
        { label ? <div className="mcds-form-element__label">{label}</div> : null }
        <div>
            <div className="mcds-checkbox-button__group">
                {children}
            </div>
        </div>
    </div>
);

AlternateCheckboxGroup.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.any
};

export default {
    AlternateCheckbox,
    AlternateCheckboxGroup
};
