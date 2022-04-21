import React, { useMemo } from 'react'
import { Flex, Skeleton, Text } from '@envoysvision/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'
import { DeserializedPool } from 'state/types'
import { useVaultPoolByKey, useVaultPools } from 'state/pools/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import BaseCell, { CellContent } from './BaseCell'
import { BallanceContainer, Label } from './styles'

interface TotalStakedCellProps {
  pool: DeserializedPool
}

const StyledCell = styled(BaseCell)`
  /* flex: 2 0 100px; */
`

const InfoContainer = styled.div`
  padding-top: 2px;
`

const TotalStakedCell: React.FC<TotalStakedCellProps> = ({ pool }) => {
  const { t } = useTranslation()
  const { sousId, stakingToken, totalStaked, vaultKey } = pool
  const { totalCakeInVault } = useVaultPoolByKey(vaultKey)
  const vaultPools = useVaultPools()
  const cakeInVaults = Object.values(vaultPools).reduce((total, vault) => {
    return total.plus(vault.totalCakeInVault)
  }, BIG_ZERO)

  const isManualCakePool = sousId === 0

  const totalStakedBalance = useMemo(() => {
    if (vaultKey) {
      return getBalanceNumber(totalCakeInVault, stakingToken.decimals)
    }
    if (isManualCakePool) {
      const manualCakeTotalMinusAutoVault = new BigNumber(totalStaked).minus(cakeInVaults)
      return getBalanceNumber(manualCakeTotalMinusAutoVault, stakingToken.decimals)
    }
    return getBalanceNumber(totalStaked, stakingToken.decimals)
  }, [vaultKey, totalCakeInVault, isManualCakePool, totalStaked, stakingToken.decimals, cakeInVaults])

  return (
    <StyledCell role="cell">
      <CellContent>
        <Label>{t('Total staked')}</Label>
        <InfoContainer>
          {totalStaked && totalStaked.gte(0) ? (
            <Balance
              fontSize="12px"
              lineHeight={'14px'}
              fontWeight={500}
              color="text"
              value={totalStakedBalance}
              decimals={0}
              unit={` ${stakingToken.symbol}`}
            />
          ) : (
            <Skeleton width="80px" height="14px" />
          )}
        </InfoContainer>
      </CellContent>
    </StyledCell>
  )
}

export default TotalStakedCell
