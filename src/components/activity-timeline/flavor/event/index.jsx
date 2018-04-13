import React from 'react';
import {
  ButtonSmallIcon
} from '../../../button-icon';
const Demo = (
    <div className="mcds-media mcds-timeline">
        <div className="mcds-media__body">
            {/** mcds-timeline-(call || email || event ||Task) **/}
            <div className="mcds-media mcds-timeline__media mcds-timeline__media-event">
                <div className="mcds-media__figure mcds-timeline__icon">
                    <div className="mcds-icon__container mcds-icon__container-24">
                        <span className="mcds-icon__event-solid-24 mcds-timeline__icon-inside" />
                    </div>
                </div>
                <div className="mcds-media__body mcds-timeline__content">
                    <h3 className="mcds-truncate" title="Mobile conversation on Monday">
                        <a href="javascript:void(0);">Event conversation on Monday</a>
                    </h3>
                    <p className="mcds-truncate mcds-text mcds-text__size-12" title="Lei seemed interested in closing this deal quickly! Let’s move.">Lei seemed interested in closing this deal quickly! Let’s move.</p>
                    <ul className="mcds-list__horizontal">
                        <li className="mcds-list__item">
                            <span className="mcds-timeline__text-title mcds-text__size-12">Name:</span>
                            <span className="mcds-timeline__text-body mcds-text__size-12"><a href="javascript:void(0);">Lei Chan</a></span>
                        </li>
                        <li className="mcds-list__item">
                            <span className="mcds-timeline__text-title mcds-text__size-12">Name:</span>
                            <span className="mcds-timeline__text-body mcds-text__size-12"><a href="javascript:void(0);">Lei Chan</a></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="mcds-media__figure mcds-media__figure--reverse">
            <div className="mcds-timeline__actions">
                <span className="mcds-text__size-12">Feb 2124</span>
                <ButtonSmallIcon icon="mcds-icon__triangle-solid-14" />
            </div>
        </div>
    </div>
);

export default {
    id: 'timeline-event',
    intro: 'call',
    element: Demo
};
