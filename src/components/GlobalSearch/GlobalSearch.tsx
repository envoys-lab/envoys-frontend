import React, { useState, useEffect, useMemo } from 'react'
import { getSearchResults } from './helpers'
import { getTokens, useDebounce } from './hooks'
import { usePoolsWithVault } from 'views/Home/hooks/useGetTopPoolsByApr'
import { useAllPoolData, useUpdatePoolData } from 'state/info/hooks'
import { useFarms } from 'state/farms/hooks'
import usePoolDatas from 'state/info/queries/pools/poolData'
import { PoolUpdater } from 'state/info/updaters'

const GlobalSearch = () => {
  const [query, setQuery] = useState('as')
  const [searchResults, setSearchResults] = useState({})
  const [poolsLiquidity, setPoolsLiquidity] = useState({})
  const tokens = getTokens()
  const farms = useFarms()
  const poolsSyrup = usePoolsWithVault()
  const debouncedSearchTerm = useDebounce(query)

  const allPoolData = useAllPoolData()
  const unfetchedPoolAddresses = useMemo(() => {
    return Object.keys(allPoolData).reduce((accum: string[], address) => {
      const poolData = allPoolData[address]
      if (!poolData.data) {
        accum.push(address)
      }
      return accum
    }, [])
  }, [allPoolData])

  const { data } = usePoolDatas(unfetchedPoolAddresses)

  useEffect(() => {
    if (data) {
      setPoolsLiquidity(data)
    }
  }, [data])

  useEffect(() => {
    updateSearchResults()
  }, [debouncedSearchTerm, poolsLiquidity])

  const updateSearchResults = async () => {
    const searchResults = await getSearchResults({
      tokens,
      farms: farms.data,
      poolsLiquidity,
      poolsSyrup,
      query: debouncedSearchTerm,
    })
    setSearchResults(searchResults)
  }
  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const renderResults = () => {
    console.log(searchResults)
    return <div>asd</div>
  }

  return (
    <div>
      <PoolUpdater />
      <input onChange={handleChange} value={query} type="text" />
      {renderResults()}
    </div>
  )
}

export default GlobalSearch
