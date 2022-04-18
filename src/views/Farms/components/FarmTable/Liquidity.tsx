import React from 'react'
import styled from 'styled-components'
import { HelpIcon, Text, Skeleton, useTooltip } from '@envoysvision/uikit'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'

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
  const lq = liquidity ?? 0
  const displayLiquidity =
  lq ? (
      `$${Number(lq).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    ) : (
      <Skeleton width={60} />
    )
  const { t } = useTranslation()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Total value of the funds in this farm’s liquidity pool'),
    { placement: 'top-end', tooltipOffset: [20, 10] },
  )

  return (
    <Container>
      <LiquidityWrapper>
        <div>{displayLiquidity}</div>
      </LiquidityWrapper>
      {tooltipVisible && tooltip}
    </Container>
  )
}

export default Liquidity
