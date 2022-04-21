import { User, VerificationStatus } from '../views/Settings/types'
import { isVerificationPassed } from '../views/Settings/heplers'
import { getUser, postUserWallet } from '../views/Settings/api'
import useActiveWeb3React from './useActiveWeb3React'
import { useEffect, useState } from 'react'

const useIsKYCVerified = () => {
  const { account, library } = useActiveWeb3React()
  const [userId, setUserId] = useState<string>('')
  const [user, setUser] = useState<User>()
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false)
  const [isAccountVerified, setIsAccountVerified] = useState(false)

  useEffect(() => {
    const handlePostUserWallet = async () => {
      const data = await postUserWallet(account)
      setUserId(data._id)
    }

    if (account) {
      handlePostUserWallet()
    }
  }, [account])

  useEffect(() => {
    setIsMetaMaskConnected(account && library?.connection?.url === 'metamask')
  }, [account, library])

  useEffect(() => {
    const handleGetUser = async () => {
      const user = await getUser(userId)
      setUser(user)
    }

    if (isMetaMaskConnected && userId) {
      handleGetUser()
    }
  }, [userId, isMetaMaskConnected])

  useEffect(() => {
    const businessApplication = user?.company?.verification
    const personalApplication = user?.person?.verification
    const isVerified = (application) => {
      const isCompleted = application?.status === VerificationStatus.completed
      return isVerificationPassed(application?.verifications) && isCompleted
    }
    const isAnyVerified = isVerified(businessApplication) || isVerified(personalApplication)
    setIsAccountVerified(isAnyVerified)
  }, [user])

  return isAccountVerified
}

export default useIsKYCVerified
