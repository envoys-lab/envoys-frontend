import styled from 'styled-components'
import { PageContainer } from '../../components/Layout/PageContainer'
import { Flex } from '@envoysvision/uikit'

export const StyledSwapContainer = styled(PageContainer)<{ $isChartDisplayed: boolean }>`
  ${({ theme }) => theme.mediaQueries.lg} {
    width: ${({ $isChartDisplayed }) => ($isChartDisplayed ? `320px` : `440px`)};
    ${({ $isChartDisplayed }) => $isChartDisplayed && `flex-shrink: 0;`};
  }
`

export const StyledChartContainer = styled(Flex)<{ $isChartDisplayed: boolean }>`
  flex-grow: 1;
`
