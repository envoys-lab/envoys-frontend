import React from 'react'
import { Flex, Text, Button, useModal, Skeleton } from '@envoysvision/uikit'
import BigNumber from 'bignumber.js'
import { Token } from '@envoysvision/sdk'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance, getBalanceNumber, formatNumber } from 'utils/formatBalance'
import Balance from 'components/Balance'
import CollectModal from '../Modals/CollectModal'
import styled from 'styled-components'
import { useVaultPoolByKey } from '../../../../../state/pools/hooks'
import { convertSharesToCake } from '../../../helpers'
import unserializedTokens from '../../../../../config/constants/tokens'
import CurrencyEquivalent from '../../../../../components/CurrencyInputPanel/CurrencyEquivalent'
import { DeserializedPool } from '../../../../../state/types'

interface HarvestActionsProps {
  pool: DeserializedPool
  earnings: BigNumber
  earningToken: Token
  sousId: number
  earningTokenPrice: number
  isBnbPool: boolean
  isLoading?: boolean
}

const Heading = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.text};
`

const HarvestActions: React.FC<HarvestActionsProps> = ({
  pool,
  earnings,
  earningToken,
  sousId,
  isBnbPool,
  earningTokenPrice,
  isLoading = false,
}) => {
  const { t } = useTranslation()
  const earningTokenBalance = getBalanceNumber(earnings, earningToken.decimals)
  const formattedBalance = formatNumber(earningTokenBalance, 3, 3)

  const earningTokenDollarBalance = getBalanceNumber(earnings.multipliedBy(earningTokenPrice), earningToken.decimals)

  const fullBalance = getFullDisplayBalance(earnings, earningToken.decimals)
  const hasEarnings = earnings.toNumber() > 0
  const isCompoundPool = sousId === 0

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
  return (
    <Flex justifyContent="space-between" alignItems="center" mb="16px">
      <Flex flexDirection="column">
        {isLoading ? (
          <Skeleton width="80px" height="48px" />
        ) : (
          <>
            {hasEarnings ? (
              <>
                <Balance bold fontSize="20px" decimals={5} value={earningTokenBalance} />
                {earningTokenPrice > 0 && (
                  <CurrencyEquivalent
                    currency={unserializedTokens.evt}
                    amount={(hasEarnings ? earningTokenBalance : 0).toString()}
                  />
                )}
              </>
            ) : (
              <>
                <Heading color="textDisabled">0.0</Heading>
                <Text fontSize="12px" color="textDisabled">
                  <CurrencyEquivalent currency={unserializedTokens.evt} amount={'0'} />
                </Text>
              </>
            )}
          </>
        )}
      </Flex>
      <Button disabled={!hasEarnings} onClick={onPresentCollect}>
        {isCompoundPool ? t('Collect') : t('Harvest')}
      </Button>
    </Flex>
  )
}

export default HarvestActions
