import React from 'react'
import { useWeb3React } from '@web3-react/core'
import {
  Flex,
  LogoutIcon,
  useModal,
  UserMenu as UIKitUserMenu,
  UserMenuDivider,
  UserMenuItem,
} from '@envoysvision/uikit'
import useAuth from 'hooks/useAuth'
import { useRouter } from 'next/router'
import { useProfile } from 'state/profile/hooks'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useGetBnbBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { FetchStatus } from 'config/constants/types'
import WalletModal, { WalletView, LOW_BNB_BALANCE } from './WalletModal'
import styled from 'styled-components'
import { MenuOptions } from 'icons'

const ButtonsContainer = styled.div``

const UserMenu = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { logout } = useAuth()
  const { balance, fetchStatus } = useGetBnbBalance()
  const { isInitialized, isLoading, profile } = useProfile()
  const [onPresentWalletModal] = useModal(<WalletModal initialView={WalletView.WALLET_INFO} />)
  const [onPresentTransactionModal] = useModal(<WalletModal initialView={WalletView.TRANSACTIONS} />)
  const hasProfile = isInitialized && !!profile
  const hasLowBnbBalance = fetchStatus === FetchStatus.Fetched && balance.lte(LOW_BNB_BALANCE)

  if (!account) {
    return (
      <ButtonsContainer>
        <ConnectWalletButton width="100%" scale="md" />
      </ButtonsContainer>
    )
  }

  return (
    <UIKitUserMenu account={account} leftIcon={MenuOptions}>
      {/*<UserMenuDivider />*/}
      <UserMenuItem as="button" onClick={logout}>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          {t('Disconnect')}
          <LogoutIcon />
        </Flex>
      </UserMenuItem>
    </UIKitUserMenu>
  )
}

export default UserMenu
