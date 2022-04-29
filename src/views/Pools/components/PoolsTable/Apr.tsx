import React from 'react'
import styled from 'styled-components'
import { Flex, useModal, CalculateIcon, Skeleton, FlexProps, Button } from '@envoysvision/uikit'
import RoiCalculatorModal from 'components/RoiCalculatorModal'
import Balance from 'components/Balance'
import { DeserializedPool } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { vaultPoolConfig } from 'config/constants/pools'

const AprLabelContainer = styled(Flex)`
  width: 100px;
  &:hover {
    opacity: 0.5;
  }
`

const EnvoysBalance = styled.div`
  color: #133d65;

  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  /* padding-top: 2px; */

  text-align: right;
`

interface AprProps extends FlexProps {
  pool: DeserializedPool
  stakedBalance: BigNumber
  showIcon: boolean
  performanceFee?: number
}

const Apr: React.FC<AprProps> = ({ pool, showIcon, stakedBalance, performanceFee = 0, ...props }) => {
  const {
    stakingToken,
    earningToken,
    isFinished,
    earningTokenPrice,
    stakingTokenPrice,
    userData,
    apr,
    rawApr,
    vaultKey,
  } = pool
  const { t } = useTranslation()

  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO

  const apyModalLink = stakingToken.address ? `/swap?outputCurrency=${stakingToken.address}` : '/swap'
  const d = apr === 0 || isNaN(apr) || !apr ? 0.0 : apr
  const values = d.toFixed(2).split('.')

  const afterDot = values[1].substring(0, 2)
  const aprValue = values[0] + '.' + afterDot

  const [onPresentApyModal] = useModal(
    <RoiCalculatorModal
      earningTokenPrice={earningTokenPrice}
      stakingTokenPrice={stakingTokenPrice}
      stakingTokenBalance={stakedBalance.plus(stakingTokenBalance)}
      apr={vaultKey ? rawApr : apr}
      stakingTokenSymbol={stakingToken.symbol}
      linkLabel={t('Get %symbol%', { symbol: stakingToken.symbol })}
      linkHref={apyModalLink}
      earningTokenSymbol={earningToken.symbol}
      autoCompoundFrequency={vaultPoolConfig[vaultKey]?.autoCompoundFrequency ?? 0}
      performanceFee={performanceFee}
    />,
  )

  const openRoiModal = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    onPresentApyModal()
  }

  return (
    <AprLabelContainer alignItems="center" justifyContent="center" {...props}>
      {apr || isFinished ? (
        <>
          {/* <EnvoysBalance
            onClick={openRoiModal}
            fontSize="16px"
            isDisabled={isFinished}
            value={isFinished ? 0 : apr}
            decimals={2}
            unit="%"
          /> */}

          <EnvoysBalance>{aprValue}</EnvoysBalance>
          {!isFinished && showIcon && (
            <Button onClick={openRoiModal} variant="text" width="12px" height="18px" padding="0px" marginLeft="4px">
              <CalculateIcon color="textSubtle" width="12px" opacity={'0.7'} />
            </Button>
          )}
        </>
      ) : (
        <Skeleton width="80px" height="16px" />
      )}
    </AprLabelContainer>
  )
}

export default Apr
