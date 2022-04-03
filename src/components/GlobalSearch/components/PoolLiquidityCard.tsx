import React from 'react'
import { Liquidity } from '../types'
import { Flex, Text } from '@envoysvision/uikit'
import { CenterFlexLink, SearchResultBox } from './styles'
import { AutoRow } from '../../Layout/Row'
import { TokenPairImage } from '../../TokenImage'
import { Token } from '@envoysvision/sdk'

interface ResultGroupProps {
  item: Liquidity
}

const SearchItemCard: React.FC<ResultGroupProps> = ({ item }) => {
  return (
    <SearchResultBox p={'10px'} background={'white'}>
      <CenterFlexLink href={`/info/pool/${item.address}`}>
        <TokenPairImage
          primaryToken={item.token0 as Token}
          secondaryToken={item.token1 as Token}
          height={20}
          width={20}
        />
        <Flex mx={'16px'} width={'100%'}>
          <AutoRow>
            <Text thin fontSize={'18px'}>
              {item.token0.symbol}/{item.token1.symbol}
            </Text>
          </AutoRow>
        </Flex>
      </CenterFlexLink>
    </SearchResultBox>
  )
}

export default SearchItemCard
