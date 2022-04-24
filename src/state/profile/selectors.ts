import { useSelector } from 'react-redux'
import { State } from '../types'

export const getSignature = () => useSelector((state: State) => state.profile.signature)
