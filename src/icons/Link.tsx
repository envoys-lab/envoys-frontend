import React from 'react'
import { Svg, SvgProps } from '@envoysvision/uikit'

const Link: React.FC<SvgProps> = ({ color, ...props }) => {
  return (
    <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.9375 11H1.375C1.01033 11 0.660591 10.8551 0.402728 10.5973C0.144866 10.3394 0 9.98967 0 9.625V2.0625C0 1.69783 0.144866 1.34809 0.402728 1.09023C0.660591 0.832366 1.01033 0.6875 1.375 0.6875H4.125V2.0625H1.375V9.625H8.9375V6.875H10.3125V9.625C10.3125 9.98967 10.1676 10.3394 9.90977 10.5973C9.65191 10.8551 9.30217 11 8.9375 11ZM5.29375 6.67356L4.32438 5.70144L8.65081 1.375H6.1875V0H11V4.8125H9.625V2.34781L5.29375 6.67356Z"
        fill={color}
      />
    </Svg>
  )
}

export default Link
