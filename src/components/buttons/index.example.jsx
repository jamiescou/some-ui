import React, {Component} from 'react';
import { Button, ButtonLoading, StatefulButton } from './index';
// import ReactMarkdown from 'react-markdown';

let ButtonLoadingDemoCode = `
class Example extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    handleClick() {
        this.setState({
            isLoading: !this.state.isLoading
        })
    }
    render() {
        return (
            <ButtonLoading 
                isLoading={this.state.isLoading}
                onClick={this.handleClick.bind(this)}
                className="mcds-button__brand">
                loading
            </ButtonLoading>
        );
    }
}`;

class ButtonLoadingDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    handleClick() {
        this.setState({
            isLoading: !this.state.isLoading
        });
    }

    render() {
        return (
            <ButtonLoading
                isLoading={this.state.isLoading}
                onClick={this.handleClick.bind(this)}
                className="mcds-button__brand">
                loading
            </ButtonLoading>
        );
    }
}

export default [
    {
        id: 'Button',
        element: <Button>base button</Button>
    },
    {
        id: 'Neutral',
        element: <Button className="mcds-button__neutral" onClick={()=> console.log(1)}>Button Neutral</Button>
    },
    {
        id: 'NeutralDisabled',
        element: <Button className="mcds-button__neutral" disabled>Button Neutral</Button>
    },
    {
        id: 'NeutralIconLeft',
        element: <Button className="mcds-button__neutral"><i className="mcds-icon__left mcds-icon__triangle-solid-14" />Button Neutral</Button>
    },
    {
        id: 'NeutralIconRight',
        element: <Button className="mcds-button__neutral">Button Neutral<i className="mcds-icon__right mcds-icon__triangle-solid-14" /></Button>
    },
    {
        id: 'Brand',
        element: <Button className="mcds-button__brand">Button brand</Button>
    },
    {
        id: 'BrandDisabled',
        element: <Button className="mcds-button__brand" disabled>Button Brand</Button>
    },
    {
        id: 'Destructive',
        element: <Button className="mcds-button__destructive">Button Destructive</Button>
    },
    {
        id: 'DestructiveDisabled',
        element: <Button className="mcds-button__destructive" disabled>Button DestructiveDisabled</Button>
    },
    {
        id: 'ButtonLoading',
        element: <ButtonLoadingDemo />,
        code: ButtonLoadingDemoCode
    },
    {
        id: 'ButtonSuccess',
        element: <Button className="mcds-button__success" disabled>Button Success</Button>
    },
    {
        id: 'statefulButton',
        element: <StatefulButton icon="mcds-icon__add-line-20" hoverIcon="mcds-icon__arrow-line-20">Following</StatefulButton>
    }
];
