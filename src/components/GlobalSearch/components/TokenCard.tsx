import React from 'react'
import styled from 'styled-components'
import { Flex, Image, SunCheckIcon, Text } from '@envoysvision/uikit'

import { Token } from '../types'
import { AutoColumn } from '../../Layout/Column'
import { FlexLink, SearchResultBox } from './styles'

const StyledSunIcon = styled(SunCheckIcon)`
  color: ${({ theme }) => theme.colors.primary};
`

interface ResultGroupProps {
  item: Token
}

const SearchItemCard: React.FC<ResultGroupProps> = ({ item }) => {
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
              {/*<BadgeButton scale={"xs"} variant={"secondary"}>
                                <Text color={"secondary"} small m={"4px"} bold>{item.chainId}</Text>
                            </BadgeButton>*/}
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
