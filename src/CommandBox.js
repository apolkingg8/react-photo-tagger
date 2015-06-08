'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var CommandBox = _react2['default'].createClass({
    displayName: 'CommandBox',

    getInitialState: function getInitialState() {
        return {};
    },

    getDefaultProps: function getDefaultProps() {
        return {
            show: false,
            showArrow: true
        };
    },

    getBoxStyle: function getBoxStyle() {
        var defaultStyle = {
            position: 'absolute',
            backgroundColor: '#d1d1d1',
            transform: 'scale(' + (this.props['show'] ? '1,1' : '0,0') + ')',
            transformOrigin: '10% 10%',
            transition: this.props['show'] ? 'transform .15s ease-in' : 'none'
        };

        return _underscore2['default'].extendOwn(defaultStyle, this.props['style']);
    },

    getArrowStyle: function getArrowStyle(size) {

        if (size > 2 && this.props['showArrow']) {
            return {
                position: 'absolute',
                top: -size,
                left: size,
                width: size,
                height: size,
                boxSizing: 'border-box',
                borderStyle: 'solid',
                borderColor: 'transparent transparent ' + this.getBoxStyle().backgroundColor + ' transparent',
                borderWidth: '0 ' + size / 2 + 'px ' + Math.floor(size * 2 / 3) + 'px ' + size / 2 + 'px'
            };
        } else {
            return {
                display: 'none'
            };
        }
    },

    render: function render() {
        var boxStyle = this.getBoxStyle();
        //fixme: borderRadius using 'em' not handled
        var boxWidthWithOutRadius = boxStyle.width - boxStyle.borderRadius.replace('px', '');
        var arrowSize = boxWidthWithOutRadius > 16 ? 8 : boxWidthWithOutRadius / 2;

        return _react2['default'].createElement(
            'div',
            { style: this.getBoxStyle() },
            _react2['default'].createElement('div', { style: this.getArrowStyle(arrowSize) })
        );
    }
});

exports['default'] = CommandBox;
module.exports = exports['default'];

//# sourceMappingURL=CommandBox.js.map