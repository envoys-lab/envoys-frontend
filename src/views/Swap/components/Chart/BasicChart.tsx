import { ArrowSwitch, Box, ButtonMenu, ButtonMenuItem, Flex, Link, Text } from '@envoysvision/uikit'
import { useTranslation } from 'contexts/Localization'
import React, { useState } from 'react'
import { useFetchPairPrices } from 'state/swap/hooks'
import dynamic from 'next/dynamic'
import { PairDataTimeWindowEnum } from 'state/swap/types'
import { LineChartLoader } from 'views/Info/components/ChartLoaders'
import NoChartAvailable from './NoChartAvailable'
import TokenDisplay from './TokenDisplay'
import { getTimeWindowChange } from './utils'

const SwapLineChart = dynamic(() => import('./SwapLineChart'), {
  ssr: false,
  loading: () => <LineChartLoader />,
})

const BasicChart = ({
  token0Address,
  token1Address,
  isChartExpanded,
  inputCurrency,
  outputCurrency,
  isMobile,
  currentSwapPrice,
  onTokenSwitch,
}) => {
  const [timeWindow, setTimeWindow] = useState<PairDataTimeWindowEnum>(0)

  const { pairPrices = [], pairId } = useFetchPairPrices({
    token0Address,
    token1Address,
    timeWindow,
    currentSwapPrice,
  })
  const [hoverValue, setHoverValue] = useState<number | undefined>()
  const [hoverDate, setHoverDate] = useState<string | undefined>()
  const valueToDisplay = hoverValue || pairPrices[pairPrices.length - 1]?.value
  const { changePercentage, changeValue } = getTimeWindowChange(pairPrices)
  const isChangePositive = changeValue >= 0
  const chartHeight = isChartExpanded ? 'calc(100% - 120px)' : '378px'
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const currentDate = new Date().toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  // Sometimes we might receive array full of zeros for obscure tokens while trying to derive data
  // In that case chart is not useful to users
  const isBadData =
    pairPrices &&
    pairPrices.length > 0 &&
    pairPrices.every(
      (price) => !price.value || price.value === 0 || price.value === Infinity || Number.isNaN(price.value),
    )

  if (isBadData) {
    return (
      <NoChartAvailable
        token0Address={token0Address}
        token1Address={token1Address}
        pairAddress={pairId}
        isMobile={isMobile}
      />
    )
  }

  return (
    <>
      <Flex flexDirection="column" alignItems={'stretch'} p="20px">
        <Flex flexDirection="row" alignItems={'flex-start'} justifyContent="space-between">
          <Flex flexDirection="column" justifyContent={'flex-start'}>
            <TokenDisplay
              value={pairPrices?.length > 0 && valueToDisplay}
              inputSymbol={inputCurrency?.symbol}
              outputSymbol={outputCurrency?.symbol}
            >
              <Link onClick={onTokenSwitch}>
                <ArrowSwitch color={'primary'} height={14} mx={'16px'} />
              </Link>
              <Text color={isChangePositive ? 'success' : 'failure'} fontSize="14px">
                {`${isChangePositive ? '+' : ''}${changeValue.toFixed(3)} (${changePercentage}%)`}
              </Text>
            </TokenDisplay>
            <Flex flexDirection="row">
              <Text small style={{ opacity: 0.7 }}>
                {hoverDate || currentDate}
              </Text>
            </Flex>
          </Flex>
          <Box>
            <ButtonMenu activeIndex={timeWindow} onItemClick={setTimeWindow} scale="sm" slim>
              <ButtonMenuItem mx={1} my={2}>
                {t('24H')}
              </ButtonMenuItem>
              <ButtonMenuItem mx={1} my={2}>
                {t('1W')}
              </ButtonMenuItem>
              <ButtonMenuItem mx={1} my={2}>
                {t('1M')}
              </ButtonMenuItem>
              <ButtonMenuItem mx={1} my={2}>
                {t('1Y')}
              </ButtonMenuItem>
            </ButtonMenu>
          </Box>
        </Flex>
      </Flex>
      <Box height={isMobile ? '100%' : chartHeight} width="100%" style={{ overflow: 'hidden' }}>
        <SwapLineChart
          data={pairPrices}
          setHoverValue={setHoverValue}
          setHoverDate={setHoverDate}
          isChangePositive={isChangePositive}
          timeWindow={timeWindow}
        />
      </Box>
    </>
  )
}

export default React.memo(BasicChart, (prev, next) => {
  return (
    prev.token0Address === next.token0Address &&
    prev.token1Address === next.token1Address &&
    prev.isChartExpanded === next.isChartExpanded &&
    prev.isMobile === next.isMobile &&
    prev.isChartExpanded === next.isChartExpanded &&
    ((prev.currentSwapPrice !== null &&
      next.currentSwapPrice !== null &&
      prev.currentSwapPrice[prev.token0Address] === next.currentSwapPrice[next.token0Address] &&
      prev.currentSwapPrice[prev.token1Address] === next.currentSwapPrice[next.token1Address]) ||
      (prev.currentSwapPrice === null && next.currentSwapPrice === null))
  )
})
