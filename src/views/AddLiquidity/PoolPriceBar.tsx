import { Currency, Percent, Price } from '@envoysvision/sdk'
import React from 'react'
import { Text } from '@envoysvision/uikit'
import { useTranslation } from 'contexts/Localization'
import { AutoColumn } from '../../components/Layout/Column'
import { AutoRow } from '../../components/Layout/Row'
import { ONE_BIPS } from '../../config/constants'
import { Field } from '../../state/mint/actions'
import styled from "styled-components";

const ThinText = styled(Text).attrs({
  thin: true,
  color: "primary",
  small: true
})`
  font-weight: 700;
`

function PoolPriceBar({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price,
}: {
  currencies: { [field in Field]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  price?: Price
}) {
  const { t } = useTranslation()
  return (
    <AutoColumn gap="md">
      <AutoRow justify="space-around" gap="4px">
        <AutoColumn justify="center">
          <ThinText>{price?.toSignificant(6) ?? '-'}</ThinText>
          <ThinText pt={1}>
            {t('%assetA% per %assetB%', {
              assetA: currencies[Field.CURRENCY_B]?.symbol ?? '',
              assetB: currencies[Field.CURRENCY_A]?.symbol ?? '',
            })}
          </ThinText>
        </AutoColumn>
        <AutoColumn justify="center">
          <ThinText>{price?.invert()?.toSignificant(6) ?? '-'}</ThinText>
          <ThinText pt={1}>
            {t('%assetA% per %assetB%', {
              assetA: currencies[Field.CURRENCY_A]?.symbol ?? '',
              assetB: currencies[Field.CURRENCY_B]?.symbol ?? '',
            })}
          </ThinText>
        </AutoColumn>
        <AutoColumn justify="center">
          <Text thin small bold>
            {noLiquidity && price
              ? '100'
              : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
            %
          </Text>
          <ThinText pt={1}>
            {t('Share of Pool')}
          </ThinText>
        </AutoColumn>
      </AutoRow>
    </AutoColumn>
  )
}

export default PoolPriceBar
