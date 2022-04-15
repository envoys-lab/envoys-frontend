import { Flex, Tab, TabMenu } from '@envoysvision/uikit'
import { AppBody } from 'components/App'
import FarmsPage from 'pages/farms'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import styled from 'styled-components'
import Farms from 'views/Farms/Farms'
import Page from 'views/Page'
import Pools from 'views/Pools'

const tabs = [
  {
    title: 'Farms',
    path: '/farms',
  },
  {
    title: 'Pools',
    path: '/pools',
  },
]

const TabContainer = styled(Flex)`
  flex-direction: column;
  padding-top: 10px;

  justify-content: space-between;

  background: #ffffff;

  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.06);
  border-radius: 28px;

  margin-top: 40px;
  margin-left: 28px;
  margin-right: 28px;
  margin-bottom: 40px;

  max-width: 962px;
`

export const FinanceTab: FC = ({ children }) => {
  const router = useRouter()

  const activeTab = tabs.findIndex((item) => router.pathname.startsWith(item.path)) ?? 0

  const handleTabClick = (newTabIndex) => {
    return router.push(tabs[newTabIndex].path)
  }

  const renderTabs = () => {
    return (
      <TabMenu verticalMargin="71.5" activeIndex={activeTab} onItemClick={handleTabClick}>
        {tabs.map((item) => (
          <Tab key={item.title}>{item.title}</Tab>
        ))}
      </TabMenu>
    )
  }

  return (
    <TabContainer>
      {renderTabs()}
      {children}
    </TabContainer>
  )
}
