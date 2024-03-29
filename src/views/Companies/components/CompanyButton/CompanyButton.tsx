import React, { useEffect, useState } from 'react'
import { Button, Flex } from '@envoysvision/uikit'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import styles from './CompanyButton.module.scss'
import AccountIcon from 'views/Companies/assets/AccountIcon'
import LinkIcon from 'views/Companies/assets/LinkIcon'
import { useTranslation } from '../../../../contexts/Localization'
import useIsKYCVerified from '../../../../hooks/useIsKYCVerified'
import { useAirdropFactory, useSaleFactory } from 'hooks/useContract'

interface CompanyButtonProps {
  id: string
  holders: number
  homePageUrl: string
  className?: string
  token?: string
}

const CompanyButtonBlock = styled(Flex)`
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 30px;
  > div {
    width: 100%;
    max-width: 272px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    width: min(25vw, 220px);
    margin-top: 0;
    margin-left: 12px;
    align-items: flex-start;
    max-width: 220px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 25vw;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    min-width: 220px;
  }
`

const StyledButton = styled(Button)`
  margin-top: 15px;
  height: 45px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.darkClear};
  border: 1px solid rgba(19, 61, 101, 0.3) !important;
`
StyledButton.defaultProps = {
  variant: 'tertiary',
  size: 'sm',
}

const CompanyButton = ({ id, holders, token, homePageUrl, className }: CompanyButtonProps) => {
  const { t } = useTranslation()
  const saleFactory = useSaleFactory()
  const airdropFactory = useAirdropFactory()
  const [existSale, setExistSale] = React.useState(false) //saleFactory.sales(token);
  const [existAirdrop, setExistAirdrop] = React.useState(false) //airdropFactory.airdrop(token);

  React.useEffect(() => {
    const promises = [saleFactory.sales(token), airdropFactory.airdrops(token)]
    Promise.all(promises).then(([sale, airdrop]) => {
      if (parseInt(sale) !== 0) {
        setExistSale(true)
      }
      if (parseInt(airdrop) !== 0) {
        setExistAirdrop(true)
      }
    })
  }, [])
  const router = useRouter()
  const [isKYCVerified, setIsKYCVerified] = useState(false)
  const isAccountVerified = useIsKYCVerified()
  useEffect(() => {
    setIsKYCVerified(isAccountVerified)
  }, [isAccountVerified])

  const handleTrade = () => {
    if (!isKYCVerified) {
      // router.push(`/settings`)
      window.open(`/settings`, '_blank').focus()
      return
    }
    const defaultToken = 'BNB'
    // router.push(`/swap?inputCurrency=${defaultToken}&outputCurrency=${token}`)
    window.open(`/swap?inputCurrency=${defaultToken}&outputCurrency=${token}`, '_blank').focus()
  }

  const handleAirdrop = () => {
    router.push(`/companies/airdrop/${id}`)
  }

  const handleBuy = () => {
    router.push(`/companies/buy/${id}`)
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
    <CompanyButtonBlock className={`${styles['company-button']} ${className}`}>
      <Flex style={{ gridGap: '8px' }} flexDirection={'column'}>
        {!isKYCVerified && (
          <div style={{ margin: '0 12px' }}>{t('You have to complete KYC verification to trade')}</div>
        )}
        <div className={styles['company-button__button']} onClick={handleTrade}>
          {t(isKYCVerified ? 'TRADE' : 'Verify')}
        </div>
        {existSale && <StyledButton onClick={handleBuy}>{t('Buy')}</StyledButton>}
        {existAirdrop && <StyledButton onClick={handleAirdrop}>{t('Airdrop')}</StyledButton>}
      </Flex>

      <div className={styles['company-button__holders']}>
        {holders > 0 && (
          <div style={{ margin: '0 12px' }}>
            <AccountIcon className={styles['account-icon']} color="#F48020" />
            <span>Holders: {holders}</span>
          </div>
        )}
        <div className={styles['company-button__home-page-button']} onClick={handleCompanyUrlClick}>
          <div className={styles['company-button__home-page-button-text']}>{getClearDomian(homePageUrl)}</div>
          <div>
            <LinkIcon className={styles['link-icon']} color="#133D65" />
          </div>
        </div>
      </div>
    </CompanyButtonBlock>
  )
}

export default CompanyButton
