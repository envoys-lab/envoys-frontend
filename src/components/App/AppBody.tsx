import React from 'react'
import styled from 'styled-components'
import { Card } from '@envoysvision/uikit'

export const BodyWrapper = styled(Card)`
  border-radius: 28px;
  border: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06);
  background: white;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
