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
    '0x12bb890508c125661e03b09ec06e404bc9289040',
    '0x8729438EB15e2C8B576fCc6AeCdA6A148776C0F5',
    '0xACB8f52DC63BB752a51186D1c55868ADbFfEe9C1',
    '0x758d08864fB6cCE3062667225ca10b8F00496cc2',
    '0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6',
    '0x5857c96DaE9cF8511B08Cb07f85753C472D36Ea3',
    '0xc3028fbc1742a16a5d69de1b334cbce28f5d7eb3',
    '0xe283d0e3b8c102badf5e8166b73e02d96d92f688',
    '0x26193c7fa4354ae49ec53ea2cebc513dc39a10aa',
    '0x06fda0758c17416726f77cb11305eac94c074ec0',
    '0x965f527d9159dce6288a2219db51fc6eef120dd1',
    '0xb6b91269413b6b99242b1c0bc611031529999999',
    '0x728fc32c0d2f61ffe21b6a4a7df987deae0e0888',
    '0x6b670d593d10207cb59b1a88ae4b8b8ba18e52b4',
    '0xba96731324de188ebc1ed87ca74544ddebc07d7f',
    '0x4803ac6b79f9582f69c4fa23c72cb76dd1e46d8d',
    '0x009cF7bC57584b7998236eff51b98A168DceA9B0',
    '0x6067490d05f3cf2fdffc0e353b1f5fd6e5ccdf70',
    '0x81cad0ab645a1792f585ce93c5f955ff3ecc3951',
    '0x200c234721b5e549c3693ccc93cf191f90dc2af9',
    '0x26619fa1d4c957c58096bbbeca6588dcfb12e109',
    '0x4eaf5492838f34aaf6a5e1c603872da94baedc7d',
    '0x4f5f7a7dca8ba0a7983381d23dfc5eaf4be9c79a',
    '',
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
