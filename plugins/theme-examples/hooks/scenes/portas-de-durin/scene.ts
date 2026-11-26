// Portas de Durin: a faint gold glow follows each pointer over the still, and fades out once the pointer leaves.
// The whole picture is the still Svg (./still.ts); this pass only adds light over it, premultiplied.
// To make the glow stronger or softer, change STRENGTH.
import { length, max, min, picture, pointers, shader, smoothstep, vec2, vec3, vec4 } from 'claude-code/shader'

const STRENGTH = 0.13
// Points from the pointer at which the glow has faded out.
const REACH = 260

const glow = picture(pixel => {
  let light = 0
  for (const pointer of pointers) {
    const near = smoothstep(REACH, 0, length(vec2(pixel.point - pointer.at)))
    const fade = min(pointer.age * 4, 1) * (1 - pointer.gone)
    light = max(light, near * near * fade)
  }
  const alpha = STRENGTH * light
  return vec4(vec3(0.86, 0.64, 0.3) * alpha, alpha)
})

export default shader({ passes: [glow] })
