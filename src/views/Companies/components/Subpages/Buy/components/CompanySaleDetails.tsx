import React from 'react'
import { Link } from '@envoysvision/uikit'
import TextWithHeader from '../../components/TextWithHeader'
import { BaseCompany } from '../../../../utils'

/**
 * @param dateString string
 * @return date string in format 2022.06.25 06:00 (UTC)
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const year = date.getUTCFullYear()
  let month = (date.getUTCMonth() + 1).toString()
  if (month.length === 1) {
    month = `0${month}`
  }
  let day = date.getUTCDate().toString()
  if (day.length === 1) {
    day = `0${day}`
  }
  let hours = date.getUTCHours().toString()
  if (hours.length === 1) {
    hours = `0${hours}`
  }
  let minutes = date.getUTCMinutes().toString()
  if (minutes.length === 1) {
    minutes = `0${minutes}`
  }
  return `${year}.${month}.${day} ${hours}:${minutes} (UTC)`
}

const CompanySaleDetails: React.FC<{ company: BaseCompany }> = ({ company }) => {
  const { sale } = company
  if (!sale) {
    return null
  }

  const startTime = formatDate(sale.startTime)
  const endTime = formatDate(sale.endTime)

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
      <TextWithHeader title="Private Sale Start Time">{startTime}</TextWithHeader>
      <TextWithHeader title="Private Sale End Time">{endTime}</TextWithHeader>
    </>
  )
}

export default CompanySaleDetails
