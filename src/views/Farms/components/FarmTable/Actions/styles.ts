import { Button, Text } from '@envoysvision/uikit'
import Balance from 'components/Balance'
import styled from 'styled-components'

export const ActionContainer = styled.div`
  padding-left: 17px;
  padding-right: 8px;
  padding-top: 4px;
  padding-bottom: 4px;

  display: flex;
  align-items: center;
  flex-direction: row;
`

export const ActionTitles = styled.div`
  display: flex;
`

export const ActionContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const ActionButton = styled(Button)`
  font-size: 14px !important;
  font-weight: 500;
  line-height: 16px;

  height: 42px;
  min-width: 134px;
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-right: 30px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 65px;
  }
`

export const EnvoysBalance = styled(Balance)`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
`

export const HarvestText = styled(Text)`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
`
