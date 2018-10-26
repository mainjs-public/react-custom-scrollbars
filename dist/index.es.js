import { createRef, createElement, Component } from 'react';

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

var css = "body {\n  font-family: cursive;\n  background: #eef; }\n\nh1 {\n  text-align: center; }\n\n#container {\n  width: 300px;\n  box-sizing: border-box;\n  max-width: 100%;\n  padding: 5px 10px;\n  margin: auto;\n  background: #ccc;\n  position: relative; }\n\n#content {\n  height: 100%;\n  width: 100%;\n  overflow-y: scroll; }\n\n#scrollbar-container {\n  position: absolute;\n  right: 5px;\n  bottom: 5px;\n  top: 5px;\n  width: 20px; }\n\n#scrollbar {\n  position: absolute;\n  right: 0;\n  height: 30px;\n  width: 10px;\n  border-radius: 10px;\n  background: rgba(0, 0, 0, 0.5); }\n\n::-webkit-scrollbar {\n  display: none; }\n";
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
      scrolling: false,
      start: 0
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "content", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "container", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scroll", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleScroll", function () {
      var content = _this.content.current;
      var container = _this.container.current;

      _this.setState({
        height: container.clientHeight * content.clientHeight / content.scrollHeight,
        top: container.clientHeight * content.scrollTop / content.scrollHeight
      });
    });

    _this.content = createRef();
    _this.container = createRef();
    _this.scroll = createRef();
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
      var heightContainer = this.props.height;
      var _this$state2 = this.state,
          height = _this$state2.height,
          top = _this$state2.top;
      return createElement("section", null, createElement("h1", null, "Custom scrollbar"), createElement("article", null, createElement("div", {
        id: "container",
        style: {
          height: heightContainer
        }
      }, createElement("div", {
        id: "scrollbar-container",
        ref: this.container
      }, createElement("div", {
        id: "scrollbar",
        style: {
          height: height,
          top: top
        },
        ref: this.scroll,
        onMouseDown: this.handleMouseDown
      })), createElement("div", {
        id: "content",
        onScroll: this.handleScroll,
        ref: this.content
      }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent libero lacus, lobortis congue purus hendrerit, pharetra dictum metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus in elit vel nisl condimentum tincidunt eget quis turpis. Aliquam porta placerat nisl vitae interdum. Ut nibh lorem, mollis sit amet diam a, ultrices tincidunt felis. Duis tincidunt, mauris convallis interdum suscipit, dui elit ultrices elit, et rhoncus nunc lacus a odio. Morbi quis egestas nisl. Etiam vestibulum felis vitae felis lobortis, sit amet interdum neque congue. Curabitur est augue, imperdiet ullamcorper diam ac, suscipit auctor orci. Donec id ex eget eros volutpat tempor. Vivamus pretium sagittis quam vel malesuada. In hac habitasse platea dictumst. Maecenas consequat imperdiet lacus, at faucibus mauris posuere ac. Pellentesque a tellus dolor. Ut ante nisi, sagittis quis varius eu, luctus aliquet elit. Nunc vel ullamcorper mauris. Duis scelerisque tempor velit, eget euismod arcu ultrices nec. Nulla facilisi. Pellentesque ullamcorper tellus vitae sapien dapibus venenatis. Phasellus eget nunc ornare, aliquet nulla eu, lacinia metus. Maecenas maximus porta feugiat. Pellentesque finibus nulla orci, non pulvinar libero finibus vitae. Pellentesque bibendum vehicula arcu vitae dignissim. Aliquam tempor nisl id porttitor venenatis."))));
    }
  }]);

  return Scroll;
}(Component);

_defineProperty(Scroll, "defaultProps", {
  height: 300
});

export { Scroll };
