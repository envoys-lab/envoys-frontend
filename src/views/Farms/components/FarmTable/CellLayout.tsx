import React from 'react'
import styled from 'styled-components'

const Label = styled.div<{ center?: boolean }>`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;

  text-align: right;

  ${({ center }) => (center ? 'text-align: center;' : '')}
`

const ContentContainer = styled.div<{ center?: boolean }>`
  min-height: 18px;
  display: flex;
  align-items: center;

  ${({ center }) => (center ? 'justify-content: center;' : 'justify-content: flex-end;')}
`

interface CellLayoutProps {
  label?: string
  center?: boolean
}

const CellLayout: React.FC<CellLayoutProps> = ({ label = '', center = false, children }) => {
  return (
    <div>
      {label && <Label center={center}>{label}</Label>}
      <ContentContainer center={center}>{children}</ContentContainer>
    </div>
  )
}

export default CellLayout
