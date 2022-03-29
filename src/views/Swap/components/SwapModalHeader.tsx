import React, { useMemo } from 'react'
import { Trade, TradeType } from '@envoysvision/sdk'
import { Flex, Button, Text, Box, ArrowDownIcon, SwapVertIcon, IconButton } from '@envoysvision/uikit'
import { Field } from 'state/swap/actions'
import { useTranslation } from 'contexts/Localization'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown, warningSeverity } from 'utils/prices'
import { AutoColumn } from 'components/Layout/Column'
import { CurrencyLogo } from 'components/Logo'
import { RowBetween, RowFixed } from 'components/Layout/Row'
import truncateHash from 'utils/truncateHash'
import { TruncatedText, SwapShowAcceptChanges } from './styleds'
import CurrencyInputPanel from '../../../components/CurrencyInputPanel'
import styled from 'styled-components'
import Card from '../../../components/Card'

const IconButtonWithBorder = styled(IconButton)`
  border: solid 1px ${({ theme }) => theme.colors.mainDark};
  color: ${({ theme }) => theme.colors.mainDark};
  z-index: 2;
  transform: translateY(-50%);
  position: absolute;
  &:not(:disabled):not(.envoys-button--disabled):not(.envoys-button--disabled) {
    &:active {
      transform: translateY(-50%);
    }
    &:hover:not(:active) {
      cursor: default;
      opacity: 1;
    }
  }
`

const ThinText = styled.span`
  opacity: 0.7;
`

export default function SwapModalHeader({
  trade,
  allowedSlippage,
  recipient,
  showAcceptChanges,
  onAcceptChanges,
}: {
  trade: Trade
  allowedSlippage: number
  recipient: string | null
  showAcceptChanges: boolean
  onAcceptChanges: () => void
}) {
  const { t } = useTranslation()
  const slippageAdjustedAmounts = useMemo(
    () => computeSlippageAdjustedAmounts(trade, allowedSlippage),
    [trade, allowedSlippage],
  )
  const { priceImpactWithoutFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  const amount =
    trade.tradeType === TradeType.EXACT_INPUT
      ? slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(6)
      : slippageAdjustedAmounts[Field.INPUT]?.toSignificant(6)
  const symbol =
    trade.tradeType === TradeType.EXACT_INPUT ? trade.outputAmount.currency.symbol : trade.inputAmount.currency.symbol

  const tradeInfoText =
    trade.tradeType === TradeType.EXACT_INPUT
      ? t('Output is estimated. You will receive at least %amount% %symbol% or the transaction will revert.', {
          amount,
          symbol,
        })
      : t('Input is estimated. You will sell at most %amount% %symbol% or the transaction will revert.', {
          amount,
          symbol,
        })

  const [estimatedText, transactionRevertText] = tradeInfoText.split(`${amount} ${symbol}`)

  const truncatedRecipient = recipient ? truncateHash(recipient) : ''

  const recipientInfoText = t('Output will be sent to %recipient%', {
    recipient: truncatedRecipient,
  })

  const [recipientSentToText, postSentToText] = recipientInfoText.split(truncatedRecipient)

  return (
    <AutoColumn gap="md">
      {/*
        <RowBetween align="flex-end">
          <RowFixed gap="0px">
            <CurrencyLogo currency={trade.inputAmount.currency} size="24px" style={{ marginRight: '12px' }} />
            <TruncatedText
              fontSize="24px"
              color={showAcceptChanges && trade.tradeType === TradeType.EXACT_OUTPUT ? 'primary' : 'text'}
            >
              {trade.inputAmount.toSignificant(6)}
            </TruncatedText>
          </RowFixed>
          <RowFixed gap="0px">
            <Text fontSize="24px" ml="10px">
              {trade.inputAmount.currency.symbol}
            </Text>
          </RowFixed>
        </RowBetween>
      */}
      <Card position={'relative'} padding={0}>
        <CurrencyInputPanel
          value={trade.inputAmount.toSignificant(6)}
          onUserInput={() => null}
          showMaxButton={false}
          currency={trade.inputAmount.currency}
          onCurrencySelect={() => null}
          otherCurrency={trade.outputAmount.currency}
          hideBalance={true}
          id="confirm-swap-currency-input"
        />
        <Flex justifyContent="center" height={0}>
          <IconButtonWithBorder m={1} scale="xs" variant={'text'} circle={true}>
            <SwapVertIcon className="icon-down" color={'text'} />
          </IconButtonWithBorder>
        </Flex>
        <CurrencyInputPanel
          value={trade.outputAmount.toSignificant(6)}
          onUserInput={() => null}
          showMaxButton={false}
          currency={trade.outputAmount.currency}
          onCurrencySelect={() => null}
          otherCurrency={trade.inputAmount.currency}
          hideBalance={true}
          id="confirm-swap-currency-output"
        />
      </Card>
      <Box m={0}>
        {/*
          <RowFixed>
            <ArrowDownIcon width="16px" ml="4px" />
          </RowFixed>
          <RowBetween align="flex-end">
            <RowFixed gap="0px">
              <CurrencyLogo currency={trade.outputAmount.currency} size="24px" style={{ marginRight: '12px' }} />
              <TruncatedText
                fontSize="24px"
                color={
                  priceImpactSeverity > 2
                    ? 'failure'
                    : showAcceptChanges && trade.tradeType === TradeType.EXACT_INPUT
                    ? 'primary'
                    : 'text'
                }
              >
                {trade.outputAmount.toSignificant(6)}
              </TruncatedText>
            </RowFixed>
            <RowFixed gap="0px">
              <Text fontSize="24px" ml="10px">
                {trade.outputAmount.currency.symbol}
              </Text>
            </RowFixed>
          </RowBetween>
        */}
        {showAcceptChanges ? (
          <SwapShowAcceptChanges justify="flex-start" gap="0px">
            <RowBetween>
              <RowFixed>
                <Text color={'primary'} fontWeight={500}>
                  {' '}
                  {t('Price Updated')}
                </Text>
              </RowFixed>
              <Button scale={'md'} onClick={onAcceptChanges}>
                {t('Accept')}
              </Button>
            </RowBetween>
          </SwapShowAcceptChanges>
        ) : null}
        <AutoColumn justify="flex-start" gap="sm" style={{ padding: '24px 20px 0px' }}>
          <Text color="primary" textAlign="left" style={{ width: '100%', fontSize: 14 }}>
            <ThinText>{estimatedText}</ThinText>
            {amount} {symbol}
            <ThinText>{transactionRevertText}</ThinText>
          </Text>
        </AutoColumn>
        {recipient !== null ? (
          <AutoColumn justify="flex-start" gap="sm" style={{ padding: '12px 0 0 0px' }}>
            <Text color="textSubtle">
              {recipientSentToText}
              <b title={recipient}>{truncatedRecipient}</b>
              {postSentToText}
            </Text>
          </AutoColumn>
        ) : null}
      </Box>
    </AutoColumn>
  )
}
