'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var ChoosingBox = _react2['default'].createClass({
    displayName: 'ChoosingBox',

    getInitialState: function getInitialState() {
        return {
            mouseIn: false,
            dragging: false
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            show: false
        };
    },

    getStyle: function getStyle() {
        var defaultStyle = {
            position: 'absolute',
            visibility: this.props['show'] ? 'visible' : 'hidden',
            border: '2px #d1d1d1 dashed',
            cursor: this.state.mouseIn ? 'move' : 'auto'
        };

        return _underscore2['default'].extendOwn(defaultStyle, this.props['style']);
    },

    onMouseEnterHandler: function onMouseEnterHandler(e) {
        console.log('mouse enter');

        this.setState({
            mouseIn: true
        });
    },

    onMouseLeaveHandler: function onMouseLeaveHandler(e) {
        console.log('mouse leave');

        this.setState({
            mouseIn: false
        });
    },

    onMouseDownHandler: function onMouseDownHandler(e) {

        this.setState({
            dragging: true
        });
    },

    onMouseUpHandler: function onMouseUpHandler(e) {
        this.setState({
            dragging: false
        });
    },

    onMouseMoveHandler: function onMouseMoveHandler(e) {

        if (this.state.dragging) {}
    },

    componentWillUpdate: function componentWillUpdate(nextProps, nextState) {},

    render: function render() {

        return _react2['default'].createElement('div', { style: this.getStyle(),
            onMouseEnter: this.onMouseEnterHandler,
            onMouseLeave: this.onMouseLeaveHandler,
            onMouseDown: this.onMouseDownHandler,
            onMouseUp: this.onMouseUpHandler,
            onMouseMove: this.onMouseMoveHandler });
    }
});

exports['default'] = ChoosingBox;
module.exports = exports['default'];

//# sourceMappingURL=ChoosingBox.js.map