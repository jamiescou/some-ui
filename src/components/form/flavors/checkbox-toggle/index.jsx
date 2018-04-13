import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class CheckboxToggle extends React.Component {
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
        const toggleLabel = this.props.lable ? <span className="mcds-toggle__label">{this.props.lable}</span> : null;
        return (
            <div>
                <label className={classnames('mcds-grid', this.props.className)} htmlFor={this.props.id}>
                    { toggleLabel }
                    <input name="checkbox" type="checkbox" disabled={this.props.disabled} checked={this.state.checked} onChange={::this.handleChange} />
                    <span id="toggle-desc" className="mcds-toggle__container" aria-live="assertive">
                        <span className="mcds-toggle__checkbox" />
                    </span>
                </label>
            </div>
        );
    }
}

CheckboxToggle.propTypes = {
    id: PropTypes.string,
    lable: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    callback: PropTypes.func
};
