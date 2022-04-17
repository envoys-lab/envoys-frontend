import React from 'react'
import { Svg, SvgProps } from '@envoysvision/uikit'

const AccountIcon: React.FC<SvgProps> = ({ color, ...props }) => {
  return (
    <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.1 14.5357C15.1 11.5261 14.1302 9.31629 12.3227 8.23173C12.9082 7.55957 13.2667 6.67957 13.2667 5.71429C13.2667 3.61231 11.5781 1.9 9.5 1.9C7.42185 1.9 5.73333 3.61231 5.73333 5.71429C5.73333 6.67957 6.09178 7.55957 6.67731 8.23173C4.86982 9.31631 3.9 11.5266 3.9 14.5357C3.9 14.8465 4.14896 15.1 4.45833 15.1H14.5417C14.8516 15.1 15.1 14.8465 15.1 14.5357ZM9.5 3.02857C10.9602 3.02857 12.15 4.23197 12.15 5.71429C12.15 7.1966 10.9602 8.4 9.5 8.4C8.03982 8.4 6.85 7.1966 6.85 5.71429C6.85 4.23197 8.03982 3.02857 9.5 3.02857ZM11.3854 9.01044C13.3145 9.88842 13.8838 12.0513 13.9705 13.9714H5.02909C5.11614 12.0513 5.68504 9.88886 7.61457 9.01044C8.16921 9.33764 8.81241 9.52857 9.5 9.52857C10.1876 9.52857 10.8308 9.33764 11.3854 9.01044Z"
        fill={color}
      />
    </Svg>
  )
}

export default AccountIcon
