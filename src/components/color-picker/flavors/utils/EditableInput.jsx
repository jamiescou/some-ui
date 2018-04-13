import React from 'react';
import PropTypes from 'prop-types';

export default class EditableInput extends React.Component {
    static propTypes={
        value: PropTypes.string,
        label: PropTypes.string,
        onChange: PropTypes.func,
        arrowOffset: PropTypes.number,
        dragLabel: PropTypes.string,
        dragMax: PropTypes.string
    }
    constructor(props) {
        super();
        this.state = {
            value: String(props.value).toUpperCase(),
            blurValue: String(props.value).toUpperCase()
        };
    }

    componentWillReceiveProps(nextProps) {
        let input = this.refs.input;
        if (nextProps.value !== this.state.value) {
            if (input === document.activeElement) {
                this.setState({
                    blurValue: String(nextProps.value).toUpperCase()
                });
            } else {
                this.setState({
                    value: String(nextProps.value).toUpperCase()
                });
            }
        }
    }

    handleBlur() {
        if (this.state.blurValue) {
            this.setState({
                value: this.state.blurValue,
                blurValue: null
            });
        }
    }

    handleChange(e) {
        if (this.props.label !== null) {
            let obj = {};
            obj[this.props.label] = e.target.value;
            this.props.onChange(obj);
        } else {
            this.props.onChange(e.target.value);
        }

        this.setState({
            value: e.target.value
        });
    }

    handleKeyDown(e) {
        let number = Number(e.target.value);
        if (number) {
            let amount = this.props.arrowOffset || 1;

            // Up
            if (e.keyCode === 38) {
                if (this.props.label !== null) {
                    let obj = {};
                    obj[this.props.label] = number + amount;
                    this.props.onChange(obj);
                } else {
                    this.props.onChange(number + amount);
                }

                this.setState({
                    value: number + amount
                });
            }

            // Down
            if (e.keyCode === 40) {
                if (this.props.label !== null) {
                    let obj = {};
                    obj[this.props.label] = number - amount;
                    this.props.onChange(obj);
                } else {
                    this.props.onChange(number - amount);
                }

                this.setState({
                    value: number - amount
                });
            }

        }
    }

    handleDrag(e) {
        if (this.props.dragLabel) {
            let newValue = Math.round(this.props.value + e.movementX);
            if (newValue >= 0 && newValue <= this.props.dragMax) {
                let obj = {};
                obj[this.props.label] = newValue;
                this.props.onChange(obj);
            }
        }
    }

    handleMouseDown(e) {
        if (this.props.dragLabel) {
            e.preventDefault();
            this.handleDrag(e);
            window.addEventListener('mousemove', this.handleDrag);
            window.addEventListener('mouseup', this.handleMouseUp);
        }
    }

    handleMouseUp() {
        window.removeEventListener('mousemove', this.handleDrag);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    render() {
        let label;
        let style = {
            cursor: 'ew-resize',
            input: {
                width: '100%',
                padding: '4px 10% 3px',
                border: 'none',
                boxShadow: 'inset 0 0 0 1px #ccc',
                fontSize: '11px',
                textAlign: 'center'
            },
            label: {
                display: 'block',
                textAlign: 'center',
                fontSize: '11px',
                color: '#222',
                paddingTop: '3px',
                paddingBottom: '4px',
                textTransform: 'capitalize'
            }
        };
        if (this.props.label) {
            label = <span style={ style.label } ref="label" onMouseDown={ ::this.handleMouseDown }>{ this.props.label }</span>;
        }
        return (
            <div style={ style.wrap } ref="container">
                <input
                    style={ style.input }
                    ref="input"
                    value={ this.state.value }
                    onKeyDown={ ::this.handleKeyDown }
                    onChange={ ::this.handleChange }
                    onBlur={ ::this.handleBlur } />
                { label }
            </div>
        );
    }
}
