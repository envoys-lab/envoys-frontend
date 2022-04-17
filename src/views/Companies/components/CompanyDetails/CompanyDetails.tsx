import React from 'react'
import { AdditionalDetails, BonusStructureDetails, CompanyDetailsInner, TokenDetails } from '../'
import styles from './CompanyDetails.module.scss'
import { BaseCompanyDetails } from '../../utils'

type CompanyDetailsProps = {
  details: BaseCompanyDetails
  className?: string
}

const CompanyDetails = ({ details, className }: CompanyDetailsProps) => {
  return (
    <div className={`${styles['company-details']} ${className}`}>
      <div className={`${styles['company-details-left']}`}>
        {details.token && <TokenDetails token={details.token} />}
        {details.company && <CompanyDetailsInner company={details.company} />}
      </div>
      <div className={`${styles['company-details-right']}`}>
        {details?.bonus && <BonusStructureDetails bonus={details.bonus} />}
        {details.additional && <AdditionalDetails additionalDetails={details.additional} />}
      </div>
    </div>
  )
}

export default CompanyDetails
