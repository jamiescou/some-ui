import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export class TextArea extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        let {active} = this.props;
        if (active === true && this.refs.textarea) {
            this.refs.textarea.focus();
        }
    }

    handleChange() {
        this.props.onChange(this.refs.textarea.value);
    }

    render() {
        let {className, label, placeholder, error, ...others} = this.props;
        return (
            <div className={classnames('mcds-textarea__container', className, {'mcds-textarea__border': error})}>
                { label ? <label className="mcds-label">{label}</label> : null }
                <div>
                    <textarea
                        {...others}
                        onChange={::this.handleChange}
                        ref="textarea"
                        className="mcds-textarea"
                        type="text"
                        placeholder={placeholder} />
                </div>
            </div>
        );
    }
}

TextArea.defaultProps = {
    onChange: () => {}
};

TextArea.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.bool,
    active: PropTypes.bool
};

export const DisabledTextArea = ({className, label, placeholder, error, ...others}) => (
    <div className={classnames('mcds-textarea__container', className, {'mcds-textarea__border': error})}>
        { label ? <label className="mcds-label">{label}</label> : null }
        <div>
            <textarea {...others} className="mcds-textarea__disabled" type="text" placeholder={placeholder} disabled />
        </div>

    </div>
);

DisabledTextArea.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.bool
};

export const ReadOnlyTextArea = ({className, label, placeholder, error}) => (
    <div className={classnames('mcds-textarea__container', className, {'mcds-textarea__border': error})}>
        { label ? <label className="mcds-label">{label}</label> : null }
        <div className="mcds-textarea__readonly">
            <p>{placeholder}</p>
        </div>
    </div>
);

ReadOnlyTextArea.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.bool
};
