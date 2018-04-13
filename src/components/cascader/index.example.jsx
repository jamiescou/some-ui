import React from 'react';
// import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';

import { Cascader} from './index';
import  SingleCascader from './single-select';
// import {DropDown, DropDownList, DropDownItem, DropDownItemDivider, DropDownItemHeader} from '../dropdown';

// import {InputSearch} from '../index';
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
                        value: '0-2-0',
                        children: [
                            {
                                name: 'one-child-son',
                                value: '0-2-0-0',
                                children: [
                                    {
                                        name: 'one-son-son',
                                        value: '0-2-0-0-0',
                                        children: [
                                            {
                                                name: 'one-child-son-son',
                                                value: '0-2-0-0-0-0',
                                                children: [
                                                    {
                                                        name: 'one-son-son-son',
                                                        value: '0-2-0-0-0-0-0',
                                                        children: [
                                                            {
                                                                name: 'one-child-son-son-son',
                                                                value: '0-2-0-0-0-0-0-0'
                                                            },
                                                            {
                                                                name: 'two-child-son-son-son',
                                                                value: '0-2-0-0-0-0-0-1'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: 'one-child',
                value: '0-3',
                children: [
                    {
                        name: 'two-son',
                        value: '0-3-0',
                        children: [
                            {
                                name: 'one-child-son',
                                value: '0-3-0-0',
                                children: [
                                    {
                                        name: 'one-son-son',
                                        value: '0-3-0-0-0',
                                        children: [
                                            {
                                                name: 'one-child-son-son',
                                                value: '0-3-0-0-0-0',
                                                children: [
                                                    {
                                                        name: 'one-son-son-son',
                                                        value: '0-3-0-0-0-0-0',
                                                        children: [
                                                            {
                                                                name: 'one-child-son-son-son',
                                                                value: '0-3-0-0-0-0-0-0'
                                                            },
                                                            {
                                                                name: 'two-child-son-son-son',
                                                                value: '0-3-0-0-0-0-0-1'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
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
                        value: '1-1-0'
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
const defaultValue = [
    '0-3-0-0-0-0-0-0', '0-2-0-0-0-0-0-1'
];

const MultiCascader = () =>
    <Cascader
        error={true}
        data={exampleData}
        defaultValue={defaultValue}
        onChange={(v) => { console.log('multi change', v); }}
        type="multi"
        placement="right" >
        <Button className="mcds-button__brand">多选择</Button>
    </Cascader>;

const SingleCascaderExample = `
class Example extends React.Component { 
    ...
    render() {
       const  exampleData = [
            {
                name:'one',
                value:'0',
                children:[
                    {
                        name:'one-child',
                        value:'0-1'
                    },
                     {
                        name:'two-child',
                        value:'0-2'
                    }
                ]
            },
            {
                name:'特斯轼',
                value:'t'
            }
        ];
        return (
            <Cascader data={exampleData} defaultValue={['t']} onChange={(v) => {console.log('multi change',v);}} type='multi' placement='right'>
                <Button className="mcds-button__brand">单项选择</Button>
            </Cascader>; 
        );
    }
}`;
const MultiCascaderExample = `
class Example extends React.Component { 
    ...
    render() {
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
                                value: '0-2-0',
                                children: [
                                    {
                                        name: 'one-child-son',
                                        value: '0-2-0-0',
                                        children: [
                                            {
                                                name: 'one-son-son',
                                                value: '0-2-0-0-0',
                                                children: [
                                                    {
                                                        name: 'one-child-son-son',
                                                        value: '0-2-0-0-0-0',
                                                        children: [
                                                            {
                                                                name: 'one-son-son-son',
                                                                value: '0-2-0-0-0-0-0',
                                                                children: [
                                                                    {
                                                                        name: 'one-child-son-son-son',
                                                                        value: '0-2-0-0-0-0-0-0'
                                                                    },
                                                                    {
                                                                        name: 'two-child-son-son-son',
                                                                        value: '0-2-0-0-0-0-0-1'
                                                                    }
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },
                                        ]
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        name: 'one-child',
                        value: '0-3',
                        children: [
                            {
                                name: 'two-son',
                                value: '0-3-0',
                                children: [
                                    {
                                        name: 'one-child-son',
                                        value: '0-3-0-0',
                                        children: [
                                            {
                                                name: 'one-son-son',
                                                value: '0-3-0-0-0',
                                                children: [
                                                    {
                                                        name: 'one-child-son-son',
                                                        value: '0-3-0-0-0-0',
                                                        children: [
                                                            {
                                                                name: 'one-son-son-son',
                                                                value: '0-3-0-0-0-0-0',
                                                                children: [
                                                                    {
                                                                        name: 'one-child-son-son-son',
                                                                        value: '0-3-0-0-0-0-0-0'
                                                                    },
                                                                    {
                                                                        name: 'two-child-son-son-son',
                                                                        value: '0-3-0-0-0-0-0-1'
                                                                    }
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },
                                        ]
                                    },
                                ]
                            }
                        ]
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
        const defaultValue = [
            '0-3-0-0-0-0-0-0', '0-2-0-0-0-0-0-1'
        ]
        return (
            <Cascader data={exampleData} defaultValue={defaultValue} onChange={(v) => { console.log('multi change', v); }} type="multi" placement='right'>
                <Button className="mcds-button__brand">多选择</Button>
            </Cascader>;
        );
    }
}`;
const introMulti = '##### Cascader提供以下参数\r\n\r\n- Cascader-Multi\r\n\t- data 基本数据（name为显示的字，value为调用的值，有下一级则加children）\r\n\t- defaultValue 默认被选中（数组，传入对象的value即可，如果是多层级的，传入最小children的value）\r\n\t- placement 弹出方向 支持left/right 如left为向左弹（children也是向左）\t\r\n\t- type multi单选或者多选,多选可不填\t\r\n\t- onChange 父亲传入的回掉\r\n';
const introSingle = '##### 单选不同处\r\n\r\n- defaultValue 默认被选中 传入数字或者字符串\r\n\t- type single单选或者多选,默认为单选\r\n';

export default [
    {
        id: 'Cascader-Multi',
        element: <MultiCascader />,
        intro: <ReactMarkdown className="markdown" source={introMulti} />,
        code: MultiCascaderExample
    },
    {
        id: 'Cascader-Single',
        element: <SingleCascader />,
        intro: <ReactMarkdown className="markdown" source={introSingle} />,
        code: SingleCascaderExample
    }
    // {
    //     id: 'MenuSelect-single',
    //     element: <SingleSelect />,
    //     intro: <ReactMarkdown className="markdown" source={MenuSelectIntro} />
    // },
    // {
    //     id: 'MenuSelect-multi',
    //     element: <MultiSelect />,
    //     intro: '这是一个多选',
    //     code: MultiSelectCode
    // },
    // {
    //     id: 'PopoverSelect',
    //     element: PopoverSelect,
    //     intro: <ReactMarkdown className="markdown" source={PopSelectIntro} />
    // },
    // {
    //     id: 'PopoverSelect-noarrow',
    //     element: PopoverSelectWithoutArrow,
    //     intro: ''
    // },
    // {
    //     id: 'MenuExtend',
    //     element: <ExtendSelect />,
    //     intro: <ReactMarkdown className="markdown" source={ExtendIntro} />,
    //     code: ExtendSelectCode
    // }
];

