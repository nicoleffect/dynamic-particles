import Dot from './Dot'
import { isMobile,throttle } from './utils'
import canvasRetina from '@nicoleffect/canvas-retina'

class DynamicParticles {
  constructor ({ canvas, distance, dotRadius, dotColor, lineWidth, lineColor, isConnect, isOnClick, isOnMove  }) {
    this.distance = distance
    this.dotColor = dotColor
    this.dotRadius = dotRadius
    this.lineWidth = lineWidth
    this.lineColor = lineColor || dotColor

    this.rectt = null
    this.ctx = null
    this.dotsArr = []
    this.dotsCount = 100

    this.setRectData(canvas)
    this.anim(isConnect)

    if (isOnClick) {
      this.onClick(canvas)
    }
    if (isOnMove) {
      this.onMove(canvas)
    }

    window.onresize = throttle(()=>{
      const {
        cw,
        ch,
        animId
      } = this.cacheRect
      const cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame
      cancelAnimationFrame(animId)
      this.ctx.clearRect(-distance, -distance, cw, ch)
      this.setRectData(canvas)
      this.anim(isConnect)
    })
  }

  setRectData(canvas){
    const {
      ctx,
      rect
    } = canvasRetina(canvas)
    this.ctx = ctx
    this.rect = rect
    const {
      width,
      height
    } = this.rect
    console.log(width,height)
    this.dotsCount = Math.floor(width * height / 2 /Math.pow(this.distance,2))

    for (let i = 0; i < this.dotsCount; i++) {
      this.initDot()
    }
  }

  initDot (tx, ty) {
    const dot = new Dot({
      ctx: this.ctx,
      rect: this.rect,
      distance: this.distance,
      color: this.dotColor,
      radius: this.dotRadius,
      tx,
      ty
    })
    this.dotsArr.push(dot)
    // console.log(this.dots_arr)
  }

  anim (isConnect) {
    const requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
    const _this = this
    const {
      width,
      height
    } = this.rect
    const d = this.distance
    const cw = width + d
    const ch = height + d
    this.cacheRect = {
      cw,
      ch,
      animId: ''
    }
    return (function _animateUpdate () {
      _this.ctx.clearRect(-d, -d, cw, ch) // clear canvas
      const arr = _this.dotsArr
      arr.forEach((itemI, idx) => {
        itemI.update(() => {
          if (arr.length > _this.dotsCount) {
            arr.splice(idx, 1)
          } else {
            itemI.init()
          }
        })
        if (isConnect) {
          const cache = [...arr]
          cache.splice(idx, 1)
          cache.forEach((itemJ) => {
            const dotI = itemI.dot
            const dotJ = itemJ.dot
            const ix = dotI.x
            const iy = dotI.y
            const jx = dotJ.x
            const jy = dotJ.y
            // console.log(arr[i])
            const s = Math.sqrt(Math.pow(ix - jx, 2) + Math.pow(iy - jy, 2)) // right triangle

            // console.log(s, d)
            if (s < d) {
              const ctx = _this.ctx
              // draw a line
              ctx.beginPath()
              ctx.moveTo(ix, iy)
              ctx.lineTo(jx, jy)
              ctx.strokeStyle = _this.lineColor
              ctx.strokeWidth = _this.lineWidth
              ctx.stroke()
              ctx.closePath()
            }
          })
        }
      })

      const animId = requestAnimFrame(_animateUpdate)
      _this.cacheRect.animId  = animId
    })()
  }
  onClick (canvas) {
    const event = isMobile ? 'touchstart' : 'click'
    const _createDot = (e) => {
      // console.log(e)
      const touch = isMobile ? e.touches[0] : e
      const tx = touch.pageX
      const ty = touch.pageY
      this.initDot(tx, ty)
    }
    canvas.addEventListener(event, _createDot)
  }

  onMove (canvas) {
    const eDown = isMobile ? 'touchstart' : 'mousedown'
    const eMove = isMobile ? 'touchmove' : 'mousemove'
    const eUp = isMobile ? 'touchend' : 'mouseup'
    const _moveDot = (e) => {
      const touch = isMobile ? e.touches[0] : e
      const tx = touch.pageX
      const ty = touch.pageY
      this.dotsArr[this.dotsArr.length - 1].init(tx, ty)
    }
    canvas.addEventListener(eDown, () => {
      canvas.addEventListener(eMove, _moveDot)
    })
    canvas.addEventListener(eUp, () => {
      canvas.removeEventListener(eMove, _moveDot)
    })
  }
}

export default DynamicParticles
