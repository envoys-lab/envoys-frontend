import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CardBody, Button, Tab, TabMenu, useWalletModal, Flex, Text } from '@envoysvision/uikit'

import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useAuth from 'hooks/useAuth'

import { AppBody } from '../../components/App'
import Page from '../Page'
import { postUserWallet, getUser, getPersonVerificationLink, getCompanyVerificationLink } from './api'

import { documentNormalize } from './heplers'
import { User, VerificationStatus } from './types'

const Body = styled(Flex)`
  flex-direction: column;
  padding: 20px;
  justify-content: space-between;
  width: 670px;
`

const TextCard = styled(CardBody)`
  background-color: ${({ theme }) => theme.colors.backgroundText};
  border-radius: 16px;
`

const Space = styled.div`
  height: 20px;
`

const Settings = () => {
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
  const tabs = ['My KYC', 'Business']

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
        <TextCard>
          <Text fontSize="12px" color="primary">
            You need to connect your metamask wallet
          </Text>
        </TextCard>
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

  const renderPersonal = () => {
    const personalVerification = user?.person?.verification
    const personalData = user?.person?.data

    return (
      <div>
        <div>{VerificationStatus[personalVerification?.status]}</div>
        <div>You ID Envoys Vision: {userId}</div>
        {personalData && (
          <>
            <div>Name: {personalData?.first_name}</div>
            <div>Last name: {personalData?.last_name}</div>
            <div>Middle name: {personalData?.middle_name}</div>
            <div>Residence country: {personalData?.residence_country}</div>

            <img src={personalData?.documents.front_side} />
            <img src={personalData?.documents.back_side} />
          </>
        )}
        <ul>
          {documentNormalize(personalVerification?.verifications).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <Button type="button" onClick={handleGetPersonVerificationLink}>
          Pass Personal KYC
        </Button>
      </div>
    )
  }

  const renderCompany = () => {
    const companyVerification = user?.company?.verification
    const companyData = user?.company?.data

    return (
      <div>
        <div>{VerificationStatus[companyVerification?.status]}</div>
        {userId && <div>You ID Envoys Vision: {userId}</div>}
        {companyData && (
          <>
            <div>registration_country: {companyData?.registration_country}</div>
            <div>
              business_activity: {companyData?.business_activity[1]?.label}{' '}
              {companyData?.business_activity[1]?.language_code}
            </div>
            <div>
              business_activity: {companyData?.business_activity[0]?.label}{' '}
              {companyData?.business_activity[0]?.language_code}
            </div>
            <div>companyName: {companyData?.companyName}</div>
            <img src={companyData?.documents.front_side} />
            <img src={companyData?.documents.back_side} />
          </>
        )}
        <ul>
          {documentNormalize(companyVerification?.verifications).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <Button type="button" onClick={handleGetCompanyVerificationLink}>
          Pass Company KYC
        </Button>
      </div>
    )
  }

  return (
    <Page>
      <AppBody>
        <Body>{renderContent()}</Body>
      </AppBody>
    </Page>
  )
}

export default Settings
