import styled from 'styled-components'
import { Box, Button, Card, Input, Link, Grid } from '@envoysvision/uikit'

export const BodyWrapper = styled(Card)`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  margin: 30px auto 0;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  position: relative;
  overflow: visible;
  box-sizing: border-box;
  padding: 1px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }
  max-width: 962px;
`

export const SearchContainer = styled.div`
  padding: 0 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 28px;
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
  height: 56px;
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
  margin-bottom: 12px;
  padding: 4px;
  background: white;
  &:hover {
    border-color: ${({ theme }) => theme.colors.cardBorder};
    background: ${({ theme }) => theme.colors.background};
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-bottom: 0;
    padding: 10px;
  }
`

export const SettingsBox = styled(Box)`
  padding: 14px 15px;
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

export const SettingsOptionButton = styled(Button)<{ $active: boolean; variant: string; disabled: boolean }>`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkClear};
  border-color: transparent;
  flex-direction: column;
  height: auto;
  padding: 4px 18px;
  box-sizing: content-box;
  ${({ $active, theme }) =>
    $active &&
    `
    font-weight: 500;
    color: ${theme.colors.basicOrange};
    border-color: ${theme.colors.basicOrange};
  `}
  &.envoys-button--disabled {
    color: ${({ theme }) => theme.colors.disabledMenuItem};
    border-color: ${({ theme }) => theme.colors.disabledMenuItem};
    background: transparent;
  }
`

export const CurrencySettingsOptionButton = styled(SettingsOptionButton)`
  width: 70px;
  height: 30px;
  padding: 0;
`

SettingsOptionButton.defaultProps = {
  scale: 'sm',
  variant: 'tertiary',
}

CurrencySettingsOptionButton.defaultProps = {
  scale: 'sm',
  variant: 'tertiary',
}

export const CardsLayout = styled(Grid)`
  grid-gap: 8px;
  grid-template-columns: repeat(4, 1fr);
`
