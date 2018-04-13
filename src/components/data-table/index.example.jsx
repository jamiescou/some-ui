import React from 'react';
import { Table, Th, FlexTable, TableResize } from './index';
import { Checkbox } from './../form/index';
import { ButtonSmallIcon } from './../button-icon/index';
import ReactMarkdown from 'react-markdown';

const TableResizeExa = (
    <div style={{height: '300px', width: 'auto'}}>
        <TableResize fixedWidth={200} columnSize={2}>
            <thead>
                <tr className="mcds-text-title__caps">
                    <Th className="mcds-cell__shrink" style={{width: '200px'}}><Checkbox /></Th>
                    <Th className="mcds-table__truncate" resizable>姓名</Th>
                    <Th className="mcds-table__truncate" resizable>年龄</Th>
                </tr>
            </thead>
            <tfoot />
            <tbody>
                <tr>
                    <td className="mcds-cell__shrink"><Checkbox /></td>
                    <td><div className="mcds-table__truncate" title="韩旭"><a href="javascript:void(0);">韩旭</a></div></td>
                    <td><div className="mcds-table__truncate" title="年龄">22</div></td>
                </tr>
                <tr>
                    <td className="mcds-cell__shrink"><Checkbox /></td>
                    <td><div className="mcds-table__truncate" title="耿山"><a href="javascript:void(0);">耿山</a></div></td>
                    <td><div className="mcds-table__truncate" title="年龄">22</div></td>
                </tr>
            </tbody>
        </TableResize>
    </div>
);



const TableBase = (
    <Table className="mcds-table__striped">
        <thead>
            <tr className="mcds-text-title__caps">
                <th className="mcds-cell__shrink"><Checkbox /></th>
                <th className="mcds-table__truncate">姓名</th>
                <th className="mcds-table__truncate">年龄</th>
                <th className="mcds-table__truncate">籍贯</th>
                <th className="mcds-table__truncate">出生日期</th>
                <th className="mcds-table__truncate">性别</th>
                <th className="mcds-table__truncate">是否单身</th>
                <th className="mcds-table__truncate">爱好</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="mcds-cell__shrink"><Checkbox /></td>
                <td><div className="mcds-table__truncate" title="韩旭"><a href="javascript:void(0);">韩旭</a></div></td>
                <td><div className="mcds-table__truncate" title="年龄">22</div></td>
                <td><div className="mcds-table__truncate" title="籍贯">沈阳</div></td>
                <td><div className="mcds-table__truncate" title="出生日期">1993-01-02</div></td>
                <td><div className="mcds-table__truncate" title="性别">男</div></td>
                <td><div className="mcds-table__truncate" title="是否单身">否</div></td>
                <td><div className="mcds-table__truncate" title="爱好">男</div></td>
            </tr>
            <tr>
                <td className="mcds-cell__shrink"><Checkbox /></td>
                <td><div className="mcds-table__truncate" title="耿山"><a href="javascript:void(0);">耿山</a></div></td>
                <td><div className="mcds-table__truncate" title="年龄">22</div></td>
                <td><div className="mcds-table__truncate" title="籍贯">沈阳</div></td>
                <td><div className="mcds-table__truncate" title="出生日期">1993-01-02</div></td>
                <td><div className="mcds-table__truncate" title="性别">男</div></td>
                <td><div className="mcds-table__truncate" title="是否单身">否</div></td>
                <td><div className="mcds-table__truncate" title="爱好">相声</div></td>
            </tr>
        </tbody>
    </Table>
);

const TableAdcancde = (
    <Table className="mcds-table-fixed__layout" style={{tableLayout: 'fixed'}}>
        <thead>
            <tr>
                <Th className="mcds-cell__shrink mcds-p__l-20"><Checkbox /></Th>
                <Th className="mcds-is__sortable" icon="mcds-icon__arrow-solid-14">测试</Th>
                <Th className="mcds-is__sortable">测试</Th>
                <Th className="mcds-is__sortable">测试</Th>
                <Th className="mcds-is__sortable">测试</Th>
                <Th className="mcds-is__sortable">测试</Th>
                <Th className="mcds-is__sortable">测试</Th>
                <Th className="mcds-is__sortable">测试</Th>
                <Th className="mcds-is__sortable">测试</Th>
                <Th className="mcds-is__sortable" />
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="mcds-cell__shrink"><Checkbox /></td>
                <td>第二列</td>
                <td>第三列</td>
                <td>第四列</td>
                <td>第五列</td>
                <td>第六列</td>
                <td>第六列</td>
                <td>第六列</td>
                <td>第六列</td>
                <td className="mcds-cell__shrink"><ButtonSmallIcon icon="mcds-icon__triangle-solid-14" /></td>
            </tr>
            <tr>
                <td className="mcds-cell__shrink"><Checkbox /></td>
                <td>第二列</td>
                <td>第三列</td>
                <td>第四列</td>
                <td>第五列</td>
                <td>第六列</td>
                <td>第六列</td>
                <td>第六列</td>
                <td>第六列</td>
                <td className="mcds-cell__shrink"><ButtonSmallIcon icon="mcds-icon__triangle-solid-14" /></td>
            </tr>
        </tbody>
    </Table>
);

const FlexTableExa = (
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
);

export default [
    {
        id: 'TableResizeExa',
        element: TableResizeExa
    },
    {
        id: 'TableBase',
        element: TableBase,
        intro: <ReactMarkdown className="markdown" source={'#### Table 样式\r\n* mcds-table__striped 隔行变色\r\n* mcds-table__bordered 行边框边框\r\n* mcds-table-col__bordered 列边框'} />
    },
    {
        id: 'FlexTable',
        element: FlexTableExa
    },
    {
        id: 'TableAdcancde',
        element: TableAdcancde
    }
];
