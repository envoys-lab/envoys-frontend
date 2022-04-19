import React from 'react'
import { Flex } from '@envoysvision/uikit'
import { useRouter } from 'next/router'
import styles from './CompanyButton.module.scss'
import AccountIcon from 'views/Companies/assets/AccountIcon'
import LinkIcon from 'views/Companies/assets/LinkIcon'
import { useTranslation } from '../../../../contexts/Localization'
import useIsKYCVerified from '../../../../hooks/useIsKYCVerified'

interface CompanyButtonProps {
  holders: number
  homePageUrl: string
  className?: string
  token?: string
}

const CompanyButton = ({ holders, token, homePageUrl, className }: CompanyButtonProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const isKYCVerified = useIsKYCVerified()

  const handleTrade = () => {
    if (!isKYCVerified) {
      router.push(`/settings`)
      return
    }
    const defaultToken = 'BNB'
    router.push(`/swap?inputCurrency=${defaultToken}&outputCurrency=${token}`)
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
    <div className={`${styles['company-button']} ${className}`}>
      <Flex style={{ gridGap: '8px' }} flexDirection={'column'}>
        {!isKYCVerified && <div>{t('You have to complete KYC verification to trade')}</div>}
        <div className={styles['company-button__button']} onClick={handleTrade}>
          {t(isKYCVerified ? 'TRADE' : 'Verify')}
        </div>
      </Flex>
      <div className={styles['company-button__holders']}>
        <AccountIcon className={styles['account-icon']} color="#F48020" />
        <span>Holders: {holders}</span>
        <div className={styles['company-button__home-page-button']} onClick={handleCompanyUrlClick}>
          <div className={styles['company-button__home-page-button-text']}>{getClearDomian(homePageUrl)}</div>
          <div>
            <LinkIcon className={styles['link-icon']} color="#133D65" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyButton
