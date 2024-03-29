import React, { CSSProperties, MutableRefObject, useCallback, useMemo } from 'react'
import { Currency, CurrencyAmount, currencyEquals, ETHER, Token } from '@envoysvision/sdk'
import { Text } from '@envoysvision/uikit'
import styled from 'styled-components'
import { FixedSizeList } from 'react-window'
import { wrappedCurrency } from 'utils/wrappedCurrency'
import { LightGreyCard } from 'components/Card'
import QuestionHelper from 'components/QuestionHelper'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCombinedActiveList } from '../../state/lists/hooks'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { useIsUserAddedToken, useAllInactiveTokens } from '../../hooks/Tokens'
import Column from '../Layout/Column'
import { RowBetween } from '../Layout/Row'
import { CurrencyLogo } from '../Logo'
import CircleLoader from '../Loader/CircleLoader'
import { isTokenOnList } from '../../utils'
import ImportRow from './ImportRow'
import CurrencyEquivalent from '../CurrencyInputPanel/CurrencyEquivalent'
import { getCompanyTokensList } from 'state/companyTokens/selectors'

function currencyKey(currency: Currency): string {
  return currency instanceof Token ? currency.address : currency === ETHER ? 'ETHER' : ''
}

const StyledBalanceText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  max-width: 8rem;
  text-overflow: ellipsis;
`

const FixedContentRow = styled.div`
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-gap: 16px;
  align-items: center;
`

function Balance({ balance }: { balance: CurrencyAmount }) {
  return <StyledBalanceText title={balance.toExact()}>{balance.toSignificant(4)}</StyledBalanceText>
}

const MenuItem = styled(RowBetween)<{ disabled: boolean; selected: boolean; kycRequired: boolean }>`
  padding: 4px 24px 4px 32px;
  height: 70px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) minmax(0, 72px);
  grid-gap: 8px;
  pointer-events: ${({ disabled, kycRequired }) => disabled && !kycRequired && 'none'};
  :hover {
    ${({ theme, disabled, kycRequired }) =>
      !(kycRequired || disabled) &&
      `
      background-color: ${theme.colors.background};
      cursor: pointer;
    `};
  }
  opacity: ${({ disabled, selected, kycRequired }) => (!kycRequired && (disabled || selected) ? 0.5 : 1)};
  ${({ kycRequired }) =>
    kycRequired &&
    `
    & * {
      opacity: 0.5;
    }
  `}
`

const KycText = styled(Text)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`

function CurrencyRow({
  currency,
  onSelect,
  onDismiss,
  isSelected,
  isDisabledCompanyToken,
  otherSelected,
  style,
}: {
  currency: Currency
  onSelect: () => void
  onDismiss: () => void
  isSelected: boolean
  isDisabledCompanyToken: boolean
  otherSelected: boolean
  style: CSSProperties
}) {
  const { account } = useActiveWeb3React()
  const key = currencyKey(currency)
  const selectedTokenList = useCombinedActiveList()
  const companyTokens = getCompanyTokensList()
  const isOnSelectedList = isTokenOnList(selectedTokenList, currency)
  const customAdded = useIsUserAddedToken(currency)
  const balance = useCurrencyBalance(account ?? undefined, currency)
  // only show add or remove buttons if not on selected list

  const isTokenInCompanyList = (currency) => {
    /* @ts-ignore */
    return companyTokens.some((companyToken) => companyToken.address === currency.address)
  }
  return (
    <MenuItem
      style={style}
      className={`token-item-${key}`}
      onClick={() => (isSelected ? null : isDisabledCompanyToken ? onDismiss() : onSelect())}
      disabled={isSelected}
      kycRequired={isDisabledCompanyToken}
      selected={otherSelected}
    >
      <CurrencyLogo currency={currency} size="32px" />
      <Column>
        <Text bold>{currency.symbol}</Text>
        <Text color="textSubtle" small ellipsis maxWidth="200px">
          {!isDisabledCompanyToken &&
            !isOnSelectedList &&
            customAdded &&
            !isTokenInCompanyList(currency) &&
            'Added by user •'}
          {currency.name}
        </Text>
      </Column>
      <Column style={{ justifySelf: 'flex-end', alignItems: 'flex-end', flexShrink: 0 }}>
        {isDisabledCompanyToken ? (
          <>
            <KycText small color="danger" textAlign={'right'}>
              KYC verification required
            </KycText>
          </>
        ) : (
          <>
            {!balance && account && <CircleLoader size={'16px'} />}
            {balance && balance.greaterThan(BigInt(0)) && (
              <>
                <Balance balance={balance} />
                <CurrencyEquivalent currency={currency} amount={balance.toExact()} />
              </>
            )}
          </>
        )}
      </Column>
    </MenuItem>
  )
}

export default function CurrencyList({
  height,
  currencies,
  isKYCVerified,
  companyTokens,
  selectedCurrency,
  onCurrencySelect,
  onDismiss,
  otherCurrency,
  fixedListRef,
  showETH,
  showImportView,
  setImportToken,
  breakIndex,
}: {
  height: number
  currencies: Currency[]
  isKYCVerified: boolean
  companyTokens: string[]
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  onDismiss: () => void
  otherCurrency?: Currency | null
  fixedListRef?: MutableRefObject<FixedSizeList | undefined>
  showETH: boolean
  showImportView: () => void
  setImportToken: (token: Token) => void
  breakIndex: number | undefined
}) {
  const itemData: (Currency | undefined)[] = useMemo(() => {
    let formatted: (Currency | undefined)[] = showETH ? [Currency.ETHER, ...currencies] : currencies
    if (breakIndex !== undefined) {
      formatted = [...formatted.slice(0, breakIndex), undefined, ...formatted.slice(breakIndex, formatted.length)]
    }
    return formatted
  }, [breakIndex, currencies, showETH])

  const { chainId } = useActiveWeb3React()

  const { t } = useTranslation()

  const inactiveTokens: {
    [address: string]: Token
  } = useAllInactiveTokens()

  const Row = useCallback(
    ({ data, index, style }) => {
      const currency: Currency = data[index]
      const token = wrappedCurrency(currency, chainId)
      const isKYCRequired =
        !isKYCVerified &&
        companyTokens.includes(token?.address) &&
        token.address != '0x75F8ADf88019E9B1d023fF4645DfAa350Bf3Fb04'

      const isSelected = Boolean(selectedCurrency && currencyEquals(selectedCurrency, currency))
      const otherSelected = Boolean(otherCurrency && currencyEquals(otherCurrency, currency))
      const handleSelect = () => onCurrencySelect(currency)

      const showImport = inactiveTokens && token && Object.keys(inactiveTokens).includes(token.address)

      if (index === breakIndex || !data) {
        return (
          <FixedContentRow style={style}>
            <LightGreyCard padding="8px 12px" borderRadius="8px">
              <RowBetween>
                <Text small>{t('Expanded results from inactive Token Lists')}</Text>
                <QuestionHelper
                  text={t(
                    "Tokens from inactive lists. Import specific tokens below or click 'Manage' to activate more lists.",
                  )}
                  ml="4px"
                />
              </RowBetween>
            </LightGreyCard>
          </FixedContentRow>
        )
      }

      if (showImport && token) {
        return (
          <ImportRow style={style} token={token} showImportView={showImportView} setImportToken={setImportToken} dim />
        )
      }
      return (
        <CurrencyRow
          style={style}
          currency={currency}
          isSelected={isSelected}
          isDisabledCompanyToken={isKYCRequired}
          onSelect={handleSelect}
          onDismiss={() => isKYCRequired && onDismiss()}
          otherSelected={otherSelected}
        />
      )
    },
    [
      chainId,
      inactiveTokens,
      onCurrencySelect,
      otherCurrency,
      selectedCurrency,
      setImportToken,
      showImportView,
      breakIndex,
      isKYCVerified,
      t,
    ],
  )

  const itemKey = useCallback((index: number, data: any) => currencyKey(data[index]), [])

  return (
    <FixedSizeList
      height={height}
      ref={fixedListRef as any}
      width="100%"
      itemData={itemData}
      itemCount={itemData.length}
      itemSize={70}
      itemKey={itemKey}
    >
      {Row}
    </FixedSizeList>
  )
}
