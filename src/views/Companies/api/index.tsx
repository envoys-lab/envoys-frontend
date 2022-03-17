const axios = require('axios')

const ENVOYS_PUBLIC_API = 'https://api.beta.envoys.vision'

const axiosInstance = axios.create({
  baseURL: ENVOYS_PUBLIC_API,
})

const getCompanies = async () => {
  try {
    const response = await axiosInstance.get(`${ENVOYS_PUBLIC_API}/companies`)
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
