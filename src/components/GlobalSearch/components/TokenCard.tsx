import React from 'react'
import styled from 'styled-components'
import { Flex, Image, SunIcon, Text } from '@envoysvision/uikit'

import { Token } from '../types'
import { AutoColumn } from '../../Layout/Column'
import { SearchResultBox } from './styles'

const StyledSunIcon = styled(SunIcon)`
  color: ${({ theme }) => theme.colors.primary};
`

interface ResultGroupProps {
  item: Token
}

const SearchItemCard: React.FC<ResultGroupProps> = ({ item }) => {
  return (
    <SearchResultBox p={'10px'} background={'white'}>
      <Flex>
        <Image src={item.logoURI} width={20} height={20} mt={'4px'} />
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
            <Text thin small>
              {item.address}
            </Text>
          </AutoColumn>
        </Flex>
        <div>
          <StyledSunIcon width={16} height={16} />
        </div>
      </Flex>
    </SearchResultBox>
  )
}

export default SearchItemCard
