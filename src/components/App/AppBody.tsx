import React from 'react'
import styled from 'styled-components'
import { Card } from '@envoysvision/uikit'

export const BodyWrapper = styled(Card)<{ $autoWidth: boolean }>`
  border-radius: 28px;
  border: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06);
  background: white;
  width: 100%;
  max-width: 90vw;
  overflow: unset;

  ${({ theme, $autoWidth }) =>
    $autoWidth &&
    `
    ${theme.mediaQueries.sm}{
      width: auto;
    }
  `}
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
export default function AppBody({
  children,
  autoWidth,
  removePadding,
}: {
  children: React.ReactNode
  autoWidth?: boolean
  removePadding?: boolean
}) {
  return (
    <BodyWrapper $autoWidth={autoWidth} p={autoWidth || removePadding ? '0' : '24px'}>
      {children}
    </BodyWrapper>
  )
}
