'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPhotoTagger = require('../react-photo-tagger');

var _reactPhotoTagger2 = _interopRequireDefault(_reactPhotoTagger);

_react2['default'].render(_react2['default'].createElement(_reactPhotoTagger2['default'], {
    imgSrc: 'test.jpeg',
    width: '250px',
    height: '200px',
    choosingBoxStyle: {},
    commandBoxStyle: {
        borderRadius: '5px'
    } }), document.body);

//border: '#fff 1px'

//# sourceMappingURL=main.js.map