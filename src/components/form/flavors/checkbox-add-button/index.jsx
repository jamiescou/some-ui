import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class CheckboxAddButton extends React.Component {
    static defaultProps = {
        callback: (val) => {
            console.log(val);
            return val;
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            checked: !!this.props.checked
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({checked: !!nextProps.checked});
    }

    handleChange(e){
        this.setState({checked: e.target.checked});
        this.props.callback(e.target.checked);
    }

    render(){
        return (
            <div className={classnames('mcds-checkbox__add', this.props.className)}>
                <input
                    className="mcds-assistive__text"
                    type="checkbox"
                    id={this.props.id}
                    name={this.props.name}
                    checked={this.state.checked}
                    disabled={this.props.disabled}
                    onChange={::this.handleChange} />
                <label htmlFor={this.props.id} className="mcds-checkbox__faux">
                    <span className="mcds-assistive__text">{this.props.label}</span>
                </label>
            </div>
        );
    }
}

CheckboxAddButton.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    callback: PropTypes.func
};

export default CheckboxAddButton;
