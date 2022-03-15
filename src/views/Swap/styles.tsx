import { Box, Flex } from '@envoysvision/uikit'
import styled from 'styled-components'

export const StyledSwapContainer = styled(Flex)<{ $isChartExpanded: boolean }>`
  flex-shrink: 0;
  height: fit-content;
  padding: 0 24px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0 40px;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    padding: 0 0 0 40px;
  }
`

export const StyledInputCurrencyWrapper = styled(Box)`
  width: 310px;
`
