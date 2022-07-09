import React from 'react'
import { Link } from '@envoysvision/uikit'
import TextWithHeader from '../../components/TextWithHeader'
import { BaseCompany } from '../../../../utils'

const AirdropTokenDetails: React.FC<{ company: BaseCompany }> = ({ company }) => {
  const { airdrop } = company
  if (!airdrop) {
    return null
  }
  return (
    <>
      <TextWithHeader title="Token address">
        <Link href="#" fontWeight={400}>
          {company.token}
        </Link>
      </TextWithHeader>

      <TextWithHeader title="Airdrop address">
        <Link href="#" fontWeight={400}>
          {airdrop.airdropAddress}
        </Link>
      </TextWithHeader>

      <TextWithHeader title="Name">{company.details.token.ticker}</TextWithHeader>
      <TextWithHeader title="Symbol">{company.details.token.ticker}</TextWithHeader>
      <TextWithHeader title="Total tokens">
        {airdrop.totalTokens} {company.details.token.ticker}
      </TextWithHeader>
    </>
  )
}

export default AirdropTokenDetails
