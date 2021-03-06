import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber'
import { formatUnits } from '@ethersproject/units'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Text, useMatchBreakpoints } from '@envoysvision/uikit'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { useTranslation } from 'contexts/Localization'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import {
  useFetchCakeVault,
  useFetchIfoPool,
  useFetchPublicPoolsData,
  useFetchUserPools,
  usePools,
  useVaultPools,
} from 'state/pools/hooks'
import { latinise } from 'utils/latinise'
import Select, { OptionProps } from 'components/Select/Select'
import { DeserializedPool } from 'state/types'
import { useUserPoolStakedOnly, useUserPoolsViewMode } from 'state/user/hooks'
import { usePoolsWithVault } from 'views/Home/hooks/useGetTopPoolsByApr'
import { ViewMode } from 'state/user/actions'
import { BIG_ZERO } from 'utils/bigNumber'
import { useRouter } from 'next/router'
import PoolCard from './components/PoolCard'
import CakeVaultCard from './components/CakeVaultCard'
import PoolTabButtons from './components/PoolTabButtons'
import PoolsTable from './components/PoolsTable/PoolsTable'
import { getCakeVaultEarnings } from './helpers'
import {
  CardLayout,
  FilterContainer,
  PoolControls,
  SortContainer,
  Space,
  TextContainer,
  TextTitleContainer,
  TopContainer,
  ViewControls,
} from './styles'

const NUMBER_OF_POOLS_VISIBLE = 12

const Pools: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { userDataLoaded } = usePools()
  const [stakedOnly, setStakedOnly] = useUserPoolStakedOnly()
  const [viewMode, setViewMode] = useUserPoolsViewMode()
  const [numberOfPoolsVisible, setNumberOfPoolsVisible] = useState(NUMBER_OF_POOLS_VISIBLE)
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('hot')
  const chosenPoolsLength = useRef(0)
  const vaultPools = useVaultPools()
  const cakeInVaults = Object.values(vaultPools).reduce((total, vault) => {
    return total.plus(vault.totalCakeInVault)
  }, BIG_ZERO)
  const { isMobile } = useMatchBreakpoints()

  const pools = usePoolsWithVault()

  // TODO aren't arrays in dep array checked just by reference, i.e. it will rerender every time reference changes?
  const [finishedPools, openPools] = useMemo(() => partition(pools, (pool) => pool.isFinished), [pools])
  const stakedOnlyFinishedPools = useMemo(
    () =>
      finishedPools.filter((pool) => {
        if (pool.vaultKey) {
          return vaultPools[pool.vaultKey].userData.userShares && vaultPools[pool.vaultKey].userData.userShares.gt(0)
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [finishedPools, vaultPools],
  )
  const stakedOnlyOpenPools = useMemo(
    () =>
      openPools.filter((pool) => {
        if (pool.vaultKey) {
          return vaultPools[pool.vaultKey].userData.userShares && vaultPools[pool.vaultKey].userData.userShares.gt(0)
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [openPools, vaultPools],
  )
  const hasStakeInFinishedPools = stakedOnlyFinishedPools.length > 0

  useFetchCakeVault()
  useFetchIfoPool(false)
  useFetchPublicPoolsData()
  useFetchUserPools(account)

  useEffect(() => {
    if (isIntersecting) {
      setNumberOfPoolsVisible((poolsCurrentlyVisible) => {
        if (poolsCurrentlyVisible <= chosenPoolsLength.current) {
          return poolsCurrentlyVisible + NUMBER_OF_POOLS_VISIBLE
        }
        return poolsCurrentlyVisible
      })
    }
  }, [isIntersecting])

  const showFinishedPools = router.pathname.includes('history')

  const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  const sortPools = (poolsToSort: DeserializedPool[]) => {
    switch (sortOption) {
      case 'apr':
        // Ternary is needed to prevent pools without APR (like MIX) getting top spot
        return orderBy(poolsToSort, (pool: DeserializedPool) => (pool.apr ? pool.apr : 0), 'desc')
      case 'earned':
        return orderBy(
          poolsToSort,
          (pool: DeserializedPool) => {
            if (!pool.userData || !pool.earningTokenPrice) {
              return 0
            }
            return pool.vaultKey
              ? getCakeVaultEarnings(
                  account,
                  vaultPools[pool.vaultKey].userData.cakeAtLastUserAction,
                  vaultPools[pool.vaultKey].userData.userShares,
                  vaultPools[pool.vaultKey].pricePerFullShare,
                  pool.earningTokenPrice,
                ).autoUsdToDisplay
              : pool.userData.pendingReward.times(pool.earningTokenPrice).toNumber()
          },
          'desc',
        )
      case 'totalStaked':
        return orderBy(
          poolsToSort,
          (pool: DeserializedPool) => {
            let totalStaked = Number.NaN
            if (pool.vaultKey) {
              if (pool.stakingTokenPrice && vaultPools[pool.vaultKey].totalCakeInVault.isFinite()) {
                totalStaked =
                  +formatUnits(
                    EthersBigNumber.from(vaultPools[pool.vaultKey].totalCakeInVault.toString()),
                    pool.stakingToken.decimals,
                  ) * pool.stakingTokenPrice
              }
            } else if (pool.sousId === 0) {
              if (pool.totalStaked?.isFinite() && pool.stakingTokenPrice && cakeInVaults.isFinite()) {
                const manualCakeTotalMinusAutoVault = EthersBigNumber.from(pool.totalStaked.toString()).sub(
                  cakeInVaults.toString(),
                )
                totalStaked =
                  +formatUnits(manualCakeTotalMinusAutoVault, pool.stakingToken.decimals) * pool.stakingTokenPrice
              }
            } else if (pool.totalStaked?.isFinite() && pool.stakingTokenPrice) {
              totalStaked =
                +formatUnits(EthersBigNumber.from(pool.totalStaked.toString()), pool.stakingToken.decimals) *
                pool.stakingTokenPrice
            }
            return Number.isFinite(totalStaked) ? totalStaked : 0
          },
          'desc',
        )
      default:
        return poolsToSort
    }
  }

  let chosenPools
  if (showFinishedPools) {
    chosenPools = stakedOnly ? stakedOnlyFinishedPools : finishedPools
  } else {
    chosenPools = stakedOnly ? stakedOnlyOpenPools : openPools
  }

  if (searchQuery) {
    const lowercaseQuery = latinise(searchQuery.toLowerCase())
    chosenPools = chosenPools.filter((pool) =>
      latinise(pool.earningToken.symbol.toLowerCase()).includes(lowercaseQuery),
    )
  }

  chosenPools = sortPools(chosenPools).slice(0, numberOfPoolsVisible)
  chosenPoolsLength.current = chosenPools.length

  const cardLayout = (
    <CardLayout>
      {chosenPools.map((pool) =>
        pool.vaultKey ? (
          <CakeVaultCard key={pool.vaultKey} pool={pool} showStakedOnly={stakedOnly} />
        ) : (
          <PoolCard key={pool.sousId} pool={pool} account={account} />
        ),
      )}
    </CardLayout>
  )

  const tableLayout = <PoolsTable pools={chosenPools} account={account} userDataLoaded={userDataLoaded} />

  return (
    <>
      <PoolControls>
        <ViewControls>
          <TextTitleContainer>{t('Stake EVT tokens to earn')}</TextTitleContainer>
        </ViewControls>
        <FilterContainer>
          <PoolTabButtons
            stakedOnly={stakedOnly}
            setStakedOnly={setStakedOnly}
            hasStakeInFinishedPools={hasStakeInFinishedPools}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          <Space size={13} />
          <SortContainer>
            <Space size={15} />
            <TextContainer opacity={0.7}>{t('Sort by') + ':'}</TextContainer>
            <Space size={10} />
            <Select
              style={{ width: 110 }}
              options={[
                {
                  label: t('Hot'),
                  value: 'hot',
                },
                {
                  label: t('APR'),
                  value: 'apr',
                },
                {
                  label: t('Earned'),
                  value: 'earned',
                },
                {
                  label: t('Total staked'),
                  value: 'totalStaked',
                },
              ]}
              onOptionChange={handleSortOptionChange}
            />
          </SortContainer>
        </FilterContainer>
      </PoolControls>
      {showFinishedPools && (
        <Text fontSize="16px" ml="16px" color="failure" pb="32px">
          {t('These pools are no longer distributing rewards. Please unstake your tokens.')}
        </Text>
      )}
      {/* {account && !userDataLoaded && stakedOnly && (
        <Flex justifyContent="center" mb="4px">
          <Loading />
        </Flex>
      )} */}
      <TopContainer>{viewMode === ViewMode.CARD || isMobile ? cardLayout : tableLayout}</TopContainer>
      <div ref={observerRef} />
    </>
  )
}

export default Pools
