import React from 'react'

var CommandBox = React.createClass({
    getInitialState: function() {
        return {
            show: false
        }
    },

    getDefaultProps: function() {
        return {
            positionX: 0,
            positionY: 0
        }
    },

    getStyle: function() {
        return {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '80px',
            height: '50px',
            visibility: this.state.show ? 'visible' : 'hidden',
            backgroundColor: '#d1d1d1'
        }
    },

    render: function() {
        return (
            <div style={this.getStyle()}>
            </div>
        )
    }
});

export default CommandBox;