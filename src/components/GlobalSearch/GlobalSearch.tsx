import React, { useEffect, useMemo, useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'

import { usePoolsWithVault } from 'views/Home/hooks/useGetTopPoolsByApr'
import { useAllPoolData } from 'state/info/hooks'
import { useFarms } from 'state/farms/hooks'
import usePoolDatas from 'state/info/queries/pools/poolData'
import { PoolUpdater } from 'state/info/updaters'
import { currenciesArray as currencies } from 'state/currencies/helpers'
import { setCurrency } from 'state/currencies/actions'
import { getCurrency } from 'state/currencies/selectors'

import { getObjectsArraysLength, getSearchResults } from './helpers'
import { getTokens, useDebounce } from './hooks'
import {
  Box,
  Flex,
  CogIcon,
  GasIcon,
  InlineMenu,
  InputGroup,
  SearchIcon,
  Text,
  useMatchBreakpoints,
} from '@envoysvision/uikit'
import { useTranslation } from '../../contexts/Localization'
import DropdownItem from './components/DropdownItem'
import { SearchResults } from './types'
import ResultGroup from './components/ResultGroup'
import { CompanyCard, FarmCard, PoolLiquidityCard, PoolSyrupCard, TokenCard } from './components'
import {
  BodyWrapper,
  FilterItem,
  ResultsWrapper,
  SearchWrapper,
  StyledInput,
  CardsLayout,
  SettingsOptionButton,
  SettingsBox,
} from './components/styles'
import GasSettings from '../GlobalSettings/GasSettings'
import SlippageSettings from '../GlobalSettings/SlippageSettings'

const GlobalSearch = () => {
  const dispatch = useDispatch()
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResults>({})
  const [poolsLiquidity, setPoolsLiquidity] = useState({})
  const { isMobile } = useMatchBreakpoints()
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
  const [isMobileSettingsOpen, setIsMobileSettingsOpen] = useState(false)

  const globalCurrency = getCurrency()

  const { t } = useTranslation()

  const handleSetCurrency = (newCurrency) => {
    dispatch(setCurrency(newCurrency))
    setIsCurrencyOpen(false)
  }

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
      } else if (
        !hasNextPage &&
        renderedGroupItems.length === 0 &&
        type.toString() === typeFilter &&
        typeFilter !== groupTypes[0]
      ) {
        renderedGroups.push(
          <ResultGroup title={type} key={`search-group-${type}`}>
            {t('No matching results')}
          </ResultGroup>,
        )
      }
    })
    return renderedGroups
  }

  const setFilter = (type: string) => {
    setTypeFilter(type)
    setIsFilterOpen(false)
    setTimeout(() => {
      setIsResultsPanelShown(true)
    })
  }

  useEffect(() => {
    if (isCurrencyOpen) {
      setIsGasOpen(false)
      setIsSettingsOpen(false)
    }
  }, [isCurrencyOpen, setIsGasOpen, setIsSettingsOpen])
  useEffect(() => {
    if (isGasOpen) {
      setIsCurrencyOpen(false)
      setIsSettingsOpen(false)
    }
  }, [isGasOpen, setIsCurrencyOpen, setIsSettingsOpen])
  useEffect(() => {
    if (isSettingsOpen) {
      setIsGasOpen(false)
      setIsCurrencyOpen(false)
    }
  }, [isSettingsOpen, setIsGasOpen, setIsCurrencyOpen])
  useEffect(() => {
    if (isMobileSettingsOpen) {
      setIsGasOpen(false)
      setIsCurrencyOpen(false)
      setIsSettingsOpen(false)
    }
  }, [isMobileSettingsOpen, setIsGasOpen, setIsCurrencyOpen, setIsSettingsOpen])
  const renderSettings = (isMobile = false) => {
    return (
      <>
        <DropdownItem
          noBorder={isMobile}
          isMobile={isMobile}
          onClick={() => setIsCurrencyOpen(true)}
          isOpen={isCurrencyOpen}
          component={globalCurrency}
        >
          <InlineMenu isOpen={isCurrencyOpen} component={<></>} onClose={() => setIsCurrencyOpen(false)}>
            <SettingsBox>
              <CardsLayout>
                {currencies.map((currency) => (
                  <SettingsOptionButton
                    onClick={() => handleSetCurrency(currency)}
                    $active={currency === globalCurrency}
                    key={`settings-item-${currency}`}
                  >
                    {currency}
                  </SettingsOptionButton>
                ))}
              </CardsLayout>
            </SettingsBox>
          </InlineMenu>
        </DropdownItem>
        <DropdownItem isMobile={isMobile} onClick={() => setIsGasOpen(true)} isOpen={isGasOpen} component={<GasIcon />}>
          <InlineMenu isOpen={isGasOpen} component={<></>} onClose={() => setIsGasOpen(false)}>
            <SettingsBox>
              <GasSettings />
            </SettingsBox>
          </InlineMenu>
        </DropdownItem>
        <DropdownItem
          isMobile={isMobile}
          onClick={() => setIsSettingsOpen(true)}
          isOpen={isSettingsOpen}
          component={<CogIcon />}
        >
          <InlineMenu isOpen={isSettingsOpen} component={<></>} onClose={() => setIsSettingsOpen(false)}>
            <SettingsBox>
              <SlippageSettings />
            </SettingsBox>
          </InlineMenu>
        </DropdownItem>
      </>
    )
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
                      className={classNames({ active: typeFilter.toString() === type.toString() })}
                      onClick={() => setFilter(type)}
                    >
                      {t(type)}
                    </FilterItem>
                  ))}
                </Box>
              </InlineMenu>
            </DropdownItem>
          )}
          {isMobile && (
            <DropdownItem
              onClick={() => setIsMobileSettingsOpen(true)}
              isOpen={isMobileSettingsOpen}
              component={<CogIcon />}
            >
              <InlineMenu
                isOpen={isMobileSettingsOpen}
                component={<></>}
                onClose={() => setIsMobileSettingsOpen(false)}
              >
                <Box p="10px" minWidth={'200px'}>
                  <Flex>{renderSettings()}</Flex>
                </Box>
              </InlineMenu>
            </DropdownItem>
          )}
          {!isMobile && renderSettings()}
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
