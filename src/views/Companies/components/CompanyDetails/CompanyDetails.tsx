import React from 'react'
import { AdditionalDetails, BonusStructureDetails, CompanyDetailsInner, TokenDetails } from '../'
import styles from './CompanyDetails.module.scss'
import {BaseCompany} from "../../utils";

type CompanyDetailsProps = {
  company: BaseCompany
  className?: string
}

const CompanyDetails = ({ company, className }: CompanyDetailsProps) => {
  return (
    <div className={`${styles['company-details']} ${className}`}>
      <div className={`${styles['company-details-left']}`}>
        {company.details.token && <TokenDetails token={company.details.token} />}
        {company.details.company && <CompanyDetailsInner company={company.details.company} />}
      </div>
      <div className={`${styles['company-details-right']}`}>
        {company.details?.bonus && <BonusStructureDetails bonus={company.details.bonus} />}
        {company.details.additional && <AdditionalDetails additionalDetails={company.details.additional} />}
      </div>
    </div>
  )
}

export default CompanyDetails
