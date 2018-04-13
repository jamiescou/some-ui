import React from 'react';

import { Cascader } from './index';
import {Button} from '../buttons/index';
const exampleData = [
    {
        name: 'one',
        value: '0',
        children: [
            {
                name: 'one-child',
                value: '0-1',
                children: [
                    {
                        name: 'one-son',
                        value: '0-1-0'
                    }
                ]
            },
            {
                name: 'two-child',
                value: '0-2',
                children: [
                    {
                        name: 'two-son',
                        value: '0-2-0'
                    }
                ]
            },
            {
                name: 'one-child',
                value: '0-3'
            },
            {
                name: 'two-child',
                value: '0-4'
            },
            {
                name: 'one-child',
                value: '0-5'
            },
            {
                name: 'two-child',
                value: '0-6'
            },
            {
                name: 'one-child',
                value: '0-1'
            },
            {
                name: 'two-child',
                value: '0-2'
            },
            {
                name: 'one-child',
                value: '0-1'
            },
            {
                name: 'two-child',
                value: '0-2'
            },
            {
                name: 'one-child',
                value: '0-1',
                children: [
                    {
                        name: 'two-son',
                        value: '1-2-0'
                    }
                ]
            },
            {
                name: 'two-child',
                value: '0-2',
                children: [
                    {
                        name: 'two-son',
                        value: '1-2-0'
                    }
                ]
            },
            {
                name: 'one-child',
                value: '0-1',
                children: [
                    {
                        name: 'two-son',
                        value: '1-2-0'
                    }
                ]
            },
            {
                name: 'two-child',
                value: '0-2'
            }
        ]
    },
    {
        name: 'two',
        value: '1',
        children: [
            {
                name: 'one-child',
                value: '1-1',
                children: [
                    {
                        name: 'two-son',
                        value: '1-2-0'
                    }
                ]
            },
            {
                name: 'two-child',
                value: '1-2',
                children: [
                    {
                        name: 'two-son',
                        value: '2-2-0'
                    }
                ]
            }
        ]
    },
    {
        name: '特斯轼',
        value: 't'
    }
];
const SingleCascader = () =>
    <Cascader error={true} data={exampleData} onChange={(v) => { console.log('single change', v); }} type="single" placement="right">
        <Button className="mcds-button__brand">单项选择</Button>
    </Cascader>;
export default SingleCascader;
