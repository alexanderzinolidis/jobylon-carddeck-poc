import React, { useState } from 'react'

//@ts-ignore
import { useSprings, animated, interpolate } from 'react-spring/hooks'
import { useGesture } from 'react-with-gesture'

import './cardStack.css'

export interface CardStackProps {
  children: React.ReactNode[],
}

const to = (i: any) => ({ x: 0, y: i * -10, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
const from = (i: any) => ({ rot: 0, scale: 1.5, y: -1000 })
const trans = (r: any, s: any) => `rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

const CardStack: React.SFC<CardStackProps> = ({ children } ) => {
  const [gone] = useState(() => new Set())
  const [props, set] = useSprings(children.length, (i: any) => ({ ...to(i), from: from(i) }))

  const bind = useGesture(({ args: [index], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2
    const dir = xDir < 0 ? -1 : 1

    if (!down && trigger) gone.add(index)

    set((i: any) => {
      if (index !== i) return
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0
      const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0)
      const scale = down ? 1.1 : 1

      return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
    })

    if (!down && gone.size === children.length) setTimeout(() => { gone.clear(); set((i: any) => to(i)) }, 600)
  })

  return (
    <div className='card-stack'>
      {props.map(({ x, y, rot, scale } : {x: any, y: any, rot: any, scale: any}, i: any) => (
        <animated.div key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
          <animated.div {...bind(i)} style={{ transform: interpolate([rot, scale], trans) }}>
            {children[i]}
          </animated.div>
        </animated.div>
      ))}
    </div>
  )
}

export default CardStack
