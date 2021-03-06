import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { FaRobot } from 'react-icons/fa';

import './Controller.css';

class Controller extends Component {
  constructor(props) {
    super(props)
    this.originPosition = {
      x: window.innerWidth/2 - 50,
      y: window.innerHeight/2 - 50
    }

    this.state = {
      lastSent: {
        x: 0,
        y: 0
      },
      position: this.originPosition,
    }
  }

  handleDrag = (e, data) => {
    this.setState({
      position: {
        x: data.x,
        y: data.y
      }
    })
    const {x, y} = this.state.lastSent
    const orig = this.originPosition
    const relX = data.x - orig.x
    const relY = data.y - orig.y
    const len  = Math.sqrt((relX - x)**2 + (relY - y)**2)
    if(len > 20) {
      this.props.onDrag({x: relX, y: relY})
      this.setState({
        lastSent: {
          x: relX,
          y: relY
        }
      })
    }
  }

  handleStop = () => {
    this.setState({
      lastSent: {
        x: 0,
        y: 0
      },
      position: this.originPosition
    })
    this.props.onStop()
  }

  render() {
    return (
      <div>
        <svg height="100%" width="100%" className="line-container">
          <line x1={this.originPosition.x + 50} y1={this.originPosition.y + 50} x2={this.state.position.x + 50} y2={this.state.position.y + 50} className="line" />
        </svg>
        <Draggable
          position={this.state.position}
          onDrag={this.handleDrag}
          onStop={this.handleStop}>
          <div className="control" style={{backgroundColor: this.props.connectionState === WebSocket.OPEN ? "#0984e3" : "#d63031"}}>
            <FaRobot />
          </div>
        </Draggable>
      </div>
    )
  }
}

export default Controller;
