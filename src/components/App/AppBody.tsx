import React from 'react'
import styled from 'styled-components'
import { Card } from '@envoysvision/uikit'

export const BodyWrapper = styled(Card)<{ $autoWidth: boolean }>`
  border-radius: 28px;
  border: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06);
  background: white;
  width: 100%;
  overflow: unset;

  ${({ theme, $autoWidth }) =>
    $autoWidth &&
    `
    ${theme.mediaQueries.sm}{
      width: auto;
    }
  `}

  max-width: 962px;
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
