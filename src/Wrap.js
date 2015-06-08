'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _Img = require('./Img');

var _Img2 = _interopRequireDefault(_Img);

var _ChoosingBox = require('./ChoosingBox');

var _ChoosingBox2 = _interopRequireDefault(_ChoosingBox);

var _CommandBox = require('./CommandBox');

var _CommandBox2 = _interopRequireDefault(_CommandBox);

var Wrap = _react2['default'].createClass({
    displayName: 'Wrap',

    getInitialState: function getInitialState() {

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

    getDefaultProps: function getDefaultProps() {
        return {
            imgSrc: '',
            width: '100%',
            height: '100%',
            choosingBoxStyle: {},
            commandBoxStyle: {}
        };
    },

    _getRelativedX: function _getRelativedX(e) {
        return e.clientX - this.state.offsetLeft;
    },

    _getRelativedY: function _getRelativedY(e) {
        return e.clientY - this.state.offsetTop;
    },

    _isInChoosingBox: function _isInChoosingBox(e) {
        var x = this._getRelativedX(e);
        var y = this._getRelativedY(e);

        var result = this.state.mouseDownX < x && x < this.state.mouseUpX && (this.state.mouseDownY < y && y < this.state.mouseUpY);

        this.setState({
            mouseDownInChoosingBox: result
        });

        return result;
    },

    _isInCommandBox: function _isInCommandBox(e) {
        var x = this._getRelativedX(e);
        var y = this._getRelativedY(e);
        var commandBoxStyle = this._getCommandBoxStyle();

        return commandBoxStyle.left > x && commandBoxStyle.left + commandBoxStyle.width < x && commandBoxStyle.top > y && commandBoxStyle.top + commandBoxStyle.height < y;
    },

    onMouseMoveHandler: function onMouseMoveHandler(e) {
        var that = this;
        //console.log('mouse move');

        if (this.state.choosing) {
            console.log(that.state.mouseX, that.state.mouseY);

            that.setState({
                mouseX: that._getRelativedX(e),
                mouseY: that._getRelativedY(e) });
        }
    },

    onMouseDownHandler: function onMouseDownHandler(e) {
        console.log('mouse down', e);

        if (!this._isInChoosingBox(e) && !this._isInCommandBox(e)) {
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

    onMouseUpHandler: function onMouseUpHandler(e) {
        console.log('mouse up', e);

        if (!this.state.mouseDownInChoosingBox) {
            this.setState({
                choosing: false,
                mouseUpX: this._getRelativedX(e),
                mouseUpY: this._getRelativedY(e),
                commandBoxShow: true
            });
        }
    },

    onMouseLeaveHandler: function onMouseLeaveHandler(e) {
        console.log('mouse leave', e);

        this.setState({
            choosing: false,
            mouseUpX: this._getRelativedX(e),
            mouseUpY: this._getRelativedY(e)
        });
    },

    getStyle: function getStyle() {

        return {
            position: 'relative',
            width: this.props['width'],
            height: this.props['height'],
            overflow: 'visible'
        };
    },

    componentDidMount: function componentDidMount() {

        this.setState({
            offsetTop: this.getDOMNode().offsetTop,
            offsetLeft: this.getDOMNode().offsetLeft
        });
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {

        //return nextState.choosing
        return true;
    },

    _getChoosingBoxStyle: function _getChoosingBoxStyle() {
        var state = this.state;
        var startX = state.mouseDownX,
            startY = state.mouseDownY,
            endX = state.choosing ? state.mouseX : state.mouseUpX,
            endY = state.choosing ? state.mouseY : state.mouseUpY;

        var style = this.props['choosingBoxStyle'];

        _underscore2['default'].extend(style, {
            top: startY < endY ? startY : endY,
            left: startX < endX ? startX : endX,
            width: Math.abs(startX - endX),
            height: Math.abs(startY - endY)
        });

        return style;
    },

    _getCommandBoxStyle: function _getCommandBoxStyle() {
        var choosingBoxStyle = this._getChoosingBoxStyle();

        var style = this.props['commandBoxStyle'];

        return _underscore2['default'].extend({ width: 80, height: 50 }, style, {
            top: choosingBoxStyle.top + choosingBoxStyle.height + 15,
            left: choosingBoxStyle.left - 5
        });
    },

    render: function render() {
        //console.log('render', this.state);

        var state = this.state;

        return _react2['default'].createElement(
            'div',
            { className: 'react-photo-tagger-wrap',
                onMouseDown: this.onMouseDownHandler,
                onMouseUp: this.onMouseUpHandler,
                onMouseMove: this.onMouseMoveHandler,
                style: this.getStyle() },
            _react2['default'].createElement(_ChoosingBox2['default'], {
                style: this._getChoosingBoxStyle(),
                show: state.choosingBoxShow }),
            _react2['default'].createElement(_CommandBox2['default'], {
                style: this._getCommandBoxStyle(),
                show: state.commandBoxShow }),
            _react2['default'].createElement(_Img2['default'], { src: this.props['imgSrc'] })
        );
    }
});

exports['default'] = Wrap;
module.exports = exports['default'];

//# sourceMappingURL=Wrap.js.map