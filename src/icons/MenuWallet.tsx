import React from 'react'
import { Svg, SvgProps } from '@envoysvision/uikit'

const MenuWallet: React.FC<SvgProps> = ({color, ...props}) => {
  return (
    <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.068 4.2a.2.2 0 0 0-.2-.2h-.583a.2.2 0 0 0-.2.2v1.675a.2.2 0 0 1-.2.2H7.852a.2.2 0 0 0-.2.2v6.857c0 .11.09.2.2.2h1.033c.11 0 .2.09.2.2v1.674c0 .11.09.2.2.2h.85a.2.2 0 0 0 .2-.2v-1.674c0-.11.09-.2.2-.2h1.03a.2.2 0 0 0 .2-.2V6.275a.2.2 0 0 0-.2-.2h-1.03a.2.2 0 0 1-.2-.2V4.509a.2.2 0 0 0-.2-.2h-.067V4.2Zm0 2.184V4.309v2.075Zm1.431 0v6.438a.2.2 0 0 1-.2.2h-1.03a.2.2 0 0 0-.2.2v1.675a.2.2 0 0 1-.2.2h-.517.516a.2.2 0 0 0 .2-.2v-1.674c0-.11.09-.2.2-.2H11.3a.2.2 0 0 0 .2-.2v-6.44Zm-2.147 6.639H7.919h1.433Zm1.165-1.34a.2.2 0 0 1-.2.2H9.101a.2.2 0 0 1-.2-.2v-3.96c0-.11.09-.2.2-.2h1.214c.111 0 .2.09.2.2v3.96Zm.266-4.47H8.835a.2.2 0 0 0-.2.2v4.78-4.78c0-.11.09-.2.2-.2h1.948Zm11.285 8.277a.2.2 0 0 0 .2-.2V8.433a.2.2 0 0 0-.2-.2h-1.032a.2.2 0 0 1-.2-.2V6.358a.2.2 0 0 0-.2-.2h-.85a.2.2 0 0 0-.2.2v1.675a.2.2 0 0 1-.2.2h-1.032a.2.2 0 0 0-.2.2v6.857c0 .11.09.2.2.2h1.032c.11 0 .2.09.2.2v1.674c0 .11.09.2.2.2h.85a.2.2 0 0 0 .2-.2V15.69c0-.11.09-.2.2-.2h1.032Zm-.267-.31a.2.2 0 0 0 .2-.2V8.543v6.438a.2.2 0 0 1-.2.2H20.77a.2.2 0 0 0-.2.2v1.675a.2.2 0 0 1-.2.2h-.516.516a.2.2 0 0 0 .2-.2v-1.674c0-.11.09-.2.2-.2h1.032Zm-1.948 0H18.42h1.432Zm.716-6.638V6.467v2.075Zm.45 5.3a.2.2 0 0 1-.2.2h-1.215a.2.2 0 0 1-.2-.2V9.88c0-.11.09-.2.2-.2h1.215c.11 0 .2.09.2.2v3.96Zm.266-4.47h-1.948a.2.2 0 0 0-.2.2v4.779-4.78c0-.11.09-.2.2-.2h1.948ZM5.283 8.563a.2.2 0 0 1-.2-.2V6.69a.2.2 0 0 0-.2-.2h-.85a.2.2 0 0 0-.2.2v1.674a.2.2 0 0 1-.2.2H2.601a.2.2 0 0 0-.2.2v8.517c0 .11.09.2.2.2h1.032c.11 0 .2.09.2.2v1.675c0 .11.09.2.2.2h.85a.2.2 0 0 0 .2-.2V17.68c0-.11.09-.2.2-.2h1.032a.2.2 0 0 0 .2-.2V8.764a.2.2 0 0 0-.2-.2H5.283ZM4.816 6.8v2.074V6.8Zm1.432 2.074v8.099a.2.2 0 0 1-.2.2H5.016a.2.2 0 0 0-.2.2v1.675a.2.2 0 0 1-.2.2H4.1h.516a.2.2 0 0 0 .2-.2v-1.675c0-.11.09-.2.2-.2h1.032a.2.2 0 0 0 .2-.2V8.873ZM4.1 17.172H2.668 4.1Zm1.166-1.339a.2.2 0 0 1-.2.2H3.85a.2.2 0 0 1-.2-.2v-5.62c0-.111.09-.2.2-.2h1.215c.11 0 .2.089.2.2v5.62Zm-1.882.509V9.903c0-.11.09-.2.2-.2h1.948-1.948a.2.2 0 0 0-.2.2v6.439Zm11.217-5.726h-1.43 1.43Zm.716 6.638V15.18v2.074Zm1.433-2.074v-4.364a.2.2 0 0 0-.2-.2h-1.033a.2.2 0 0 1-.2-.2V8.74a.2.2 0 0 0-.2-.2h-.516.516c.11 0 .2.09.2.2v1.675c0 .11.09.2.2.2h1.034c.11 0 .2.09.2.2v4.364Zm-.716-.83h-1.948a.2.2 0 0 1-.2-.2v-2.704 2.704c0 .11.09.2.2.2h1.948Zm-.25-4.044a.2.2 0 0 1-.2-.2V8.432a.2.2 0 0 0-.2-.2h-.85a.2.2 0 0 0-.2.2v1.674a.2.2 0 0 1-.2.2h-1.03a.2.2 0 0 0-.2.2v4.783c0 .11.09.2.2.2h1.03c.111 0 .2.09.2.2v1.674c0 .11.09.2.2.2h.85a.2.2 0 0 0 .2-.2V15.69c0-.11.09-.2.2-.2h1.033a.2.2 0 0 0 .2-.2v-4.783a.2.2 0 0 0-.2-.2h-1.033Zm-.016 3.535a.2.2 0 0 1-.2.2h-1.215a.2.2 0 0 1-.2-.2v-1.887c0-.11.09-.2.2-.2h1.215c.11 0 .2.09.2.2v1.887Z"
      fill={color}
    />
  </Svg>
  )
}

export default MenuWallet
