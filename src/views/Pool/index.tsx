import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Pair } from '@envoysvision/sdk'
import { Text, Flex, CardFooter, Button, AddIcon, TabMenu, Tab, Card } from '@envoysvision/uikit'
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

export const Body = styled(Card)`
  padding: 30px 20px;
  border-radius: 16px;
`

const ThinText = styled(Text)`
  opacity: 0.7;
  font-weight: 700;
`

export default function Pool() {
  const router = useRouter()
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
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

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const renderBody = () => {
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
    if (allV2PairsWithLiquidity?.length > 0) {
      return allV2PairsWithLiquidity.map((v2Pair, index) => (
        <FullPositionCard
          key={v2Pair.liquidityToken.address}
          pair={v2Pair}
          mb={index < allV2PairsWithLiquidity.length - 1 ? '16px' : 0}
          background={'transparent'}
        />
      ))
    }
    return (
      <ThinText color="primary" textAlign="center">
        {t('No liquidity found.')}
      </ThinText>
    )
  }

  const handleTabClick = (newTabIndex) => {
    if (newTabIndex === 0) {
      return router.push('/swap')
    }
  }

  const handleFindLp = () => {
    setIsFindLoading(true);
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
            <TabMenu activeIndex={1} onItemClick={handleTabClick} fixedForItems={2}>
              <Tab>{t('Swap')}</Tab>
              <Tab>{t('Liquidity')}</Tab>
            </TabMenu>
          </Flex>
        </AppHeader>
        <Wrapper id="liquidity-page" pb={'0 !important'}>
          <Body background={'transparent'}>
            {renderBody()}
            {account && !v2IsLoading && (
              <Flex flexDirection="column" alignItems="center">
                <ThinText color="primary" my="16px">
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
          </Body>
        </Wrapper>
        <CardFooter style={{ textAlign: 'center' }}>
          <Button
            id="join-pool-button"
            width="100%"
            scale="lg"
            startIcon={<AddIcon color="white" />}
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
