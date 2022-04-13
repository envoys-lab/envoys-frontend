import { createReducer } from '@reduxjs/toolkit'
import { defineState } from 'redux-localstore'

import { setCurrency, fetchPricesAction } from './actions'
import { currenciesList } from './helpers'
import { coinGeckoIdToAddressMap } from '../../config/constants/tokens'

export interface CurrenciesState {
  readonly currency: string
  readonly data: object
}

const defaultState: CurrenciesState = {
  currency: currenciesList.USD,
  data: {},
}

const initialState = defineState(defaultState)('currencies')

export default createReducer<CurrenciesState>(initialState, (builder) =>
  builder
    .addCase(setCurrency, (state, { payload: currency }) => {
      return { ...state, currency }
    })
    .addCase(fetchPricesAction.fulfilled, (state, { payload: data }) => {
      const reducedObject = Object.keys(data || {}).reduce((acc, key) => {
        if (Object.values(data[key])[0]) {
          const addressKey = coinGeckoIdToAddressMap[key]
          if (addressKey) {
            // eslint-disable-next-line no-param-reassign
            acc[addressKey] = Object.values(data[key])[0]
          }
        }
        return acc
      }, {})
      return { ...state, data: reducedObject }
    }),
)
