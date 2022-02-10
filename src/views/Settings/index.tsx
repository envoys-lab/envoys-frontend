import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, CardBody, CardFooter, Button, AddIcon, Tab, TabMenu } from '@envoysvision/uikit'
import Link from 'next/link'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { AppHeader, AppBody } from '../../components/App'
import Page from '../Page'

const Body = styled(CardBody)`
  background-color: ${({ theme }) => theme.colors.dropdownDeep};
`

export default function Settings() {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(0)

  const handleItemClick = (index: number) => setActiveTab(index)
  const tabs = ['Personal', 'Company']

  const isMetamaskConnected = true
  const reviewStatus = 1

  const statusLookup = {
    1: 'In progress',
    2: 'Accepted',
    3: 'Denied',
  }

  const renderContent = () => {
    if (!isMetamaskConnected) {
      return renderNoMetamask()
    }

    return (
      <>
        {renderTabs()}
        {renderTabContent()}
      </>
    )
  }

  const renderNoMetamask = () => <Button>Connect to metamask!</Button>

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
    if (reviewStatus === 0) {
      return <Button>Pass Personal KYC</Button>
    }

    return (
      <div>
        <div>{statusLookup[reviewStatus]}</div>
        Documents
      </div>
    )
  }

  const renderCompany = () => {
    if (reviewStatus === 0) {
      return <Button>Pass Company KYC</Button>
    }

    return (
      <div>
        <div>{statusLookup[reviewStatus]}</div>
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
