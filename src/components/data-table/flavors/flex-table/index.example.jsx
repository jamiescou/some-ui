import React from 'react';
import PropTypes from 'prop-types';

import { FlexTable } from './index';

const Demo = ({children}) => (
    <section className="component">
        <h1>flex table</h1>
        <div className="example">
            <div className="example-content">
                {children}
            </div>
        </div>
    </section>
);

Demo.propTypes = {
    children: PropTypes.any
};

const FlexTableCode = () => (
    <div className="example-code">
        <pre>
            {`
<FlexTable>
    <div className="mcds-table__title">
        <div className="mcds-flex2">姓名</div>
        <div className="mcds-flex1">年龄</div>
        <div className="mcds-flex1">籍贯</div>
        <div className="mcds-flex2">出生日期</div>
        <div className="mcds-flex1">性别</div>
        <div className="mcds-flex1">是否单身</div>
        <div className="mcds-flex1">爱好</div>
    </div>
    <div className="mcds-table__content">
        <div className="mcds-flex2">韩旭</div>
        <div className="mcds-flex1">23</div>
        <div className="mcds-flex1">东北</div>
        <div className="mcds-flex2">1993-10-02</div>
        <div className="mcds-flex1">中性</div>
        <div className="mcds-flex1">否</div>
        <div className="mcds-flex1">男</div>
    </div>
    <div className="mcds-table__content">
        <div className="mcds-flex2">韩旭</div>
        <div className="mcds-flex1">23</div>
        <div className="mcds-flex1">东北</div>
        <div className="mcds-flex2">1993-10-02</div>
        <div className="mcds-flex1">中性</div>
        <div className="mcds-flex1">否</div>
        <div className="mcds-flex1">男</div>
    </div>
</FlexTable>
            `}
        </pre>
    </div>
);

export default class table extends React.Component {
    render() {
        return (
            <Demo>
                <FlexTableCode />
                <FlexTable>
                    <div className="mcds-table__title">
                        <div className="mcds-flex2">姓名</div>
                        <div className="mcds-flex1">年龄</div>
                        <div className="mcds-flex1">籍贯</div>
                        <div className="mcds-flex2">出生日期</div>
                        <div className="mcds-flex1">性别</div>
                        <div className="mcds-flex1">是否单身</div>
                        <div className="mcds-flex1">爱好</div>
                    </div>
                    <div className="mcds-table__content">
                        <div className="mcds-flex2">韩旭</div>
                        <div className="mcds-flex1">23</div>
                        <div className="mcds-flex1">东北</div>
                        <div className="mcds-flex2">1993-10-02</div>
                        <div className="mcds-flex1">中性</div>
                        <div className="mcds-flex1">否</div>
                        <div className="mcds-flex1">男</div>
                    </div>
                    <div className="mcds-table__content">
                        <div className="mcds-flex2">韩旭</div>
                        <div className="mcds-flex1">23</div>
                        <div className="mcds-flex1">东北</div>
                        <div className="mcds-flex2">1993-10-02</div>
                        <div className="mcds-flex1">中性</div>
                        <div className="mcds-flex1">否</div>
                        <div className="mcds-flex1">男</div>
                    </div>
                </FlexTable>
            </Demo>
        );
    }
}
