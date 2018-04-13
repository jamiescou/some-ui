import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const FileSelector = ({id, accept, label, className, error, iconContent, dropContent, Icon, drop, ...others}) => (
    <div className="mcds-form__element">
        { label ? <span className="mcds-files__label">{label}</span> : null }
        <div className="mcds-form-element__control">
            <div className={classnames('mcds-file__selector', className)}>
                <div {...others} className={classnames(' ', drop ? 'mcds-file-selector__dropzone': null)}>
                    <label className="mcds-file-selector__body">
                        <input className="mcds-file-selector__input mcds-assistive__text" accept={accept} type="file" id={id} />
                        <span className="mcds-button mcds-button__currency">
                            <span className={classnames('mcds-vertical__sub mcds-text__size-20', Icon)} />{iconContent}
                        </span>
                        { drop ? <span className="mcds-file-selector__text mcds-medium__show">{dropContent}</span> : null }
                    </label>
                </div>
            </div>
        </div>
        { error ? <div className="mcds-form-element__help">{error}</div> : null }
    </div>
);

FileSelector.propTypes = {
    id: PropTypes.string,
    drop: PropTypes.bool,
    accept: PropTypes.string,
    label: PropTypes.string,
    Icon: PropTypes.string,
    className: PropTypes.string,
    error: PropTypes.string,
    iconContent: PropTypes.string,
    dropContent: PropTypes.string
};
