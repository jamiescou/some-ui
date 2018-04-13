import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class AlternateRadio extends React.Component {
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
        this.props.callback(e.target.checked);
    }
    render(){
        return (
            <span className={classnames('mcds-radio__button', this.props.className)}>
                <label className="mcds-radio-button__label">
                    <input
                        name={this.props.name}
                        type="radio"
                        id={this.props.id}
                        checked={this.props.checked}
                        disabled={this.props.disabled}
                        onClick={::this.handleChange} />
                    <span className="mcds-radio__faux">
                        {this.props.children}
                    </span>
                </label>
            </span>
        );
    }
}

AlternateRadio.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.string,
    checked: PropTypes.string,
    children: PropTypes.any,
    callback: PropTypes.func
};



const AlternateGroup = ({className, children, label}) => (
    <div className={classnames(className)}>
        <div className="mcds-form-element__label">{label}</div>
        <div>
            <div className="mcds-radio-button__group">
                {children}
            </div>
        </div>
    </div>
);

AlternateGroup.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any
};

export default{
    AlternateRadio,
    AlternateGroup
};
