import React from 'react'
import getSymbolFromCurrency from 'currency-symbol-map'
import { getCurrency, getCurrencyBUSDReferenceData, getCurrencyData } from '../../state/currencies/selectors'
import { Text } from '@envoysvision/uikit'
import { Currency, Token } from '@envoysvision/sdk'
import { formatAmount, formatAmountNotation } from '../../views/Info/utils/formatInfoNumbers'
import { usePriceCakeBusd } from 'state/farms/hooks'

interface CurrencyEquivalentProps {
  amount?: string
  decimals?: number
  currency?: Currency
  notation?: formatAmountNotation
}

export const getTokenCurrencyEquivalent = (currency: Currency) => {
  const vsCurrenciesData = getCurrencyData()
  let symbol = (currency as Token)?.symbol?.toLowerCase()
  if (currency?.symbol === 'BNB') {
    // use WBNB
    symbol = 'WBNB'.toLowerCase()
  }
  return vsCurrenciesData[symbol]
}

const CurrencyEquivalent: React.FC<CurrencyEquivalentProps> = ({ amount = '1', currency, decimals = 0, notation }) => {
  const parsedAmount = parseFloat(amount)
  const vsCurrency = getCurrency()
  const vsSymbol = getSymbolFromCurrency(vsCurrency)
  const fiatPrices = getTokenCurrencyEquivalent(currency)
  const referencePairData = getCurrencyBUSDReferenceData()

  const currencyKey = vsCurrency.toLowerCase()
  let modifier = fiatPrices && fiatPrices[currencyKey]
  const cakePriceBusd = usePriceCakeBusd()

  if (!modifier && cakePriceBusd && referencePairData[currencyKey]) {
    modifier = +cakePriceBusd * (referencePairData[currencyKey] / referencePairData.usd)
  }

  let content = '-'
  let displayValue
  if (modifier) {
    const decimalsMod = Math.pow(10, decimals)
    const decimalsPrecision = Math.pow(10, -decimals)
    const floatValue = Math.round((isNaN(parsedAmount) ? 0 : parsedAmount) * modifier * decimalsMod) / decimalsMod
    if (floatValue <= decimalsPrecision) {
      content = `<${vsSymbol}${decimalsPrecision}`
    } else {
      const realNotation: formatAmountNotation =
        (floatValue.toString().length > 10 && floatValue > 1) || floatValue < 1 ? 'compact' : notation
      displayValue = formatAmount(floatValue, {
        tokenPrecision: false,
        displayThreshold: decimalsPrecision,
        notation: realNotation,
      })
      content = `~${vsSymbol}${displayValue}`
    }
  }
  return (
    <Text color={'mainDark'} lineHeight={'14px'} fontWeight={'500'} thin small>
      {content}
    </Text>
  )
}

export default CurrencyEquivalent
