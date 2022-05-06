import styled from 'styled-components'
import { PageContainer } from '../../components/Layout/PageContainer'
import { Flex, Box } from '@envoysvision/uikit'

export const StyledSwapContainer = styled(PageContainer)<{ $isChartDisplayed: boolean }>`
  ${({ theme }) => theme.mediaQueries.lg} {
    width: ${({ $isChartDisplayed }) => ($isChartDisplayed ? `320px` : `440px`)};
    ${({ $isChartDisplayed }) => $isChartDisplayed && `flex-shrink: 0;`};
  }
`

export const StyledChartContainer = styled(Flex)<{ $isChartDisplayed: boolean }>`
  flex-grow: 1;
`

export const IconBox = styled(Box)`
  position: absolute;
  left: 0;
  z-index: 1;
  animation: ${({ theme }) => theme.animations.modal} ${({ theme }) => theme.animations.duration} ease-in-out;
`
