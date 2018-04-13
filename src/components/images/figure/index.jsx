import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ButtonGroup } from './../../button-group/index';
import { ButtonIcon } from './../../button-icon/index';

export const Image = ({className, cropClass, titleClass, image, actions, title, imgSrc, imgIcon, iconClass, ...others}) => {

    let imageContent = <img src={imgSrc} alt="Description of the image" />;
    let actionsContent = (
        <ButtonGroup className="mcds-image__actions">
            <ButtonIcon className="mcds-button__item" icon="mcds-icon__download-line-20" />
            <ButtonIcon className="mcds-button__item" icon="mcds-icon__triangle-solid-14" />
        </ButtonGroup>
    );

    let imgIconContent = (
        <span className="mcds-icon_container">
            <span className={classnames('mcds-icon mcds-icon__size-20 mcds-icon__left', imgIcon)} />
        </span>
    );

    if (image) {
        imageContent = <img src={imgSrc} alt="Description of the image" />;
    } else {
        imageContent = (
            <span className="mcds-image__icon" >
                <span className={classnames('mcds-icon', imgIcon, iconClass)} />
                <span className="mcds-assistive-text">{ title || 'Image Title' }</span>
            </span>
        );
    }

    return (
        <figure {...others} className={classnames('mcds-image', className)}>
            <a href="javascript:void(0);" className={classnames('mcds-image__crop', cropClass)}>
                { imageContent }
            </a>
            { actions ? actionsContent: null }
            <figcaption className={classnames('mcds-image__title', titleClass)}>
                { imgIcon ? imgIconContent : null }
                <span className="mcds-image__text mcds-truncate" title={ title || 'Image Title' }>
                    { title || 'Image Title' }
                </span>
            </figcaption>
        </figure>
    );
};

Image.propTypes = {
    className: PropTypes.string,
    cropClass: PropTypes.string,
    titleClass: PropTypes.string,
    image: PropTypes.bool,
    actions: PropTypes.bool,
    title: PropTypes.string,
    imgSrc: PropTypes.string,
    imgIcon: PropTypes.string,
    iconClass: PropTypes.string
};
