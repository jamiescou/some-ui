import React from 'react';
import { Navigation, NavTitle, NavList, NavItem } from './index';

const element = (
    <div style={{ width: '320px' }}>
        <Navigation>
            <NavTitle id="folder-header">REPORTS</NavTitle>
            <NavList>
                <NavItem id="entity-header" className="mcds-is-active">Recent</NavItem>
                <NavItem id="entity-header">Created by Me</NavItem>
                <NavItem id="entity-header">Private Reports</NavItem>
                <NavItem id="entity-header">Public Reports</NavItem>
                <NavItem id="entity-header">All Reports</NavItem>
            </NavList>
            <NavTitle id="folder-header">Folders</NavTitle>
            <NavList>
                <NavItem id="folder-header">Created by Me</NavItem>
                <NavItem id="folder-header">Shared with Me</NavItem>
                <NavItem id="folder-header">All Reports</NavItem>
            </NavList>
        </Navigation>
    </div>
);

const Inverse = (
    <div style={{ width: '320px', backgroundColor: '#FAFAFB' }}>
        <Navigation className="mcds-navigation-list__vertical-inverse">
            <NavTitle id="folder-header">REPORTS</NavTitle>
            <NavList>
                <NavItem id="entity-header" className="mcds-is-active">Recent</NavItem>
                <NavItem id="entity-header">Created by Me</NavItem>
                <NavItem id="entity-header">Private Reports</NavItem>
                <NavItem id="entity-header">Public Reports</NavItem>
                <NavItem id="entity-header">All Reports</NavItem>
            </NavList>
            <NavTitle id="folder-header">Folders</NavTitle>
            <NavList>
                <NavItem id="folder-header">Created by Me</NavItem>
                <NavItem id="folder-header">Shared with Me</NavItem>
                <NavItem id="folder-header">All Reports</NavItem>
            </NavList>
        </Navigation>
    </div>
);

export default [
    {
        id: 'NavigationDefault',
        element
    },
    {
        id: 'NavigationInverse',
        element: Inverse
    }
];
