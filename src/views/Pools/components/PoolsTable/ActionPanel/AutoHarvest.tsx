import React from 'react'
import { Text, Flex, TooltipText, useTooltip, Skeleton } from '@envoysvision/uikit'
import { useWeb3React } from '@web3-react/core'
import { getCakeVaultEarnings } from 'views/Pools/helpers'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { DeserializedPool } from 'state/types'

import { ActionTitles, ActionContent, EnvoysSkeleton, Heading, InfoContainer } from './styles'
import UnstakingFeeCountdownRow from '../../CakeVaultCard/UnstakingFeeCountdownRow'
import styled from 'styled-components'
import { Label } from '../Cells/styles'
import CurrencyEquivalent from 'components/CurrencyInputPanel/CurrencyEquivalent'
import unserializedTokens from 'config/constants/tokens'
import {
  HarvestControlsContainer,
  PanelContainer,
  TitleText,
  VerticalSpacer,
} from 'views/Farms/components/FarmTable/Actions/styles'

export const ActionContainer = styled.div`
  padding-left: 17px;
  padding-right: 8px;
  padding-top: 4px;
  padding-bottom: 4px;

  display: flex;
  align-items: center;
  flex-direction: row;
`

const FeeContainer = styled.div`
  width: 114px;
`

interface AutoHarvestActionProps extends DeserializedPool {
  userDataLoaded: boolean
}

const AutoHarvestAction: React.FunctionComponent<AutoHarvestActionProps> = ({
  userDataLoaded,
  earningTokenPrice,
  vaultKey,
}) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  const {
    userData: { cakeAtLastUserAction, userShares },
    pricePerFullShare,
    fees: { performanceFee },
  } = useVaultPoolByKey(vaultKey)
  const { hasAutoEarnings, autoCakeToDisplay, autoUsdToDisplay } = getCakeVaultEarnings(
    account,
    cakeAtLastUserAction,
    userShares,
    pricePerFullShare,
    earningTokenPrice,
  )

  const earningTokenBalance = autoCakeToDisplay
  const earningTokenDollarBalance = autoUsdToDisplay
  const hasEarnings = hasAutoEarnings

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Subtracted automatically from each yield harvest and burned.'),
    { placement: 'bottom-start' },
  )

  const actionTitle = <TitleText>{t('RECENT EVT PROFIT').toUpperCase()}</TitleText>

  if (!account) {
    return (
      <PanelContainer>
        <ActionTitles>{actionTitle}</ActionTitles>
        <VerticalSpacer height={8} />
        <HarvestControlsContainer>
          <InfoContainer>
            <Heading>0.0</Heading>
            <CurrencyEquivalent currency={unserializedTokens.evt} amount={'0'} />
          </InfoContainer>
        </HarvestControlsContainer>
      </PanelContainer>
    )
  }

  if (!userDataLoaded) {
    return (
      <PanelContainer>
        <ActionTitles>{actionTitle}</ActionTitles>
        <VerticalSpacer height={8} />
        <EnvoysSkeleton width="100%" height="40px" marginBottom={0} marginTop={0} />
      </PanelContainer>
    )
  }

  return (
    <PanelContainer>
      <ActionTitles>{actionTitle}</ActionTitles>
      <VerticalSpacer height={8} />
      <HarvestControlsContainer>
        <InfoContainer>
          <>
            {hasEarnings ? (
              <>
                <Balance
                  color="text"
                  fontSize="16px"
                  lineHeight="19px"
                  fontWeight={600}
                  decimals={5}
                  value={earningTokenBalance}
                />
                {earningTokenPrice > 0 && (
                  <CurrencyEquivalent currency={unserializedTokens.evt} amount={earningTokenBalance.toString()} />
                )}
              </>
            ) : (
              <>
                <Heading color="textDisabled">0.0</Heading>
                <CurrencyEquivalent currency={unserializedTokens.evt} amount={'0'} />
              </>
            )}
          </>
        </InfoContainer>

        <FeeContainer>
          <UnstakingFeeCountdownRow vaultKey={vaultKey} isTableVariant />
          {/* <Flex mb="2px" justifyContent="space-between" alignItems="center"> */}
          {/* {tooltipVisible && tooltip} */}
          <Label>{t('Performance Fee') + ' ' + performanceFee / 100 + '%'}</Label>
          {/* </Flex> */}
        </FeeContainer>
      </HarvestControlsContainer>
    </PanelContainer>
  )
}

export default AutoHarvestAction
