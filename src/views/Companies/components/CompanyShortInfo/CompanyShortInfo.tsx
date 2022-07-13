import React from 'react'
import {
  BigScreenLogo,
  CompanyDescription,
  CompanyMainInfo,
  CompanyName,
  CompanyShortInfoBlock,
  SmallScreenLogo,
} from './styles'

interface CompanyShortInfoProps {
  name: string
  description: string
  logoUrl: string
  switchMargin?: boolean
  className?: string
}

const CompanyShortInfo = ({ name, description, logoUrl, switchMargin, className }: CompanyShortInfoProps) => {
  const realLogoUrl = !logoUrl || logoUrl !== 'https://cloud.example/logo' ? logoUrl : '/images/company.png'
  const logo = <img src={realLogoUrl} alt={name} />
  return (
    <CompanyShortInfoBlock className={className}>
      <BigScreenLogo>{logo}</BigScreenLogo>
      <CompanyMainInfo leftMargin={switchMargin}>
        <SmallScreenLogo>{logo}</SmallScreenLogo>
        <CompanyName>{name}</CompanyName>
        <CompanyDescription>{description}</CompanyDescription>
      </CompanyMainInfo>
    </CompanyShortInfoBlock>
  )
}

export default CompanyShortInfo
