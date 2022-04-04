import React from 'react'
import styles from './CompanyShortInfo.module.scss'

interface CompanyShortInfo {
  name: string,
  description: string,
  logoUrl: string,
  className?: string
}

const CompanyShortInfo = ({name, description, logoUrl, className} : CompanyShortInfo) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.logo}>
        <img src={logoUrl}></img>
      </div>
      <div className={styles.mainInfo}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  )
}

export default CompanyShortInfo
