import React from 'react'
import { Svg, SvgProps } from '@envoysvision/uikit'

const MenuOptions: React.FC<SvgProps> = ({ color, ...props }) => {
  return (
    <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.441 6.75a2.648 2.648 0 0 1 2.564 1.985h5.377v1.324h-5.377a2.649 2.649 0 0 1-5.211-.662A2.647 2.647 0 0 1 7.44 6.75Zm0 3.97a1.324 1.324 0 1 0 0-2.646 1.324 1.324 0 0 0 0 2.647ZM14.058 18a2.649 2.649 0 0 1-2.563-1.985H6.117V14.69h5.378a2.648 2.648 0 0 1 5.21.662A2.647 2.647 0 0 1 14.058 18Zm0-1.323a1.323 1.323 0 1 0 0-2.646 1.323 1.323 0 0 0 0 2.646Z"
        fill={color}
      />
    </Svg>
  )
}

export default MenuOptions
