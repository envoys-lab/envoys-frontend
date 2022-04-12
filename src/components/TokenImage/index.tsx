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

  return `/images/tokens/${address}.svg`
}

export const TokenPairImage: React.FC<TokenPairImageProps> = ({ primaryToken, secondaryToken, ...props }) => {
  const handleError = (event) => {
    if (event.target.src !== '/images/tokens/default.svg') {
      // eslint-disable-next-line no-param-reassign
      event.target.src = '/images/tokens/default.svg'
    }
  }
  /* @ts-ignore */
  return (
    <UIKitTokenPairImage
      primarySrc={getImageUrlFromToken(primaryToken)}
      secondarySrc={getImageUrlFromToken(secondaryToken)}
      /* @ts-ignore */
      primaryImageProps={{ onError: (event) => handleError(event) }}
      /* @ts-ignore */
      secondaryImageProps={{ onError: (event) => handleError(event) }}
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
