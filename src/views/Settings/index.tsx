import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CardBody, Button, Tab, TabMenu, useWalletModal, Flex, Text } from '@envoysvision/uikit'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useAuth from 'hooks/useAuth'
import { AppHeader, AppBody } from '../../components/App'
import Page from '../Page'
import {
  postUserWallet,
  getUser,
  getPersonVerificationLink,
  getCompanyVerificationLink,
  refreshVerification,
} from './api'

import { documentNormalize } from './heplers'
import { User } from './types'

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

export default function Settings() {
  const { account, library } = useActiveWeb3React()
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  const [activeTab, setActiveTab] = useState(0)
  const [userId, setUserId] = useState<string>('')
  const [user, setUser] = useState<User>()
  const [verificationLinks, setVerificationLinks] = useState({ personal: '', company: '' })
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false)

  const handleItemClick = (index: number) => setActiveTab(index)
  const tabs = ['My KYC', 'Business']

  const verificationStatusLookup = {
    unused: 'unused',
    completed: 'completed',
    pending: 'pending',
  }

  useEffect(() => {
    const handlePostUserWallet = async () => {
      const data = await postUserWallet(account)
      console.log({ data })
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

    setVerificationLinks({ ...verificationLinks, personal: personal.formUrl })

    window.location.href = personal.formUrl
  }

  const handleGetCompanyVerificationLink = async () => {
    const redirectUrl = window.location.href
    const company = await getCompanyVerificationLink(userId, redirectUrl)

    setVerificationLinks({ ...verificationLinks, company: company.formUrl })

    window.location.href = company.formUrl
  }

  const handleRefresh = async () => {
    const user = await refreshVerification(userId)

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
        {tabs.map((tabText) => {
          return <Tab key={tabText}>{tabText}</Tab>
        })}
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
    if (user?.personVerification?.status === verificationStatusLookup.unused) {
      return (
        <div>
          <Button onClick={handleRefresh}>Refresh</Button>
          <Button type="button" onClick={handleGetPersonVerificationLink}>
            Pass Personal KYC
          </Button>
        </div>
      )
    }

    return (
      <div>
        <Button onClick={handleRefresh}>Refresh</Button>
        <div>{verificationStatusLookup[user?.personVerification?.status]}</div>
        <ul>
          {documentNormalize(user?.personVerification?.verifications).map((item, index) => (
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
    if (user?.companyVerification?.status === verificationStatusLookup.unused) {
      return (
        <div>
          <Button onClick={handleRefresh}>Refresh</Button>
          <Button type="button" onClick={handleGetCompanyVerificationLink}>
            Pass Company KYC
          </Button>
        </div>
      )
    }

    return (
      <div>
        <Button onClick={handleRefresh}>Refresh</Button>
        <div>{verificationStatusLookup[user?.companyVerification?.status]}</div>
        <ul>
          {documentNormalize(user?.companyVerification?.verifications).map((item, index) => (
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
