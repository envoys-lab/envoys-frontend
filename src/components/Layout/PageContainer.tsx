import React from 'react'
import { Flex } from '@envoysvision/uikit'
import styled from 'styled-components'

export const PageContainer = styled(Flex)`
  flex-shrink: 0;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 440px;
  }
`
