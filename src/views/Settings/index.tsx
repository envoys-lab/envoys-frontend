import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, CardBody, CardFooter, Button, AddIcon, Tab, TabMenu } from '@envoysvision/uikit'
import Link from 'next/link'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { AppHeader, AppBody } from '../../components/App'
import Page from '../Page'

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
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(0)

  const handleItemClick = (index: number) => setActiveTab(index)
  const tabs = ['My KYC', 'Business']

  const isMetamaskConnected = false
  const reviewStatus = 1

  const statusLookup = {
    1: 'In progress',
    2: 'Accepted',
    3: 'Denied',
  }

  const renderContent = () => {
    return (
      <>
        {renderTabs()}
        { isMetamaskConnected ? renderTabContent() : renderNoMetamask()}
      </>
    )
  }

  const renderNoMetamask = () => {

    return <>
      <Space/>
      <TextCard>
        <Text fontSize="12px" color="primary">The image file format must be jpg or png, the file size cannot exceed 4 MB. The face must be clearly visible! The note must be clearly legible! The passport must be clearly legible 3. Please upload photos of materials in strict accordance with the requirements, otherwise
          your certification will not pass the audit, save your precious time!</Text>
      </TextCard>
      <Space/>
      <Button>Connect to metamask!</Button>
    </>
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
        <Body>{renderContent()}</Body>
      </AppBody>
    </Page>
  )
}
