import styled from 'styled-components'
import { Button } from '@envoysvision/uikit'

export const StyledButton = styled(Button)`
  border-radius: 10px;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
  max-width: 320px;
`
export const MaxButton = styled(Button)`
  color: ${({ theme }) => theme.colors.mainDark};
  font-size: 12px;
  border: none;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 10px;
  height: auto;
`
