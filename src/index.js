import DynamicParticles from './DynamicParticles'


function dynamicParticles ({
  canvas,
  color = '255, 255, 255',
  r = 3,
  distance = 80,
  isConnect = true,
  isOnClick = true,
  isOnMove = true
}) {
  return new DynamicParticles({ canvas, color, r, distance, isConnect, isOnClick, isOnMove })
}

export default dynamicParticles
