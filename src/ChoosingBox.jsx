import React from 'react'

var ChoosingBox = React.createClass({

    getInitialState: function() {
        return {
        }
    },

    getDefaultProps: function() {
        return {
            positionX: 0,
            positionY: 0,
            width: 0,
            height: 0,
            show: false
        }
    },

    getStyle: function() {
        var _style = {
            position: 'absolute',
            top: this.props['positionY'],
            left: this.props['positionX'],
            width: this.props['width'],
            height: this.props['height'],
            visibility: this.props['show'] ? 'visible' : 'hidden',
            border: '2px solid #fff'
        };

        if(this.props['width'] < 0) {
            _style.left += this.props['width'];
            _style.width = Math.abs(this.props['width']);
        }

        if(this.props['height'] < 0) {
            _style.top += this.props['height'];
            _style.height = Math.abs(this.props['height']);
        }

        return _style
    },

    onDragHandler: function(e) {
        console.log('hi');
    },

    render: function() {
        return (
            <div style={this.getStyle()}
                 onDrag={this.onDragHandler()}>
            </div>
        )
    }
});

export default ChoosingBox;