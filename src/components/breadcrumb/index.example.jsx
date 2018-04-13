import React from 'react';

import { BreadCrumbs, Crumb} from './flavors/base/index';
import { ButtonSmallIcon } from './../button-icon/flavors/base/index';

const element = (
    <BreadCrumbs>
        <Crumb><ButtonSmallIcon icon="mcds-icon__triangle-solid-14" /></Crumb>
        <Crumb>
            <a href="javascript:void(0);">
                Parent Entity
            </a>
        </Crumb>
        <Crumb>Parent Record Name</Crumb>
    </BreadCrumbs>
);

export default [
    {
        id: 'BreadCrumbs',
        element
    }
];
