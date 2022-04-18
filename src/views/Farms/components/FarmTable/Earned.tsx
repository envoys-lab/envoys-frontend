import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '@envoysvision/uikit'
import CurrencyEquivalent from 'components/CurrencyInputPanel/CurrencyEquivalent'
import { Currency } from '@envoysvision/sdk'
import unserializedTokens from 'config/constants/tokens'

export interface EarnedProps {
  earnings: number
  pid: number
}

interface EarnedPropsWithLoading extends EarnedProps {
  userDataReady: boolean
}

const Amount = styled.span<{ earned: number }>`
  color: ${({ earned, theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
`

const EarnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Earned: React.FunctionComponent<EarnedPropsWithLoading> = ({ earnings, userDataReady }) => {
  if (userDataReady) {
    return (
      <EarnContainer>
        <Amount earned={earnings}>{earnings.toLocaleString()}</Amount>
        <CurrencyEquivalent currency={unserializedTokens.evt} amount={earnings.toString()} />
      </EarnContainer>
    )
  }
  return (
    <Amount earned={0}/>
  )
}

export default Earned
