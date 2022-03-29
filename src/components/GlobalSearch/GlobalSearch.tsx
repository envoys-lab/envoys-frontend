import React, { useState, useEffect, useMemo } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'

import { usePoolsWithVault } from 'views/Home/hooks/useGetTopPoolsByApr'
import { useAllPoolData } from 'state/info/hooks'
import { useFarms } from 'state/farms/hooks'
import usePoolDatas from 'state/info/queries/pools/poolData'
import { PoolUpdater } from 'state/info/updaters'

import { getObjectsArraysLength, getSearchResults } from './helpers'
import { getTokens, useDebounce } from './hooks'

const GlobalSearch = () => {
  const [query, setQuery] = useState('as')
  const [searchResults, setSearchResults] = useState({})
  const [poolsLiquidity, setPoolsLiquidity] = useState({})
  const tokens = getTokens()
  const farms = useFarms()
  const poolsSyrup = usePoolsWithVault()
  const debouncedSearchTerm = useDebounce(query)
  const [pagination, setPagination] = useState({ show: 20, page: 1 })
  const [paginatedSearchResults, setPaginatedSearchResults] = useState({})
  const [hasNextPage, setHasNextPage] = useState(false)

  const updatePagination = () => {
    const { show, page } = pagination
    setPagination({ show, page: page + 1 })
  }

  useEffect(() => {
    console.log(getObjectsArraysLength(searchResults), getObjectsArraysLength(paginatedSearchResults))
    setHasNextPage(getObjectsArraysLength(searchResults) > getObjectsArraysLength(paginatedSearchResults))
  }, [searchResults, paginatedSearchResults])

  const [infiniteRef] = useInfiniteScroll({
    loading: false,
    hasNextPage,
    onLoadMore: updatePagination,
    disabled: false,
    rootMargin: '0px 0px 400px 0px',
  })

  useEffect(() => {
    const { show, page } = pagination
    const result = {}
    let itemsCounter = show * page

    Object.keys(searchResults).map((item) => {
      if (!itemsCounter) return

      const group = searchResults[item]

      if (group.length) {
        const res = group.slice(0, itemsCounter)
        itemsCounter = itemsCounter - res.length
        result[item] = res

        if (!itemsCounter) {
          setPaginatedSearchResults(result)
        }
      }
    })
    // console.log({ result })
    setPaginatedSearchResults(result)
  }, [searchResults, debouncedSearchTerm, pagination])

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
    console.log(paginatedSearchResults)
    return <div>asd</div>
  }

  return (
    <div>
      <PoolUpdater />
      <input onChange={handleChange} value={query} type="text" />
      {renderResults()}
      {JSON.stringify(paginatedSearchResults)}
      {hasNextPage && (
        <div ref={infiniteRef}>
          <div>Loading</div>
        </div>
      )}
    </div>
  )
}

export default GlobalSearch
