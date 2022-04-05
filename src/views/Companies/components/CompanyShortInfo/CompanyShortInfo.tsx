import React from 'react'
import styles from './CompanyShortInfo.module.scss'

interface CompanyShortInfo {
  name: string
  description: string
  logoUrl: string
  className?: string
}

const CompanyShortInfo = ({ name, description, logoUrl, className }: CompanyShortInfo) => {
  return (
    <div className={`${styles['company-short']} ${className}`}>
      <div className={styles['company-short__logo']}>
        <img src={logoUrl}></img>
      </div>
      <div className={styles['company-short-main']}>
        <div className={styles['company-short-main__name']}>{name}</div>
        <div className={styles['company-short-main__description']}>{description}</div>
      </div>
    </div>
  )
}

export default CompanyShortInfo
