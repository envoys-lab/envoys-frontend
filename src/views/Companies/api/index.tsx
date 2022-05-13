const axios = require('axios')

import { ENVOYS_API, COVALENTHQ_API_KEY, COVALENTHQ_API } from 'config/constants/endpoints'

const envoysAxiosInstance = axios.create({
  baseURL: ENVOYS_API,
})

const covalenthqAxiosInstance = axios.create({
  baseURL: COVALENTHQ_API,
})

const getCompanies = async (page = 1, size = 50) => {
  try {
    const response = await envoysAxiosInstance.get(`/companies`, { params: { page, size } })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

const getCompany = async (companyId: string) => {
  try {
    const response = await envoysAxiosInstance.get(`/companies/${companyId}`)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export { getCompanies, getCompany }
