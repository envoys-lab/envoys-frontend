import { getCompaniesSearch } from './api'

const getSearchResults = async ({ tokens, farms, poolsLiquidity, poolsSyrup, query }) => {
  const { items: companies } = await getCompanies(query)

  const compiledSearchResults = compileSearchResults({ companies, tokens, farms, poolsLiquidity, poolsSyrup })
  return {
    ...compiledSearchResults,
  }
}
const compileSearchResults = ({ companies, tokens, farms, poolsLiquidity, poolsSyrup }) => {
  const compiledSearchResults = {
    companies: getCompaniesSearchString(companies),
    tokens: getTokensSearchString(tokens),
    farms: getFarmsSearchString(farms),
    poolsLiquidity: getPoolsLiquiditySearchString(poolsLiquidity),
    poolsSyrup: getPoolsSyrupSearchString(poolsSyrup),
  }

  return compiledSearchResults
}

const getCompaniesSearchString = (companies) => {
  return companies.map((item) => ({
    ...item,
    search: `${item.name} ${JSON.stringify(item.sellType)} ${item.status} ${item.homePageUrl}`,
  }))
}

const getTokensSearchString = (tokens) => {
  return tokens.map((item) => ({
    ...item,
    search: `${item.name} ${item.address}`,
  }))
}

const getFarmsSearchString = (farms) => {
  return farms.map((item) => ({
    ...item,
    search: `${item.lpSymbol} ${item.quoteToken.address} ${item.token.address}`,
  }))
}

const getPoolsLiquiditySearchString = (poolsLiquidity) => {
  return Object.keys(poolsLiquidity).map((item) => {
    const pool = poolsLiquidity[item]
    return {
      ...pool,
      search: `${pool.address} ${pool.token0.address} ${pool.token0.name} 
      ${pool.token0.symbol} ${pool.token1.address} ${pool.token1.name}  ${pool.token1.symbol}`,
    }
  })
}

const getPoolsSyrupSearchString = (poolsSyrup) => {
  return poolsSyrup.map((item) => ({
    ...item,
    search: `${item.earningToken.address} ${item.earningToken.name}`,
  }))
}

const getCompanies = async (query) => {
  if (!query) return null

  const companies = await getCompaniesSearch({ query })

  return companies
}

export { getSearchResults }
