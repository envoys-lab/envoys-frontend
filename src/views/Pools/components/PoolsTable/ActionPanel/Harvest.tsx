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

import { ActionTitles, ActionContent } from './styles'
import CollectModal from '../../PoolCard/Modals/CollectModal'
import styled from 'styled-components'
import { ActionButton } from 'views/Farms/components/FarmTable/Actions/styles'
import CurrencyEquivalent from 'components/CurrencyInputPanel/CurrencyEquivalent'
import { Currency } from '@envoysvision/sdk'
import { Label } from '../Cells/styles'

export const ActionContainer = styled.div`
  padding-left: 17px;
  padding-right: 8px;
  padding-top: 4px;
  padding-bottom: 4px;

  display: flex;
  align-items: center;
  flex-direction: row;
`

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
      <Text fontSize="12px" fontWeight="500" color="primary" as="span" textTransform="uppercase">
        {earningToken.symbol}{' '}
      </Text>
      <Text fontSize="12px" fontWeight="500" color="text" as="span" textTransform="uppercase">
        {t('Earned')}
      </Text>
    </>
  )

  if (!account) {
    return (
      <ActionContainer>
        <InfoContainer>
          <ActionTitles>{actionTitle}</ActionTitles>
          <ActionContent>
            <Heading>0</Heading>
            <ActionButton disabled>{isCompoundPool ? t('Collect') : t('Harvest')}</ActionButton>
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
                <CurrencyEquivalent currency={currency} amount={earningTokenBalance.toString()} />
              )}
            </>
          ) : (
            <>
              <Heading color="textDisabled">0</Heading>
              <CurrencyEquivalent currency={currency} amount={'0'} />
            </>
          )}
        </>
      </InfoContainer>
      <ActionContent>
        {/* <Flex flex="1" pt="16px" flexDirection="column" alignSelf="flex-start"></Flex> */}
        <ActionButton disabled={!hasEarnings} onClick={onPresentCollect}>
          {isCompoundPool ? t('Collect') : t('Harvest')}
        </ActionButton>
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction
