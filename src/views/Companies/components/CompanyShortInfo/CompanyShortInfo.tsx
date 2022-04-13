import React from 'react'
import styles from './CompanyShortInfo.module.scss'
import classNames from 'classnames'

interface CompanyShortInfoProps {
  name: string
  description: string
  logoUrl: string
  className?: string
}

const CompanyShortInfo = ({ name, description, logoUrl, className }: CompanyShortInfoProps) => {
  return (
    <div className={`${styles['company-short']} ${className}`}>
      <div style={{ margin: '15px' }} className={classNames([styles['company-short__logo'], styles['showAfterXxl']])}>
        <img src={logoUrl}></img>
      </div>
      <div className={styles['company-short-main']}>
        <div className={classNames([styles['company-short__logo'], styles['showBeforeXxl']])}>
          <img src={logoUrl}></img>
        </div>
        <div className={styles['company-short-main__name']}>{name}</div>
        <div className={styles['company-short-main__description']}>{description}</div>
      </div>
    </div>
  )
}

export default CompanyShortInfo
