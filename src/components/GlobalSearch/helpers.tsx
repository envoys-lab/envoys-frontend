import { getCompaniesSearch } from './api'
import { DefaultFarmIdentifier } from 'config/constants/farms'
import { BASE_BSC_SCAN_URLS, CURRENT_CHAIN_ID } from 'config'
import { getBscScanLink } from 'utils'

const getCustomTokens = (arr) => arr.map((el) => ({ ...el, href: getBscScanLink(el.address, 'token') }))

const getSearchStr = (str) => str.toLowerCase().trim()

const getSearchResults = async ({ tokens, farms, poolsLiquidity, poolsSyrup, query }) => {
  if (!query) return null
  const { items: companies } = await getCompanies(query)

  const compiledSearchResults = compileSearchResults({ tokens, companies, farms, poolsLiquidity, poolsSyrup })

  return getSearchResultsByQuery(compiledSearchResults, query)
}

const getSearchResultsByQuery = (compiledSearchResults, query) => {
  const result = {}

  Object.keys(compiledSearchResults).map((key) => {
    const category = compiledSearchResults[key]

    if (key === 'companies') {
      result[key] = category
      return
    }

    const output = category.filter((item) => {
      if (!item.search || (!item.search.exact.length && !item.search.partial)) {
        return false
      }

      if (item.search.exact.some((seatchItem) => getSearchStr(seatchItem) === getSearchStr(query))) {
        return true
      }

      return item.search.partial?.includes(getSearchStr(query))
    })
    result[key] = output
  })

  return result
}

const compileSearchResults = ({ tokens, companies, farms, poolsLiquidity, poolsSyrup }) => {
  const compiledSearchResults = {
    tokens: getTokensSearchString(tokens),
    companies: companies,
    farms: getFilteredFarms(getFarmsSearchString(farms)),
    poolsLiquidity: getPoolsLiquiditySearchString(poolsLiquidity),
    poolsSyrup: getPoolsSyrupSearchString(poolsSyrup),
  }

  return compiledSearchResults
}

const getFilteredFarms = (farms) => {
  return farms.filter(({ pid }) => pid !== DefaultFarmIdentifier.EVT)
}

const getTokensSearchString = (tokens) => {
  return tokens.map((item) => ({
    ...item,
    search: {
      partial: getSearchStr(`${item.name} ${item.symbol}`),
      exact: [getSearchStr(item.address)],
    },
  }))
}

const getFarmsSearchString = (farms) => {
  return farms.map((item) => ({
    ...item,
    search: {
      partial: getSearchStr(item.lpSymbol),
      exact: [getSearchStr(item.token.address), getSearchStr(item.quoteToken.address)],
    },
  }))
}

const getPoolsLiquiditySearchString = (poolsLiquidity) => {
  return Object.keys(poolsLiquidity).map((item) => {
    const pool = poolsLiquidity[item]
    return {
      ...pool,
      search: {
        partial: getSearchStr(`${pool.token0.symbol} ${pool.token1.symbol}`),
        exact: [getSearchStr(pool.address), getSearchStr(pool.token0.address), getSearchStr(pool.token1.address)],
      },
    }
  })
}

const getPoolsSyrupSearchString = (poolsSyrup) => {
  return poolsSyrup.map((item) => ({
    ...item,
    search: {
      partial: getSearchStr(item.earningToken.symbol),
      exact: [getSearchStr(item.earningToken.address)],
    },
  }))
}

const getCompanies = async (search) => {
  if (!search) return null

  const companies = await getCompaniesSearch({ search })

  return companies
}

const getObjectsArraysLength = (obj) => {
  if (!obj) {
    return 0
  }
  return Object.keys(obj).reduce((accum, key) => {
    const arr = obj[key]
    return accum + arr.length
  }, 0)
}

export { getSearchResults, getObjectsArraysLength, getCustomTokens }
