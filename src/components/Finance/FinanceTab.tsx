import { animationDuration, Flex, Tab, TabMenu } from '@envoysvision/uikit'
// import { AppBody } from 'components/App'
// import FarmsPage from 'pages/farms'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import styled from 'styled-components'
import Farms from 'views/Farms/Farms'
// import Page from 'views/Page'
import Pools from 'views/Pools'
import Page from '../Layout/Page'

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
  width: 100%;
`

export const FinanceTab: FC = ({ children }) => {
  const router = useRouter()

  const [tabClicked, setTabClicked] = useState<number>(undefined)
  const activeTab = tabs.findIndex((item) => router.pathname.startsWith(item.path)) ?? 0

  const handleTabClick = (newTabIndex) => {
    setTabClicked(newTabIndex)
    if (newTabIndex !== activeTab) {
      router.prefetch(tabs[newTabIndex].path).then(() => {
        setTimeout(() => {
          return router.push(tabs[newTabIndex].path)
        }, animationDuration)
      })
    }
  }

  const renderTabs = () => {
    return (
      <TabMenu verticalMargin={82.336} activeIndex={activeTab} nextIndex={tabClicked} onItemClick={handleTabClick}>
        {tabs.map((item) => (
          <Tab key={item.title}>{item.title}</Tab>
        ))}
      </TabMenu>
    )
  }

  return (
    <Page removeInnerPadding={true} hideFooterOnDesktop={true}>
      <TabContainer>
        {renderTabs()}
        {children}
      </TabContainer>
    </Page>
  )
}
