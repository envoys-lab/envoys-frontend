import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CardBody, Button, Tab, TabMenu, useWalletModal } from '@envoysvision/uikit'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useAuth from 'hooks/useAuth'
import { AppHeader, AppBody } from '../../components/App'
import Page from '../Page'
import { postUserWallet, getUser, getPersonVerificationLink, getCompanyVerificationLink } from './api'

const Body = styled(CardBody)`
  background-color: ${({ theme }) => theme.colors.dropdownDeep};
`

interface User {
  userType: string
  userWalletAddress: string
  verification: { status: string; verified: boolean }
  verificationId: string
  _id: string
}
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
  const tabs = ['Personal', 'Company']

  const reviewStatus = 1

  const verificationStatusLookup = {
    unused: 'unused',
    2: 'Accepted',
    3: 'Denied',
  }

  useEffect(() => {
    const handlePostUserWallet = async () => {
      const data = await postUserWallet(account)
      console.log({ data })
      setUserId(data._id)
    }

    setIsMetaMaskConnected(account && library?.connection?.url === 'metamask')

    if (account) {
      handlePostUserWallet()
    }
  }, [account, library])

  useEffect(() => {
    const handleGetUser = async () => {
      const user = await getUser(userId)

      setUser(user)
    }
    const getVerificationLinks = async () => {
      const redirectUrl = window.location.href
      const personal = await getPersonVerificationLink(userId, redirectUrl)
      const company = await getCompanyVerificationLink(userId, redirectUrl)

      setVerificationLinks({ personal: personal.formUrl, company: company.formUrl })
    }

    if (isMetaMaskConnected && userId) {
      handleGetUser()
      getVerificationLinks()
    }
  }, [userId, isMetaMaskConnected])

  const renderContent = () => {
    if (!isMetaMaskConnected) {
      return renderNoMetamask()
    }

    return (
      <>
        {renderTabs()}
        {renderTabContent()}
      </>
    )
  }

  const renderNoMetamask = () => (
    <div>
      You need to connect your metamask wallet
      <Button onClick={onPresentConnectModal}>{t('Connect Wallet')}</Button>
    </div>
  )

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
    if (user && verificationStatusLookup[user?.verification?.status]) {
      return <a href={verificationLinks.personal}>Pass Personal KYC</a>
    }

    return (
      <div>
        <div>{verificationStatusLookup[user?.verification?.status]}</div>
        Documents
      </div>
    )
  }

  const renderCompany = () => {
    if (verificationStatusLookup[user?.verification?.status]) {
      return <a href={verificationLinks.company}>Pass Company KYC</a>
    }

    return (
      <div>
        <div>{verificationStatusLookup[user?.verification?.status]}</div>
        Documents
      </div>
    )
  }

  return (
    <Page>
      <AppBody>
        <AppHeader title="KYC" subtitle="" />
        <Body>{renderContent()}</Body>
      </AppBody>
    </Page>
  )
}
