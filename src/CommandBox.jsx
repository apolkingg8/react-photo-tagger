import React from 'react'

var CommandBox = React.createClass({
    getInitialState: function() {
        return {
        }
    },

    getDefaultProps: function() {
        return {
            positionX: 0,
            positionY: 0,
            show: false
        }
    },

    getStyle: function() {
        return {
            position: 'absolute',
            top: this.props['positionY'],
            left: this.props['positionX'],
            width: '80px',
            height: '50px',
            visibility: this.props['show'] ? 'visible' : 'hidden',
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