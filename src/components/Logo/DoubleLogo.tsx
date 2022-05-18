import { Currency } from '@envoysvision/sdk'
import React from 'react'
import styled from 'styled-components'
import CurrencyLogo from './CurrencyLogo'

const Wrapper = styled.div<{ margin: boolean; width: number; height: number }>`
  display: flex;
  flex-direction: row;
  margin-right: ${({ margin }) => margin && '4px'};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  position: relative;
`

interface DoubleCurrencyLogoProps {
  margin?: boolean
  size?: number
  currency0?: Currency
  currency1?: Currency
}

export default function DoubleCurrencyLogo({
  currency0,
  currency1,
  size = 20,
  margin = false,
}: DoubleCurrencyLogoProps) {
  const commonProps = {
    size: `${size.toString()}px`,
  }
  const resultWidth = size * 1.8
  return (
    <Wrapper margin={margin} width={resultWidth} height={size}>
      {currency0 && <CurrencyLogo currency={currency0} {...commonProps} style={{ left: 0, position: 'absolute' }} />}
      {currency1 && <CurrencyLogo currency={currency1} {...commonProps} style={{ right: 0, position: 'absolute' }} />}
    </Wrapper>
  )
}
