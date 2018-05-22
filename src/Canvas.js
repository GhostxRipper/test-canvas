// @flow
import React, { Component } from 'react'

type Props = {
  width: number,
  height: number,
  draw: CanvasRenderingContext2D => void,
}

class Canvas extends Component<Props> {
  componentDidMount() {
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d')
      this.scale()
      this.props.draw(this.ctx)
    }
  }

  componentDidUpdate() {
    this.props.draw(this.ctx)
  }

  scale = () => {
    const ratio: number = window.devicePixelRatio || 1
    if (this.canvas) {
      this.canvas.width = this.props.width * ratio
      this.canvas.height = this.props.height * ratio

      this.canvas.style.width = `${this.props.width}px`
      this.canvas.style.height = `${this.props.height}px`

      this.ctx.scale(ratio, ratio)
    }
  }

  canvas: ?HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  render() {
    const {
      width, height, draw, ...delegatedProps
    } = this.props

    return (
      <canvas
        ref={node => {
          this.canvas = node
        }}
        width={width}
        height={height}
        {...delegatedProps}
      />
    )
  }
}

export default Canvas
