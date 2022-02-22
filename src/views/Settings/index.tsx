import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Tab, TabMenu, useWalletModal, Flex, useMatchBreakpoints } from '@envoysvision/uikit'

import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useAuth from 'hooks/useAuth'

import { AppBody } from '../../components/App'
import Page from '../Page'
import { postUserWallet, getUser, getPersonVerificationLink, getCompanyVerificationLink } from './api'

import { documentNormalize, isVerificationPassed } from './heplers'
import { User, VerificationStatus } from './types'

const COLOR_ERROR = '#f15555'

const Body = styled(Flex)`
  flex-direction: column;
  padding: 30px;
  justify-content: space-between;
  width: 90vw;
  max-width: 670px;
`

const Space = styled.div`
  height: 20px;
`

const SpaceSmall = styled.div`
  height: 10px;
`

const TitleContainer = styled.div`
  padding-top: 30px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;

  display: flex;
  align-items: flex-end;

  color: ${({ theme }) => theme.colors.textSubtle};
`

const PersonalInfoContainer = styled.div<{ singleColumn: boolean }>`
  display: grid;

  ${({ singleColumn }) => (singleColumn ? 'grid-template-columns: 1fr;' : 'grid-template-columns: 1fr 1fr;')};

  grid-column-gap: 10px;
  grid-row-gap: 10px;

  padding-top: 20px;
  padding-bottom: 0px;
`

const TipContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;

  width: 100%;

  background: ${({ theme }) => theme.colors.tipBackground};
  border-radius: 16px;

  font-size: 12px;
  line-height: 14px;

  color: ${({ theme }) => theme.colors.primary};
`

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`

const VerificationErrorContainer = styled.ul`
  color: ${COLOR_ERROR};
  padding-top: 20px;
`

const IdentifierTextLabel = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;

  display: flex;

  color: ${({ theme }) => theme.colors.text};
`

const IdentifierLabel = styled.div`
  font-weight: 700;
  padding-left: 4px;
`

const IdentifierContainer = styled.div<{ showBorder?: boolean }>`
  background: ${({ theme }) => theme.colors.background};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 60px;

  ${({ showBorder, theme }) => (showBorder ? `border: 1px solid ${theme.colors.primary};` : '')}

  box-sizing: border-box;
  border-radius: 14px;
`

const Settings = () => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  const smallVersion = isMobile || isTablet
  const { account, library } = useActiveWeb3React()
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  const [activeTab, setActiveTab] = useState(0)
  const [userId, setUserId] = useState<string>('')
  const [user, setUser] = useState<User>()
  const [verificationLinks, setVerificationLinks] = useState({ personal: '', company: '' })
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleItemClick = (index: number) => setActiveTab(index)
  const tabs = [t('My KYC'), t('Business')]

  const shortUserId = userId?.slice(0, 7).toUpperCase()

  useEffect(() => {
    if (!userId) return

    const intervalId = setInterval(() => {
      handleRefresh()
    }, 5000)

    if (
      user?.company?.verification?.status === VerificationStatus.completed &&
      user?.person?.verification?.status === VerificationStatus.completed
    ) {
      clearInterval(intervalId)
      return
    }

    return () => clearInterval(intervalId)
  }, [userId, user])

  useEffect(() => {
    const handlePostUserWallet = async () => {
      const data = await postUserWallet(account)
      setUserId(data._id)
    }

    if (account) {
      handlePostUserWallet()
    }
  }, [account])

  useEffect(() => {
    setIsMetaMaskConnected(account && library?.connection?.url === 'metamask')
  }, [account, library])

  useEffect(() => {
    const handleGetUser = async () => {
      const user = await getUser(userId)
      setUser(user)
    }

    if (isMetaMaskConnected && userId) {
      handleGetUser()
    }
  }, [userId, isMetaMaskConnected])

  const handleGetPersonVerificationLink = async () => {
    const redirectUrl = window.location.href
    const personal = await getPersonVerificationLink(userId, redirectUrl)

    if (personal?.formUrl) {
      setVerificationLinks({ ...verificationLinks, personal: personal?.formUrl })

      window.location.href = personal?.formUrl
    }
  }

  const handleGetCompanyVerificationLink = async () => {
    const redirectUrl = window.location.href
    const company = await getCompanyVerificationLink(userId, redirectUrl)
    if (company?.formUrl) {
      setVerificationLinks({ ...verificationLinks, company: company?.formUrl })
      window.location.href = company?.formUrl
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    const user = await getUser(userId)
    setIsRefreshing(false)
    setUser(user)
  }

  const renderContent = () => {
    return (
      <>
        {renderTabs()}
        {isMetaMaskConnected ? renderTabContent() : renderNoMetamask()}
      </>
    )
  }

  const renderNoMetamask = () => {
    return (
      <>
        <Space />
        <Space />
        <TipContainer>{t('You need to connect your Wallet first')}</TipContainer>
        <Space />
        <Button onClick={onPresentConnectModal}>{t('Connect Wallet')}</Button>
      </>
    )
  }

  const renderTabs = () => {
    return (
      <TabMenu activeIndex={activeTab} onItemClick={handleItemClick}>
        {tabs.map((tabText) => (
          <Tab key={tabText}>{tabText}</Tab>
        ))}
      </TabMenu>
    )
  }

  const renderTabContent = () => {
    if (activeTab === 0) {
      return renderPersonal()
    }
    if (activeTab === 1) {
      return renderCompany()
    }
  }

  const renderKYCFlow = (application?: any, data?: any, children?: any, callback?: () => Promise<void>) => {
    const isInitialState = application?.status === undefined
    const isCompleted = application?.status === VerificationStatus.completed
    const isPending = !isInitialState && !isCompleted
    const isVerificationAccepted = isVerificationPassed(application?.verifications) && isCompleted
    return (
      <div>
        {!isInitialState && data && <>{children}</>}
        <TitleContainer>{t('Basic Information')}</TitleContainer>
        <PersonalInfoContainer singleColumn={smallVersion}>
          <IdentifierContainer showBorder={true}>
            <IdentifierTextLabel>
              {t('You ID Envoys Vision:')}
              <IdentifierLabel>{shortUserId}</IdentifierLabel>
            </IdentifierTextLabel>
          </IdentifierContainer>
          <IdentifierContainer>
            {isInitialState
              ? t('Not Verified')
              : isPending
              ? t('Pending Verification')
              : isVerificationAccepted
              ? t('Verification Complete')
              : t('Verification Failed')}
          </IdentifierContainer>
        </PersonalInfoContainer>

        {!isPending && !isInitialState && !isVerificationAccepted && (
          <VerificationErrorContainer>
            {documentNormalize(application?.verifications).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </VerificationErrorContainer>
        )}

        {isInitialState && (
          <>
            <Space />
            <TipContainer>{t('To be able to trade you must proceed with KYC.')}</TipContainer>
          </>
        )}

        {isPending && (
          <>
            <Space />
            <TipContainer>{t('KYC Verification process may take from 2 minutes and up to 6 hours.')}</TipContainer>
          </>
        )}

        <BottomContainer>
          <Button type="button" onClick={callback}>
            {isInitialState ? t('Start KYC Verification') : t('Restart KYC Verification')}
          </Button>
        </BottomContainer>
      </div>
    )
  }

  const renderPersonal = () => {
    let personalVerification = user?.person?.verification
    const personalData = user?.person?.applicant

    const children = (
      <>
        <TitleContainer>{t('Personal Information')}</TitleContainer>
        <PersonalInfoContainer singleColumn={smallVersion}>
          <IdentifierContainer>{personalData?.first_name}</IdentifierContainer>
          <IdentifierContainer>{personalData?.last_name}</IdentifierContainer>
          <IdentifierContainer>{personalData?.email}</IdentifierContainer>
          <IdentifierContainer>{personalData?.residence_country}</IdentifierContainer>
        </PersonalInfoContainer>
      </>
    )

    return <>{renderKYCFlow(personalVerification, personalData, children, handleGetPersonVerificationLink)}</>
  }

  const renderCompany = () => {
    let companyVerification = user?.company?.verification
    const companyData = user?.company?.data

    const children = (
      <>
        <TitleContainer>{t('Company Information')}</TitleContainer>
        <PersonalInfoContainer singleColumn={smallVersion}>
          <IdentifierContainer>{companyData?.companyName}</IdentifierContainer>
          <IdentifierContainer>{companyData?.registration_country}</IdentifierContainer>
        </PersonalInfoContainer>
      </>
    )

    return <>{renderKYCFlow(companyVerification, companyData, children, handleGetCompanyVerificationLink)}</>
  }

  return (
    <Page>
      <Space />
      <AppBody>
        <Body>{renderContent()}</Body>
      </AppBody>
    </Page>
  )
}

export default Settings
