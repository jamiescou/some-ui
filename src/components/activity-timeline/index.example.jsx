/**
 * 存放示例
 */
import React from 'react';
// import ReactMarkdown from 'react-markdown';

import Call from './flavor/call';
import Email from './flavor/email';
import Event from './flavor/event';
import Task from './flavor/task';


const ComplexExample = (
    <div className="mcds-timeline__list mcds-p__t-20">
        <div className="mcds-timeline__list-header mcds-p__b-20 mcds-p__l-20">
            <span className="mcds-truncate mcds-text__size-16">记录11</span>
        </div>
        <ul>
            <li className="mcds-timeline__list-item">
                {Call.element}
            </li>
            <li className="mcds-timeline__list-item">
                {Email.element}
            </li>
            <li className="mcds-timeline__list-item">
                {Event.element}
            </li>
        </ul>
    </div>
);

export default [
    Call,
    Email,
    Event,
    Task,
    {
        id: 'complex1',
        element: ComplexExample,
        intro: 'good'
    }
];
