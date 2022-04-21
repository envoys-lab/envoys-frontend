import { AddIcon, Button, Heading, IconButton, MinusIcon, Skeleton, Text, useModal } from '@envoysvision/uikit'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'bignumber.js'
import Balance from 'components/Balance'
import ConnectWalletButton from 'components/ConnectWalletButton'
import CurrencyEquivalent from 'components/CurrencyInputPanel/CurrencyEquivalent'
import { ToastDescriptionWithTx } from 'components/Toast'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import unserializedTokens from 'config/constants/tokens'
import { useTranslation } from 'contexts/Localization'
import { useERC20 } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { useFarmUser, useLpTokenPrice, usePriceCakeBusd } from 'state/farms/hooks'
import styled from 'styled-components'
import { getAddress } from 'utils/addressHelpers'
import { getBalanceAmount, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { logError } from 'utils/sentry'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import useApproveFarm from '../../../hooks/useApproveFarm'
import useStakeFarms from '../../../hooks/useStakeFarms'
import useUnstakeFarms from '../../../hooks/useUnstakeFarms'
import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'
import {
  ActionContainer,
  ActionContent,
  ActionTitles,
  ActionButton,
  InfoContainer,
  HarvestText,
  EnvoysBalance,
} from './styles'

const EnvoysSkeleton = styled(Skeleton)`
  border-radius: 14px;
`

const IconButtonWrapper = styled.div`
  display: flex;
`

const FarmsConnectWalletButton = styled(ConnectWalletButton)`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
`

const StakedContainer = styled(InfoContainer)`
  padding-right: 16px !important;
`

interface StackedActionProps extends FarmWithStakedValue {
  userDataReady: boolean
  lpLabel?: string
  displayApr?: string
}

const Staked: React.FunctionComponent<StackedActionProps> = ({
  pid,
  apr,
  multiplier,
  lpSymbol,
  lpLabel,
  lpAddresses,
  quoteToken,
  token,
  userDataReady,
  displayApr,
}) => {
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const { account } = useWeb3React()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { allowance, tokenBalance, stakedBalance } = useFarmUser(pid)
  const { onStake } = useStakeFarms(pid)
  const { onUnstake } = useUnstakeFarms(pid)
  const router = useRouter()
  const lpPrice = useLpTokenPrice(lpSymbol)
  const cakePrice = usePriceCakeBusd()

  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const lpAddress = getAddress(lpAddresses)
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  const handleStake = async (amount: string) => {
    await onStake(
      amount,
      (tx) => {
        toastSuccess(`${t('Transaction Submitted')}!`, <ToastDescriptionWithTx txHash={tx.hash} />)
      },
      (receipt) => {
        toastSuccess(
          `${t('Staked')}!`,
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            {t('Your funds have been staked in the farm')}
          </ToastDescriptionWithTx>,
        )
      },
      (receipt) => {
        toastError(
          t('Error'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            {t('Please try again. Confirm the transaction and make sure you are paying enough gas!')}
          </ToastDescriptionWithTx>,
        )
      },
    )
    dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
  }

  const handleUnstake = async (amount: string) => {
    await onUnstake(
      amount,
      (tx) => {
        toastSuccess(`${t('Transaction Submitted')}!`, <ToastDescriptionWithTx txHash={tx.hash} />)
      },
      (receipt) => {
        toastSuccess(
          `${t('Unstaked')}!`,
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            {t('Your earnings have also been harvested to your wallet')}
          </ToastDescriptionWithTx>,
        )
      },
      (receipt) => {
        toastError(
          t('Error'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            {t('Please try again. Confirm the transaction and make sure you are paying enough gas!')}
          </ToastDescriptionWithTx>,
        )
      },
    )
    dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
  }

  const displayBalance = useCallback(() => {
    const stakedBalanceBigNumber = getBalanceAmount(stakedBalance)
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0000001)) {
      return stakedBalanceBigNumber.toFixed(10, BigNumber.ROUND_DOWN)
    }
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0001)) {
      return getFullDisplayBalance(stakedBalance).toLocaleString()
    }
    return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  }, [stakedBalance])

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      lpPrice={lpPrice}
      lpLabel={lpLabel}
      apr={apr}
      displayApr={displayApr}
      stakedBalance={stakedBalance}
      onConfirm={handleStake}
      tokenName={lpSymbol}
      multiplier={multiplier}
      addLiquidityUrl={addLiquidityUrl}
      cakePrice={cakePrice}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={handleUnstake} tokenName={lpSymbol} />,
  )
  const lpContract = useERC20(lpAddress)
  const dispatch = useAppDispatch()
  const { onApprove } = useApproveFarm(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove(
        (tx) => {
          toastSuccess(`${t('Transaction Submitted')}!`, <ToastDescriptionWithTx txHash={tx.hash} />)
        },
        (receipt) => {
          toastSuccess(t('Contract Enabled'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
        },
        (receipt) => {
          toastError(
            t('Error'),
            <ToastDescriptionWithTx txHash={receipt.transactionHash}>
              {t('Please try again. Confirm the transaction and make sure you are paying enough gas!')}
            </ToastDescriptionWithTx>,
          )
        },
      )
      dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
    } catch (e) {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      logError(e)
    } finally {
      setRequestedApproval(false)
    }
  }, [onApprove, dispatch, account, pid, t, toastError, toastSuccess])

  if (!account) {
    return (
      <ActionContainer>
        <ActionContent>
          <FarmsConnectWalletButton width="100%" height="42px" minWidth="132px" />
        </ActionContent>
      </ActionContainer>
    )
  }

  if (isApproved) {
    if (stakedBalance.gt(0)) {
      return (
        <ActionContainer>
          <ActionContent>
            <StakedContainer>
              <ActionTitles>
                <HarvestText bold textTransform="uppercase" color="text" fontSize="12px">
                  {t('Staked')}
                </HarvestText>
              </ActionTitles>
              <HarvestText>{displayBalance()}</HarvestText>
              <div>
                {stakedBalance.gt(0) && lpPrice.gt(0) && (
                  <CurrencyEquivalent
                    currency={unserializedTokens.evt}
                    amount={getBalanceNumber(lpPrice.times(stakedBalance)).toString()}
                  />
                )}
              </div>
            </StakedContainer>
            <IconButtonWrapper>
              <IconButton scale="tev" variant="secondary" onClick={onPresentWithdraw} mr="6px">
                <MinusIcon color="primary" width="14px" />
              </IconButton>
              <IconButton
                scale="tev"
                variant="secondary"
                onClick={onPresentDeposit}
                disabled={['history', 'archived'].some((item) => router.pathname.includes(item))}
              >
                <AddIcon color="primary" width="14px" />
              </IconButton>
            </IconButtonWrapper>
          </ActionContent>
        </ActionContainer>
      )
    }

    return (
      <ActionContainer>
        <ActionContent>
          <ActionButton
            onClick={onPresentDeposit}
            disabled={['history', 'archived'].some((item) => router.pathname.includes(item))}
          >
            {t('Stake LP')}
          </ActionButton>
        </ActionContent>
      </ActionContainer>
    )
  }

  if (!userDataReady) {
    return (
      <ActionContainer>
        <ActionContent>
          <EnvoysSkeleton width={132} height={42} marginBottom={0} marginTop={0} />
        </ActionContent>
      </ActionContainer>
    )
  }

  return (
    <ActionContainer>
      <ActionContent>
        <ActionButton height="42px" minWidth="134px" disabled={requestedApproval} onClick={handleApprove}>
          {t('Start Farming')}
        </ActionButton>
      </ActionContent>
    </ActionContainer>
  )
}

export default Staked
