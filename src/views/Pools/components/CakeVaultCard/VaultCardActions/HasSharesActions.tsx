import React from 'react'
import { Flex, Text, IconButton, AddIcon, MinusIcon, useModal, Skeleton, Box } from '@envoysvision/uikit'
import BigNumber from 'bignumber.js'
import { DeserializedPool, VaultKey } from 'state/types'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useVaultPoolByKey } from 'state/pools/hooks'
import Balance from 'components/Balance'
import { useTranslation } from 'contexts/Localization'
import NotEnoughTokensModal from '../../PoolCard/Modals/NotEnoughTokensModal'
import { convertSharesToCake } from '../../../helpers'
import VaultStakeModal from '../VaultStakeModal'
import CurrencyEquivalent from '../../../../../components/CurrencyInputPanel/CurrencyEquivalent'
import unserializedTokens from '../../../../../config/constants/tokens'

interface HasStakeActionProps {
  pool: DeserializedPool
  stakingTokenBalance: BigNumber
  performanceFee: number
}

const HasSharesActions: React.FC<HasStakeActionProps> = ({ pool, stakingTokenBalance, performanceFee }) => {
  const {
    totalShares,
    userData: { userShares, isLoading },
    pricePerFullShare,
  } = useVaultPoolByKey(pool.vaultKey)
  const { stakingToken } = pool
  const { cakeAsBigNumber, cakeAsNumberBalance } = convertSharesToCake(userShares, pricePerFullShare)
  const cakePriceBusd = usePriceCakeBusd()
  const { t } = useTranslation()

  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)
  const [onPresentStake] = useModal(
    <VaultStakeModal stakingMax={stakingTokenBalance} performanceFee={performanceFee} pool={pool} />,
  )
  const [onPresentUnstake] = useModal(<VaultStakeModal stakingMax={cakeAsBigNumber} pool={pool} isRemovingStake />)

  const totalSharesPercentage =
    userShares &&
    userShares.gt(0) &&
    totalShares &&
    userShares.dividedBy(totalShares).multipliedBy(100).decimalPlaces(5)

  const hasSharesStaked = userShares && userShares.gt(0)
  const isVaultWithShares = pool.vaultKey && hasSharesStaked
  const hasStaked = stakingTokenBalance.gt(0) || isVaultWithShares

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex flexDirection="column">
        <Balance fontSize="20px" bold value={cakeAsNumberBalance} decimals={5} />
        <Text as={Flex} fontSize="12px" color="textSubtle" flexWrap="wrap">
          {cakePriceBusd.gt(0) ? (
            hasStaked ? (
              <CurrencyEquivalent
                currency={unserializedTokens.evt}
                amount={(pool.vaultKey
                  ? Number.isNaN(cakeAsNumberBalance)
                    ? 0
                    : cakeAsNumberBalance
                  : stakingTokenBalance
                ).toString()}
              />
            ) : (
              <CurrencyEquivalent currency={unserializedTokens.evt} amount={'0'} />
            )
          ) : (
            <Skeleton mt="1px" height={16} width={64} />
          )}
          {!isLoading && totalSharesPercentage && pool.vaultKey === VaultKey.IfoPool && (
            <Box as="span" ml="2px">
              | {t('%num% of total', { num: `${totalSharesPercentage.toString()}%` })}
            </Box>
          )}
        </Text>
      </Flex>
      <Flex>
        <IconButton variant="secondary" onClick={onPresentUnstake} mr="6px">
          <MinusIcon color="primary" width="24px" />
        </IconButton>
        <IconButton variant="secondary" onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}>
          <AddIcon color="primary" width="24px" height="24px" />
        </IconButton>
      </Flex>
    </Flex>
  )
}

export default HasSharesActions
