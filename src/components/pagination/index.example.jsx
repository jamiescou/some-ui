import React, { Component } from 'react' ;
import ReactMarkdown from 'react-markdown';
import {Pagination} from './index';

class Example extends Component {
    constructor(){
        super();
        this.state = {
            current: 1,
            perPageCountValue: 9
        };
    }
    setPage(i) {
        this.setState({current: i});
    }

    render() {
        return (
            <Pagination
                perPage={[1, 2, 3, 4, 5, 6, 7]}
                options={{showPrevious: false, showNext: false}}
                perPageCountValue={this.state.perPageCountValue}
                onPerPageChange={(v)=>{ console.log(`perPage change${v}`); this.setState({perPageCountValue: v}); } }
                current={this.state.current}
                onChange={this.setPage.bind(this)}
                total={16} />
        );
    }
}

const ExampleCode = `
class Example extends Component {
    constructor(){
        super();
        this.state = {
            current: 1,
            perPageCountValue: 9
        };
    }
    setPage(i) {
        this.setState({current: i});
    }

    render() {
        return (
            <Pagination
                perPage={[1, 2, 3, 4, 5, 6, 7]}
                options={{showPrevious: true, showNext: true}}
                perPageCountValue={this.state.perPageCountValue}
                onPerPageChange={(v)=>{}}
                current={this.state.current}
                onChange={this.setPage.bind(this)}
                total={16} />
        );
    }
}
`;
const intro = '##### pagination\r\n\r\n###### pagination支持以下参数\r\n- perPage [array] 每页展示数的可选范围\r\n- perPageCountValue perPage的默认值\r\n- onPerPageChange 在perPageCountValue更新是触发\r\n- current 当前页码\r\n- onChange 当页数跳转回调\r\n- total 总页数\r\n- options 配置项目\r\n\r\n###### perPage相关\r\nperPage默认值为[15, 25, 50]\r\n\r\n##### current相关\r\n这个需要回调自己操作,组件内部没有逻辑,每次回调自己更新\r\n\r\n\r\n###### options相关\r\n\r\n```\r\n{\r\n    showPrevious: true, //是否显示上一页\r\n    showNext: true, //是否显示下一页\r\n    showJumpPage: true, //是否显示跳转到X页\r\n    showPerPageCount: true, //是不显示每页显示XX\r\n\t//对应文本信息\r\n    previousText: \"Previous\", \r\n    nexText: \"Next\",\r\n    GotoText: \"Go!\",\r\n    goToPlaceHoler: \"Jump To\",\r\n    PerPageCountTemp: \"`Show ${count} PerPage`\"\r\n};\r\n````';
export default [
    {
        id: 'pagination',
        element: <Example />,
        intro: <ReactMarkdown className="markdown" source={intro} />,
        code: ExampleCode
    }
];
