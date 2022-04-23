import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, useMatchBreakpoints, TokenPairImage as UITokenPairImage } from '@envoysvision/uikit'
import { useTranslation } from 'contexts/Localization'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { DeserializedPool } from 'state/types'
import { BIG_ZERO } from 'utils/bigNumber'
import { vaultPoolConfig } from 'config/constants/pools'
import { TokenPairImage } from 'components/TokenImage'
import BaseCell, { CellContent } from './BaseCell'

interface NameCellProps {
  pool: DeserializedPool
}

const Container = styled.div`
  width: 210px;
  padding-left: 0px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 4px;
  }
`

const TokenWrapper = styled.div`
  width: 40px;
  margin-right: 10px;
`

const RaiseContainer = styled.div`
  width: 38px;
  height: 22px;

  margin-left: 10px;

  border: 1px solid ${({ theme }) => theme.colors.raiseBorder};
  box-sizing: border-box;
  border-radius: 8px;

  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.text};
`

const TitleContainer = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;

  /* Main_Dark */

  color: ${({ theme }) => theme.colors.text};
`

const NameCell: React.FC<NameCellProps> = ({ pool }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const { sousId, stakingToken, earningToken, userData, isFinished, vaultKey } = pool
  const {
    userData: { userShares },
  } = useVaultPoolByKey(pool.vaultKey)
  const hasVaultShares = userShares && userShares.gt(0)

  const stakingTokenSymbol = stakingToken.symbol
  const earningTokenSymbol = earningToken.symbol

  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const isStaked = stakedBalance.gt(0)
  const isManualCakePool = sousId === 0

  const showStakedTag = vaultKey ? hasVaultShares : isStaked

  let title = `${t('Earn')} ${earningTokenSymbol}`
  let subtitle = `${t('Stake')} ${stakingTokenSymbol}`
  const showSubtitle = sousId !== 0 || (sousId === 0 && !isMobile)

  const priceChange24hValue = 0.0
  const displayValue = priceChange24hValue.toFixed(1)

  if (vaultKey) {
    title = t(vaultPoolConfig[vaultKey].name)
    subtitle = t(vaultPoolConfig[vaultKey].description)
  } else if (isManualCakePool) {
    title = t('Manual EVT')
    subtitle = `${t('Earn')} EVT ${t('Stake').toLocaleLowerCase()} EVT`
  }

  return (
    <Container>
      <TokenWrapper>
        {vaultKey ? (
          <UITokenPairImage
            variant="inverted"
            {...vaultPoolConfig[vaultKey].tokenImage}
            width={40}
            height={22}
            absolutePosition
          />
        ) : (
          <TokenPairImage
            variant="inverted"
            primaryToken={earningToken}
            secondaryToken={stakingToken}
            width={40}
            height={22}
            absolutePosition
          />
        )}
      </TokenWrapper>
      <CellContent>
        {showStakedTag && (
          <Text fontSize="12px" bold color={isFinished ? 'failure' : 'secondary'} textTransform="uppercase">
            {t('Staked')}
          </Text>
        )}
        <TitleContainer>{title}</TitleContainer>
        {showSubtitle && (
          <Text fontSize="12px" color="textSubtle">
            {subtitle}
          </Text>
        )}
      </CellContent>
      {priceChange24hValue !== 0 ? (
        <RaiseContainer>
          <div>{displayValue}%</div>
        </RaiseContainer>
      ) : (
        ''
      )}
    </Container>
  )
}

export default NameCell
