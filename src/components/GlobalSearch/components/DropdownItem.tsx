import React, { HTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'
import { Flex, FlexProps, SwapVertIcon } from '@envoysvision/uikit'

const StyledDiv = styled.div`
  display: flex;
  flex-shrink: 0;
`

const StyledBox = styled(Flex)`
  border-left: 1px solid ${({ theme }) => theme.colors.disabled};
  font-size: 14px;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }
`

StyledBox.defaultProps = {
  alignItems: 'center',
  height: '24px',
}

interface DropdownProps extends FlexProps, HTMLAttributes<HTMLDivElement> {
  component: ReactNode
  isOpen?: boolean
  isMobile?: boolean
  noBorder?: boolean
}

const DropdownItem: React.FC<DropdownProps> = ({ component, isOpen, isMobile, noBorder, children, ...props }) => {
  return (
    <StyledDiv>
      <StyledBox {...props} px={isMobile ? '4px' : '16px'} style={{ borderLeft: noBorder ? 'none' : 'inherit' }}>
        {component}
        <SwapVertIcon color={'mainDark'} ml={'4px'} style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }} />
      </StyledBox>
      {children}
    </StyledDiv>
  )
}

export default DropdownItem
