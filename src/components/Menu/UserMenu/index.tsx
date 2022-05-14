import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { animationDuration, animationDurationConnect, LogoutIcon, UserMenuItem } from '@envoysvision/uikit'
import useAuth from 'hooks/useAuth'

import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from 'contexts/Localization'
import Timeout = NodeJS.Timeout
import { AccountWrapper, UserMenuContentWrapper, UserMenuWrapper } from './styles'

/*
import { useGetBnbBalance } from 'hooks/useTokenBalance'
import { useRouter } from 'next/router'
import { useProfile } from 'state/profile/hooks'
import { FetchStatus } from 'config/constants/types'
import WalletModal, { WalletView, LOW_BNB_BALANCE } from './WalletModal'
import styled from 'styled-components'
*/

const UserMenu = () => {
  const { t } = useTranslation()
  const { account: web3Account } = useWeb3React()
  const { logout } = useAuth()

  /*
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  const router = useRouter()
  const { balance, fetchStatus } = useGetBnbBalance()
  const { isInitialized, isLoading, profile } = useProfile()
  const [onPresentWalletModal] = useModal(<WalletModal initialView={WalletView.WALLET_INFO} />)
  const [onPresentTransactionModal] = useModal(<WalletModal initialView={WalletView.TRANSACTIONS} />)
  const hasProfile = isInitialized && !!profile
  const hasLowBnbBalance = fetchStatus === FetchStatus.Fetched && balance.lte(LOW_BNB_BALANCE)
  */

  const [account, setAccount] = useState<string>()
  const [transitionTimeout, setTransitionTimeout] = useState<Timeout>()
  const [connectingAccount, setConnectingAccount] = useState<boolean>(false)
  const [disconnectingAccount, setDisconnectingAccount] = useState<boolean>(false)

  const disconnect = () => {
    setDisconnectingAccount(true)
    if (!connectingAccount) {
      setTimeout(() => {
        logout()
        setAccount(undefined)
      }, animationDuration)
    }
  }

  useEffect(() => {
    if (!account && web3Account) {
      setConnectingAccount(true)
      setDisconnectingAccount(false)
    } else if (account && !web3Account) {
      setConnectingAccount(false)
      setDisconnectingAccount(true)
    }
    if (transitionTimeout) {
      clearTimeout(transitionTimeout)
    }
    const newTransitionTimeout = setTimeout(() => {
      if (web3Account) {
        setAccount(web3Account)
      }
    }, animationDurationConnect)
    setTransitionTimeout(newTransitionTimeout)
  }, [web3Account])

  useEffect(() => {
    setConnectingAccount(false)
    setDisconnectingAccount(false)
  }, [account])

  const connectionProps = {
    isConnecting: connectingAccount,
    isDisconnecting: disconnectingAccount,
  }

  return (
    <UserMenuWrapper>
      <ConnectWalletButton width="100%" withAccount={!!account} scale="md" menuBtn {...connectionProps} />
      <UserMenuContentWrapper withAccount={!!account}>
        <AccountWrapper account={account} {...connectionProps}>
          <UserMenuItem onClick={() => disconnect()} style={{ position: 'relative' }}>
            <span>{t('Disconnect')}</span>
            <LogoutIcon />
          </UserMenuItem>
        </AccountWrapper>
      </UserMenuContentWrapper>
    </UserMenuWrapper>
  )
}

export default UserMenu
