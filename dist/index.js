'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".scroll_container__2ZFIl {\n  box-sizing: border-box;\n  max-width:100%;\n  margin: auto;\n  position: relative;\n  overflow: hidden;\n}\n.scroll_content__dfsgC {\n  height: 100%;\n  width: calc(100% + 100px);\n  overflow-y: scroll;\n}\n\n.scroll_content__dfsgC > div {\n  margin-right: 100px;\n}\n\n.scroll_scrollbarContainer__2KZyQ {\n  position: absolute;\n  right: 0px;\n  bottom: 5px;\n  top: 5px;\n}\n\n.scroll_scrollbar__2hZu6 {\n  position: absolute;\n  right: 0;\n  height: 30px;\n  width: 10px;\n  border-radius: 10px;\n  background: rgba(0, 0, 0, 0.2);\n}\n\n::-webkit-scrollbar {\n  display: none;\n}\n";
var style = {"container":"scroll_container__2ZFIl","content":"scroll_content__dfsgC","scrollbarContainer":"scroll_scrollbarContainer__2KZyQ","scrollbar":"scroll_scrollbar__2hZu6"};
styleInject(css);

var Scroll =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Scroll, _React$Component);

  function Scroll(props) {
    var _this;

    _classCallCheck(this, Scroll);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Scroll).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      top: 0,
      height: 30,
      start: 0,
      y: 0
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "content", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "container", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scroll", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleScroll", function () {
      var content = _this.content.current;
      var container = _this.container.current;
      var isScroll = content.scrollHeight > 10 + container.clientHeight;
      var height = container.clientHeight * content.clientHeight / content.scrollHeight;
      var top = container.clientHeight * content.scrollTop / content.scrollHeight;

      _this.setState({
        height: isScroll ? height : 0,
        top: top
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isFirefox", function () {
      if (typeof InstallTrigger !== 'undefined') return true;
      return false;
    });

    _this.content = React.createRef();
    _this.container = React.createRef();
    _this.scroll = React.createRef();
    _this.onMove = _this.onMove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleMouseDown = _this.handleMouseDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Scroll, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.handleScroll();
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(e) {
      var _this2 = this;

      e.preventDefault();
      var scroll = this.scroll.current;
      this.setState({
        start: e.pageY,
        y: scroll.offsetTop
      }, function () {
        window.addEventListener("mousemove", _this2.onMove, false);
        window.addEventListener("mouseup", function () {
          window.removeEventListener("mousemove", _this2.onMove, false);
        }, false);
      });
    }
  }, {
    key: "onMove",
    value: function onMove(e) {
      var _this$state = this.state,
          start = _this$state.start,
          y = _this$state.y;
      var content = this.content.current;
      var container = this.container.current;
      var scroll = this.scroll.current;
      var delta = e.pageY - start;
      var top = Math.min(container.clientHeight - scroll.clientHeight, Math.max(0, y + delta));
      this.setState({
        top: top
      });
      content.scrollTop = content.scrollHeight * scroll.offsetTop / container.clientHeight;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          heightContainer = _this$props.height,
          scrollBorderRadius = _this$props.scrollBorderRadius,
          scrollColor = _this$props.scrollColor,
          scrollCursor = _this$props.scrollCursor,
          scrollDisplay = _this$props.scrollDisplay,
          scrollWidth = _this$props.scrollWidth,
          scrollRight = _this$props.scrollRight;
      var _this$state2 = this.state,
          height = _this$state2.height,
          top = _this$state2.top;
      return React.createElement("div", {
        className: style.container,
        style: {
          height: heightContainer
        }
      }, React.createElement("div", {
        className: style.scrollbarContainer,
        ref: this.container
      }, React.createElement("div", {
        className: style.scrollbar,
        ref: this.scroll,
        onMouseDown: this.handleMouseDown,
        style: {
          height: height,
          top: top,
          right: scrollRight,
          borderRadius: scrollBorderRadius,
          backgroundColor: scrollColor,
          cursor: scrollCursor,
          display: scrollDisplay,
          width: scrollWidth
        }
      })), React.createElement("div", {
        className: style.content,
        onScroll: this.handleScroll,
        ref: this.content
      }, React.createElement("div", {
        className: this.isFirefox() === true ? 'story-list-firefox' : ''
      }, this.props.children)));
    }
  }]);

  return Scroll;
}(React.Component);

_defineProperty(Scroll, "defaultProps", {
  height: 300,
  scrollBorderRadius: 5,
  scrollColor: "rgba(0, 0, 0, 0.2)",
  scrollCursor: "pointer",
  scrollDisplay: "block",
  scrollWidth: 5,
  scrollRight: 1
});

exports.Scroll = Scroll;
