import React from 'react'
import styled, { css } from 'styled-components'
import { AddCircleOutlineIcon, Button, Flex, useWalletModal, ButtonProps } from '@envoysvision/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import connectingAnimation from './Menu/UserMenu/connect-btn-connecting.json'
import disconnectingAnimation from './Menu/UserMenu/connect-btn-disconnecting.json'
import Lottie from 'react-lottie'

const MenuButton = styled(Button)<{ isDisconnecting: boolean; isConnecting: boolean; withAccount: boolean }>`
  color: ${({ theme }) => theme.colors.mainDark};
  background-color: transparent;
  box-shadow: none;
  line-height: 18px;
  position: absolute;
  z-index: 1;
  padding-left: 19px;
  padding-right: 11px;
  transition: box-shadow ${({ theme }) => theme.animations.duration} ease-in-out;

  > span {
    transition: opacity ${({ theme }) => theme.animations.durationConnect} ease-in-out;
    opacity: 1;
  }
  > div {
    width: 30px;
    transition: width ${({ theme }) => theme.animations.durationConnect} ease-in-out;
    position: relative;
    > div,
    > svg {
      transition-property: transform, opacity, color;
      transition-duration: ${({ theme }) => theme.animations.duration};
      transition-timing-function: ease-in-out;
    }
    > div {
      opacity: 1;
    }
    > svg {
      position: absolute;
      opacity: 0;
      right: 1.75px;
    }
  }

  ${({ withAccount, isDisconnecting }) =>
    withAccount &&
    !isDisconnecting &&
    css`
      z-index: 0;
      > span {
        opacity: 0;
      }
      > div {
        width: 100%;
      }
    `}

  ${({ withAccount, isDisconnecting }) =>
    withAccount &&
    !isDisconnecting &&
    css`
      z-index: 0;
      > span {
        opacity: 0;
      }
      > div {
        width: 100%;
      }
    `}
  
  // normal state of not logged user between transactions
  ${({ theme, withAccount }) =>
    !withAccount &&
    css`
      > span {
        opacity: 1;
      }
      &:hover {
        opacity: 1 !important;
        box-shadow: ${theme.shadows.connectBtn};
        > div {
          > div {
            opacity: 0;
          }
          > svg {
            opacity: 1;
            transform: translateX(-1px);
            color: ${theme.colors.basicOrange};
          }
        }
      }
    `}
  
  // slowly hide text while connecting animation
  ${({ isConnecting, withAccount }) =>
    isConnecting &&
    !withAccount &&
    css`
      z-index: 0;
      > span {
        opacity: 0;
        z-index: 0;
      }
      > div {
        width: 100%;
      }
    `}

  // hide for logged
  ${({ withAccount, isDisconnecting }) =>
    withAccount &&
    !isDisconnecting &&
    css`
      z-index: 0;
      > span {
        z-index: 0;
      }
    `}

  // slowly show text while disconnecting animation
  ${({ isDisconnecting, withAccount }) =>
    isDisconnecting &&
    withAccount &&
    css`
      > span {
        opacity: 1;
      }
      > div {
        width: 30px;
      }
    `}
`

interface ConnectWalletButtonProps extends ButtonProps {
  menuBtn?: boolean
  isConnecting?: boolean
  isDisconnecting?: boolean
  withAccount?: boolean
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  isConnecting,
  isDisconnecting,
  menuBtn,
  withAccount,
  ...props
}) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  const lottieProps = {
    height: 25,
    width: 25,
    options: {
      loop: false,
      animationData: {},
      autoplay: false,
    },
  }
  if (withAccount || isConnecting) {
    lottieProps.options.animationData = connectingAnimation
  } else {
    lottieProps.options.animationData = disconnectingAnimation
  }
  if (isDisconnecting || isConnecting) {
    lottieProps.options.autoplay = true
  }
  if (menuBtn) {
    return (
      <MenuButton
        onClick={onPresentConnectModal}
        variant="secondary"
        isConnecting={isConnecting}
        isDisconnecting={isDisconnecting}
        withAccount={withAccount}
        {...props}
      >
        <span style={{ flexShrink: 0 }}>{t('Connect Wallet')}</span>
        <Flex alignItems="center" justifyContent="flex-end" justifyItems={'flex-end'}>
          <Lottie {...lottieProps} style={{ margin: 0 }} />
          {!withAccount && <AddCircleOutlineIcon height={19} width={19} />}
        </Flex>
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
