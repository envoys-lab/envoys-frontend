import React from 'react'
import styled from 'styled-components'
import { Skeleton, Text, Flex, Box, useModal, useMatchBreakpoints } from '@envoysvision/uikit'
import { DeserializedPool } from 'state/types'
import BigNumber from 'bignumber.js'
import { PoolCategory } from 'config/constants/types'
import { BIG_ZERO } from 'utils/bigNumber'
import { formatNumber, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import Balance from 'components/Balance'
import { useTranslation } from 'contexts/Localization'
import BaseCell, { CellContent } from './BaseCell'
import CollectModal from '../../PoolCard/Modals/CollectModal'
import { Label } from './styles'
import CurrencyEquivalent from 'components/CurrencyInputPanel/CurrencyEquivalent'
import unserializedTokens from 'config/constants/tokens'

interface EarningsCellProps {
  pool: DeserializedPool
  account: string
  userDataLoaded: boolean
}

const StyledCell = styled(BaseCell)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const EarningsCell: React.FC<EarningsCellProps> = ({ pool, account, userDataLoaded }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const { sousId, earningToken, poolCategory, userData, earningTokenPrice } = pool
  const isManualCakePool = sousId === 0

  const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
  const earningTokenBalance = getBalanceNumber(earnings, earningToken.decimals)
  const earningTokenDollarBalance = getBalanceNumber(earnings.multipliedBy(earningTokenPrice), earningToken.decimals)
  const hasEarnings = account && earnings.gt(0)
  const fullBalance = getFullDisplayBalance(earnings, earningToken.decimals)
  const formattedBalance = formatNumber(earningTokenBalance, 3, 3)
  const isBnbPool = poolCategory === PoolCategory.BINANCE

  const labelText = t('%asset% Earned', { asset: earningToken.symbol })

  const [onPresentCollect] = useModal(
    <CollectModal
      formattedBalance={formattedBalance}
      fullBalance={fullBalance}
      earningToken={earningToken}
      earningsDollarValue={earningTokenDollarBalance}
      sousId={sousId}
      isBnbPool={isBnbPool}
      isCompoundPool={isManualCakePool}
    />,
  )

  const handleEarningsClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    onPresentCollect()
  }

  return (
    <StyledCell role="cell">
      <Label>{labelText}</Label>
      {!userDataLoaded && account ? (
        <Skeleton width="80px" height="14px" />
      ) : (
        <>
          <Balance
            mt="2px"
            fontWeight="500"
            fontSize="12px"
            lineHeight="14px"
            color="text"
            decimals={hasEarnings ? 2 : 1}
            value={hasEarnings ? earningTokenBalance : 0}
          />
          {hasEarnings ? (
            <>
              {earningTokenPrice > 0 && (
                <CurrencyEquivalent
                  currency={unserializedTokens.evt}
                  amount={(hasEarnings ? earningTokenBalance : 0).toString()}
                />
              )}
            </>
          ) : (
            <CurrencyEquivalent currency={unserializedTokens.evt} amount={'0'} />
          )}
        </>
      )}
    </StyledCell>
  )
}

export default EarningsCell
