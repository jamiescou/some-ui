import React from 'react';
import ReactMarkdown from 'react-markdown';
import {Table} from '../data-table';
let Intro = {
    main: '####  概述\r\n与传统的栅格化一样，mcds-layout基于[容器] (相当于Bootstrap的row) 和[栅格] (相当于Bootstrap的column) 来布局:\r\n\r\n1. [容器]有两种：\r\n\t- mcds-layout__column: 容器里的[栅格]以横向排列，与传统栅格化的row一样\r\n\t- mcds-layout__row: 容器里的[栅格]以竖向排列，就像header、content、footer的排列一样\r\n\t\r\n2. 通常，只有[栅格]可以直接放在[容器]中，而你的内容应该放在[栅格]里。但这不是必须的，直接把内容放在[容器]里也没问题。\r\n3. 如果一个[容器]里包含的[栅格]超过12格，多出的部分将另起一行。\r\n4. IE的话只兼容IE10+，其他主流浏览器都支持，具体可以看：兼容性\r\n5. 与Bootstrap等栅格化不同的是：mcds-layout_layout不需要container，栅格本身不自带padding。\r\n\r\n'
};
const Demo = (
    <div className="layout-Demo">
        <ReactMarkdown className="markdown" source={Intro.main} />
        <div className="mcds-layout__column demo">
            <div className="mcds-layout__item-12">mcds-layout__item-12</div>
            <div className="mcds-layout__item-8">mcds-layout__item-8</div>
            <div className="mcds-layout__item">mcds-layout__item 自动填充宽度</div>
            <div className="mcds-layout__item-8">mcds-layout__item-8</div>
            <div className="mcds-layout__item">mcds-layout__item</div>
            <div className="mcds-layout__item-4">mcds-layout__item-4</div>
            <div className="mcds-layout__item-8 mcds-layout__offset-4">mcds-layout__item-8 , mcds-layout__offset-8</div>
        </div>
        <div>
            <div className="title">mcds-layout__middle 垂直居中 mcds-layout__center 水平居中</div>
            这两个class应用在[容器]上时，所有子flex-item都会垂直或水平居中。也可以单独应用在[栅格]上，使特定栅格居中对齐。
        </div>
        <div className="demo mcds-layout__row mcds-layout__middle mcds-layout__center" style={{minHeight: '180px'}}>
            <div className="mcds-layout__item-8" style={{marginBottom: '10px'}}>无论是多行还是单行，都可以垂直居中</div>
            <div className="mcds-layout__item-8">无论是多行还是单行，都可以垂直居中</div>
        </div>
        <div>
            <div className="title">mcds-layout__offset-* 向左偏移</div>
            这个class应用在[栅格]上，指定[栅格]向左偏移多少格。
        </div>
        <div className="mcds-layout__column demo">
            <div className="mcds-layout__item-8 mcds-layout__offset-4">mcds-layout__item-8 , mcds-layout__offset-4</div>
            <div className="mcds-layout__item-10">mcds-layout__item-10</div>
            <div className="mcds-layout__item-2 mcds-layout__offset-10">mcds-layout__item-2 , mcds-layout__offset-10</div>
        </div>

        <div>
            <div className="title">mcds-layout__order-* 排序</div>
            这个class应用在[栅格]上，order越小排在越前面。
        </div>
        <div className="demo mcds-layout__column">
            <div className="mcds-layout__item-3 mcds-layout__order-4">mcds-layout__order-4</div>
            <div className="mcds-layout__item-3 mcds-layout__order-2">mcds-layout__order-2</div>
            <div className="mcds-layout__item-3 mcds-layout__order-3">mcds-layout__order-3</div>
            <div className="mcds-layout__item-3 mcds-layout__order-1">mcds-layout__order-1</div>
        </div>

        <div>
            <div className="title">mcds-layout__left 左对齐 mcds-layout__right 右对齐</div>
            这两个class应用在[容器]上时，所有子flex-item都会左右对其。也可以单独应用在[栅格]上。
        </div>
        <div>
            <div className="demo mcds-layout__column mcds-layout__left">
                <div className="mcds-layout__item-3">左对齐</div>
                <div className="mcds-layout__item-3">左对齐</div>
                <div className="mcds-layout__item-3">左对齐</div>
            </div>
            <div className="demo mcds-layout__column mcds-layout__right">
                <div className="mcds-layout__item-3">右对齐</div>
                <div className="mcds-layout__item-3">右对齐</div>
                <div className="mcds-layout__item-3">右对齐</div>
            </div>
            <div className="demo mcds-layout__column mcds-layout__left">
                <div className="mcds-layout__item-3">左对齐</div>
                <div className="mcds-layout__item-3 mcds-layout__right">右对齐</div>
            </div>
        </div>
        <div>
            <div className="title">mcds-layout__top 顶部对齐 mcds-layout__bottom 底部对齐 mcds-layout__middle 底部对齐</div>
            <div className="demo mcds-layout__column mcds-layout__top" style={{height: '180px'}}>
                <div className="mcds-layout__item-3">顶部对齐</div>
                <div className="mcds-layout__item-3 mcds-layout__bottom">底部对齐</div>
                <div className="mcds-layout__item-3 mcds-layout__middle">中部对齐</div>
            </div>
        </div>

        <div>
            <div className="title">mcds-layout_between 等宽对齐</div>
            这个class应用在[容器]上，自动调整栅格间距，保持两边间距相同。
            <div className="demo mcds-layout__column mcds-layout__between">
                <div className="mcds-layout__item-3 mcds-layout__between">mcds-layout__item-3</div>
                <div className="mcds-layout__item-3 mcds-layout__between">mcds-layout__item-3</div>
                <div className="mcds-layout__item-3 mcds-layout__between">mcds-layout__item-3</div>
            </div>
        </div>
        <div>
            <h4>响应布局</h4>
            响应布局与bootstrap不同.这里我们只去在不同的宽度下,做显示或者隐藏的处理.
            <Table className="mcds-table__striped">
                <thead>
                    <tr className="mcds-text-title__caps">
                        <th className="mcds-truncate" />
                        <th className="mcds-truncate">
                            <p>特小屏幕</p>
                            {'<768px'}
                        </th>
                        <th className="mcds-truncate">
                            <p>小屏幕</p>
                            {'<992px'}
                        </th>
                        <th className="mcds-truncate">
                            <p>中等屏幕</p>
                            {'<1200px'}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>类方法</td>
                        <td><span>mcds-layout__xs-show</span><span className="mcds-m__l-10">mcds-layout__xs-hide</span></td>
                        <td><span>mcds-layout__sm-show</span><span className="mcds-m__l-10">mcds-layout__sm-hide</span></td>
                        <td><span>mcds-layout__md-show</span><span className="mcds-m__l-10">mcds-layout__md-hide</span></td>
                    </tr>
                </tbody>
            </Table>

        </div>

    </div>
);
export default [
    {
        id: 'Loading',
        element: Demo
    }
];
