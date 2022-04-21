import React from 'react'
import { Text, Flex, TooltipText, useTooltip, Skeleton } from '@envoysvision/uikit'
import { useWeb3React } from '@web3-react/core'
import { getCakeVaultEarnings } from 'views/Pools/helpers'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { DeserializedPool } from 'state/types'

import { ActionTitles, ActionContent } from './styles'
import UnstakingFeeCountdownRow from '../../CakeVaultCard/UnstakingFeeCountdownRow'
import styled from 'styled-components'
import { Label } from '../Cells/styles'
import CurrencyEquivalent from 'components/CurrencyInputPanel/CurrencyEquivalent'
import unserializedTokens from 'config/constants/tokens'

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-right: 30px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 65px;
  }
`

const Heading = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.text};
`

export const ActionContainer = styled.div`
  padding-left: 17px;
  padding-right: 8px;
  padding-top: 4px;
  padding-bottom: 4px;

  display: flex;
  align-items: center;
  flex-direction: row;
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

  const actionTitle = (
    <Text fontSize="12px" fontWeight="500" color="text" as="span" textTransform="uppercase">
      {t('RECENT EVT PROFIT')}
    </Text>
  )

  if (!account) {
    return (
      <ActionContainer>
        <InfoContainer>
          <ActionTitles>{actionTitle}</ActionTitles>
          <ActionContent>
            <Heading>0</Heading>
          </ActionContent>
        </InfoContainer>
      </ActionContainer>
    )
  }

  if (!userDataLoaded) {
    return (
      <ActionContainer>
        <InfoContainer>
          <ActionTitles>{actionTitle}</ActionTitles>
          <ActionContent>
            <Skeleton width={180} height="32px" marginTop={14} />
          </ActionContent>
        </InfoContainer>
      </ActionContainer>
    )
  }

  return (
    <ActionContainer>
      <InfoContainer>
        <ActionTitles>{actionTitle}</ActionTitles>
        <>
          {hasEarnings ? (
            <>
              <Balance
                color="text"
                fontSize="12px"
                lineHeight="14px"
                fontWeight={500}
                decimals={5}
                value={earningTokenBalance}
              />
              {earningTokenPrice > 0 && (
                <CurrencyEquivalent currency={unserializedTokens.evt} amount={earningTokenBalance.toString()} />
              )}
            </>
          ) : (
            <>
              <Heading color="textDisabled">0</Heading>
              <CurrencyEquivalent currency={unserializedTokens.evt} amount={'0'} />
            </>
          )}
        </>
        <UnstakingFeeCountdownRow vaultKey={vaultKey} isTableVariant />
        <Flex mb="2px" justifyContent="space-between" alignItems="center">
          {tooltipVisible && tooltip}
          <Label>{t('Performance Fee') + ' ' + performanceFee / 100 + '%'}</Label>
        </Flex>
      </InfoContainer>
    </ActionContainer>
  )
}

export default AutoHarvestAction
