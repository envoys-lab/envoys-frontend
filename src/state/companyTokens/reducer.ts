import { createReducer } from '@reduxjs/toolkit'
import { defineState } from 'redux-localstore'

import { fetchCompanyTokensAction } from './actions'
import { CompanyTokensState } from '../types'
import { ChainId, Token } from '@envoysvision/sdk'

export interface CurrenciesState {
  readonly currency: string
  readonly data: object
}

const defaultState: CompanyTokensState = {
  isLoading: false,
  isInitialized: false,
  list: [],
}

const initialState = defineState(defaultState)('companyTokens')

export default createReducer<CompanyTokensState>(initialState, (builder) =>
  builder
    .addCase(fetchCompanyTokensAction.pending, (state) => {
      return {
        isLoading: true,
        ...state,
      }
    })
    .addCase(fetchCompanyTokensAction.fulfilled, (state, { payload: rawData }) => {
      const data = rawData ? rawData : []
      const tokenList = data.reduce((acc, company) => {
        const companyToken = company?.details?.token
        const token = {
          decimals: 18,
          chainId: ChainId.MAINNET,
          address: company.token,
          symbol: companyToken?.ticker,
          name: companyToken?.ticker,
        }
        acc.push(token)
        return acc
      }, [])
      return {
        isLoading: false,
        isInitialized: true,
        list: tokenList,
      }
    }),
)
