import React, { useEffect, useState } from 'react'
import { Token, Currency } from '@envoysvision/sdk'
import { Button, Text, ErrorIcon, Flex, Message, Checkbox, Link, Tag, Grid } from '@envoysvision/uikit'
import { AutoColumn } from 'components/Layout/Column'
import { useAddUserToken } from 'state/user/hooks'
import { getBscScanLink } from 'utils'
import truncateHash from 'utils/truncateHash'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCombinedInactiveList } from 'state/lists/hooks'
import { ListLogo } from 'components/Logo'
import { useTranslation } from 'contexts/Localization'
import { getCompanyTokensList } from 'state/companyTokens/selectors'
interface ImportProps {
  tokens: Token[]
  handleCurrencySelect?: (currency: Currency) => void
}

function ImportToken({ tokens, handleCurrencySelect }: ImportProps) {
  const { chainId } = useActiveWeb3React()

  const { t } = useTranslation()

  const [confirmed, setConfirmed] = useState(false)

  const [isAllCompanyTokens, setIsAllCompanyTokens] = useState(true)

  const addToken = useAddUserToken()

  const companyTokens = getCompanyTokensList()

  // use for showing import source on inactive tokens
  const inactiveTokenList = useCombinedInactiveList()

  const isTokenInCompanyList = (token: Token) => {
    /* @ts-ignore */
    return companyTokens.some((companyToken) => companyToken.address === token.address)
  }

  useEffect(() => {
    const arr = tokens.map((el) => isTokenInCompanyList(el))
    const notAllCompanyTokens = arr.some((el) => el === false)

    setIsAllCompanyTokens(!notAllCompanyTokens)
  }, [companyTokens, tokens])

  return (
    <AutoColumn gap="lg">
      <Message variant="warning">
        <Text>
          {t(
            'Anyone can create a BEP20 token on BSC with any name, including creating fake versions of existing tokens and tokens that claim to represent projects that do not have a token.',
          )}
          <br />
          <br />
          {t('If you purchase an arbitrary token, you may be unable to sell it back.')}
        </Text>
      </Message>

      {tokens.map((token) => {
        const list = chainId && inactiveTokenList?.[chainId]?.[token.address]?.list
        const companyToken = isTokenInCompanyList(token)
        const address = token.address ? `${truncateHash(token.address)}` : null
        return (
          <Grid key={token.address} gridTemplateRows="1fr 1fr 1fr" gridGap="4px">
            {list !== undefined && (
              <Tag
                variant="success"
                outline
                scale="sm"
                startIcon={list.logoURI && <ListLogo logoURI={list.logoURI} size="12px" />}
              >
                {t('via')} {list.name}
              </Tag>
            )}
            {list === undefined && !companyToken && (
              <Tag variant="failure" outline scale="sm" startIcon={<ErrorIcon color="failure" />}>
                {t('Unknown Source')}
              </Tag>
            )}
            <Flex alignItems="center">
              <Text mr="8px">{token.name}</Text>
              <Text>({token.symbol})</Text>
            </Flex>
            {chainId && (
              <Flex justifyContent="space-between" width="100%">
                <Text mr="4px">{address}</Text>
                <Link href={getBscScanLink(token.address, 'address', chainId)} external>
                  ({t('View on BscScan')})
                </Link>
              </Flex>
            )}
          </Grid>
        )
      })}

      <Flex justifyContent="space-between" alignItems="center">
        {!isAllCompanyTokens && (
          <Flex alignItems="center" onClick={() => setConfirmed(!confirmed)}>
            <Checkbox
              scale="sm"
              name="confirmed"
              type="checkbox"
              checked={confirmed}
              onChange={() => setConfirmed(!confirmed)}
            />
            <Text ml="8px" style={{ userSelect: 'none' }}>
              {t('I understand')}
            </Text>
          </Flex>
        )}
        <Button
          variant="danger"
          disabled={!confirmed && !isAllCompanyTokens}
          onClick={() => {
            tokens.forEach((token) => addToken(token))
            if (handleCurrencySelect) {
              handleCurrencySelect(tokens[0])
            }
          }}
          className=".token-dismiss-button"
        >
          {t('Import')}
        </Button>
      </Flex>
    </AutoColumn>
  )
}

export default ImportToken
