import { createAsyncThunk } from '@reduxjs/toolkit'
import { getCompanies } from '../../views/Companies/api'
import { BaseCompany } from '../../views/Companies/utils'

/* @ts-ignore */
export const fetchCompanyTokensAction = createAsyncThunk<Array<BaseCompany>>('companies/getTokens', async () => {
  const response = await getCompanies(1, 99999)
  return response.items
})
