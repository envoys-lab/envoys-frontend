import React from 'react'
import getSymbolFromCurrency from 'currency-symbol-map'
import { getCurrency, getCurrencyData } from '../../state/currencies/selectors'
import { Text } from '@envoysvision/uikit'
import { Currency, Token } from '@envoysvision/sdk'

interface CurrencyEquivalentProps {
  amount?: string
  currency?: Currency
}

const CurrencyEquivalent: React.FC<CurrencyEquivalentProps> = ({ amount = '1', currency }) => {
  const parsedAmount = parseFloat(amount)
  const vsCurrency = getCurrency()
  const vsSymbol = getSymbolFromCurrency(vsCurrency)
  const vsCurrenciesData = getCurrencyData()
  let address = (currency as Token)?.address?.toLowerCase()
  if (!address && currency?.symbol === 'BNB') {
    // use WBNB address
    address = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'.toLowerCase()
  }
  let modifier = vsCurrenciesData[address]
  let content = '-'
  if (modifier) {
    const floatValue = Math.round((isNaN(parsedAmount) ? 0 : parsedAmount) * modifier)
    const displayValue = floatValue.toString().length > 10 ? floatValue.toFixed(0) : floatValue
    content = `~${vsSymbol}${displayValue}`
  }
  return (
    <Text color={'mainDark'} fontWeight={'500'} thin small>
      {content}
    </Text>
  )
}

export default CurrencyEquivalent
