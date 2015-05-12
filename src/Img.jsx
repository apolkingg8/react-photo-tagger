import React from 'react'

var Img = React.createClass({
    render: function() {

        var _style = {
            width: '100%',
            height: '100%'
        };

        return (
            <img src={this.props['src']}
                 style={_style}/>
        )
    }
});

module.exports = Img;