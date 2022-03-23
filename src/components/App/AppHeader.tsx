import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Heading, IconButton, ArrowBackIcon, NotificationDot } from '@envoysvision/uikit'
import { useExpertModeManager } from 'state/user/hooks'
import GlobalSettings from 'components/Menu/GlobalSettings'
import Link from 'next/link'
import Transactions from './Transactions'
import QuestionHelper from '../QuestionHelper'

interface Props {
  title: string;
  subtitle: string;
  helper?: string;
  backTo?: string;
  noConfig?: boolean;
  noSettings?: boolean;
}

const AppHeaderContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  margin-top: 12px;
  width: 100%;
`

export const Wrapper = styled(Flex)`
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
`

const AppHeader: React.FC<Props> = ({ title, subtitle, helper, backTo, noConfig = false, noSettings = false, children }) => {
  const [expertMode] = useExpertModeManager()
  return (
    <Wrapper>
      {children}
      <AppHeaderContainer>
        <Flex alignItems="center" mr={noConfig ? 0 : '16px'}>
          {backTo && (
            <Link passHref href={backTo}>
              <IconButton as="a">
                <ArrowBackIcon width="32px" />
              </IconButton>
            </Link>
          )}
          <Flex flexDirection="column">
            <Heading as="h2" mb="6px" color={"mainDark"}>
              {title}
            </Heading>
            <Flex alignItems="center">
              {helper && <QuestionHelper text={helper} mr="4px" placement="top-start" />}
              <Text color="mainDark" fontSize="12px">
                {subtitle}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {!noConfig && (
          <Flex alignItems="center">
            {!noSettings && (
              <NotificationDot show={expertMode}>
                <GlobalSettings />
              </NotificationDot>
            )}
            <Transactions />
          </Flex>
        )}
      </AppHeaderContainer>
    </Wrapper>
  )
}

export default AppHeader
