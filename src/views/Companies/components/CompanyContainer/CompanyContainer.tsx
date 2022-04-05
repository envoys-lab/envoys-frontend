import React from 'react'
import styles from './CompanyContainer.module.scss'

const CompanyContainer = ({ children }) => {
  return (
    <div className={styles['container']}>
        {children}
    </div>
  )
}

export default CompanyContainer
