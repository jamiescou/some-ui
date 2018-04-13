import React from 'react';
import { Loading } from './index';
import ReactMarkdown from 'react-markdown';

export default [
    {
        id: 'Loading',
        element: <Loading theme="logo" model="tiny" />,
        intro: <ReactMarkdown className="markdown" source={'#### Loadings\r\n* theme 两个值\r\n   * base: 不带美洽logo. \r\n   * logo: 带美洽logo\r\n\r\n* model 表示大小。\r\n   * tiny : 20px\r\n   * small: 30px\r\n   * default: 40px\r\n   * large : 50px'} />
    },
    {
        id: 'Loading',
        element: <Loading theme="logo" model="small" />
    },
    {
        id: 'Loading',
        element: <Loading theme="logo" model="default" />
    },
    {
        id: 'Loading',
        element: <Loading theme="logo" model="large" />
    },
    {
        id: 'Loading',
        element: <Loading theme="base" model="tiny" />
    },
    {
        id: 'Loading',
        element: <Loading theme="base" model="small" />
    },
    {
        id: 'Loading',
        element: <Loading theme="base" model="default" />
    },
    {
        id: 'Loading',
        element: <Loading theme="base" model="large" />
    }
];
