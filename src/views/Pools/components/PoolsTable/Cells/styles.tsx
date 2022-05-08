import styled from 'styled-components'

export const BallanceContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  width: 100%;
`

export const Label = styled.div<{ center?: boolean }>`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;

  text-align: right;

  ${({ center }) => (center ? 'text-align: center;' : '')}
`
