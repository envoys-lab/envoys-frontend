import React from 'react'
import styled from 'styled-components'
import { AddCircleOutlineIcon, Button, useWalletModal } from '@envoysvision/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const MenuButton = styled(Button)`
  color: ${({ theme }) => theme.colors.mainDark};
  background-color: ${({ theme }) => theme.colors.background};
  &:hover {
    opacity: 1 !important;
    > svg {
      color: ${({ theme }) => theme.colors.basicOrange};
    }
  }
`

const ConnectWalletButton = ({ menuBtn = false, ...props }) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  if (menuBtn) {
    return (
      <MenuButton onClick={onPresentConnectModal} variant="secondary" {...props} endIcon={<AddCircleOutlineIcon />}>
        {t('Connect Wallet')}
      </MenuButton>
    )
  }
  return (
    <Button onClick={onPresentConnectModal} {...props}>
      {t('Connect Wallet')}
    </Button>
  )
}

export default ConnectWalletButton
