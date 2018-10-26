// @flow

import * as React from "react";
import "./scroll.scss";

type Props = {
  height: number
};

type State = {
  top: number,
  height: number,
  start: number,
  scrolling: boolean
};

class Scroll extends React.Component<Props, State> {
  static defaultProps = {
    height: 300
  };

  state = {
    top: 0,
    height: 30,
    scrolling: false,
    start: 0
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
      <section>
        <h1>Custom scrollbar</h1>
        <article>
          <div id="container" style={{ height: heightContainer }}>
            <div id="scrollbar-container" ref={this.container}>
              <div
                id="scrollbar"
                style={{ height, top }}
                ref={this.scroll}
                onMouseDown={this.handleMouseDown}
              />
            </div>
            <div id="content" onScroll={this.handleScroll} ref={this.content}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              libero lacus, lobortis congue purus hendrerit, pharetra dictum
              metus. Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia Curae; Phasellus in elit vel nisl
              condimentum tincidunt eget quis turpis. Aliquam porta placerat
              nisl vitae interdum. Ut nibh lorem, mollis sit amet diam a,
              ultrices tincidunt felis. Duis tincidunt, mauris convallis
              interdum suscipit, dui elit ultrices elit, et rhoncus nunc lacus a
              odio. Morbi quis egestas nisl. Etiam vestibulum felis vitae felis
              lobortis, sit amet interdum neque congue. Curabitur est augue,
              imperdiet ullamcorper diam ac, suscipit auctor orci. Donec id ex
              eget eros volutpat tempor. Vivamus pretium sagittis quam vel
              malesuada. In hac habitasse platea dictumst. Maecenas consequat
              imperdiet lacus, at faucibus mauris posuere ac. Pellentesque a
              tellus dolor. Ut ante nisi, sagittis quis varius eu, luctus
              aliquet elit. Nunc vel ullamcorper mauris. Duis scelerisque tempor
              velit, eget euismod arcu ultrices nec. Nulla facilisi.
              Pellentesque ullamcorper tellus vitae sapien dapibus venenatis.
              Phasellus eget nunc ornare, aliquet nulla eu, lacinia metus.
              Maecenas maximus porta feugiat. Pellentesque finibus nulla orci,
              non pulvinar libero finibus vitae. Pellentesque bibendum vehicula
              arcu vitae dignissim. Aliquam tempor nisl id porttitor venenatis.
            </div>
          </div>
        </article>
      </section>
    );
  }
}

export default Scroll;
