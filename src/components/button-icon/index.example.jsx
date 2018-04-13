import React from 'react';
import { ButtonIcon, ButtonSmallIcon } from './index';

export default [
    {
        id: 'ButtonIcon',
        element: <ButtonIcon className="mcds-button__neutral" icon="mcds-icon__settings-line-20" />
    },
    {
        id: 'ButtonIcon',
        element: <ButtonIcon hasDropdown className="mcds-button-icon__more" icon="mcds-icon__settings-line-20" />
    },
    {
        id: 'ButtonIcon',
        element: <ButtonIcon className="mcds-button-icon__more" icon="mcds-icon__settings-line-20" />
    },
    {
        id: 'ButtonSmallIcon',
        element: <ButtonSmallIcon icon="mcds-icon__settings-line-20" />
    }
];
