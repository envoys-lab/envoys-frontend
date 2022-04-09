import { useEffect } from 'react'
import useInterval from 'hooks/useInterval'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'

import { State } from 'state/types'
import { usePoolsWithVault } from 'views/Home/hooks/useGetTopPoolsByApr'

import { fetchPricesAction } from './actions'
import { getCurrency } from './selectors'

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

  const poolIds = poolsSyrup.map((item) => item.earningToken.name.split(' ').join('-'))
  const tokenIds = tokens.map((item) => item.name.split(' ').join('-'))

  const ids = mergeArraysOfStrings(poolIds, tokenIds).join(',')

  useEffect(() => {
    dispatch(fetchPricesAction({ ids, vs_currencies }))

    const intervalId = setInterval(() => {
      dispatch(fetchPricesAction({ ids, vs_currencies }))
    }, 1000 * 60 * 10)

    return () => clearInterval(intervalId)
  }, [vs_currencies])
}
