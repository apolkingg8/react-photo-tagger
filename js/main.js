"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var _ = _interopRequire(require("underscore"));

var Draggable = _interopRequire(require("react-draggable"));

var Img = React.createClass({
    displayName: "Img",

    render: function render() {

        var _style = {
            width: "100%",
            height: "100%"
        };

        return React.createElement("img", { src: this.props.src,
            style: _style });
    }
});

var ChoosingBox = React.createClass({
    displayName: "ChoosingBox",

    getInitialState: function getInitialState() {
        return {};
    },

    getDefaultProps: function getDefaultProps() {
        return {
            positionX: 0,
            positionY: 0,
            width: 0,
            height: 0,
            show: false
        };
    },

    getStyle: function getStyle() {
        var _style = {
            position: "absolute",
            top: this.props.positionY,
            left: this.props.positionX,
            width: this.props.width,
            height: this.props.height,
            visibility: this.props.show ? "visible" : "hidden",
            border: "2px solid #fff"
        };

        if (this.props.width < 0) {
            _style.left += this.props.width;
            _style.width = Math.abs(this.props.width);
        }

        if (this.props.height < 0) {
            _style.top += this.props.height;
            _style.height = Math.abs(this.props.height);
        }

        return _style;
    },

    onDragHandler: function onDragHandler(e) {
        console.log("hi");
    },

    render: function render() {
        return React.createElement("div", { style: this.getStyle(),
            onDrag: this.onDragHandler() });
    }
});

var CommandBox = React.createClass({
    displayName: "CommandBox",

    getInitialState: function getInitialState() {
        return {
            show: false
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            positionX: 0,
            positionY: 0
        };
    },

    getStyle: function getStyle() {
        return {
            position: "absolute",
            top: 0,
            left: 0,
            width: "80px",
            height: "50px",
            visibility: this.state.show ? "visible" : "hidden",
            backgroundColor: "#d1d1d1"
        };
    },

    render: function render() {
        return React.createElement("div", { style: this.getStyle() });
    }
});

var Wrap = React.createClass({
    displayName: "Wrap",

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
            choosingBoxWidth: 0,
            choosingBoxHeight: 0,

            dragging: false
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            imgSrc: "",
            width: "100%",
            height: "100%"
        };
    },

    _getRelativedX: function _getRelativedX(e) {
        return e.clientX - this.state.offsetLeft;
    },

    _getRelativedY: function _getRelativedY(e) {
        return e.clientY - this.state.offsetTop;
    },

    _isInChoosingBox: function _isInChoosingBox(e) {

        var _x = this._getRelativedX(e);
        var _y = this._getRelativedY(e);

        return this.state.mouseDownX < _x && _x < this.state.mouseDownX + this.state.choosingBoxWidth && (this.state.mouseDownY < _y && _y < this.state.mouseDownY + this.state.choosingBoxHeight);
    },

    componentDidMount: function componentDidMount() {

        this.setState({
            offsetTop: this.getDOMNode().offsetTop,
            offsetLeft: this.getDOMNode().offsetLeft
        });
    },

    onMouseMoveHandler: function onMouseMoveHandler(e) {
        var that = this;
        //console.log('mouse move');

        if (this.state.dragging) {
            console.log(that.state.mouseX, that.state.mouseY);

            that.setState({
                mouseX: that._getRelativedX(e),
                mouseY: that._getRelativedY(e),
                choosingBoxWidth: that.state.mouseX - that.state.mouseDownX,
                choosingBoxHeight: that.state.mouseY - that.state.mouseDownY
            });
        }
    },

    onMouseDownHandler: function onMouseDownHandler(e) {
        console.log("mouse down", e);

        if (!this._isInChoosingBox(e)) {
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

    onMouseUpHandler: function onMouseUpHandler(e) {
        console.log("mouse up", e);

        this.setState({
            dragging: false,
            mouseUpX: this._getRelativedX(e),
            mouseUpY: this._getRelativedY(e)
        });
    },

    onMouseLeaveHandler: function onMouseLeaveHandler(e) {
        console.log("mouse leave", e);

        this.setState({
            dragging: false,
            mouseUpX: this._getRelativedX(e),
            mouseUpY: this._getRelativedY(e)
        });
    },

    getStyle: function getStyle() {

        return {
            position: "relative",
            top: "20px",
            width: this.props.width,
            height: this.props.height
        };
    },

    render: function render() {

        console.log("render");

        return React.createElement(
            "div",
            { className: "react-photo-tagger-wrap",
                onMouseDown: this.onMouseDownHandler,
                onMouseUp: this.onMouseUpHandler,
                onMouseMove: this.onMouseMoveHandler,
                style: this.getStyle() },
            React.createElement(ChoosingBox, {
                positionX: this.state.mouseDownX,
                positionY: this.state.mouseDownY,
                width: this.state.choosingBoxWidth,
                height: this.state.choosingBoxHeight,
                show: this.state.choosingBoxShow }),
            React.createElement(CommandBox, null),
            React.createElement(Img, { src: this.props.imgSrc })
        );
    }
});

React.render(React.createElement(Wrap, {
    imgSrc: "test.jpeg",
    width: "250px",
    height: "200px" }), document.body);

//# sourceMappingURL=main.js.map