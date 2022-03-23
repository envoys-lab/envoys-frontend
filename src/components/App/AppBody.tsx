import React from 'react'
import styled from 'styled-components'
import { Card } from '@envoysvision/uikit'

export const BodyWrapper = styled(Card)`
  border-radius: 28px;
  border: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06);
  background: white;
  width: auto;
  max-width: 90vw;
  ${({ theme }) => theme.mediaQueries.lg} {
    max-width: calc(90vw - 290px);
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    max-width: min(968px, 90vw - 290px);
  }
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
