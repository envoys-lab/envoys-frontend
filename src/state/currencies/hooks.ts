import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'

import { State } from 'state/types'
import { usePoolsWithVault } from 'views/Home/hooks/useGetTopPoolsByApr'

import { fetchPricesAction } from './actions'
import { getCurrency } from './selectors'
import { coinGeckoAddressToIdMap } from '../../config/constants/tokens'

const getTokens = () => {
  const tokens: any = useSelector((state: State) => state.lists)

  const arr = tokens.byUrl['https://tokens.pancakeswap.finance/pancakeswap-extended.json'].current
  if (!arr) return []

  const out = arr.tokens

  return out
}

const mergeArraysOfStrings = (arr1: string[], arr2: string[]) => {
  const out = arr1.concat(arr2)
  const unique = [...new Set(out)]
  return unique
}

export const useCurrency = () => {
  const dispatch = useAppDispatch()
  const vs_currencies = getCurrency()
  const tokens = getTokens()
  const poolsSyrup = usePoolsWithVault()

  const poolAddresses = poolsSyrup.map((item) => item.earningToken.address.toLowerCase())
  const tokenAddresses = tokens.map((item) => {
    return item.address.toLowerCase()
  })
  const ids = mergeArraysOfStrings(poolAddresses, tokenAddresses)
    .map((address) => coinGeckoAddressToIdMap[address.toLowerCase()])
    .filter((a) => a)
    .join(',')

  useEffect(() => {
    dispatch(fetchPricesAction({ ids, vs_currencies }))

    const intervalId = setInterval(() => {
      dispatch(fetchPricesAction({ ids, vs_currencies }))
    }, 1000 * 60 * 10)

    return () => clearInterval(intervalId)
  }, [vs_currencies])
}
