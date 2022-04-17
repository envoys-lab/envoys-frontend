import { useAppDispatch } from 'state'

import { fetchCompanyTokensAction } from './actions'
import { getCompanyTokensLoaded, getCompanyTokensLoading} from './selectors'
import {useEffect} from "react";

export const useFetchCompanyTokens = () => {
  const dispatch = useAppDispatch()

  const isLoaded = getCompanyTokensLoaded();
  const isLoading = getCompanyTokensLoading();

  useEffect(() => {
    if (!isLoaded && !isLoading) {
      dispatch(fetchCompanyTokensAction)
    }
  }, [isLoaded, dispatch])

}
