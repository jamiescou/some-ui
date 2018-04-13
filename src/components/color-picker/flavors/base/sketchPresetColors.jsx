import React from 'react';
import PropTypes from 'prop-types';

export default class SketchPresetColors extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
        colors: PropTypes.array
    };
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(hex) {
        this.props.onClick(hex);
    }

    render() {
        let colors = [];
        let style = {};
        if (!this.props.colors || !this.props.colors.length) {
            style = {
                colors: {
                    display: 'none'
                },
                li: {
                    borderRadius: '3px',
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'inline-block',
                    margin: '0 10px 10px 0',
                    verticalAlign: 'top',
                    cursor: 'pointer'
                },
                square: {
                    borderRadius: '3px',
                    width: '16px',
                    height: '16px',
                    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15)'
                }
            };
        } else {
            style = {
                colors: {
                    marginRight: '-10px',
                    marginLeft: '-10px',
                    paddingLeft: '10px',
                    paddingTop: '10px',
                    borderTop: '1px solid #eee'
                },
                li: {
                    borderRadius: '3px',
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'inline-block',
                    margin: '0 10px 10px 0',
                    verticalAlign: 'top',
                    cursor: 'pointer'
                },
                square: {
                    borderRadius: '3px',
                    width: '16px',
                    height: '16px',
                    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15)'
                }
            };
        }
        if (this.props.colors) {
            for (let i = 0; i < this.props.colors.length; i++) {
                let color = this.props.colors[i];
                colors.push(
                    <div key={ color } style={ style.li } ref={ color } onClick={ this.handleClick.bind(null, color) }>
                        <div style={{ background: color}} >
                            <div style={style.square } />
                        </div>
                    </div>
                );
            }
        }
        return (
            <div style={ style.colors }>
                { colors }
            </div>
        );
    }
}
