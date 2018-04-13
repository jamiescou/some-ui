import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class TextAreaRequired extends React.Component{
    static propTypes = {
        id: PropTypes.string.isRequired,
        icon: PropTypes.string,
        className: PropTypes.string,
        errorMsg: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        name: PropTypes.string.isRequired,
        validFun: PropTypes.func,
        error: PropTypes.bool,
        onChange: () => {}
    }

    static defaultProps = {
        name: 'name',
        required: null,
        validFun: (val) => {
            return val.trim() === '';
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            requiredFlag: false
        };
    }

    requiredBlur(){
        let val = this.props.validFun(this.refs.textarea.value);
        this.setState({requiredFlag: val});
    }

    handleOnChange() {
        this.props.onChange(this.refs.textarea.value);
    }

    render() {
        let { error } = this.props;
        const requireTextArea = this.state.requiredFlag ? 'mcds-textarea__required' : '';
        const requiredErrorSpan = this.state.requiredFlag ? <span className="mcds-span__required"><i className={this.props.icon} />{this.props.errorMsg}</span> : '';
        const textareaLabel = this.props.label ? <label className="mcds-label"><span className="mcds-span__required">*</span>{this.props.label}</label> : null;
        return (
            <div className={classnames('mcds-textarea__container', this.props.className, {'mcds-textarea__border': error})}>
                { textareaLabel }
                <textarea
                    id={this.props.id}
                    ref="textarea"
                    type="text"
                    onChange={::this.handleOnChange}
                    name={this.props.name}
                    className={classnames('mcds-textarea', requireTextArea)}
                    placeholder={this.props.placeholder}
                    onBlur={::this.requiredBlur} />
                {requiredErrorSpan}
            </div>
        );
    }
}
