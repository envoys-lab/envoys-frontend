import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Trade, TradeType } from '@envoysvision/sdk'
import { Button, Text, AutoRenewIcon } from '@envoysvision/uikit'
import { useTranslation } from 'contexts/Localization'
import { Field } from 'state/swap/actions'
import {
  computeSlippageAdjustedAmounts,
  computeTradePriceBreakdown,
  formatExecutionPrice,
  warningSeverity,
} from 'utils/prices'
// import QuestionHelper from 'components/QuestionHelper'
import { AutoRow, RowBetween, RowFixed } from 'components/Layout/Row'
import FormattedPriceImpact from './FormattedPriceImpact'
import { StyledBalanceMaxMini, SwapCallbackError } from './styleds'
import Card from '../../../components/Card'

const SwapModalFooterContainer = styled(Card)`
  margin-top: 24px;
  grid-auto-rows: auto;
  grid-row-gap: 6px;
`

const ThinText = styled(Text).attrs({
  thin: true,
})`
  font-size: 14px;
`

const BoldText = styled(Text)`
  font-weight: 700;
`

export default function SwapModalFooter({
  trade,
  onConfirm,
  allowedSlippage,
  swapErrorMessage,
  disabledConfirm,
}: {
  trade: Trade
  allowedSlippage: number
  onConfirm: () => void
  swapErrorMessage: string | undefined
  disabledConfirm: boolean
}) {
  const { t } = useTranslation()
  const [showInverted, setShowInverted] = useState<boolean>(false)
  const slippageAdjustedAmounts = useMemo(
    () => computeSlippageAdjustedAmounts(trade, allowedSlippage),
    [allowedSlippage, trade],
  )
  const { priceImpactWithoutFee, realizedLPFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const severity = warningSeverity(priceImpactWithoutFee)

  return (
    <>
      <SwapModalFooterContainer>
        <RowBetween mb={1} align="center">
          <ThinText>{t('Price')}</ThinText>
          <BoldText
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              textAlign: 'right',
              paddingLeft: '5px',
            }}
          >
            {formatExecutionPrice(trade, showInverted)}
            <StyledBalanceMaxMini onClick={() => setShowInverted(!showInverted)}>
              <AutoRenewIcon width="14px" />
            </StyledBalanceMaxMini>
          </BoldText>
        </RowBetween>

        <RowBetween mb={1}>
          <RowFixed>
            <ThinText>{trade.tradeType === TradeType.EXACT_INPUT ? t('Minimum received') : t('Maximum sold')}</ThinText>
            {/*<QuestionHelper
              text={t(
                'Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.',
              )}
              ml="4px"
            />*/}
          </RowFixed>
          <RowFixed>
            <BoldText>
              {trade.tradeType === TradeType.EXACT_INPUT
                ? slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4) ?? '-'
                : slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4) ?? '-'}
            </BoldText>
            <BoldText marginLeft="4px">
              {trade.tradeType === TradeType.EXACT_INPUT
                ? trade.outputAmount.currency.symbol
                : trade.inputAmount.currency.symbol}
            </BoldText>
          </RowFixed>
        </RowBetween>
        <RowBetween mb={1}>
          <RowFixed>
            <ThinText>{t('Price Impact')}</ThinText>
            {/*<QuestionHelper
              text={t('The difference between the market price and your price due to trade size.')}
              ml="4px"
            />*/}
          </RowFixed>
          <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <ThinText>{t('Liquidity Provider Fee')}</ThinText>
            {/*<QuestionHelper
              text={
                <>
                  <Text mb="12px">{t('For each trade a %amount% fee is paid', { amount: '0.25%' })}</Text>
                  <Text>- {t('%amount% to LP token holders', { amount: '0.17%' })}</Text>
                  <Text>- {t('%amount% to the Treasury', { amount: '0.03%' })}</Text>
                  <Text>- {t('%amount% towards CAKE buyback and burn', { amount: '0.05%' })}</Text>
                </>
              }
              ml="4px"
            />*/}
          </RowFixed>
          <BoldText>
            {realizedLPFee ? `${realizedLPFee?.toSignificant(6)} ${trade.inputAmount.currency.symbol}` : '-'}
          </BoldText>
        </RowBetween>
      </SwapModalFooterContainer>

      <AutoRow>
        <Button
          variant={severity > 2 ? 'danger' : 'primary'}
          onClick={onConfirm}
          disabled={disabledConfirm}
          my="12px"
          id="confirm-swap-or-send"
          width="100%"
        >
          {severity > 2 ? t('Swap Anyway') : t('Confirm Swap')}
        </Button>

        {swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
      </AutoRow>
    </>
  )
}
