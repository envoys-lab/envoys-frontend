import styled from 'styled-components'
import { PageContainer } from '../../components/Layout/PageContainer'

export const StyledSwapContainer = styled(PageContainer)<{ $isChartDisplayed: boolean }>`
  ${({ theme }) => theme.mediaQueries.lg} {
    width: ${({ $isChartDisplayed }) => ($isChartDisplayed ? `320px` : `440px`)};
  }
`
