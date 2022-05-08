import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Pair } from '@envoysvision/sdk'
import {
  Text,
  Flex,
  CardFooter,
  Button,
  AddCircleOutlineIcon,
  TabMenu,
  Tab,
  Card,
  animationDuration,
} from '@envoysvision/uikit'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import FullPositionCard from '../../components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { usePairs } from '../../hooks/usePairs'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import Dots from '../../components/Loader/Dots'
import Page from '../../components/Layout/Page'
import { Wrapper } from '../Swap/components/styleds'
import { useRouter } from 'next/router'
import AppHeader from '../../components/App/AppHeader'
import { PageContainer } from '../../components/Layout/PageContainer'
import { LightCard } from '../../components/Card'

export const Body = styled(Card)`
  padding: 30px 20px;
  border-radius: 16px;
`

const ThinText = styled(Text)`
  opacity: 0.7;
  font-weight: 700;
`

export const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBorder};
  opacity: 0.5;
  height: 1px;
  margin: 10px 0;
  width: 100%;
`

export default function Pool() {
  const thisTabIndex = 1
  const router = useRouter()
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const [tabClicked, setTabClicked] = useState<number>(thisTabIndex)
  const [isAddLoading, setIsAddLoading] = useState<boolean>(false)
  const [isFindLoading, setIsFindLoading] = useState<boolean>(false)

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs],
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens,
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances],
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity0 = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))
  const allV2PairsWithLiquidity = [...allV2PairsWithLiquidity0, ...allV2PairsWithLiquidity0]
  const renderBody = () => {
    if (allV2PairsWithLiquidity?.length > 0) {
      return allV2PairsWithLiquidity.map((v2Pair, index) => (
        <>
          {index > 0 && <Divider />}
          <FullPositionCard
            key={v2Pair.liquidityToken.address}
            pair={v2Pair}
            style={{ marginBottom: index < allV2PairsWithLiquidity.length - 1 ? '16px' : 0 }}
            background={'transparent'}
          />
        </>
      ))
    }
    return <></>
  }
  const renderEmptyBody = () => {
    if (allV2PairsWithLiquidity?.length > 0) {
      return <></>
    }
    if (!account) {
      return (
        <Text color="textSubtle" textAlign="center">
          {t('Connect to a wallet to view your liquidity.')}
        </Text>
      )
    }
    if (v2IsLoading) {
      return (
        <Text color="textSubtle" textAlign="center">
          <Dots>{t('Loading')}</Dots>
        </Text>
      )
    }
    return (
      <ThinText color="primary" textAlign="center">
        {t('No liquidity found.')}
      </ThinText>
    )
  }

  const handleTabClick = (newTabIndex) => {
    setTabClicked(newTabIndex)
    if (newTabIndex === 0) {
      router.prefetch('/liquidity').then(() => {
        setTimeout(() => {
          return router.push('/swap')
        }, animationDuration * 2)
      })
    }
  }

  const handleFindLp = () => {
    setIsFindLoading(true)
    router.push('/find')
  }

  const handleAdd = () => {
    setIsAddLoading(true)
    router.push('/add')
  }

  const findLabel = <b>{t('Find other LP tokens')}</b>

  return (
    <Page autoWidth={true}>
      <PageContainer>
        <AppHeader title={t('Your Liquidity')} subtitle={t('Remove liquidity to receive tokens back')} noSettings>
          <Flex position={'relative'} alignItems={'center'} width={'100%'}>
            <TabMenu activeIndex={thisTabIndex} nextIndex={tabClicked} onItemClick={handleTabClick} fixedForItems={2}>
              <Tab>{t('Swap')}</Tab>
              <Tab>{t('Liquidity')}</Tab>
            </TabMenu>
          </Flex>
        </AppHeader>
        <Wrapper id="liquidity-page" pb={'0 !important'}>
          {renderBody()}
          <LightCard background={'transparent'} mt={'16px'} padding="24px 20px">
            {renderEmptyBody()}
            {account && !v2IsLoading && (
              <Flex flexDirection="column" alignItems="center" mt={'20px'}>
                <ThinText color="primary" mb="17px" fontSize={'14px'}>
                  {t("Don't see a pool you joined?")}
                </ThinText>
                <Button
                  id="import-pool-link"
                  variant="tertiary"
                  as="a"
                  scale="sm"
                  onClick={handleFindLp}
                  disabled={isFindLoading}
                  height={'40px'}
                >
                  {isFindLoading ? <Dots>{findLabel}</Dots> : findLabel}
                </Button>
              </Flex>
            )}
          </LightCard>
        </Wrapper>
        <CardFooter style={{ textAlign: 'center' }}>
          <Button
            id="join-pool-button"
            width="100%"
            scale="lg"
            startIcon={<AddCircleOutlineIcon color="white" />}
            disabled={isAddLoading}
            onClick={handleAdd}
          >
            {isAddLoading ? <Dots>{t('Add Liquidity')}</Dots> : t('Add Liquidity')}
          </Button>
        </CardFooter>
      </PageContainer>
    </Page>
  )
}
