import React from 'react'
import styles from './CompanyButton.module.scss'
import { useRouter } from 'next/router'
import AccountIcon from 'views/Companies/assets/AccountIcon'
import LinkIcon from 'views/Companies/assets/LinkIcon'

interface CompanyButtonProps {
  holders: number
  homePageUrl: string
  className?: string
  token?: string
}

const CompanyButton = ({ holders, token, homePageUrl, className }: CompanyButtonProps) => {
  const router = useRouter()

  const handleTrade = () => {
    const defaultToken = 'BNB'
    const companyToken = token

    router.push(`/swap?inputCurrency=${defaultToken}&outputCurrency=${companyToken}`)
  }

  const handleCompanyUrlClick = () => {
    window.location.href = homePageUrl
  }

  const getClearDomian = (url) => {
    const innerUrl = new URL(url)
    let domain = innerUrl.hostname

    return domain.replace('www.', '')
  }

  return (
    <div className={`${styles['сompany-button']} ${className}`}>
      <div className={styles['сompany-button__button']} onClick={handleTrade}>
        TRADE
      </div>
      <div className={styles['сompany-button__holders']}>
        <AccountIcon className={styles['account-icon']} color="#F48020" />
        <span>Holders: {holders}</span>
        <div className={styles['сompany-button__home-page-button']} onClick={handleCompanyUrlClick}>
          <div className={styles['сompany-button__home-page-button-text']}>{getClearDomian(homePageUrl)}</div>
          <div>
            <LinkIcon className={styles['link-icon']} color="#133D65" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyButton
