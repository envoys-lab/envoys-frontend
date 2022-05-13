import React, { useState } from 'react'
import {
  Modal,
  Text,
  Button,
  Heading,
  Flex,
  AutoRenewIcon,
  ButtonMenu,
  ButtonMenuItem,
  HelpIcon,
  useTooltip,
} from '@envoysvision/uikit'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import useToast from 'hooks/useToast'
import { ToastDescriptionWithTx } from 'components/Toast'
import { Token } from '@envoysvision/sdk'
import { formatNumber } from 'utils/formatBalance'
import { logError } from 'utils/sentry'
import useHarvestPool from '../../../hooks/useHarvestPool'
import useStakePool from '../../../hooks/useStakePool'
import styled from 'styled-components'
import CurrencyEquivalent from 'components/CurrencyInputPanel/CurrencyEquivalent'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;

  a {
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 10px;
    padding-right: 10px;
    height: auto;
  }
`

const PriceContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

interface CollectModalProps {
  formattedBalance: string
  fullBalance: string
  earningToken: Token
  earningsDollarValue: number
  sousId: number
  isBnbPool: boolean
  isCompoundPool?: boolean
  onDismiss?: () => void
}

const CollectModal: React.FC<CollectModalProps> = ({
  formattedBalance,
  fullBalance,
  earningToken,
  earningsDollarValue,
  sousId,
  isBnbPool,
  isCompoundPool = false,
  onDismiss,
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { toastSuccess, toastError } = useToast()
  const { onReward } = useHarvestPool(sousId, isBnbPool)
  const { onStake } = useStakePool(sousId, isBnbPool)
  const [pendingTx, setPendingTx] = useState(false)
  const [shouldCompound, setShouldCompound] = useState(isCompoundPool)
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Text mb="12px">{t('Compound: collect and restake EVT into pool.')}</Text>
      <Text>{t('Harvest: collect EVT and send to wallet')}</Text>
    </>,
    { placement: 'bottom-end', tooltipOffset: [20, 10] },
  )

  const handleHarvestConfirm = async () => {
    setPendingTx(true)
    // compounding
    if (shouldCompound) {
      try {
        await onStake(
          fullBalance,
          earningToken.decimals,
          (tx) => {
            toastSuccess(`${t('Transaction Submitted')}!`, <ToastDescriptionWithTx txHash={tx.hash} />)
          },
          (receipt) => {
            toastSuccess(
              `${t('Compounded')}!`,
              <ToastDescriptionWithTx txHash={receipt.transactionHash}>
                {t('Your %symbol% earnings have been re-invested into the pool!', { symbol: earningToken.symbol })}
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

        setPendingTx(false)
        onDismiss()
      } catch (e) {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        logError(e)
        setPendingTx(false)
      }
    } else {
      // harvesting
      try {
        await onReward(
          (tx) => {
            toastSuccess(`${t('Transaction Submitted')}!`, <ToastDescriptionWithTx txHash={tx.hash} />)
          },
          (receipt) => {
            toastSuccess(
              `${t('Harvested')}!`,
              <ToastDescriptionWithTx txHash={receipt.transactionHash}>
                {t('Your %symbol% earnings have been sent to your wallet!', { symbol: earningToken.symbol })}
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

        setPendingTx(false)
        onDismiss()
      } catch (e) {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        logError(e)
        setPendingTx(false)
      }
    }
  }

  return (
    <Modal
      title={`${earningToken.symbol} ${isCompoundPool ? t('Collect') : t('Harvest')}`}
      onDismiss={onDismiss}
      headerBackground={theme.colors.gradients.cardHeader}
    >
      {isCompoundPool && (
        <Flex justifyContent="center" alignItems="center" mb="24px">
          <Wrapper>
            <ButtonMenu
              activeIndex={shouldCompound ? 0 : 1}
              scale="sm"
              variant="tev"
              // slim={true}
              onItemClick={(index) => setShouldCompound(!index)}
            >
              <ButtonMenuItem>{t('Compound')}</ButtonMenuItem>
              <ButtonMenuItem>{t('Harvest')}</ButtonMenuItem>
            </ButtonMenu>
          </Wrapper>
          <Flex ml="10px" ref={targetRef}>
            <HelpIcon color="textSubtle" />
          </Flex>
          {tooltipVisible && tooltip}
        </Flex>
      )}

      <Flex justifyContent="space-between" alignItems="center" mb="24px">
        <Text>{shouldCompound ? t('Compounding') : t('Harvesting')}:</Text>
        <Flex flexDirection="column">
          <Heading>
            {formattedBalance} {earningToken.symbol}
          </Heading>
          {earningsDollarValue > 0 && (
            <PriceContainer>
              <CurrencyEquivalent amount={fullBalance} currency={earningToken} />
            </PriceContainer>
          )}
        </Flex>
      </Flex>

      <Button
        mt="8px"
        onClick={handleHarvestConfirm}
        isLoading={pendingTx}
        endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
      >
        {pendingTx ? t('Confirming') : t('Confirm')}
      </Button>
      <Button variant="text" onClick={onDismiss} pb="0px">
        {t('Close Window')}
      </Button>
    </Modal>
  )
}

export default CollectModal
