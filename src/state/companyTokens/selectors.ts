import { useSelector } from 'react-redux'
import { State } from '../types'

export const getCompanyTokens = () => useSelector((state: State) => state.companyTokens)
export const getCompanyTokensLoaded = () => getCompanyTokens().isInitialized
export const getCompanyTokensLoading = () => getCompanyTokens().isLoading
export const getCompanyTokensList = () => getCompanyTokens().list
