import React from 'react'

var Hello = React.createClass({
    render: function(){
        return (
            <h1>Hello!</h1>
        )
    }
});

var Yo = React.createClass({
    render: ()=> {
        return (<h1>yo</h1>)
    }
});

React.render(<Yo></Yo>, document.body);