import styled from "styled-components";
import {Box, Button, Card, Input} from "../../../../../envoys-toolkit/packages/envoys-uikit";

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
  height: 70vh;
  position: absolute;
  z-index: 2;
  overflow-y: auto;
  padding: 4px;
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
  margin-top: 12px;
  &:hover {
    border-color: ${({ theme }) => theme.colors.cardBorder};
    background: ${({ theme }) => theme.colors.background};
  }
`

export const BadgeButton = styled(Button)`
  box-shadow: ${({ theme }) => theme.shadows.badge};
  text-transform: capitalize;
`
