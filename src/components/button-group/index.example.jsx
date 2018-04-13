import React from 'react';
import PropTypes from 'prop-types';
const ReactElementToString = require('react-element-to-string');

import { ButtonGroup } from './index';
import { Button } from './../buttons/index';
import { ButtonIcon } from './../button-icon/flavors/base/index';

const Demo = ({children}) => (
    <section className="component">
        <h1>按钮组</h1>
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

let buttonGroup = (
    <ButtonGroup className="aaa">
        <Button className="mcds-button__item" active={true}>Refresh</Button>
        <Button className="mcds-button__item">Edit</Button>
        <ButtonIcon className="mcds-button__item" icon="mcds-icon__triangle-solid-14">Save</ButtonIcon>
    </ButtonGroup>
);

const ButtonGroupDemo = () => <Demo>{buttonGroup}</Demo>;

export default [
    {
        id: 'ButtonGroup',
        element: <ButtonGroupDemo />,
        code: ReactElementToString(buttonGroup)
    }
];
