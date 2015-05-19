import React from 'react'
import _ from 'underscore'

import CommandBox from './CommandBox'

var ChoosingBox = React.createClass({

    getInitialState: function() {
        return {
            top: 0,
            left: 0,
            width: 0,
            height: 0,

            mouseIn: false,
            dragging: false
        }
    },

    getDefaultProps: function() {
        return {
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,

            show: false
        }
    },

    getStyle: function() {

        let _style = {
            position: 'absolute',

            top: this.state.top,
            left: this.state.left,
            width: this.state.width,
            height: this.state.height,

            visibility: this.props['show'] ? 'visible' : 'hidden',
            border: '2px solid #fff',
            cursor: this.state.mouseIn ? 'move' : 'auto'
        };

        if(!_.isEmpty(this.props['_style'])) {
            var newStyle = this.props['_style'];

            for(let key in newStyle) {
                if(newStyle.hasOwnProperty(key)) {
                    _style[key] = newStyle[key]
                }
            }
        }

        return _style
    },

    _getCommandBoxPosition: function() {
        let state = this.state;

        return {
            x: state.width + state.left,
            y: state.top + state.height + 10
        };
    },

    onMouseEnterHandler: function(e) {
        console.log('mouse enter');

        this.setState({
            mouseIn: true
        })
    },

    onMouseLeaveHandler: function(e) {
        console.log('mouse leave');

        this.setState({
            mouseIn: false
        })
    },

    onMouseDownHandler: function(e) {

        this.setState({
            dragging: true
        })
    },

    onMouseUpHandler: function(e) {
        this.setState({
            dragging: false
        })
    },

    onMouseMoveHandler: function(e) {

        if(this.state.dragging) {

        }
    },

    componentWillUpdate: function(nextProps, nextState) {
        nextState.top = nextProps['startY'] < nextProps['endY'] ? nextProps['startY'] : nextProps['endY'];
        nextState.left = nextProps['startX'] < nextProps['endX'] ? nextProps['startX'] : nextProps['endX'];

        nextState.width = Math.abs(nextProps['startX'] - nextProps['endX']);
        nextState.height = Math.abs(nextProps['startY'] - nextProps['endY']);
    },

    render: function() {

        return (
            <div style={this.getStyle()}
                 onMouseEnter={this.onMouseEnterHandler}
                 onMouseLeave={this.onMouseLeaveHandler}
                 onMouseDown={this.onMouseDownHandler}
                 onMouseUp={this.onMouseUpHandler}
                 onMouseMove={this.onMouseMoveHandler}>

                <CommandBox
                    _style={this.props['commandBoxStyle']}
                    positionX={this._getCommandBoxPosition().x}
                    positionY={this._getCommandBoxPosition().y}
                    show={this.state.commandBoxShow}>
                </CommandBox>
            </div>
        )
    }
});

export default ChoosingBox;