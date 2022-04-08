import React from 'react'
import { CompanyFoundation } from '../../utils'
import styles from './Details.module.scss'

interface CompanyDetailsProps {
  company: CompanyFoundation
  className?: string
}

const CompanyDetailsInner = ({ company, className }: CompanyDetailsProps) => {
  return (
    <div className={`${styles['details']} ${className}`}>
      <div className={`${styles['details-header']}`}>Company Details</div>
      <div className={`${styles['details-data']}`}>
        Registered Company Name
        <div className={`${styles['details-data-inner']}`}>{company.registredName}</div>
      </div>
      <div className={`${styles['details-data']}`}>
        Registered Country
        <div className={`${styles['details-data-inner']}`}>{company.registredCountry}</div>
      </div>
      <div className={`${styles['details-data']}`}>
        Company Founded
        <div className={`${styles['details-data-inner']}`}>{company.foundedDate}</div>
      </div>
    </div>
  )
}

export default CompanyDetailsInner
