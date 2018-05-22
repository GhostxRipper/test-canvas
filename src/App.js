// @flow
import React, { Component, Fragment } from 'react'
import { hot } from 'react-hot-loader'

import './App.css'
import Canvas from './Canvas'

const GRAVITY = 0.5
const BOUNCE_FACTOR = 0.8

type State = {
  coordonate: {
    x: number,
    y: number,
  },
  velocity: {
    x: number,
    y: number,
  },
}

class App extends Component<{}, State> {
  state = {
    coordonate: {
      x: 350,
      y: 75,
    },
    velocity: {
      x: 0,
      y: 0,
    },
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrameId)
  }

  animationFrameId: any
  tick = () => {
    this.animationFrameId = window.requestAnimationFrame(() => {
      const velocity = {
        ...this.state.velocity,
        y: this.state.velocity.y + GRAVITY,
      }
      const coordonate = {
        x: this.state.coordonate.x + velocity.x,
        y: this.state.coordonate.y + velocity.y,
      }

      if (
        coordonate.x + 50 > 700 ||
        coordonate.x - 50 < 0 ||
        coordonate.y + 50 > 700 ||
        coordonate.y - 50 < 0
      ) {
        coordonate.x = 700 / 2
        coordonate.y = 700 - 50
        velocity.x = 0
        velocity.y *= -BOUNCE_FACTOR
      }

      this.setState({ velocity, coordonate }, this.tick)
    })
  }

  reset = () => {
    window.cancelAnimationFrame(this.animationFrameId)
    this.setState({
      coordonate: {
        x: 350,
        y: 75,
      },
      velocity: {
        x: 0,
        y: 0,
      },
    })
  }

  render() {
    const width = 700
    const height = 700
    return (
      <Fragment>
        <h3>Test Canvas: Gravity</h3>
        <button onClick={() => this.reset()}>reset</button>
        <Canvas
          onClick={() => this.tick()}
          draw={ctx => {
            ctx.clearRect(0, 0, width, height)
            const center = this.state.coordonate
            ctx.fillStyle = 'green'
            ctx.beginPath()
            ctx.arc(center.x, center.y, 50, 0, 2 * Math.PI, false)
            ctx.closePath()
            ctx.fill()
          }}
          width={width}
          height={height}
        />
      </Fragment>
    )
  }
}

// $FlowFixMe
export default hot(module)(App)
