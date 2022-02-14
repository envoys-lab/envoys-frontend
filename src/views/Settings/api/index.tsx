const ENVOYS_PUBLIC_API = 'https://api.beta.envoys.vision'

const postUserWallet = async (account: string) => {
  try {
    const res = await fetch(`${ENVOYS_PUBLIC_API}/users/${account}`, {
      method: 'post',
    })
    const data = await res.json()
    return data
  } catch (e) {
    console.error(e)
  }
}

const getUser = async (userId: string) => {
  try {
    const res = await fetch(`${ENVOYS_PUBLIC_API}/users/${userId}`)
    const data = await res.json()
    return data
  } catch (e) {
    console.error(e)
  }
}

const getPersonVerificationLink = async (userId: string, redirectUrl: string) => {
  try {
    const res = await fetch(`${ENVOYS_PUBLIC_API}/users/${userId}/verification/PERSON/create`, {
      method: 'post',
      body: JSON.stringify({ redirectUrl }),
    })
    const data = await res.json()
    return data
  } catch (e) {
    console.error(e)
  }
}

const getCompanyVerificationLink = async (userId: string, redirectUrl: string) => {
  try {
    const res = await fetch(`${ENVOYS_PUBLIC_API}/users/${userId}/verification/COMPANY/create`, {
      method: 'post',
      body: JSON.stringify({ redirectUrl }),
    })
    const data = await res.json()
    return data
  } catch (e) {
    console.error(e)
  }
}

export { postUserWallet, getUser, getPersonVerificationLink, getCompanyVerificationLink }
