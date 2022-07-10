import React from 'react'
import { Link } from '@envoysvision/uikit'
import TextWithHeader from '../../components/TextWithHeader'
import { BaseCompany } from '../../../../utils'

const CompanySaleDetails: React.FC<{ company: BaseCompany }> = ({ company }) => {
  const { sale } = company
  if (!sale) {
    return null
  }
  return (
    <>
      <TextWithHeader title="Private Sale Address">
        <Link href="#" fontWeight={400} style={{ display: 'inline' }}>
          {sale.saleAddress}
        </Link>
      </TextWithHeader>

      <TextWithHeader title="Soft Cap">
        {sale.softCap} {company.details.token.ticker}
      </TextWithHeader>
      <TextWithHeader title="Hard Cap">
        {sale.hardCap} {company.details.token.ticker}
      </TextWithHeader>
      <TextWithHeader title="Private Sale Start Time">{sale.startTime}</TextWithHeader>
      <TextWithHeader title="Private Sale End Time">{sale.endTime}</TextWithHeader>
    </>
  )
}

export default CompanySaleDetails
