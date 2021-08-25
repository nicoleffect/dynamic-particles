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
 * 函数节流方法
 * @param Function fn 延时调用函数
 * @param Number delay 延迟多长时间
 * @param Number atLeast 至少多长时间触发一次
 * @return Function 延迟执行的方法
 */
 export function throttle(func, delay = 500, atLeast = 1000) {
  let timer = null
  let previous = null
  return function() {
    let context = this
    let args = arguments
    let now = +new Date()
    if (!previous) previous = now
    if (now - previous > atLeast) {
      func.apply(context, args)
      // 重置上一次开始时间为本次结束时间
      previous = now
    } else {
      clearTimeout(timer)
      timer = setTimeout(function() {
        func.apply(context, args)
      }, delay)
    }
  }
}
