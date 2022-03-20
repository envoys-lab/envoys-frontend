import { Box, Flex } from '@envoysvision/uikit'
import styled from 'styled-components'

export const StyledSwapContainer = styled(Flex)<{ $isChartExpanded: boolean, $isChartDisplayed: boolean }>`
  flex-shrink: 0;
  height: fit-content;
  width: ${({ $isChartDisplayed }) => $isChartDisplayed ? `320px` : `440px`};
  flex-direction: column;
`
