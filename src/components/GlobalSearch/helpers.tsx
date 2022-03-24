import { getCompaniesSearch } from './api'

const getSearchResults = async ({ tokens, farms, poolsLiquidity, poolsSyrup, query }) => {
  const c = await getCompanies(query)
  return {
    companies: c.items,
    tokens,
    farms,
    poolsLiquidity,
    poolsSyrup,
  }
}
const getCompanies = async (query) => {
  if (!query) return null

  const companies = await getCompaniesSearch({ query })

  return companies
}

export { getSearchResults }
