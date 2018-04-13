import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Input extends Component {
    static propTypes = {
        id: PropTypes.string,
        icon: PropTypes.string,
        errorMsg: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        name: PropTypes.string.isRequired,
        validFun: PropTypes.func,
        required: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        error: PropTypes.bool
    };

    static defaultProps = {
        name: 'name',
        required: null,
        validFun: (val) => {
            return val.trim() === '';
        },
        onChange: () => {}
    };

    constructor(props) {
        super(props);
        this.state = {
            requiredFlag: false
        };
    }

    requiredBlur(){
        let val = this.props.validFun(this.node.value);
        this.setState({requiredFlag: !!val});
    }

    handleOnChage() {
        this.props.onChange(this.node.value);
    }

    _renderErrorSpan() {
        let result = null;
        if (this.props.errorMsg && this.state.requiredFlag) {
            result = <span className="mcds-span__required"><i className={this.props.icon} />{this.props.errorMsg}</span>;
        }
        return result;
    }

    render(){
        const requireInput = this.state.requiredFlag ? 'mcds-input__required' : '';
        let { error } = this.props;
        return (
            <div className={classnames('mcds-input__container', {'mcds-input__border': error})}>
                { this.props.label ? <label className="mcds-label"><span className="mcds-span__required">*</span> { this.props.label }</label> : null }
                <input
                    id={this.props.id}
                    className={classnames('mcds-input', requireInput)}
                    name={this.props.name} type="text"
                    ref={(node) => { this.node = node; }}
                    autoComplete="off"
                    placeholder={this.props.placeholder}
                    required={this.props.required}
                    onBlur={::this.requiredBlur}
                    onChange={::this.handleOnChage}
                    defaultValue={this.props.value} />
                {this._renderErrorSpan()}
            </div>
        );
    }
}
