const axios = require('axios')

const ENVOYS_PUBLIC_API = 'https://api.beta.envoys.vision'

const axiosInstance = axios.create({
  baseURL: ENVOYS_PUBLIC_API,
})

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const postUserWallet = async (account: string, signature: string, message: string) => {
  try {
    const response = await axiosInstance.post(
      `${ENVOYS_PUBLIC_API}/users/${account}`,
      { signature, message },
      defaultOptions,
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

const getUser = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`${ENVOYS_PUBLIC_API}/users/${userId}`)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

const refreshVerification = async (userId: string) => {
  try {
    const response = await axiosInstance.post(`${ENVOYS_PUBLIC_API}/users/${userId}/verification/refresh`)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

const getPersonVerificationLink = async (userId: string, redirectUrl: string) => {
  try {
    const response = await axiosInstance.post(
      `${ENVOYS_PUBLIC_API}/users/${userId}/verification/PERSON/create`,
      { redirectUrl },
      defaultOptions,
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

const getCompanyVerificationLink = async (userId: string, redirectUrl: string) => {
  try {
    const response = await axiosInstance.post(
      `${ENVOYS_PUBLIC_API}/users/${userId}/verification/COMPANY/create`,
      { redirectUrl },
      defaultOptions,
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export { postUserWallet, getUser, getPersonVerificationLink, getCompanyVerificationLink, refreshVerification }
