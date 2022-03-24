import React, { useState, useEffect, useMemo } from 'react'
import { getSearchResults } from './helpers'
import { getTokens, getFarms, getPoolsLiquidity, getPoolsSyrup } from './hooks'
import { usePoolsWithVault } from 'views/Home/hooks/useGetTopPoolsByApr'
import { useAllPoolData, useUpdatePoolData } from 'state/info/hooks'
import usePoolDatas from 'state/info/queries/pools/poolData'
import { PoolUpdater } from 'state/info/updaters'

const GlobalSearch = () => {
  const [query, setQuery] = useState('as')
  const [searchResults, setSearchResults] = useState({})
  const [poolsLiquidity, setPoolsLiquidity] = useState({})
  const tokens = getTokens()
  const farms = getFarms() //usePoolDatas([]) //useAllPoolData()
  const poolsSyrup = usePoolsWithVault()

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

  console.log({ unfetchedPoolAddresses })
  const { data: poolDatas } = usePoolDatas(unfetchedPoolAddresses)

  useEffect(() => {
    if (poolDatas) {
      setPoolsLiquidity(poolDatas)
    }
  }, [poolDatas])

  useEffect(() => {
    // useUpdatePoolData()
    updateSearchResults()
  }, [query])

  const updateSearchResults = async () => {
    const searchResults = await getSearchResults({ tokens, farms, poolsLiquidity, poolsSyrup, query })
    setSearchResults(searchResults)
  }
  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const renderResults = () => {
    console.log(searchResults.poolsLiquidity)
    return <div>asd</div>
  }

  return (
    <div>
      <PoolUpdater />
      <input onChange={handleChange} type="text" />
      {renderResults()}
    </div>
  )
}

export default GlobalSearch
