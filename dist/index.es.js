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

var css = ".container {\n  width: 500px;\n  position: relative;\n  height: 600px;\n  background-color: #29f0ed;\n  overflow: hidden; }\n  .container .scrollbar {\n    position: absolute;\n    right: 0;\n    width: 10px;\n    height: 100%;\n    background-color: #222; }\n    .container .scrollbar .scroll {\n      position: absolute;\n      right: 0;\n      width: 10px;\n      height: 20px;\n      background-color: red;\n      cursor: pointer; }\n  .container .content {\n    margin-right: 10px;\n    position: absolute;\n    left: 0;\n    right: 10px; }\n\n.row {\n  padding: 10px; }\n";
styleInject(css);

var Scroll =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Scroll, _React$Component);

  function Scroll(props) {
    var _this;

    _classCallCheck(this, Scroll);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Scroll).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "content", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onWheel", function (e) {
      if (e.deltaY < 0) {
        _this.setState(function (state) {
          return {
            top: state.top - 5
          };
        });
      }

      if (e.deltaY > 0) {
        _this.setState(function (state) {
          return {
            top: state.top + 5
          };
        });
      }

      _this.setScrollDefault();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setScrollDefault", function () {
      var _this$state = _this.state,
          contentHeight = _this$state.contentHeight,
          top = _this$state.top;
      var height = _this.props.height;
      var scroolHeight = height * height / contentHeight;

      if (top > height - scroolHeight) {
        _this.setState({
          top: height - scroolHeight
        });
      }

      if (top < 0) {
        _this.setState({
          top: 0
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getBackTop", function () {
      var _this$state2 = _this.state,
          contentHeight = _this$state2.contentHeight,
          top = _this$state2.top;
      var height = _this.props.height;
      var backTop = top / height * contentHeight;
      return backTop;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseDown", function (e) {
      console.log(e.screenY, 'onMouseDown');

      _this.setState({
        status: true,
        positionDown: e.screenY
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseUp", function (e) {
      console.log(e.screenY, 'onMouseoUp');

      _this.setState({
        status: false
      }, function () {
        if (_this.state.top <= 0) {
          _this.setState({
            top: 0,
            status: false
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseMove", function (e) {
      var _this$state3 = _this.state,
          top = _this$state3.top,
          status = _this$state3.status;
      console.log(e.screenY);

      if (status) {
        _this.setState({
          top: e.screenY
        });
      }
    });

    _this.state = {
      top: 0,
      contentHeight: 10,
      status: false,
      positionDown: 0
    };
    _this.content = createRef();
    return _this;
  }

  _createClass(Scroll, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({// contentHeight: this.content.current.clientHeight
      });
    }
  }, {
    key: "render",
    // onMouseLeave = () => {
    //   this.setState({
    //     status: false
    //   });
    // }
    value: function render() {
      console.log(this.state.positionDown);
      var row = [];

      for (var i = 0; i < 100; i++) {
        row.push(createElement("div", {
          className: "row",
          key: i
        }, i));
      }

      var _this$state4 = this.state,
          contentHeight = _this$state4.contentHeight,
          top = _this$state4.top;
      var height = this.props.height;
      var scroolHeight = height * height / contentHeight; // console.log(scroolHeight, 'scroolHeight');

      return createElement("div", null, createElement("div", {
        className: "container",
        onWheel: this.onWheel,
        style: {
          height: height
        }
      }, createElement("div", {
        className: "content",
        style: {
          top: -this.getBackTop()
        },
        ref: this.content
      }, row), createElement("div", {
        className: "scrollbar",
        onMouseMove: this.onMouseMove
      }, createElement("div", {
        className: "scroll",
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp,
        onMouseMove: this.onMouseMove,
        style: {
          top: top,
          height: scroolHeight
        }
      }))));
    }
  }]);

  return Scroll;
}(Component);

_defineProperty(Scroll, "defaultProps", {
  height: 700
});

export { Scroll };
