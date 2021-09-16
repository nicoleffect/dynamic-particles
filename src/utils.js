export const isMobile = (() => {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent)
})()

export function isOutside (x, y, d, rect) {
  const {
    left,
    right,
    top,
    bottom
  } = rect
  if (x < left - d || x > right + d || y < top - d || y > bottom + d) {
    // console.log(true)
    return true
  }
  // console.log(false)
  return false
}

/**
 * @desc 函数防抖
 * @param func (function) 函数
 * @param wait (number) 延迟执行毫秒数
 * @param immediate (boolean) true 表立即执行，false 表非立即执行
 */
 export function debounce(func, wait = 800, immediate) {
  let timeout
  return function() {
    let context = this
    let args = arguments
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      let callNow = !timeout
      timeout = setTimeout(function() {
        timeout = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, wait)
    }
  }
}
