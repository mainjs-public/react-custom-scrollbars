import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './scrool.scss';

class Scroll extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      top: 0,
      contentHeight: 10,
      status: false,
      positionDown: 0
    };
    this.content = React.createRef();
    this.onWheel = this.onWheel.bind(this);
  }

  onWheel(e) {
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
      contentHeight: this.content.current.clientHeight
    });
  }

  getBackTop = () => {
    const { contentHeight, top } = this.state;
    const { height } = this.props;
    const backTop = top/height*contentHeight;
    return backTop;
  }

  onMouseDown = (e) => {
    console.log(e.screenY, 'onMouseDown')
    this.setState({
      status: true,
      positionDown: e.screenY
    });

  }

  onMouseUp = (e) => {
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

  onMouseMove = (e) => {
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

Scroll.propTypes = {
  height: PropTypes.number.isRequired
};

Scroll.defaultProps = {
  height: 700
}

export default Scroll;