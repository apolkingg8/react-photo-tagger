import React from 'react'
import _ from 'underscore'

var CommandBox = React.createClass({
    getInitialState: function() {
        return {

        }
    },

    getDefaultProps: function() {
        return {
            positionX: 0,
            positionY: 0,
            show: false,
            showArrow: true
        }
    },

    getBoxStyle: function() {
        var _style =  {
            position: 'absolute',
            top: this.props['positionY'],
            left: this.props['positionX'],
            width: 80,
            height: 50,
            backgroundColor: '#d1d1d1',
            transform: `scale(${this.props['show'] ? '1,1' : '0,0'})`,
            'transform-origin': '10% 10%',
            transition: this.props['show'] ? 'transform .2s ease-in' : 'none'
        };

        if(!_.isEmpty(this.props['_style'])) {
            var newStyle = this.props['_style'];

            for(let key in newStyle) {
                if(newStyle.hasOwnProperty(key)) {
                    _style[key] = newStyle[key]
                }
            }
        }

        return _style;
    },

    getArrowStyle: function(size) {

        if(size > 2 && this.props['showArrow']) {
            return {
                position: 'absolute',
                top: -size,
                left: size,
                width: size,
                height: size,
                boxSizing: 'border-box',
                borderStyle: 'solid',
                borderColor: `transparent transparent ${this.getBoxStyle().backgroundColor} transparent`,
                borderWidth: `0 ${size / 2}px ${Math.floor(size * 2 / 3)}px ${size / 2}px`
            };
        } else {
            return {
                display: 'none'
            }
        }
    },

    render: function() {
        let boxStyle = this.getBoxStyle();
        //todo: borderRadius using 'em' not handled
        let boxWidthWithOutRadius = (boxStyle.width - boxStyle.borderRadius.replace('px', ''));
        let arrowSize = boxWidthWithOutRadius > 16 ? 8 : boxWidthWithOutRadius / 2;

        return (
            <div style={this.getBoxStyle()}>
                <div style={this.getArrowStyle(arrowSize)}>
                </div>
            </div>
        )
    }
});

export default CommandBox;