import { useSelector } from 'react-redux'
import { AppState } from '../state'
import { User, VerificationStatus } from '../views/Settings/types'
import { isVerificationPassed } from '../views/Settings/heplers'

export const getIsKYCVerified = (user: User) =>
  useSelector<AppState, boolean>((state) => {
    const application = user?.person?.verification
    const isCompleted = application?.status === VerificationStatus.completed
    return isVerificationPassed(application?.verifications) && isCompleted
  })
