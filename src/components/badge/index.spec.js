/* eslint-disable */
// https://github.com/airbnb/enzyme/issues/875
// https://github.com/airbnb/enzyme/pull/876
// 因为这个 issue 还没解决,还不能使用react 15.5,会报错:
// console.error node_modules/fbjs/lib/warning.js:36
// Warning: ReactTestUtils has been moved to react-dom/test-utils. Update references to remove this warning.
// 等待更新后再升级
// 现在使用的 react@15.4.1 react-dom@15.4.1 react-addons-test-utils@15.4.0 都需要升级。


import React from 'react';
import { mount } from 'enzyme';

import { Badge } from './index';

// function setup() {
//    const props = {};
//
//    const enzymeWrapper = shallow(<Badge {...props} />)
//
//    return {
//        props,
//        enzymeWrapper
//    }
// }

describe('Badge', () => {
    it('render Badge', () => {
//        const { enzymeWrapper } = setup();
        // 创建组件
        const component = mount(<Badge label="Badge" className="mcds-test" />);

        // 该组件有默认 class
        expect(component.find('span').hasClass('mcds-badge')).toBe(true);

        // 该组件有自定义 class
        expect(component.find('span').hasClass('mcds-test')).toBe(true);

        // 组件 props 值跟期望一致
        expect(component.find('span').text()).toBe('Badge');
    });
});
