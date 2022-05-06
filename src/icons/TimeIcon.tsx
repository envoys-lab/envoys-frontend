import * as React from 'react'
import { SVGProps } from 'react'

const TimeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M7 1.167A5.84 5.84 0 0 0 1.167 7 5.84 5.84 0 0 0 7 12.833 5.84 5.84 0 0 0 12.834 7 5.84 5.84 0 0 0 7 1.167Zm0 10.5A4.672 4.672 0 0 1 2.334 7 4.672 4.672 0 0 1 7 2.333 4.672 4.672 0 0 1 11.667 7 4.672 4.672 0 0 1 7 11.666Z"
      fill="#fff"
    />
    <path d="M7.584 4.083H6.417v3.159l1.92 1.92.826-.824-1.58-1.58V4.084Z" fill="#fff" />
  </svg>
)

export default TimeIcon
