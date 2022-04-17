import React from 'react'
import styled from 'styled-components'
import { Flex, Image, Text, TokenLabelIcon } from '@envoysvision/uikit'

import { Token } from '../types'
import { AutoColumn } from '../../Layout/Column'
import { BadgeButton, FlexLink, SearchResultBox } from './styles'
import CurrencyEquivalent, { getTokenCurrencyEquivalent } from '../../CurrencyInputPanel/CurrencyEquivalent'

const StyledSunIcon = styled(TokenLabelIcon)`
  color: ${({ theme }) => theme.colors.primary};
`

interface ResultGroupProps {
  item: Token
}

const SearchItemCard: React.FC<ResultGroupProps> = ({ item }) => {
  const hasEquivalent = getTokenCurrencyEquivalent(item)
  return (
    <SearchResultBox>
      <FlexLink href={`/info/token/${item.address}`}>
        <div style={{ width: 20, flexShrink: 0 }}>
          <Image src={item.logoURI} width={20} height={20} mt={'4px'} />
        </div>
        <Flex mx={'16px'} width={'100%'}>
          <AutoColumn gap={'sm'}>
            <Flex>
              <Text thin fontSize={'18px'}>
                {item.name} ({item.symbol})
              </Text>
              {hasEquivalent && (
                <BadgeButton scale={'xs'} variant={'secondary'}>
                  <Text color={'secondary'} small m={'4px'} bold>
                    <CurrencyEquivalent currency={item} decimals={3} notation={'standard'} />
                  </Text>
                </BadgeButton>
              )}
            </Flex>
            <Text thin small overflow={'hidden'} style={{ textOverflow: 'ellipsis' }}>
              {item.address}
            </Text>
          </AutoColumn>
        </Flex>
        <div>
          <StyledSunIcon width={16} height={16} />
        </div>
      </FlexLink>
    </SearchResultBox>
  )
}

export default SearchItemCard
