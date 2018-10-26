// @flow

import * as React from 'react';
import './scroll.scss';

type Props = {
  height: number,
};

type State = {
  top: number,
  contentHeight: number,
  status: boolean,
  positionDown: number,
};

class Scroll extends React.Component<Props, State> {

  static defaultProps = {
    height: 700
  };

  content: { current: null | HTMLDivElement };

  constructor(props: any) {
    super(props);
    this.state = {
      top: 0,
      contentHeight: 10,
      status: false,
      positionDown: 0
    };
    this.content = React.createRef();
  }

  onWheel = (e: SyntheticWheelEvent<HTMLDivElement>) => {
    if (e.deltaY < 0) {
      this.setState((state) => {
        return {top: state.top - 5}
      });
    }
    if (e.deltaY > 0) {
      this.setState((state) => {
        return {top: state.top + 5}
      });
    }
    this.setScrollDefault();
  }

  setScrollDefault = () => {
    const { contentHeight, top } = this.state;
    const { height } = this.props;
    const scroolHeight = (height*height) / contentHeight;
    if(top > height-scroolHeight) {
      this.setState({
        top: height-scroolHeight
      });
    }

    if(top < 0) {
      this.setState({
        top: 0
      });
    }
  }

  componentDidMount() {
    this.setState({
      // contentHeight: this.content.current.clientHeight
    });
  }

  getBackTop = () => {
    const { contentHeight, top } = this.state;
    const { height } = this.props;
    const backTop = top/height*contentHeight;
    return backTop;
  }

  onMouseDown = (e: SyntheticMouseEvent<HTMLDivElement>) => {
    console.log(e.screenY, 'onMouseDown')
    this.setState({
      status: true,
      positionDown: e.screenY
    });

  }

  onMouseUp = (e: SyntheticMouseEvent<HTMLDivElement>) => {
    console.log(e.screenY, 'onMouseoUp')
    this.setState({
      status: false
    }, () => {
      if(this.state.top <= 0) {
        this.setState({
          top: 0,
          status: false
        });
      }
    });
  }

  onMouseMove = (e: SyntheticMouseEvent<HTMLDivElement>) => {
    const { top, status } = this.state;
    console.log(e.screenY)
    if(status) {
      this.setState({
        top: e.screenY
      });
    }
  }

  // onMouseLeave = () => {
  //   this.setState({
  //     status: false
  //   });
  // }

  render() {
    console.log(this.state.positionDown)
    const row = [];
    for (let i = 0; i< 100; i++) {
      row.push(<div className="row" key={i}>{i}</div>);
    }
    const { contentHeight, top } = this.state;
    const { height } = this.props;
    const scroolHeight = (height*height) / contentHeight;
    // console.log(scroolHeight, 'scroolHeight');
    return (
      <div>
        <div className="container" onWheel={this.onWheel} style={{ height: height }}>
          <div className="content" style={{ top: -this.getBackTop()}} ref={this.content}>
            {row}
          </div>
          <div className="scrollbar"
            onMouseMove = {this.onMouseMove}
          >
            <div
              className="scroll"
              onMouseDown = {this.onMouseDown}
              onMouseUp = {this.onMouseUp}
              onMouseMove = {this.onMouseMove}

              style={{ top, height: scroolHeight }}
            >
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Scroll;
