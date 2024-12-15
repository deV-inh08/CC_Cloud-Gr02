import React from 'react'
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"

interface ScrollCounterProp {
  start: number
  end: number
}

const ScrollCounter = ({ start, end }: ScrollCounterProp) => {
  const { ref, inView } = useInView({ threshold: 0.5 })
  return (
    <div ref={ref}>
      <h4 className='font-bold text-4xl'>
        {
          inView && (
            <CountUp
              start={start}
              end={end}
              duration={2}
              suffix='k'
            />
          )
        }
      </h4>
    </div>
  )
};

export default ScrollCounter;
