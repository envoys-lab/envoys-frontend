import { BigNumber } from '@ethersproject/bignumber'
import profileABI from 'config/abi/pancakeProfile.json'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useEffect, useState } from 'react'
import { getPancakeProfileAddress } from 'utils/addressHelpers'
import { multicallv2 } from 'utils/multicall'

const useGetProfileCosts = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)
  const [costs, setCosts] = useState({
    numberCakeToReactivate: BigNumber.from(0),
    numberCakeToRegister: BigNumber.from(0),
    numberCakeToUpdate: BigNumber.from(0),
  })
  const { toastError } = useToast()

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const calls = ['numberCakeToReactivate', 'numberCakeToRegister', 'numberCakeToUpdate'].map((method) => ({
          address: getPancakeProfileAddress(),
          name: method,
        }))
        const [[numberCakeToReactivate], [numberCakeToRegister], [numberCakeToUpdate]] = await multicallv2<
          [[BigNumber], [BigNumber], [BigNumber]]
        >(profileABI, calls)

        setCosts({
          numberCakeToReactivate,
          numberCakeToRegister,
          numberCakeToUpdate,
        })
        setIsLoading(false)
      } catch (error) {
        toastError(t('Error'), t('Could not retrieve EVT costs for profile'))
      }
    }

    fetchCosts()
  }, [setCosts, toastError, t])

  return { costs, isLoading }
}

export default useGetProfileCosts
