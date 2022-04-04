const axios = require('axios')

const ENVOYS_PUBLIC_API = 'https://api.beta.envoys.vision'

const axiosInstance = axios.create({
  baseURL: ENVOYS_PUBLIC_API,
})

const getCompaniesSearch = async ({ query = '', page = 1, size = 50 }) => {
  try {
    const response = await axiosInstance.get(`${ENVOYS_PUBLIC_API}/companies`, { params: { query, page, size } })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export { getCompaniesSearch }
