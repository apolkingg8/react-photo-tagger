import React from 'react'
import _ from 'underscore'

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

            commandBoxShow: false,

            choosing: false,
            mouseDownInChoosingBox: false
        };
    },

    getDefaultProps: function() {
        return {
            imgSrc: '',
            width: '100%',
            height: '100%',
            choosingBoxStyle: {},
            commandBoxStyle: {}
        }
    },

    _getRelativedX: function(e) {
        return e.clientX - this.state.offsetLeft;
    },

    _getRelativedY: function(e) {
        return e.clientY - this.state.offsetTop;
    },

    _isInChoosingBox: function(e) {
        let x = this._getRelativedX(e);
        let y = this._getRelativedY(e);

        let result = (
            (((this.state.mouseDownX) < x) && (x < this.state.mouseUpX))
            &&
            (((this.state.mouseDownY) < y) && (y < this.state.mouseUpY))
        );

        this.setState({
            mouseDownInChoosingBox: result
        });

        return result
    },

    _isInCommandBox: function(e) {
        let x = this._getRelativedX(e);
        let y = this._getRelativedY(e);
        let commandBoxStyle = this._getCommandBoxStyle();

        return (
            (commandBoxStyle.left > x) && ((commandBoxStyle.left + commandBoxStyle.width) < x)
                &&
            (commandBoxStyle.top > y) && ((commandBoxStyle.top + commandBoxStyle.height) < y)
        )
    },

    onMouseMoveHandler: function(e) {
        var that = this;
        //console.log('mouse move');

        if(this.state.choosing) {
            console.log(that.state.mouseX, that.state.mouseY);

            that.setState({
                mouseX: that._getRelativedX(e),
                mouseY: that._getRelativedY(e),
            });
        }
    },

    onMouseDownHandler: function(e) {
        console.log('mouse down', e);

        if(!this._isInChoosingBox(e) && !this._isInCommandBox(e)) {
            e.preventDefault();
            this.setState({
                choosing: true,
                choosingBoxShow: true,
                mouseX: this._getRelativedX(e),
                mouseY: this._getRelativedY(e),
                mouseDownX: this._getRelativedX(e),
                mouseDownY: this._getRelativedY(e),
                commandBoxShow: false
            });
        }
    },

    onMouseUpHandler: function(e) {
        console.log('mouse up', e);

        if(!this.state.mouseDownInChoosingBox) {
            this.setState({
                choosing: false,
                mouseUpX: this._getRelativedX(e),
                mouseUpY: this._getRelativedY(e),
                commandBoxShow: true
            });
        }
    },

    onMouseLeaveHandler: function(e) {
        console.log('mouse leave', e);

        this.setState({
            choosing : false,
            mouseUpX : this._getRelativedX(e),
            mouseUpY : this._getRelativedY(e)
        });
    },

    getStyle: function() {

        return {
            position: 'relative',
            width: this.props['width'],
            height: this.props['height'],
            overflow: 'visible'
        };
    },

    componentDidMount: function() {

        this.setState({
            offsetTop: this.getDOMNode().offsetTop,
            offsetLeft: this.getDOMNode().offsetLeft
        });
    },

    shouldComponentUpdate: function(nextProps, nextState) {

        //return nextState.choosing
        return true
    },

    _getChoosingBoxStyle: function() {
        let state = this.state;
        let startX = state.mouseDownX,
            startY = state.mouseDownY,
            endX = state.choosing ? state.mouseX : state.mouseUpX,
            endY= state.choosing ? state.mouseY : state.mouseUpY;

        let style = this.props['choosingBoxStyle'];

        _.extend(style, {
            top: startY < endY ? startY : endY,
            left: startX < endX ? startX : endX,
            width: Math.abs(startX - endX),
            height: Math.abs(startY - endY)
        });

        return style
    },

    _getCommandBoxStyle: function() {
        let choosingBoxStyle = this._getChoosingBoxStyle();

        let style = this.props['commandBoxStyle'];

        return _.extend({width: 80, height: 50}, style, {
            top: choosingBoxStyle.top + choosingBoxStyle.height + 15,
            left: choosingBoxStyle.left - 5
        });
    },

    render: function() {
        //console.log('render', this.state);

        let state = this.state;



        return (
            <div className="react-photo-tagger-wrap"
                 onMouseDown={this.onMouseDownHandler}
                 onMouseUp={this.onMouseUpHandler}
                 onMouseMove={this.onMouseMoveHandler}
                 style={this.getStyle()}>

                <ChoosingBox
                    style={this._getChoosingBoxStyle()}
                    show={state.choosingBoxShow}>
                </ChoosingBox>

                <CommandBox
                    style={this._getCommandBoxStyle()}
                    show={state.commandBoxShow}>
                </CommandBox>

                <Img src={this.props['imgSrc']}/>
            </div>
        )
    }
});

export default Wrap;