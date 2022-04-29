import { useSelector } from 'react-redux'
import { State } from '../types'

export const getCurrency = () => useSelector((state: State) => state.currencies.currency)
export const getCurrencyData = () => useSelector((state: State) => state.currencies.data)
export const getCurrencyBUSDReferenceData = () => useSelector((state: State) => state.currencies.busdPair)
