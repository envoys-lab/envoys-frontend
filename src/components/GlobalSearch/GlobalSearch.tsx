import React, {useState, useEffect, useMemo} from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'

import { usePoolsWithVault } from 'views/Home/hooks/useGetTopPoolsByApr'
import { useAllPoolData } from 'state/info/hooks'
import { useFarms } from 'state/farms/hooks'
import usePoolDatas from 'state/info/queries/pools/poolData'
import { PoolUpdater } from 'state/info/updaters'

import { getObjectsArraysLength, getSearchResults } from './helpers'
import { getTokens, useDebounce } from './hooks'
import { InputGroup, SearchIcon, Input, InlineMenu, Box, CogIcon, GasIcon } from '@envoysvision/uikit'
import { useTranslation } from "../../contexts/Localization";
import DropdownItem from "./components/DropdownItem";
import {SearchItemType, SearchResults} from "./types";
import ResultGroup from "./components/ResultGroup";
import {CompanyCard, TokenCard} from "./components";
import { ResultsWrapper, SearchWrapper, BodyWrapper, StyledInput} from './components/styles';

const GlobalSearch = () => {
  const [query, setQuery] = useState('as')
  const [searchResults, setSearchResults] = useState<SearchResults>({})
  const [poolsLiquidity, setPoolsLiquidity] = useState({})
  const tokens = getTokens()
  const farms = useFarms()
  const poolsSyrup = usePoolsWithVault()
  const debouncedSearchTerm = useDebounce(query)
  const [pagination, setPagination] = useState({ show: 20, page: 1 })
  const [paginatedSearchResults, setPaginatedSearchResults] = useState<SearchResults>({})
  const [hasNextPage, setHasNextPage] = useState(false)

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGasOpen, setIsGasOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  const { t } = useTranslation()

  const updatePagination = () => {
    const { show, page } = pagination
    setPagination({ show, page: page + 1 })
  }

  useEffect(() => {
    // console.log(getObjectsArraysLength(searchResults), getObjectsArraysLength(paginatedSearchResults))
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

    if (searchResults) {
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
    }

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
    setQuery(e.target.value || '')
  }

  const renderResults = () => {
    const renderedGroups = [];
    // console.log('searchResults', searchResults)
    // console.log('paginatedSearchResults', paginatedSearchResults)
    // const groupsByDisplayOrder = ['companies', 'farms', 'poolsLiquidity', 'poolsSyrup', 'tokens'];
    Object.keys(paginatedSearchResults).map((type, groupKey) => {
      const groupItems = paginatedSearchResults[type];
      const renderedGroupItems = [];
      if (groupItems) {
        groupItems.map((item, itemKey) => {
          if (type === 'companies') {
            renderedGroupItems.push(<CompanyCard key={`search-item-${type}-${itemKey}`} item={item}/>)
          }
          if (type === 'tokens') {
            renderedGroupItems.push(<TokenCard key={`search-item-${type}-${itemKey}`} item={item}/>)
          }
        })
      }
      const renderedGroup = <ResultGroup title={type} key={`search-group-${type}`}>{renderedGroupItems}</ResultGroup>;
      renderedGroups.push(renderedGroup);
    })
    return renderedGroups
  }

  const DropdownStab = () => {
    return (
      <Box p="24px" width="320px">
        TODO
      </Box>
    )
  }

  return (
    <BodyWrapper>
      <SearchWrapper>
        <PoolUpdater />
        <InputGroup startIcon={<SearchIcon width="18px" opacity={0.3} color={'darkClear'} />} scale={'lg'} mr={"16px"}>
          <StyledInput id="global-search-input"
                 placeholder={t('Search by account, token,ENS...')}
                 autoComplete="off"
                 value={query}
                 onChange={handleChange}
          />
        </InputGroup>
        {query && (
            <DropdownItem onClick={() => setIsFilterOpen(true)} isOpen={isFilterOpen} component={'All Filters'}>
              <InlineMenu isOpen={isFilterOpen} component={<></>} onClose={() => setIsFilterOpen(false)}>
                <Box p="24px" width="320px">
                  TODO
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
      <ResultsWrapper>
        {renderResults()}
        {JSON.stringify(paginatedSearchResults)}
        {hasNextPage && (
            <div ref={infiniteRef}>
              <div>Loading</div>
            </div>
        )}
      </ResultsWrapper>
    </BodyWrapper>
  )
}

export default GlobalSearch
