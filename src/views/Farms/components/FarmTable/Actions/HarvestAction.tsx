import { Button, Heading, Skeleton, Text } from '@envoysvision/uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'
import { useTranslation } from 'contexts/Localization'
import { ToastDescriptionWithTx } from 'components/Toast'
import useToast from 'hooks/useToast'
import React, { useState } from 'react'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { logError } from 'utils/sentry'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import useHarvestFarm from '../../../hooks/useHarvestFarm'
import {
  ActionContainer,
  ActionContent,
  ActionTitles,
  ActionButton,
  InfoContainer,
  EnvoysBalance,
  HarvestText,
  HarvestControlsContainer,
  TitleText,
  VerticalSpacer,
  PanelContainer,
} from './styles'
import styled from 'styled-components'
import CurrencyEquivalent from 'components/CurrencyInputPanel/CurrencyEquivalent'
import unserializedTokens from 'config/constants/tokens'

interface HarvestActionProps extends FarmWithStakedValue {
  userDataReady: boolean
}

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({ pid, userData, userDataReady }) => {
  const { toastSuccess, toastError } = useToast()
  const earningsBigNumber = new BigNumber(userData.earnings)
  // const cakePrice = usePriceCakeBusd()
  let earnings = BIG_ZERO
  // let earningsBusd = 0
  let displayBalance = userDataReady ? earnings.toFixed(1).toLocaleString() : <Skeleton width={60} />

  // If user didn't connect wallet default balance will be 0
  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceAmount(earningsBigNumber)
    // earningsBusd = earnings.multipliedBy(cakePrice).toNumber()
    displayBalance = earnings.toFixed(3, BigNumber.ROUND_DOWN)
  }

  // CurrencyEquivalent
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestFarm(pid)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

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
          EVT
        </HarvestText>
        <TitleText>{t('Earned').toUpperCase()}</TitleText>
      </ActionTitles>
      <VerticalSpacer height={8} />
      <HarvestControlsContainer>
        <InfoContainer>
          <HarvestText fontWeight={600} lineHeight={'19px'} fontSize="16px">
            {displayBalance}
          </HarvestText>
          <div>
            <CurrencyEquivalent currency={unserializedTokens.evt} amount={earnings.toString()} />
          </div>
        </InfoContainer>
        <ActionContent>
          <ActionButton
            width="100px"
            height="40px"
            disabled={earnings.eq(0) || pendingTx || !userDataReady}
            onClick={async () => {
              setPendingTx(true)
              try {
                await onReward(
                  (tx) => {
                    toastSuccess(`${t('Transaction Submitted')}!`, <ToastDescriptionWithTx txHash={tx.hash} />)
                  },
                  (receipt) => {
                    toastSuccess(
                      `${t('Harvested')}!`,
                      <ToastDescriptionWithTx txHash={receipt.transactionHash}>
                        {t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'EVT' })}
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
              } catch (e) {
                toastError(
                  t('Error'),
                  t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
                )
                logError(e)
              } finally {
                setPendingTx(false)
              }
              dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
            }}
          >
            {pendingTx ? t('Harvesting') : t('Harvest')}
          </ActionButton>
        </ActionContent>
      </HarvestControlsContainer>
    </PanelContainer>
  )
}

export default HarvestAction
