# dynamic-particles

dot and line, dots to dots connect

[demo1 -->](https://nicoleffect.github.io/dynamic-particles/examples/index.html)
[demo2 -->](https://nicoleffect.github.io/dynamic-particles/examples/index2.html)

## examples

```
// html
<canvas id="canvas"></canvas>
```

```
// npm install @nicoleffect/dynamic-particles
import dynamicParticles from '@nicoleffect/dynamic-particles'

 dynamicParticles({
  canvas: document.getElementById('canvas'), // required
  color: '255,255,255', // default
  r: 4, // default
  distance: 100, // default, distance of dot to dot
  isConnect: true, // default, if you don't need lines, set it false
  isOnClick: true, // default, event for click or touchstart
  isOnMove: true// default
 })

```

```
// or

<script src="https://nicoleffect.github.io/dynamic-particles/dist/dynamic-particles.iife.min.js"></script>
<script>
dynamicParticles({ canvas: document.getElementById('canvas') })
</script>
```

## all modes

```
amd、cjs、es、iife、umd
```
