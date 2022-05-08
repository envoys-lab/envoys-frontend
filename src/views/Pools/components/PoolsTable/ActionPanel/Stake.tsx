import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, useModal, IconButton, AddIcon, MinusIcon, Skeleton, useTooltip, Flex, Text } from '@envoysvision/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useWeb3React } from '@web3-react/core'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { DeserializedPool } from 'state/types'
import Balance from 'components/Balance'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { PoolCategory } from 'config/constants/types'
import { BIG_ZERO } from 'utils/bigNumber'
import { useERC20 } from 'hooks/useContract'
import { convertSharesToCake } from 'views/Pools/helpers'
import { ActionTitles, ActionContent, EnvoysSkeleton } from './styles'
import NotEnoughTokensModal from '../../PoolCard/Modals/NotEnoughTokensModal'
import StakeModal from '../../PoolCard/Modals/StakeModal'
import VaultStakeModal from '../../CakeVaultCard/VaultStakeModal'
import { useCheckVaultApprovalStatus, useApprovePool, useVaultApprove } from '../../../hooks/useApprove'
import {
  ActionButton,
  EnvoysIconButton,
  HarvestControlsContainer,
  PanelContainer,
  TitleText,
  VerticalSpacer,
} from 'views/Farms/components/FarmTable/Actions/styles'
import CurrencyEquivalent from 'components/CurrencyInputPanel/CurrencyEquivalent'
import { Currency } from '@envoysvision/sdk'

const IconButtonWrapper = styled.div`
  display: flex;
`

const PoolsConnectWalletButton = styled(ConnectWalletButton)`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  border-radius: 10px;
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  padding-right: 8px;
`

const StakedContainer = styled(InfoContainer)`
  padding-right: 16px !important;
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

export const HarvestText = styled(Text)<{ opacity?: number }>`
  opacity: ${({ opacity }) => opacity ?? 1.0};
`

interface StackedActionProps {
  pool: DeserializedPool
  userDataLoaded: boolean
}

const Staked: React.FunctionComponent<StackedActionProps> = ({ pool, userDataLoaded }) => {
  const {
    sousId,
    stakingToken,
    earningToken,
    stakingLimit,
    isFinished,
    poolCategory,
    userData,
    stakingTokenPrice,
    vaultKey,
  } = pool
  const { t } = useTranslation()
  const { account } = useWeb3React()

  const stakingTokenContract = useERC20(stakingToken.address || '')
  const { handleApprove: handlePoolApprove, requestedApproval: requestedPoolApproval } = useApprovePool(
    stakingTokenContract,
    sousId,
    earningToken.symbol,
  )

  const currency: Currency = { decimals: 18, symbol: stakingToken.symbol }

  const { isVaultApproved, setLastUpdated } = useCheckVaultApprovalStatus(pool.vaultKey)
  const { handleApprove: handleVaultApprove, requestedApproval: requestedVaultApproval } = useVaultApprove(
    pool.vaultKey,
    setLastUpdated,
  )

  const handleApprove = vaultKey ? handleVaultApprove : handlePoolApprove
  const requestedApproval = vaultKey ? requestedVaultApproval : requestedPoolApproval

  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const allowance = userData?.allowance ? new BigNumber(userData.allowance) : BIG_ZERO
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const isNotVaultAndHasStake = !vaultKey && stakedBalance.gt(0)

  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO

  const stakedTokenBalance = getBalanceNumber(stakedBalance, stakingToken.decimals)
  const stakedTokenDollarBalance = getBalanceNumber(
    stakedBalance.multipliedBy(stakingTokenPrice),
    stakingToken.decimals,
  )

  const {
    userData: { userShares },
    pricePerFullShare,
  } = useVaultPoolByKey(pool.vaultKey)

  const { cakeAsBigNumber, cakeAsNumberBalance } = convertSharesToCake(userShares, pricePerFullShare)
  const hasSharesStaked = userShares && userShares.gt(0)
  const isVaultWithShares = vaultKey && hasSharesStaked
  const stakedAutoDollarValue = getBalanceNumber(cakeAsBigNumber.multipliedBy(stakingTokenPrice), stakingToken.decimals)

  const needsApproval = vaultKey ? !isVaultApproved : !allowance.gt(0) && !isBnbPool

  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)

  const [onPresentStake] = useModal(
    <StakeModal
      isBnbPool={isBnbPool}
      pool={pool}
      stakingTokenBalance={stakingTokenBalance}
      stakingTokenPrice={stakingTokenPrice}
    />,
  )

  const [onPresentVaultStake] = useModal(<VaultStakeModal stakingMax={stakingTokenBalance} pool={pool} />)

  const [onPresentUnstake] = useModal(
    <StakeModal
      stakingTokenBalance={stakingTokenBalance}
      isBnbPool={isBnbPool}
      pool={pool}
      stakingTokenPrice={stakingTokenPrice}
      isRemovingStake
    />,
  )

  const [onPresentVaultUnstake] = useModal(<VaultStakeModal stakingMax={cakeAsBigNumber} pool={pool} isRemovingStake />)

  const onStake = () => {
    if (vaultKey) {
      onPresentVaultStake()
    } else {
      onPresentStake()
    }
  }

  const onUnstake = () => {
    if (vaultKey) {
      onPresentVaultUnstake()
    } else {
      onPresentUnstake()
    }
  }

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t("You've already staked the maximum amount you can stake in this pool!"),
    { placement: 'bottom' },
  )

  const reachStakingLimit = stakingLimit.gt(0) && userData.stakedBalance.gte(stakingLimit)

  if (!account) {
    return (
      <PanelContainer>
        <TitleText>{t('START FARMING')}</TitleText>
        <VerticalSpacer height={8} />
        <PoolsConnectWalletButton width="100%" height="40px" />
      </PanelContainer>
    )
  }

  if (!userDataLoaded) {
    return (
      <PanelContainer>
        <TitleText>{t('START STAKING')}</TitleText>
        <VerticalSpacer height={8} />
        <EnvoysSkeleton width="100%" height={40} marginBottom={0} marginTop={0} />
      </PanelContainer>
    )
  }

  if (needsApproval) {
    return (
      <PanelContainer>
        <TitleText>{t('START STAKING')}</TitleText>
        <VerticalSpacer height={8} />
        <ActionButton height="40px" width="100%" disabled={requestedApproval} onClick={handleApprove}>
          {t('Enable')}
        </ActionButton>
      </PanelContainer>
    )
  }

  // Wallet connected, user data loaded and approved
  if (isNotVaultAndHasStake || isVaultWithShares) {
    return (
      <PanelContainer>
        <ActionTitles>
          <HarvestText
            opacity={0.7}
            fontWeight={500}
            lineHeight={'14px'}
            textTransform="uppercase"
            color="primary"
            fontSize="12px"
            pr="2px"
          >
            {stakingToken.symbol}
          </HarvestText>
          <TitleText>{t('Staked').toUpperCase()}</TitleText>
        </ActionTitles>
        <VerticalSpacer height={7} />
        <HarvestControlsContainer>
          <InfoContainer>
            <Balance
              color="text"
              fontSize="16px"
              lineHeight="19px"
              fontWeight={600}
              decimals={2}
              value={vaultKey ? cakeAsNumberBalance : stakedTokenBalance}
            />
            <CurrencyEquivalent
              currency={currency}
              amount={(vaultKey ? stakedAutoDollarValue : stakedTokenDollarBalance).toString()}
            />
          </InfoContainer>
          <ActionContent>
            <IconButtonWrapper>
              <EnvoysIconButton scale="tev" variant="secondary" onClick={onUnstake} mr="6px">
                <MinusIcon color="primary" width="14px" />
              </EnvoysIconButton>
              {reachStakingLimit ? (
                <span ref={targetRef}>
                  <EnvoysIconButton variant="secondary" disabled>
                    <AddIcon color="textDisabled" width="24px" height="24px" />
                  </EnvoysIconButton>
                </span>
              ) : (
                <EnvoysIconButton
                  scale="tev"
                  variant="secondary"
                  onClick={stakingTokenBalance.gt(0) ? onStake : onPresentTokenRequired}
                  disabled={isFinished}
                >
                  <AddIcon color="primary" width="14px" />
                </EnvoysIconButton>
              )}
            </IconButtonWrapper>
            {/* {tooltipVisible && tooltip} */}
          </ActionContent>
        </HarvestControlsContainer>
      </PanelContainer>
    )
  }

  return (
    <PanelContainer>
      <TitleText>{t('START STAKING')}</TitleText>
      <VerticalSpacer height={8} />
      <ActionButton
        height="40px"
        width="100%"
        onClick={stakingTokenBalance.gt(0) ? onStake : onPresentTokenRequired}
        disabled={isFinished}
      >
        {t('Stake')}
      </ActionButton>
    </PanelContainer>
  )
}

export default Staked
