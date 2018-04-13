import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const IntegratedFileSelector = ({id, accept, className, drag, draggover, draggoverError, children, errorMsg, dropContent, ...others}) => (
    <div {...others} className={classnames('mcds-file-selector mcds-file-selector-integrated', className)}>
        <div className={classnames('mcds-file-selector__dropzone mcds-file-selector__dropzone-integrated', drag ? 'mcds-has-drag' : null, draggover ? 'mcds-has-drag-over' : null)} aria-hidden="true">
            <label className="mcds-file-selector__body mcds-file-selector__body-integrated">
                <input className="mcds-file-selector__input mcds-assistive-text" accept={accept || 'image/png'} type="file" id={id} disabled={draggoverError} />
                { draggoverError ? <span className="mcds-text__size-40 mcds-icon__prohibit-line-20" /> : <span className="mcds-text__size-40 mcds-icon__upload-line-20" /> }

                <span className="mcds-file-selector__text mcds-file-selector__text-integrated mcds-text-heading-medium mcds-text-align-center">
                    { draggoverError ? errorMsg : dropContent }
                </span>
            </label>
        </div>
        { children }
    </div>
);

IntegratedFileSelector.propTypes = {
    id: PropTypes.string,
    accept: PropTypes.string,
    errorMsg: PropTypes.string,
    className: PropTypes.string,
    drag: PropTypes.bool,
    draggover: PropTypes.bool,
    draggoverError: PropTypes.bool,
    children: PropTypes.any,
    dropContent: PropTypes.string
};
