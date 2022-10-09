const axios = require('axios')

import { ENVOYS_API } from 'config/constants/endpoints'
import React from 'react'
import { BaseCompany } from '../utils'

const envoysAxiosInstance = axios.create({
  baseURL: ENVOYS_API,
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

const useCompany = (companyId: string) => {
  const [company, setCompany] = React.useState<BaseCompany>()

  const updateCompany = () => {
    getCompany(companyId).then(setCompany)
  }

  React.useEffect(() => {
    updateCompany()

    const interval = setInterval(updateCompany, 10000)
    return () => clearInterval(interval)
  })

  return company
}

export { getCompanies, getCompany, useCompany }
