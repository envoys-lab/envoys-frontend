import React from 'react'
import styles from './CompanyButton.module.scss'
import { useRouter } from 'next/router'
import Account from 'icons/Account'
import Link from 'icons/Link'

interface CompanyButton {
  holders: string
  homePageUrl: string
  className?: string
}

const CompanyButton = ({ holders, homePageUrl, className }: CompanyButton) => {
  const router = useRouter()

  const onTrade = () => {
    const defaultToken = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82' // TODO: not a real token, needs to be replaced
    const companyToken = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c' // TODO: not a real token, needs to be replaced

    router.push(`/swap?inputCurrency=${defaultToken}&outputCurrency=${companyToken}`)
  }

  const onCompanyUrlClick = () => {
    window.location.href = homePageUrl
  }

  const getClearDomian = (url) => {
    const innerUrl = new URL(url)
    let domain = innerUrl.hostname

    return domain.replace('www.', '')
  }

  return (
    <div className={`${styles['сompany-button']} ${className}`}>
      <div className={styles['сompany-button__button']} onClick={onTrade}>
        TRADE
      </div>
      <div className={styles['сompany-button__holders']}>
        <Account className={styles['account-icon']} color="#F48020" />
        <span>Holders: {holders}</span>
        <div className={styles['сompany-button__home-page-button']} onClick={onCompanyUrlClick}>
          {getClearDomian(homePageUrl)}
          <Link className={styles['link-icon']} color="#133D65" />
        </div>
      </div>
    </div>
  )
}

export default CompanyButton
