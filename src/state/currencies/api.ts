const axios = require('axios')

const COINGECKO_API = 'https://api.coingecko.com/api/v3/'

const axiosInstance = axios.create({
  baseURL: COINGECKO_API,
})

const fetchPrices = async ({ ids, vs_currencies }) => {
  const extendedCurrencies = `${vs_currencies},USD`
  try {
    const response = await axiosInstance.get(`${COINGECKO_API}/simple/price`, {
      params: { ids, vs_currencies: extendedCurrencies },
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

const fetchTokens = async () => {
  try {
    const response = await axiosInstance.get(`${COINGECKO_API}/coins/list`)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export { fetchPrices, fetchTokens }
