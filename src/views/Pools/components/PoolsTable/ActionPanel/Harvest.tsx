import React from 'react'
import { Button, Text, useModal, Flex, Skeleton } from '@envoysvision/uikit'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { PoolCategory } from 'config/constants/types'
import { formatNumber, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { BIG_ZERO } from 'utils/bigNumber'
import { DeserializedPool } from 'state/types'

import { ActionTitles, ActionContent, EnvoysSkeleton, Heading, InfoContainer } from './styles'
import CollectModal from '../../PoolCard/Modals/CollectModal'
import styled from 'styled-components'
import {
  ActionButton,
  HarvestControlsContainer,
  PanelContainer,
  TitleText,
  VerticalSpacer,
} from 'views/Farms/components/FarmTable/Actions/styles'
import CurrencyEquivalent from 'components/CurrencyInputPanel/CurrencyEquivalent'
import { Currency } from '@envoysvision/sdk'
import { Label } from '../Cells/styles'
import { HarvestText } from './Stake'

export const ActionContainer = styled.div`
  padding-left: 17px;
  padding-right: 8px;
  padding-top: 4px;
  padding-bottom: 4px;

  display: flex;
  align-items: center;
  flex-direction: row;
`

interface HarvestActionProps extends DeserializedPool {
  userDataLoaded: boolean
}

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({
  sousId,
  poolCategory,
  earningToken,
  userData,
  userDataLoaded,
  earningTokenPrice,
}) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
  const earningTokenBalance = getBalanceNumber(earnings, earningToken.decimals)
  const earningTokenDollarBalance = getBalanceNumber(earnings.multipliedBy(earningTokenPrice), earningToken.decimals)
  const hasEarnings = earnings.gt(0)
  const fullBalance = getFullDisplayBalance(earnings, earningToken.decimals)
  const formattedBalance = formatNumber(earningTokenBalance, 3, 3)
  const isCompoundPool = sousId === 0
  const isBnbPool = poolCategory === PoolCategory.BINANCE

  const currency = earningToken as Currency

  const [onPresentCollect] = useModal(
    <CollectModal
      formattedBalance={formattedBalance}
      fullBalance={fullBalance}
      earningToken={earningToken}
      earningsDollarValue={earningTokenDollarBalance}
      sousId={sousId}
      isBnbPool={isBnbPool}
      isCompoundPool={isCompoundPool}
    />,
  )

  const actionTitle = (
    <>
      <HarvestText
        opacity={0.7}
        fontWeight={500}
        lineHeight={'14px'}
        textTransform="uppercase"
        color="primary"
        fontSize="12px"
        pr="2px"
      >
        {earningToken.symbol}{' '}
      </HarvestText>
      <TitleText>{t('Earned').toUpperCase()}</TitleText>
    </>
  )

  if (!account) {
    return (
      <PanelContainer>
        <ActionTitles>{actionTitle}</ActionTitles>
        <VerticalSpacer height={8} />
        <HarvestControlsContainer>
          <InfoContainer>
            <Heading>0.0</Heading>
            <CurrencyEquivalent currency={currency} amount={'0'} />
          </InfoContainer>
          <ActionButton width="100px" height="40px" disabled>
            {isCompoundPool ? t('Collect') : t('Harvest')}
          </ActionButton>
        </HarvestControlsContainer>
      </PanelContainer>
    )
  }

  if (!userDataLoaded) {
    return (
      <PanelContainer>
        <ActionTitles>{actionTitle}</ActionTitles>
        <VerticalSpacer height={8} />
        <EnvoysSkeleton width="100%" height={40} marginBottom={0} marginTop={0} />
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
                  <CurrencyEquivalent currency={currency} amount={earningTokenBalance.toString()} />
                )}
              </>
            ) : (
              <>
                <Heading color="textDisabled">0.0</Heading>
                <CurrencyEquivalent currency={currency} amount={'0'} />
              </>
            )}
          </>
        </InfoContainer>
        <ActionButton width="100px" height="40px" disabled={!hasEarnings} onClick={onPresentCollect}>
          {isCompoundPool ? t('Collect') : t('Harvest')}
        </ActionButton>
      </HarvestControlsContainer>
    </PanelContainer>
  )
}

export default HarvestAction
