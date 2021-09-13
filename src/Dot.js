import { isOutside } from './utils'

class Dot {
  constructor ({ ctx, rect, color, radius, distance, tx, ty }) {
    this.ctx = ctx // canvas
    this.rect = rect// canvas rect
    this.radius = radius // radius for a basic dot
    this.color = color // color for dot
    this.distance = distance
    this.dot = {
      x: 0,
      y: 0,
      r: 0,
      sx: 0,
      sy: 0
    }
    this.init(tx, ty)
  }
  init (tx, ty) {
    const {
      width,
      height
    } = this.rect
    this.dot = getDot({width, height, r: this.radius, color:this.color, x: tx, y: ty })
    paintDot.call(this.ctx, this.dot)
  }
  update (callback) {
    const {
      x, y, sx, sy
    } = this.dot

    const nx = x + sx
    const ny = y + sy

    if (isOutside(nx, ny, this.distance, this.rect)) {
      callback && callback()
      return
    }
    this.dot.x = nx
    this.dot.y = ny
    // console.log(sx, sy)
    paintDot.call(this.ctx, this.dot)
  }
}

function paintDot (dot) {
  const {
    x, y, r, color
  } = dot
  this.fillStyle = color
  this.beginPath()
  this.arc(x, y, r, 0, Math.PI * 2, false)
  this.fill()
  this.closePath()
}

function getDot ({width, height, r, color, x = '', y = '' }) {
  return {
    x: x || Math.random() * width,
    y: y || Math.random() * height,
    r: Math.random() * r,
    sx: Math.random() * 2 - 1,
    sy: Math.random() * 2 - 1,
    color
  }
}

export default Dot
