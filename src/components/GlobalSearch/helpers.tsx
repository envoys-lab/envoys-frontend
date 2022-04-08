import { getCompaniesSearch } from './api'

const getSearchStr = (str) => str.toLowerCase()

const getSearchResults = async ({ tokens, farms, poolsLiquidity, poolsSyrup, query }) => {
  if (!query) return null
  const { items: companies } = await getCompanies(query)

  const compiledSearchResults = compileSearchResults({ tokens, farms, poolsLiquidity, poolsSyrup })
  const appliedSearchResults = getSearchResultsByQuery(compiledSearchResults, query)

  console.log({ tokens, farms, poolsLiquidity, poolsSyrup })

  return {
    companies,
    ...appliedSearchResults,
  }
}

const getSearchResultsByQuery = (compiledSearchResults, query) => {
  const result = {}

  Object.keys(compiledSearchResults).map((key) => {
    const category = compiledSearchResults[key]
    const output = category.filter((item) => item.search.includes(getSearchStr(query)))
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
    search: getSearchStr(`${item.name} ${item.address}`),
  }))
}

const getFarmsSearchString = (farms) => {
  return farms.map((item) => ({
    ...item,
    search: getSearchStr(`${item.lpSymbol} ${item.quoteToken.address} ${item.token.address}`),
  }))
}

const getPoolsLiquiditySearchString = (poolsLiquidity) => {
  return Object.keys(poolsLiquidity).map((item) => {
    const pool = poolsLiquidity[item]
    return {
      ...pool,
      search: getSearchStr(`${pool.address} ${pool.token0.address} ${pool.token0.name} 
      ${pool.token0.symbol} ${pool.token1.address} ${pool.token1.name}  ${pool.token1.symbol}`),
    }
  })
}

const getPoolsSyrupSearchString = (poolsSyrup) => {
  return poolsSyrup.map((item) => ({
    ...item,
    search: getSearchStr(`${item.earningToken.address} ${item.earningToken.name}`),
  }))
}

const getCompanies = async (query) => {
  if (!query) return null

  const companies = await getCompaniesSearch({ query })

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
