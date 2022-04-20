import React from 'react'
import { Currency, Pair } from '@envoysvision/sdk'
import { Button, Text, useModal, Flex, Box, TokenIcon } from '@envoysvision/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import { CurrencyLogo, DoubleCurrencyLogo } from '../Logo'

import { RowBetween } from '../Layout/Row'
import { Input as NumericalInput } from './NumericalInput'
import CurrencyEquivalent from './CurrencyEquivalent'

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  // padding: ${({ selected }) => (selected ? '0 0.5rem 0.75rem 1rem' : '0 0.75rem 0.75rem 1rem')};
  padding: 0 1rem;
`
const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })`
  padding: 0 0.5rem;
`
const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0 1rem;
`
const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  z-index: 1;
`
const Container = styled.div<ContainerProps>`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundPage};
  height: ${(props: ContainerProps) => (props.hideBalance ? '65px' : '100px')};
  padding: 10px;
  display: flex;
  justify-content: space-between;
`

const CurrencySelect = styled(Flex)`
  align-items: center;
  z-index: 2;
  justify-content: flex-start;
  flex-grow: 0;
  flex-direction: column;
  > button {
    background: ${({ theme }) => theme.colors.backgroundAlt};
    padding: 0;
    height: auto;
    border-radius: 14px;
    > * {
      margin: 10px;
    }
  }
`

const CurrencyInput = styled(Flex)`
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`

interface ContainerProps {
  hideBalance: boolean
}

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  useBackInsteadOfDismiss?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
}
export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  otherCurrency,
  id,
  showCommonBases,
}: CurrencyInputPanelProps) {
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const { t } = useTranslation()
  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
    />,
  )
  return (
    <Box id={id} position={'relative'} width={'100%'}>
      <InputPanel>
        <Container hideBalance={hideBalance && !showMaxButton}>
          <CurrencySelect>
            <CurrencySelectButton
              className="open-currency-select-button"
              selected={!!currency}
              onClick={() => {
                if (!disableCurrencySelect) {
                  onPresentCurrencyModal()
                }
              }}
            >
              <Flex
                alignItems="center"
                justifyContent="space-between"
                style={{ opacity: disableCurrencySelect ? 0.7 : 1 }}
              >
                {pair ? (
                  <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
                ) : currency ? (
                  <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
                ) : null}
                {pair ? (
                  <Text id="pair" bold>
                    {pair?.token0.symbol}:{pair?.token1.symbol}
                  </Text>
                ) : (
                  <Flex alignItems={'center'}>
                    {!currency && <TokenIcon mr={2} />}
                    <Text small id="pair">
                      {(currency && currency.symbol && currency.symbol.length > 20
                        ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                            currency.symbol.length - 5,
                            currency.symbol.length,
                          )}`
                        : currency?.symbol) || t('Select a currency')}
                    </Text>
                  </Flex>
                )}
              </Flex>
            </CurrencySelectButton>
            {account && !hideBalance && (
              <Text
                onClick={onMax}
                color="textSubtle"
                fontSize="14px"
                style={{ marginTop: '5px', display: 'inline', cursor: 'pointer' }}
              >
                {!!currency
                  ? t('Balance: %balance%', { balance: selectedCurrencyBalance?.toSignificant(6) ?? t('Loading') })
                  : ' '}
              </Text>
            )}
          </CurrencySelect>
          <CurrencyInput>
            <LabelRow>
              <RowBetween>
                <NumericalInput
                  className="token-amount-input"
                  value={value}
                  onUserInput={(val) => {
                    onUserInput(val)
                  }}
                />
              </RowBetween>
            </LabelRow>
            <InputRow selected={false} style={{ paddingRight: '1rem' }}>
              <CurrencyEquivalent amount={value} currency={currency} />
            </InputRow>
            {/* <InputRow selected={disableCurrencySelect}>
              {account && currency && showMaxButton && label !== 'To' && (
                <Button onClick={onMax} scale="xs" variant="secondary">
                  MAX
                </Button>
              )}
            </InputRow> */}
          </CurrencyInput>
        </Container>
      </InputPanel>
    </Box>
  )
}
