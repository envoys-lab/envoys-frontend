import React from 'react'
import {
  TokenPairImage as UIKitTokenPairImage,
  TokenPairImageProps as UIKitTokenPairImageProps,
  TokenImage as UIKitTokenImage,
  ImageProps,
} from '@envoysvision/uikit'
import tokens from 'config/constants/tokens'
import { Token } from '@envoysvision/sdk'

interface TokenPairImageProps extends Omit<UIKitTokenPairImageProps, 'primarySrc' | 'secondarySrc'> {
  primaryToken: Token
  secondaryToken: Token
}

const getImageUrlFromToken = (token: Token) => {
  let address = token.symbol === 'BNB' ? tokens.wbnb.address : token.address
  const tokensWithoutImage = [
    '0x8c851d1a123ff703bd1f9dabe631b69902df5f97',
    '0x5b6bf0c7f989de824677cfbd507d9635965e9cd3',
    '0x7470ff44a57fce4b7413f31fdc9b625ff58dbb9c',
    '0xf700d4c708c2be1463e355f337603183d20e0808',
    '0x12bb890508c125661e03b09ec06e404bc9289040'
  ]
  if (tokensWithoutImage.includes(address)) {
    address = 'default'
  }
  return `/images/tokens/${address}.svg`
}

export const TokenPairImage: React.FC<TokenPairImageProps> = ({ primaryToken, secondaryToken, ...props }) => {
  return (
    <UIKitTokenPairImage
      primarySrc={getImageUrlFromToken(primaryToken)}
      secondarySrc={getImageUrlFromToken(secondaryToken)}
      {...props}
    />
  )
}

interface TokenImageProps extends ImageProps {
  token: Token
}

export const TokenImage: React.FC<TokenImageProps> = ({ token, ...props }) => {
  return <UIKitTokenImage src={getImageUrlFromToken(token)} {...props} />
}
