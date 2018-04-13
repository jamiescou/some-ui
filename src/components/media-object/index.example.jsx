import React from 'react' ;
import ReactMarkdown from 'react-markdown';

const MediaObjectExample = () => (
    <div className="mcds-media" >
        <div className="mcds-media__figure">
            <div style={{background: 'red', padding: '10px', borderRadius: '3px'}}>
                <span className="mcds-icon__robot-line-medium" />
            </div>
        </div>
        <div className="mcds-media__body">
            <span>some content</span>
        </div>
    </div>
);

const code = `
<div  className="mcds-media" >
    <div className="mcds-media__figure">
        ...
    </div>
    <div className="mcds-media__body">
        ...
    </div>
</div>
`;

const intro  = '##### MediaObject 一个左右结构,自适应的结构\r\n\r\n *不提供任何组件* 只提供了一套样式.';
export default [
    {
        id: 'MediaObject',
        element: <MediaObjectExample />,
        intro: <ReactMarkdown className="markdown" source={intro} />,
        code: code
    }
];
