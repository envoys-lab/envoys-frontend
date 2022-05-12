import { Box, Flex, Skeleton, Text, useMatchBreakpoints } from '@envoysvision/uikit'
import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'
import CurrencyEquivalent from 'components/CurrencyInputPanel/CurrencyEquivalent'
import unserializedTokens from 'config/constants/tokens'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { DeserializedPool } from 'state/types'
import styled from 'styled-components'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceNumber } from 'utils/formatBalance'
import { convertSharesToCake } from 'views/Pools/helpers'
import BaseCell, { CellContent } from './BaseCell'
import { Label } from './styles'

interface StakedCellProps {
  pool: DeserializedPool
  account: string
  userDataLoaded: boolean
}

const StyledCell = styled(BaseCell)`
  /* flex: 2 0 130px; */
  min-width: 110px;
  width: 110px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const StakedCell: React.FC<StakedCellProps> = ({ pool, account, userDataLoaded }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  // vault
  const {
    userData: { isLoading: vaultUserDataLoading, userShares },
    pricePerFullShare,
  } = useVaultPoolByKey(pool.vaultKey)
  const hasSharesStaked = userShares && userShares.gt(0)
  const isVaultWithShares = pool.vaultKey && hasSharesStaked
  const { cakeAsBigNumber, cakeAsNumberBalance } = convertSharesToCake(userShares, pricePerFullShare)

  // pool
  const { stakingTokenPrice, stakingToken, userData } = pool
  const stakedAutoDollarValue = getBalanceNumber(cakeAsBigNumber.multipliedBy(stakingTokenPrice), stakingToken.decimals)
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const stakedTokenBalance = getBalanceNumber(stakedBalance, stakingToken.decimals)
  const stakedTokenDollarBalance = getBalanceNumber(
    stakedBalance.multipliedBy(stakingTokenPrice),
    stakingToken.decimals,
  )

  const labelText = `${pool.stakingToken.symbol} ${t('Staked')}`

  const hasStaked = stakedBalance.gt(0) || isVaultWithShares

  const userDataLoading = pool.vaultKey ? vaultUserDataLoading : !userDataLoaded

  return (
    <StyledCell role="cell">
      <Label>{labelText}</Label>
      {userDataLoading && account ? (
        <Skeleton width="80px" height="14px" />
      ) : (
        <>
          <Balance
            mt="2px"
            fontWeight="500"
            fontSize="12px"
            lineHeight="14px"
            color="text"
            decimals={hasStaked ? 2 : 1}
            value={pool.vaultKey ? (Number.isNaN(cakeAsNumberBalance) ? 0 : cakeAsNumberBalance) : stakedTokenBalance}
          />
          {hasStaked ? (
            <CurrencyEquivalent
              currency={unserializedTokens.evt}
              amount={(pool.vaultKey
                ? Number.isNaN(cakeAsNumberBalance)
                  ? 0
                  : cakeAsNumberBalance
                : stakedTokenBalance
              ).toString()}
            />
          ) : (
            <CurrencyEquivalent currency={unserializedTokens.evt} amount={'0'} />
          )}
          {/* </Box>
            </Flex> */}
        </>
      )}
      {/* </CellContent> */}
    </StyledCell>
  )
}

export default StakedCell
