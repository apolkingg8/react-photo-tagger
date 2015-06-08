'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Img = _react2['default'].createClass({
    displayName: 'Img',

    render: function render() {

        var _style = {
            width: '100%',
            height: '100%'
        };

        return _react2['default'].createElement('img', { src: this.props['src'],
            style: _style });
    }
});

module.exports = Img;

//# sourceMappingURL=Img.js.map