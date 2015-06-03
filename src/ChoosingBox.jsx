import React from 'react'
import _ from 'underscore'

var ChoosingBox = React.createClass({

    getInitialState: function() {
        return {
            mouseIn: false,
            dragging: false
        }
    },

    getDefaultProps: function() {
        return {
            show: false
        }
    },

    getStyle: function() {
        let defaultStyle = {
            position: 'absolute',
            visibility: this.props['show'] ? 'visible' : 'hidden',
            border: '2px #d1d1d1 dashed',
            cursor: this.state.mouseIn ? 'move' : 'auto'
        };

        return _.extendOwn(defaultStyle, this.props['style'])
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
    },

    render: function() {

        return (
            <div style={this.getStyle()}
                 onMouseEnter={this.onMouseEnterHandler}
                 onMouseLeave={this.onMouseLeaveHandler}
                 onMouseDown={this.onMouseDownHandler}
                 onMouseUp={this.onMouseUpHandler}
                 onMouseMove={this.onMouseMoveHandler}>
            </div>
        )
    }
});

export default ChoosingBox;