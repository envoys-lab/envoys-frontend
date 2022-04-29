import { createReducer } from '@reduxjs/toolkit'
import { defineState } from 'redux-localstore'

import { setCurrency, fetchPricesAction } from './actions'
import { currenciesList } from './helpers'
import { coinGeckoIdToAddressMap } from '../../config/constants/tokens'

type BUSDPair = Object & {
  usd: number
}

export interface CurrenciesState {
  readonly currency: string
  readonly data: object
  readonly busdPair: BUSDPair
}

const defaultState: CurrenciesState = {
  currency: currenciesList.USD,
  data: {},
  busdPair: {
    usd: 1,
  },
}

const initialState = defineState(defaultState)('currencies')

export default createReducer<CurrenciesState>(initialState, (builder) =>
  builder
    .addCase(setCurrency, (state, { payload: currency }) => {
      return { ...state, currency }
    })
    .addCase(fetchPricesAction.fulfilled, (state, { payload: rawData }) => {
      const data = rawData ? rawData : {}
      let busdPair = { ...defaultState.busdPair }
      const reducedObject = Object.keys(data).reduce((acc, key) => {
        // busd: "binance-usd"
        if (key === 'binance-usd') {
          busdPair = { ...data[key] }
        }
        if (Object.values(data[key])) {
          const addressKey = coinGeckoIdToAddressMap[key]
          if (addressKey) {
            // eslint-disable-next-line no-param-reassign
            acc[addressKey] = data[key]
          }
        }
        return acc
      }, {})
      return { ...state, busdPair, data: reducedObject }
    }),
)
