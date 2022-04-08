import { createReducer, createAsyncThunk } from '@reduxjs/toolkit'
import { defineState } from 'redux-localstore'

import { setCurrency, fetchPricesAction } from './actions'
import { currenciesList, coinCurrencies, currenciesArray } from './helpers'

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
      const reducedObject = Object.keys(data).reduce((acc, key) => {
        if (Object.values(data[key])[0]) {
          // eslint-disable-next-line no-param-reassign
          acc[key] = Object.values(data[key])[0]
        }
        return acc
      }, {})
      return { ...state, data: reducedObject }
    }),
)
