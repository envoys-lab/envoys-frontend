import React from 'react'
import { Link } from '@envoysvision/uikit'
import TextWithHeader from '../../components/TextWithHeader'
import { BaseCompany } from '../../../../utils'

const AirdropTokenDetails: React.FC<{ company: BaseCompany }> = ({ company }) => {
  const { airdrop } = company
  if (!airdrop) {
    return null
  }
  const unit = company.details.token.ticker

  return (
    <>
      <TextWithHeader title="Token address">
        <Link href="#" fontWeight={400} ellipsis={true} style={{ display: 'inline' }}>
          {company.token}
        </Link>
      </TextWithHeader>

      <TextWithHeader title="Airdrop address">
        <Link href="#" fontWeight={400} ellipsis={true} style={{ display: 'inline' }}>
          {airdrop.airdropAddress}
        </Link>
      </TextWithHeader>

      <TextWithHeader title="Name">{company.details.token.tickerName || unit}</TextWithHeader>
      <TextWithHeader title="Symbol">{unit}</TextWithHeader>
      <TextWithHeader title="Total tokens">
        {airdrop.totalTokens} {unit}
      </TextWithHeader>
    </>
  )
}

export default AirdropTokenDetails
