import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { LinkExternal, Text } from '@envoysvision/uikit'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getAddress } from 'utils/addressHelpers'
import { getBscScanLink } from 'utils'
import { CommunityTag, CoreTag, DualTag } from 'components/Tags'

import HarvestAction from './HarvestAction'
import StakedAction from './StakedAction'
import Apr, { AprProps } from '../Apr'
import Multiplier, { MultiplierProps } from '../Multiplier'
import Liquidity, { LiquidityProps } from '../Liquidity'
import { ActionContainer, ActionPanelContainer, HorizontalSpacer } from './styles'

export interface ActionPanelProps {
  apr: AprProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
  userDataReady: boolean
  expanded: boolean
}

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 500px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 500px;
  }
  to {
    max-height: 0px;
  }
`

const Container = styled.div<{ expanded }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  ${({ theme, expanded }) => (expanded ? { background: theme.colors.background } : {})};
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 24px;

  border-radius: 0px 0px 18px 18px;
  margin-bottom: 20px;

  ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: row;
    padding: 11px 8px 19px 8px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 11px 0px 19px 0px;
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
  max-height: 16px;
  margin-bottom: 7px;
`

const StakeContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }
`

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 16px;
  }

  > div {
    height: 24px;
    padding: 0 6px;
    font-size: 14px;
    margin-right: 4px;

    svg {
      width: 14px;
    }
  }
`

const ContentPanelContainer = styled.div`
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  border-radius: 17px;
  max-width: 302px;

  width: 100%;
  height: 90px;
`

const InfoContainer = styled.div`
  min-width: 120px;
  width: 25%;

  display: flex;
  flex-direction: row;
  justify-content: center;

  padding-left: 0;
`

const InfoInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const LeftSideContainer = styled.div`
  padding-left: 6%;
`

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({
  details,
  apr,
  multiplier,
  liquidity,
  userDataReady,
  expanded,
}) => {
  const farm = details

  const { t } = useTranslation()
  const isActive = farm.multiplier !== '0X'
  const { quoteToken, token, dual } = farm
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const lpAddress = getAddress(farm.lpAddresses)
  const bsc = getBscScanLink(lpAddress, 'address')
  const info = `/info/pool/${lpAddress}`

  return (
    <Container expanded={expanded}>
      <InfoContainer>
        <InfoInnerContainer>
          {isActive && (
            <StakeContainer>
              <StyledLinkExternal href={`/add/${liquidityUrlPathParts}`}>
                {t('Get %symbol%', { symbol: lpLabel })}
              </StyledLinkExternal>
            </StakeContainer>
          )}
          <StyledLinkExternal href={bsc}>{t('View Contract')}</StyledLinkExternal>
          <StyledLinkExternal href={info}>{t('See Pair Info')}</StyledLinkExternal>
        </InfoInnerContainer>
      </InfoContainer>

      <ActionPanelContainer>
        <ContentPanelContainer>
          <HarvestAction {...farm} userDataReady={userDataReady} />
        </ContentPanelContainer>
        <HorizontalSpacer size={20} />
        <ContentPanelContainer>
          <StakedAction {...farm} userDataReady={userDataReady} lpLabel={lpLabel} displayApr={apr.value} />
        </ContentPanelContainer>
        <HorizontalSpacer size={16} />
      </ActionPanelContainer>
    </Container>
  )
}

export default ActionPanel
