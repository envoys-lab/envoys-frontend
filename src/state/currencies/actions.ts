import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { fetchPrices } from './api'

export const setCurrency = createAction<string>('currencies/setCurrency')

/* @ts-ignore */
export const fetchPricesAction = createAsyncThunk<object, { ids: string; vs_currencies: string }>(
  'currencies/getPrices',
  async ({ ids, vs_currencies }) => {
    const response = await fetchPrices({ ids, vs_currencies })
    return response
  },
)
