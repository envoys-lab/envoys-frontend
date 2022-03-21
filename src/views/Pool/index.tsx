import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Pair } from '@envoysvision/sdk'
import {
  Text,
  Flex,
  CardFooter,
  Button,
  AddIcon,
  TabMenu, Tab, Card
} from '@envoysvision/uikit'
import Link from 'next/link'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import FullPositionCard from '../../components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { usePairs } from '../../hooks/usePairs'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import Dots from '../../components/Loader/Dots'
import { AppBody } from '../../components/App'
import Page from '../Page'
import { Wrapper} from "../Swap/components/styleds";
import { useRouter } from "next/router";
import AppHeader from "../../components/App/AppHeader";

export const StyledPoolContainer = styled(Flex)`
  flex-shrink: 0;
  flex-direction: column;
  height: fit-content;
  width: 440px;
`

export const Body = styled(Card)`
  background-color: ${({ theme }) => theme.colors.dropdownDeep};
`

export default function Pool() {
  const router = useRouter()
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()

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
        />
      ))
    }
    return (
      <Text color="textSubtle" textAlign="center">
        {t('No liquidity found.')}
      </Text>
    )
  }

  const handleTabClick = (newTabIndex) => {
    if (newTabIndex === 0) {
      return router.push('/swap');
    }
  };

  return (
    <Page>
      <AppBody>
        <StyledPoolContainer>
          <AppHeader title={t('Your Liquidity')} subtitle={t('Remove liquidity to receive tokens back')} noSettings>
            <Flex position={'relative'} alignItems={"center"} width={"100%"}>
              <TabMenu activeIndex={1} onItemClick={handleTabClick} fixedForItems={2}>
                <Tab>{t('Swap')}</Tab>
                <Tab>{t('Liquidity')}</Tab>
              </TabMenu>
            </Flex>
          </AppHeader>
          <Wrapper id="liquidity-page">
            <Body>
              {renderBody()}
              {account && !v2IsLoading && (
                <Flex flexDirection="column" alignItems="center" mt="24px">
                  <Text color="textSubtle" mb="8px">
                    {t("Don't see a pool you joined?")}
                  </Text>
                  <Link href="/find">
                    <Button id="import-pool-link" variant="secondary" scale="sm" as="a">
                      {t('Find other LP tokens')}
                    </Button>
                  </Link>
                </Flex>
              )}
            </Body>
          </Wrapper>
          <CardFooter style={{ textAlign: 'center' }}>
            <Link href="/add">
              <Button id="join-pool-button" width="100%" startIcon={<AddIcon color="white" />}>
                {t('Add Liquidity')}
              </Button>
            </Link>
          </CardFooter>
        </StyledPoolContainer>
      </AppBody>
    </Page>
  )
}
