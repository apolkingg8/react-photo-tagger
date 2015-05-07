"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var _ = _interopRequire(require("underscore"));

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

    setStyle: function setStyle() {
        return {
            position: "absolute",
            top: this.props.positionY,
            left: this.props.positionX,
            width: this.props.width,
            height: this.props.height,
            visibility: this.props.show,
            border: "2px solid #fff"
        };
    },

    render: function render() {
        return React.createElement("div", { style: this.setStyle() });
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

    _getRelativedX: function _getRelativedX(e) {
        return e.clientX - this.state.offsetLeft;
    },

    _getRelativedY: function _getRelativedY(e) {
        return e.clientY - this.state.offsetTop;
    },

    componentDidMount: function componentDidMount() {

        this.setState({
            offsetTop: this.getDOMNode().offsetTop,
            offsetLeft: this.getDOMNode().offsetLeft
        });
    },

    onMouseMoveHandler: function onMouseMoveHandler(e) {
        var that = this;

        var onMove = _.throttle(function () {
            console.log("mouse move");

            that.setState({
                mouseX: that._getRelativedX(e),
                mouseY: that._getRelativedY(e)
            });
        }, 100);

        onMove();

        if (this.state.dragging) {
            _.throttle(function () {
                console.log(that.state.mouseX, that.state.mouseY);

                that.setState({
                    choosingBoxWidth: that.state.mouseX - that.state.mouseDownX,
                    choosingBoxHeight: that.state.mouseY - that.state.mouseDownY
                });
            }, 100);
        }
    },

    onMouseDownHandler: function onMouseDownHandler(e) {
        e.preventDefault();
        console.log("mouse down", e);

        this.setState({
            dragging: true,
            mouseDownX: this._getRelativedX(e),
            mouseDownY: this._getRelativedY(e)
        });
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

    setStyle: function setStyle() {

        return {
            position: "relative",
            top: "20px",
            width: this.props.width || "100%",
            height: this.props.height || "100%"
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
                style: this.setStyle() },
            React.createElement(ChoosingBox, {
                positionX: this.state.mouseDownX,
                positionY: this.state.mouseDownY,
                width: this.state.choosingBoxWidth,
                height: this.state.choosingBoxHeight,
                show: this.state.choosingBoxShow }),
            React.createElement(Img, { src: this.props.imgSrc })
        );
    }
});

React.render(React.createElement(Wrap, {
    imgSrc: "test.jpeg",
    width: "250px",
    height: "200px" }), document.body);

//# sourceMappingURL=main.js.map