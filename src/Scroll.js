// @flow

import * as React from "react";
import style from "./scroll.css";

type Props = {
  height: number,
  children: React.Node,
};

type State = {
  top: number,
  height: number,
  start: number,
  y: number,
};

class Scroll extends React.Component<Props, State> {
  static defaultProps = {
    height: 300
  };

  state = {
    top: 0,
    height: 30,
    start: 0,
    y: 0
  };

  content: { current: {} | HTMLDivElement };
  container: { current: {} | HTMLDivElement };
  scroll: { current: {} | HTMLDivElement };

  constructor(props: any) {
    super(props);

    this.content = React.createRef();
    this.container = React.createRef();
    this.scroll = React.createRef();

    this.onMove = this.onMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  componentDidMount() {
    this.handleScroll();
  }

  handleScroll = () => {
    const content = this.content.current;
    const container = this.container.current;

    this.setState({
      height:
        (container.clientHeight * content.clientHeight) / content.scrollHeight,
      top: (container.clientHeight * content.scrollTop) / content.scrollHeight
    });
  };

  handleMouseDown(e) {
    e.preventDefault();

    const scroll = this.scroll.current;

    this.setState(
      {
        start: e.pageY,
        y: scroll.offsetTop
      },
      () => {
        window.addEventListener("mousemove", this.onMove, false);
        window.addEventListener(
          "mouseup",
          () => {
            window.removeEventListener("mousemove", this.onMove, false);
          },
          false
        );
      }
    );
  }

  onMove(e) {
    const { start, y } = this.state;

    const content = this.content.current;
    const container = this.container.current;
    const scroll = this.scroll.current;

    const delta = e.pageY - start;

    const top = Math.min(
      container.clientHeight - scroll.clientHeight,
      Math.max(0, y + delta)
    );

    this.setState({
      top
    });

    content.scrollTop =
      (content.scrollHeight * scroll.offsetTop) / container.clientHeight;
  }

  render() {
    const { height: heightContainer } = this.props;
    const { height, top } = this.state;

    return (
      <div className={style.container} style={{ height: heightContainer }}>
        <div className={style.scrollbarContainer} ref={this.container}>
          <div
            className={style.scrollbar}
            style={{ height, top }}
            ref={this.scroll}
            onMouseDown={this.handleMouseDown}
          />
        </div>
        <div className={style.content} onScroll={this.handleScroll} ref={this.content}>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default Scroll;
