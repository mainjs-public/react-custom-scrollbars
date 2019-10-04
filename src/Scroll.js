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
    height: 300,
    scrollBorderRadius: 5,
    scrollColor: "rgba(0, 0, 0, 0.2)",
    scrollCursor: "pointer",
    scrollDisplay: "block",
    scrollWidth: 5,
    scrollRight: 1
  };

  state = {
    top: 0,
    height: 30,
    start: 0,
    y: 0,
    data: this.props.data
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

  componentWillReceiveProps(nextProps) {
    this.handleScroll();
  }
  
  handleScroll = () => {
    const content = this.content.current;
    const container = this.container.current;
    const isScroll = content.scrollHeight > ( 10 + container.clientHeight );
    
    const height = (container.clientHeight * content.clientHeight) / content.scrollHeight;
    const top = (container.clientHeight * content.scrollTop) / content.scrollHeight;
    this.setState({
      height: isScroll ? height : 0,
      top,
    });
  };

  isFirefox = () => {
    if(typeof InstallTrigger !== 'undefined')
      return true;
    return false;
  }

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

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.data && prevState.data && Object.keys(prevProps.data).length !== Object.keys(prevState.data).length && this.props.autoScroll) {
      const content = this.content.current;
      this.setState({
        data: prevProps.data
      }, ()=> {
        content.scrollTop = content.scrollHeight;
      })
      
    }
  }

  render() {
    const { height, top } = this.state;
    const { 
      height: heightContainer,
      scrollBorderRadius,
      scrollColor,
      scrollCursor,
      scrollWidth,
      scrollRight,
      style : styleScroll,
      ...prop
    } = this.props;

    const containerStyle= {
      borderRadius: scrollBorderRadius ,
      color: scrollColor,
      cursor: scrollCursor,
      width: scrollWidth,
      right: scrollRight,
      ...styleScroll,
      height,
      top
    }


    return (
      <div  className={style.container} style={{ height: styleScroll.height ? styleScroll.height : heightContainer }}>
        <div className={style.scrollbarContainer} ref={this.container}>
          <div
            className={style.scrollbar}
            ref={this.scroll}
            onMouseDown={this.handleMouseDown}
            style={{
              ...containerStyle
            }}
          />
        </div>
        <div className={style.content} onScroll={this.handleScroll} ref={this.content}>
          <div className={this.isFirefox() === true ? 'story-list-firefox' : ''}>
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}

export default Scroll;
