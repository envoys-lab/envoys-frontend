import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { fetchPrices, fetchTokens } from './api'

export const setCurrency = createAction<string>('currencies/setCurrency')

/* @ts-ignore */
export const fetchPricesAction = createAsyncThunk<object, { ids: string; vs_currencies: string }>(
  'currencies/getPrices',
  async ({ ids, vs_currencies }) => {
    const response = await fetchPrices({ ids, vs_currencies })
    return response
  },
)

/* @ts-ignore */
export const fetchTokensAction = createAsyncThunk<object>('currencies/getPrices', async () => {
  const response = await fetchTokens()
  return response
})
