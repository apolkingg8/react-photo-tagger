import React from 'react'

import Img from './Img'
import ChoosingBox from './ChoosingBox'
import CommandBox from './CommandBox'


var Wrap = React.createClass({

    getInitialState: function() {

        return {
            offsetTop: 0,
            offsetLeft: 0,

            mouseDownX: 0,
            mouseDownY: 0,
            mouseUpX: 0,
            mouseUpY: 0,
            mouseX: 0,
            mouseY: 0,

            choosingBoxShow: false,
            choosingBoxWidth: 0,
            choosingBoxHeight: 0,

            dragging: false
        };
    },

    getDefaultProps: function() {
        return {
            imgSrc: '',
            width: '100%',
            height: '100%'
        }
    },

    _getRelativedX: function(e) {
        return e.clientX - this.state.offsetLeft;
    },

    _getRelativedY: function(e) {
        return e.clientY - this.state.offsetTop;
    },

    _isInChoosingBox: function(e) {

        var _x = this._getRelativedX(e);
        var _y = this._getRelativedY(e);

        return (
            (((this.state.mouseDownX) < _x) && (_x < (this.state.mouseDownX + this.state.choosingBoxWidth))) &&
            (((this.state.mouseDownY) < _y) && (_y < (this.state.mouseDownY + this.state.choosingBoxHeight)))
        )
    },

    componentDidMount: function() {

        this.setState({
            offsetTop: this.getDOMNode().offsetTop,
            offsetLeft: this.getDOMNode().offsetLeft
        });
    },

    onMouseMoveHandler: function(e) {
        var that = this;
        //console.log('mouse move');

        if(this.state.dragging) {
            console.log(that.state.mouseX, that.state.mouseY);

            that.setState({
                mouseX: that._getRelativedX(e),
                mouseY: that._getRelativedY(e),
                choosingBoxWidth: that.state.mouseX - that.state.mouseDownX,
                choosingBoxHeight: that.state.mouseY - that.state.mouseDownY
            });
        }
    },

    onMouseDownHandler: function(e) {
        console.log('mouse down', e);

        if(!this._isInChoosingBox(e)) {
            e.preventDefault();
            this.setState({
                dragging: true,
                choosingBoxWidth: 0,
                choosingBoxHeight: 0,
                choosingBoxShow: true,
                mouseX: this._getRelativedX(e),
                mouseY: this._getRelativedY(e),
                mouseDownX: this._getRelativedX(e),
                mouseDownY: this._getRelativedY(e)
            });
        }
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

    getStyle: function() {

        return {
            position: 'relative',
            width: this.props['width'],
            height: this.props['height']
        };
    },

    render: function() {

        console.log('render');

        return (
            <div className="react-photo-tagger-wrap"
                 onMouseDown={this.onMouseDownHandler}
                 onMouseUp={this.onMouseUpHandler}
                 onMouseMove={this.onMouseMoveHandler}
                 style={this.getStyle()}>

                <ChoosingBox
                    positionX={this.state.mouseDownX}
                    positionY={this.state.mouseDownY}
                    width={this.state.choosingBoxWidth}
                    height={this.state.choosingBoxHeight}
                    show={this.state.choosingBoxShow}>
                </ChoosingBox>

                <CommandBox>
                </CommandBox>

                <Img src={this.props['imgSrc']}/>
            </div>
        )
    }
});

export default Wrap;