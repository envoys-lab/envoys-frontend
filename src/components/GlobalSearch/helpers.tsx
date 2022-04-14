import { getCompaniesSearch } from './api'

const getSearchStr = (str) => str.toLowerCase().trim()

const getSearchResults = async ({ tokens, farms, poolsLiquidity, poolsSyrup, query }) => {
  if (!query) return null
  const { items: companies } = await getCompanies(query)

  const compiledSearchResults = compileSearchResults({ tokens, farms, poolsLiquidity, poolsSyrup })
  const appliedSearchResults = getSearchResultsByQuery(compiledSearchResults, query)

  return {
    companies,
    ...appliedSearchResults,
  }
}

const getSearchResultsByQuery = (compiledSearchResults, query) => {
  const result = {}

  Object.keys(compiledSearchResults).map((key) => {
    const category = compiledSearchResults[key]
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
const compileSearchResults = ({ tokens, farms, poolsLiquidity, poolsSyrup }) => {
  const compiledSearchResults = {
    tokens: getTokensSearchString(tokens),
    farms: getFarmsSearchString(farms),
    poolsLiquidity: getPoolsLiquiditySearchString(poolsLiquidity),
    poolsSyrup: getPoolsSyrupSearchString(poolsSyrup),
  }

  return compiledSearchResults
}

const getTokensSearchString = (tokens) => {
  return tokens.map((item) => ({
    ...item,
    search: {
      partial: getSearchStr(item.name),
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
        partial: getSearchStr(`${pool.token0.name} ${pool.token0.symbol} ${pool.token1.name} ${pool.token1.symbol}`),
        exact: [getSearchStr(pool.address), getSearchStr(pool.token0.address), getSearchStr(pool.token1.address)],
      },
    }
  })
}

const getPoolsSyrupSearchString = (poolsSyrup) => {
  return poolsSyrup.map((item) => ({
    ...item,
    search: {
      partial: getSearchStr(item.earningToken.name),
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

export { getSearchResults, getObjectsArraysLength }
