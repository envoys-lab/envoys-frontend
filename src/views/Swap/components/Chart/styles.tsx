import { Box } from '@envoysvision/uikit'
import styled from 'styled-components'

export const StyledPriceChart = styled(Box)<{ $isDark: boolean; $isExpanded?: boolean; $withBorder?: boolean }>`
  border: none;
  border-radius: ${({ $withBorder }) => ($withBorder ? '32px' : '0')};
  //width: 100%;
  padding-top: 36px;
  flex-shrink: 1;
  width: auto;
  /* flex-grow: 1; */
  overflow: auto;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 8px;
    background: ${({ $isDark }) => ($isDark ? 'rgba(39, 38, 44, 0.5)' : 'rgba(255, 255, 255, 0.5)')};
    ${({ theme, $withBorder }) => ($withBorder ? `border: 1px solid ${theme.colors.cardBorder};` : '')}
    border-radius: ${({ $isExpanded }) => ($isExpanded ? '0' : '16px')};
    width: ${({ $isExpanded }) => ($isExpanded ? '640px' : '50%')};
    height: ${({ $isExpanded }) => ($isExpanded ? 'calc(100vh - 160px)' : '516px')};
  }
`

StyledPriceChart.defaultProps = {
  height: '70%',
  $isExpanded: false,
  $withBorder: false,
}
