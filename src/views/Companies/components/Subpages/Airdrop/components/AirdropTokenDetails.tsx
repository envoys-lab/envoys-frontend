import React from 'react'
import { Link } from '@envoysvision/uikit'
import TextWithHeader from '../../components/TextWithHeader'
import { Token } from '@envoysvision/sdk'
import { EnvoysAirdrop } from 'config/abi/types'
import useTotalSupply from 'hooks/useTotalSupply'

const AirdropTokenDetails: React.FC<{
  token: Token
  airdrop: EnvoysAirdrop
}> = ({ token, airdrop }) => {
  const totalSupply = useTotalSupply(token)

  return (
    <>
      <TextWithHeader title="Token address:">
        <Link
          href={`https://bscscan.com/token/${token.address}`}
          external={true}
          fontWeight={400}
          ellipsis={true}
          style={{ display: 'inline' }}
        >
          {token.address}
        </Link>
      </TextWithHeader>

      <TextWithHeader title="Airdrop address:">
        <Link
          href={`https://bscscan.com/address/${airdrop.address}`}
          external={true}
          fontWeight={400}
          ellipsis={true}
          style={{ display: 'inline' }}
        >
          {airdrop.address}
        </Link>
      </TextWithHeader>

      <TextWithHeader title="Name:">{token.name}</TextWithHeader>
      <TextWithHeader title="Symbol:">{token.symbol}</TextWithHeader>
      <TextWithHeader title="Total tokens:">
        {totalSupply && totalSupply.toFixed(2)} {token.symbol}
      </TextWithHeader>
    </>
  )
}

export default AirdropTokenDetails
