import React, { useState, useEffect, useMemo } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'

import { usePoolsWithVault } from 'views/Home/hooks/useGetTopPoolsByApr'
import { useAllPoolData } from 'state/info/hooks'
import { useFarms } from 'state/farms/hooks'
import usePoolDatas from 'state/info/queries/pools/poolData'
import { PoolUpdater } from 'state/info/updaters'

import { getObjectsArraysLength, getSearchResults } from './helpers'
import { getTokens, useDebounce } from './hooks'
import { InputGroup, SearchIcon, InlineMenu, Box, CogIcon, GasIcon, Text } from '@envoysvision/uikit'
import { useTranslation } from '../../contexts/Localization'
import DropdownItem from './components/DropdownItem'
import { SearchResults } from './types'
import ResultGroup from './components/ResultGroup'
import { CompanyCard, FarmCard, PoolLiquidityCard, PoolSyrupCard, TokenCard } from './components'
import { ResultsWrapper, SearchWrapper, BodyWrapper, StyledInput, FilterItem } from './components/styles'

const GlobalSearch = () => {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResults>({})
  const [poolsLiquidity, setPoolsLiquidity] = useState({})
  const tokens = getTokens()
  const farms = useFarms()
  const poolsSyrup = usePoolsWithVault()
  const debouncedSearchTerm = useDebounce(query)
  const [pagination, setPagination] = useState({ show: 20, page: 1 })
  const [paginatedSearchResults, setPaginatedSearchResults] = useState<SearchResults>({})
  const [hasNextPage, setHasNextPage] = useState(false)

  const groupTypes = ['allFilters', 'tokens', 'companies', 'farms', 'poolsLiquidity', 'poolsSyrup']
  const [typeFilter, setTypeFilter] = useState<string>(groupTypes[0])
  const [inputPanelElement, setInputPanelElement] = useState<HTMLElement | null>(null)
  const [resultsPanelElement, setResultsPanelElement] = useState<HTMLElement | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isGasOpen, setIsGasOpen] = useState(false)
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false)
  const [isResultsPanelShown, setIsResultsPanelShown] = useState(false)

  const { t } = useTranslation()

  const updatePagination = () => {
    const { show, page } = pagination
    setPagination({ show, page: page + 1 })
  }

  useEffect(() => {
    // console.log(getObjectsArraysLength(searchResults), getObjectsArraysLength(paginatedSearchResults))
    setHasNextPage(getObjectsArraysLength(searchResults) > getObjectsArraysLength(paginatedSearchResults))
  }, [searchResults, paginatedSearchResults])

  useEffect(() => {
    const handleClickOutside = ({ target }: Event) => {
      if (target instanceof Node) {
        if (
          resultsPanelElement !== null &&
          inputPanelElement !== null &&
          !resultsPanelElement.contains(target) &&
          !inputPanelElement.contains(target)
        ) {
          setIsResultsPanelShown(false)
        }
      }
    }
    if (resultsPanelElement !== null) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [resultsPanelElement, inputPanelElement])

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
    let hasResults = false
    let itemsCounter = show * page

    if (searchResults) {
      Object.keys(searchResults).map((item) => {
        if (!itemsCounter) return

        const group = searchResults[item]

        if (group.length) {
          hasResults = true
          const res = group.slice(0, itemsCounter)
          itemsCounter = itemsCounter - res.length
          result[item] = res

          if (!itemsCounter) {
            setPaginatedSearchResults(result)
          }
        }
      })
    }

    // console.log({ result })
    setPaginatedSearchResults(result)
    setIsResultsPanelShown(hasResults)
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
    if (debouncedSearchTerm.length < 2) {
      setIsResultsPanelShown(false)
      return
    }
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
    setQuery(e.target.value || '')
  }

  const showResultsOnFocus = () => {
    if (query.length > 1) {
      setIsResultsPanelShown(true)
    }
  }

  const renderResults = () => {
    const renderedGroups = []
    groupTypes.map((type) => {
      const groupItems = paginatedSearchResults[type]
      const renderedGroupItems = []
      if (groupItems) {
        groupItems.map((item, itemKey) => {
          const props = {
            key: `search-item-${type}-${itemKey}`,
            item,
          }
          if (type === 'companies') {
            renderedGroupItems.push(<CompanyCard {...props} />)
          }
          if (type === 'tokens') {
            renderedGroupItems.push(<TokenCard {...props} />)
          }
          if (type === 'poolsLiquidity') {
            renderedGroupItems.push(<PoolLiquidityCard {...props} />)
          }
          if (type === 'poolsSyrup') {
            renderedGroupItems.push(<PoolSyrupCard {...props} />)
          }
          if (type === 'farms') {
            renderedGroupItems.push(<FarmCard {...props} />)
          }
        })
      }
      if (renderedGroupItems.length > 0 && (type.toString() === typeFilter || typeFilter === groupTypes[0])) {
        renderedGroups.push(
          <ResultGroup title={type} key={`search-group-${type}`}>
            {renderedGroupItems}
          </ResultGroup>,
        )
      } else if (renderedGroupItems.length === 0 && type.toString() === typeFilter && typeFilter !== groupTypes[0]) {
        renderedGroups.push(
          <ResultGroup title={type} key={`search-group-${type}`}>
            {t('No matching results')}
          </ResultGroup>,
        )
      }
    })
    return renderedGroups
  }

  const DropdownStab = () => {
    return (
      <Box p="24px" width="320px" style={{ position: 'relative', zIndex: 3 }}>
        WIP
      </Box>
    )
  }

  const setFilter = (type: string) => {
    setTypeFilter(type)
    setIsFilterOpen(false)
    setTimeout(() => {
      setIsResultsPanelShown(true)
    })
  }

  return (
    <BodyWrapper>
      <div ref={setInputPanelElement}>
        <SearchWrapper>
          <PoolUpdater />
          <InputGroup
            startIcon={<SearchIcon width="18px" opacity={0.3} color={'darkClear'} />}
            scale={'lg'}
            mr={'16px'}
          >
            <StyledInput
              id="global-search-input"
              placeholder={t('Search by account, token,ENS...')}
              autoComplete="off"
              value={query}
              onChange={handleChange}
              onFocus={showResultsOnFocus}
            />
          </InputGroup>
          {query?.length > 1 && (
            <DropdownItem onClick={() => setIsFilterOpen(true)} isOpen={isFilterOpen} component={t(typeFilter)}>
              <InlineMenu isOpen={isFilterOpen} component={<></>} onClose={() => setIsFilterOpen(false)}>
                <Box p="10px" minWidth={'200px'}>
                  {groupTypes.map((type, key) => (
                    <FilterItem
                      key={`filter-${key}`}
                      className={{ active: typeFilter.toString() === type.toString() }}
                      onClick={() => setFilter(type)}
                    >
                      {t(type)}
                    </FilterItem>
                  ))}
                </Box>
              </InlineMenu>
            </DropdownItem>
          )}
          <DropdownItem onClick={() => setIsCurrencyOpen(true)} isOpen={isCurrencyOpen} component={'USD'}>
            <InlineMenu isOpen={isCurrencyOpen} component={<></>} onClose={() => setIsCurrencyOpen(false)}>
              <DropdownStab />
            </InlineMenu>
          </DropdownItem>
          <DropdownItem onClick={() => setIsGasOpen(true)} isOpen={isGasOpen} component={<GasIcon />}>
            <InlineMenu isOpen={isGasOpen} component={<></>} onClose={() => setIsGasOpen(false)}>
              <DropdownStab />
            </InlineMenu>
          </DropdownItem>
          <DropdownItem onClick={() => setIsSettingsOpen(true)} isOpen={isSettingsOpen} component={<CogIcon />}>
            <InlineMenu isOpen={isSettingsOpen} component={<></>} onClose={() => setIsSettingsOpen(false)}>
              <DropdownStab />
            </InlineMenu>
          </DropdownItem>
        </SearchWrapper>
      </div>
      <div ref={setResultsPanelElement}>
        <ResultsWrapper style={{ display: isResultsPanelShown ? 'inherit' : 'none' }}>
          <div>
            {renderResults()}
            {hasNextPage && (
              <div ref={infiniteRef}>
                <div>
                  <Text m={'12px'}>{t('Loading...')}</Text>
                </div>
              </div>
            )}
          </div>
        </ResultsWrapper>
      </div>
    </BodyWrapper>
  )
}

export default GlobalSearch
