import React, { CSSProperties, useEffect, useState } from 'react'
import { Token } from '@envoysvision/sdk'
import { Button, Text, CheckmarkCircleIcon, Flex } from '@envoysvision/uikit'
import { RowFixed } from 'components/Layout/Row'
import Column, { AutoColumn } from 'components/Layout/Column'
import CurrencyLogo from 'components/Logo/CurrencyLogo'
import { ListLogo } from 'components/Logo'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCombinedInactiveList } from 'state/lists/hooks'
import styled from 'styled-components'
import { useIsUserAddedToken, useIsTokenActive } from 'hooks/Tokens'
import { useTranslation } from 'contexts/Localization'
import useIsKYCVerified from '../../hooks/useIsKYCVerified'
import { useRouter } from 'next/router'
import { getCompanyTokensList } from '../../state/companyTokens/selectors'

const TokenSection = styled.div<{ dim?: boolean }>`
  padding: 4px;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) auto;
  grid-gap: 8px;
  align-items: center;
  justify-content: center;

  opacity: ${({ dim }) => (dim ? '0.4' : '1')};
`

const CheckIcon = styled(CheckmarkCircleIcon)`
  height: 16px;
  width: 16px;
  margin-right: 6px;
  stroke: ${({ theme }) => theme.colors.success};
`

const NameOverflow = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
  font-size: 12px;
`

export default function ImportRow({
  token,
  style,
  dim,
  onDismiss,
  showImportView,
  setImportToken,
}: {
  token: Token
  style?: CSSProperties
  dim?: boolean
  showImportView: () => void
  onDismiss?: () => void
  setImportToken: (token: Token) => void
}) {
  // globals
  const { chainId } = useActiveWeb3React()

  const { t } = useTranslation()
  const router = useRouter()

  // check if token comes from list
  const inactiveTokenList = useCombinedInactiveList()
  const list = chainId && inactiveTokenList?.[chainId]?.[token.address]?.list

  // check if already active on list or local storage tokens
  const isAdded = useIsUserAddedToken(token)
  const isActive = useIsTokenActive(token)

  const [isKYCVerified, setIsKYCVerified] = useState(false)
  const isAccountVerified = useIsKYCVerified()

  useEffect(() => {
    setIsKYCVerified(isAccountVerified)
  }, [isAccountVerified])

  const companyTokens = getCompanyTokensList()
  const companyTokensAddresses = companyTokens.map((token) => (token as Token).address)
  const isCompanyToken = companyTokensAddresses.includes(token.address)
  const requireKyc = !isKYCVerified && isCompanyToken
  const handleImport = () => {
    if (requireKyc) {
      showImportView()
      onDismiss()
      router.push(`/settings`)
      return
    }

    if (setImportToken) {
      setImportToken(token)
    }
    showImportView()
  }

  return (
    <TokenSection style={style}>
      <CurrencyLogo currency={token} size="24px" style={{ opacity: dim ? '0.6' : '1' }} />
      <AutoColumn gap="4px" style={{ opacity: dim ? '0.6' : '1' }}>
        <Column>
          <Text>{token.symbol}</Text>
          <Text color="gray">
            <NameOverflow title={token.name}>{token.name}</NameOverflow>
          </Text>
        </Column>
        {list && list.logoURI && (
          <RowFixed>
            <Text small mr="4px" color="textSubtle">
              {t('via')} {list.name}
            </Text>
            <ListLogo logoURI={list.logoURI} size="12px" />
          </RowFixed>
        )}
      </AutoColumn>
      {!isActive && !isAdded ? (
        <Flex alignItems="center">
          <Text small color="danger" textAlign={'right'} mr={'8px'}>
            KYC verification required
          </Text>
          <Button width="fit-content" onClick={handleImport}>
            {requireKyc ? t('Verify') : t('Import')}
          </Button>
        </Flex>
      ) : (
        <RowFixed style={{ minWidth: 'fit-content' }}>
          <CheckIcon />
          <Text color="success">Active</Text>
        </RowFixed>
      )}
    </TokenSection>
  )
}
