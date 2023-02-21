const axios = require('axios')

const ENVOYS_PUBLIC_API = process.env.NEXT_PUBLIC_ENVOYS_API as string;

const axiosInstance = axios.create({
  baseURL: ENVOYS_PUBLIC_API,
})

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const postUserWallet = async (account: string) => {
  try {
    const response = await axiosInstance.post(`${ENVOYS_PUBLIC_API}/users/${account}`)
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

const getPersonVerificationLink = async (
  userId: string,
  redirectUrl: string,
  signature: string,
  message: string,
  userWalletAddress: string,
) => {
  try {
    const response = await axiosInstance.post(
      `${ENVOYS_PUBLIC_API}/users/${userId}/verification/PERSON/create`,
      { redirectUrl, signature, message, userWalletAddress },
      defaultOptions,
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

const getCompanyVerificationLink = async (
  userId: string,
  redirectUrl: string,
  signature: string,
  message: string,
  userWalletAddress: string,
) => {
  try {
    const response = await axiosInstance.post(
      `${ENVOYS_PUBLIC_API}/users/${userId}/verification/COMPANY/create`,
      { redirectUrl, signature, message, userWalletAddress },
      defaultOptions,
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export { postUserWallet, getUser, getPersonVerificationLink, getCompanyVerificationLink, refreshVerification }
