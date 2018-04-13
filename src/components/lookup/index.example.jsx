import React from 'react' ;
import ReactMarkdown from 'react-markdown';
import { Lookup } from './index';
let objectList = [
    {
        icon: 'mcds-icon__telephone-solid-24',
        value: 'standard',
        content: '标准对象'
    },
    {
        icon: 'mcds-icon__telephone-solid-24',
        value: 'leads',
        content: '线索对象'
    }
];
let Data = [
    {
        id: 1,
        name: 'abc',
        avatar: 'http://cdnimg103.lizhi.fm/audio_cover/2016/06/30/29596504232305031_320x320.jpg'
    },
    {
        id: 2,
        name: 'abc123',
        avatar: 'http://cdnimg103.lizhi.fm/audio_cover/2016/06/30/29596504232305031_320x320.jpg'
    },
    {
        id: 3,
        name: 'abc123',
        avatar: 'http://cdnimg103.lizhi.fm/audio_cover/2016/06/30/29596504232305031_320x320.jpg'
    },
    {
        id: 4,
        name: 'abc123',
        avatar: 'http://cdnimg103.lizhi.fm/audio_cover/2016/06/30/29596504232305031_320x320.jpg'
    },
    {
        id: 5,
        name: 'abc',
        avatar: 'http://cdnimg103.lizhi.fm/audio_cover/2016/06/30/29596504232305031_320x320.jpg'
    },
    {
        id: 6,
        name: 'abc',
        avatar: 'http://cdnimg103.lizhi.fm/audio_cover/2016/06/30/29596504232305031_320x320.jpg'
    },
    {
        id: 71,
        name: 'abc',
        avatar: 'http://cdnimg103.lizhi.fm/audio_cover/2016/06/30/29596504232305031_320x320.jpg'
    },
    {
        id: 7,
        name: 'abc',
        avatar: 'http://cdnimg103.lizhi.fm/audio_cover/2016/06/30/29596504232305031_320x320.jpg'
    },
    {
        id: 9,
        name: 'abc',
        avatar: 'http://cdnimg103.lizhi.fm/audio_cover/2016/06/30/29596504232305031_320x320.jpg'
    },
    {
        id: 10,
        name: 'abc',
        avatar: 'http://cdnimg103.lizhi.fm/audio_cover/2016/06/30/29596504232305031_320x320.jpg'
    }

];

let newDate = [
    {
        id: 1,
        name: 'abcfff',
        avatar: 'http://cdnimg103.lizhi.fm/audio_cover/2016/06/30/29596504232305031_320x320.jpg'
    },
    {
        id: 2,
        name: 'abc',
        avatar: 'http://cdnimg103.lizhi.fm/audio_cover/2016/06/30/29596504232305031_320x320.jpg'
    }
];


class DefaultLookup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: Data,
            value: []
        };
    }
    toggleDefaultValue() {
        let value = [
            {
                id: 2,
                name: Math.random().toString(),
                avatar: 'http://cdnimg103.lizhi.fm/audio_cover/2016/06/30/29596504232305031_320x320.jpg'
            }
        ];

        this.setState({
            value: value
        });
    }
    resetDefaultValue() {
        this.setState({
            value: []
        });
    }
    onKeyDown() {
        this.setState({data: newDate});
    }
    render() {
        let value = this.state.value;
        let defaultValue = [
            {
                id: 2,
                name: '123',
                avatar: 'http://cdnimg103.lizhi.fm/audio_cover/2016/06/30/29596504232305031_320x320.jpg'
            }
        ];
        return (
            <div>
                <button onClick={::this.resetDefaultValue}>reset</button>
                <button onClick={::this.toggleDefaultValue}>toggle</button>
                <Lookup
                    error={false}
                    type="single"
                    onChange={(v) => { console.log('v', v); }}
                    defaultValue={defaultValue}
                    onKeyDown={::this.onKeyDown}
                    objectList={objectList}
                    data={this.state.data} value={value} />
            </div>
        );
    }
}

const defaultLookupCode = `

`;

const intro  = '##### MediaObject 一个左右结构,自适应的结构\r\n\r\n *不提供任何组件* 只提供了一套样式.';
export default [
    {
        id: 'default',
        element: <DefaultLookup />,
        intro: <ReactMarkdown className="markdown" source={intro} />,
        code: defaultLookupCode
    }
];
