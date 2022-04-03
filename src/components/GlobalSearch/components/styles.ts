import styled from 'styled-components'
import {Box, Button, Card, Input, Link, Grid} from '@envoysvision/uikit'

export const BodyWrapper = styled(Card)`
  width: 100%;
  max-width: 90vw;
  background: ${({ theme }) => theme.colors.background};
  margin: 16px auto 0;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  position: relative;
  overflow: visible;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    max-width: calc(90vw - 290px);
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    max-width: min(968px, 90vw - 290px);
  }
`

export const ResultsWrapper = styled(BodyWrapper)`
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  height: auto;
  position: absolute;
  z-index: 1;
  padding: 8px;
  > div {
    max-height: 70vh;
    overflow-y: auto;
  }
`

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.radii.default};
  background: ${({ theme }) => theme.colors.backgroundAlt};
`

export const StyledInput = styled(Input)`
  border: none;
  box-shadow: none;
  background: transparent;
  &:focus:not(:disabled) {
    box-shadow: none;
  }
`

export const SearchResultBox = styled(Box)`
  border-radius: ${({ theme }) => theme.radii.icon};
  border: 1px solid transparent;
  margin-top: 8px;
  &:hover {
    border-color: ${({ theme }) => theme.colors.cardBorder};
    background: ${({ theme }) => theme.colors.background};
  }
`

export const FilterItem = styled(Box)`
  border-radius: 4px;
  margin-top: 4px;
  font-weight: 400;
  opacity: 0.8;
  padding: 6px 10px;
  text-transform: capitalize;
  font-size: 14px;
  &:hover,
  &.active {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.darkClear};
    font-weight: 500;
    background: ${({ theme }) => theme.colors.background};
  }
`

export const BadgeButton = styled(Button)`
  box-shadow: ${({ theme }) => theme.shadows.badge};
  text-transform: capitalize;
`

export const FlexLink = styled(Link)`
  align-items: flex-start;
  color: inherit;
  display: flex;
  width: 100%;
  &:hover {
    text-decoration: none;
  }
`

export const CenterFlexLink = styled(FlexLink)`
  align-items: center;
  margin-right: 16px;
`

export const SettingsOptionButton = styled(Button)<{ $active: boolean, variant: string }>`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkClear};
  border-color: transparent;
  
  ${({ $active, theme }) => $active && `
    font-weight: 500;
    color: ${theme.colors.basicOrange};
    border-color: ${theme.colors.basicOrange};
  `}
`

SettingsOptionButton.defaultProps = {
  scale: "sm",
  variant: "tertiary",
}

export const CardsLayout = styled(Grid)`
  grid-gap: 8px;
  grid-template-columns: repeat(4, 1fr);
`
