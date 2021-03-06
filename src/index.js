import DynamicParticles from './DynamicParticles'


function dynamicParticles ({
  canvas,
  distance = 80, // 90px
  dotRadius = 3, // 2px
  dotColor = 'rgba(255, 255, 255, 0.8)', // or #000000
  lineWidth = 1, // 1px
  lineColor, // or #000000
  isConnect = true,
  isOnClick = true,
  isOnMove = true
}) {
  return new DynamicParticles({ canvas, distance, dotRadius, dotColor, lineWidth, lineColor, isConnect, isOnClick, isOnMove })
}

export default dynamicParticles
