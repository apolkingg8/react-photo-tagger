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


var ChoosingBox = React.createClass({

    getInitialState: function() {
        return {
        }
    },

    setStyle: function() {
        return {
            position: 'absolute',
            top: this.props['positionY'],
            left: this.props['positionX'],
            width: this.props['width'],
            height: this.props['height'],
            border: '2px solid #fff'
        }
    },

    render: function() {
        return (
            <div style={this.setStyle()}>
            </div>
        )
    }
});


var Wrap = React.createClass({

    getInitialState: function() {

        return {
            offsetTop: 0,
            offsetLeft: 0,
            mouseDownX: 0,
            mouseDownY: 0,
            mouseUpX: 0,
            mouseUpY: 0,
            mouseRelativedX: 0,
            mouseRelativedY: 0,
            choosingBoxWidth: 0,
            choosingBoxHeight: 0,
            dragging: false
        };
    },

    _getRelativedX: function(e) {
        return e.clientX - this.state.offsetLeft;
    },

    _getRelativedY: function(e) {
        return e.clientY - this.state.offsetTop;
    },

    componentDidMount: function() {
        this.state.offsetTop = this.getDOMNode().offsetTop;
        this.state.offsetLeft = this.getDOMNode().offsetLeft;
    },

    onMouseMoveHandler: function(e) {
        if(this.state.dragging) {
            e.persist();
            //console.log('mouse move', e);
            this.state.mouseRelativedX = this._getRelativedX(e);
            this.state.mouseRelativedY = this._getRelativedY(e);
            console.log(this.state.mouseRelativedX, this.state.mouseRelativedY);

            this.setState({
                choosingBoxWidth: this.state.mouseRelativedX - this.state.mouseDownX,
                choosingBoxHeight: this.state.mouseRelativedY - this.state.mouseDownY
            });
        }
    },

    onMouseDownHandler: function(e) {
        e.preventDefault();
        console.log('mouse down', e);

        this.setState({
            dragging : true,
            mouseDownX : this._getRelativedX(e),
            mouseDownY : this._getRelativedY(e)
        });
    },

    onMouseUpHandler: function(e) {
        console.log('mouse up', e);

        this.setState({
            dragging : false,
            mouseUpX : this._getRelativedX(e),
            mouseUpY : this._getRelativedY(e)
        });
    },

    onMouseLeaveHandler: function(e) {
        console.log('mouse leave', e);

        this.setState({
            dragging : false,
            mouseUpX : this._getRelativedX(e),
            mouseUpY : this._getRelativedY(e)
        });
    },

    setStyle: function() {

        return {
            position: 'relative',
            top: '20px',
            width: this.props['width'] || '100%',
            height: this.props['height'] || '100%'
        };
    },

    render: function() {

        console.log(this);

        return (
            <div className="react-photo-tagger-wrap"
                 onMouseDown={this.onMouseDownHandler}
                 onMouseUp={this.onMouseUpHandler}
                 onMouseMove={this.onMouseMoveHandler}
                 style={this.setStyle()}>
                <ChoosingBox
                    positionX={this.state.mouseDownX}
                    positionY={this.state.mouseDownY}
                    width={this.state.choosingBoxWidth}
                    height={this.state.choosingBoxHeight}>
                </ChoosingBox>
                <Img src={this.props['imgSrc']}/>
            </div>
        )
    }
});


React.render(
    <Wrap
        imgSrc="test.jpeg"
        width="250px"
        height="200px">
    </Wrap>
    , document.body);