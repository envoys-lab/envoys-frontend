import React from 'react'
import getSymbolFromCurrency from 'currency-symbol-map'
import { getCurrency, getCurrencyData } from '../../state/currencies/selectors'
import { Text } from '@envoysvision/uikit'
import { Currency, Token } from '@envoysvision/sdk'
import { formatAmount, formatAmountNotation } from '../../views/Info/utils/formatInfoNumbers'

interface CurrencyEquivalentProps {
  amount?: string
  decimals?: number
  currency?: Currency
  notation?: formatAmountNotation
}

export const getTokenCurrencyEquivalent = (currency: Currency) => {
  const vsCurrenciesData = getCurrencyData()
  let address = (currency as Token)?.address?.toLowerCase()
  if (!address && currency?.symbol === 'BNB') {
    // use WBNB address
    address = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'.toLowerCase()
  }
  return vsCurrenciesData[address]
}

const CurrencyEquivalent: React.FC<CurrencyEquivalentProps> = ({ amount = '1', currency, decimals = 0, notation }) => {
  const parsedAmount = parseFloat(amount)
  const vsCurrency = getCurrency()
  const vsSymbol = getSymbolFromCurrency(vsCurrency)
  const modifier = getTokenCurrencyEquivalent(currency)
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
    <Text color={'mainDark'} fontWeight={'500'} thin small>
      {content}
    </Text>
  )
}

export default CurrencyEquivalent
