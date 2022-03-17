const axios = require('axios')

const ENVOYS_PUBLIC_API = 'https://api.beta.envoys.vision'

const axiosInstance = axios.create({
  baseURL: ENVOYS_PUBLIC_API,
})

const getCompanies = async (page = 1, size = 50) => {
  try {
    const response = await axiosInstance.get(`${ENVOYS_PUBLIC_API}/companies`, { params: { page, size } })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

const getCompany = async (companyId: string) => {
  try {
    const response = await axiosInstance.get(`${ENVOYS_PUBLIC_API}/companies/${companyId}`)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export { getCompanies, getCompany }
