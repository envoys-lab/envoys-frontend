export const currenciesList = {
  USD: 'USD',
  EUR: 'EUR',
  CNY: 'CNY',
  INR: 'INR',
  CAD: 'CAD',
  GBP: 'GBP',
  JPY: 'JPY',
  RUB: 'RUB',
  MXN: 'MXN',
  CHF: 'CHF',
  KRW: 'KRW',
  TRY: 'TRY',
  BRL: 'BRL',
  SEK: 'SEK',
  HKD: 'HKD',
  ETH: 'ETH',
  AUD: 'AUD',
  NOK: 'NOK',
  SGD: 'SGD',
  BTC: 'BTC',
}

export const coinCurrencies = [currenciesList.ETH, currenciesList.BTC]

export const currenciesArray = Object.values(currenciesList)

export const getPrice = (price, amount) => {
  if (amount === 0) {
    return 0
  }
  return Math.round(price * amount)
}
