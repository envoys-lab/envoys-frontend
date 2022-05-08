import React from 'react'
import styled from 'styled-components'
import { HelpIcon, Text, Skeleton, useTooltip } from '@envoysvision/uikit'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import CurrencyEquivalent from 'components/CurrencyInputPanel/CurrencyEquivalent'
import unserializedTokens from 'config/constants/tokens'

const ReferenceElement = styled.div`
  display: inline-block;
`

export interface LiquidityProps {
  liquidity: BigNumber
}

const LiquidityWrapper = styled.div`
  /* min-width: 110px; */

  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.text};
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Liquidity: React.FunctionComponent<LiquidityProps> = ({ liquidity }) => {
  const lq = liquidity
  const { t } = useTranslation()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Total value of the funds in this farm’s liquidity pool'),
    { placement: 'top-end', tooltipOffset: [20, 10] },
  )

  return (
    <Container>
      <LiquidityWrapper>
        {lq ? (
          <CurrencyEquivalent currency={unserializedTokens.evt} amount={Number(lq).toString()} />
        ) : (
          <Skeleton width={60} />
        )}
      </LiquidityWrapper>
      {tooltipVisible && tooltip}
    </Container>
  )
}

export default Liquidity
