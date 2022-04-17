import React from 'react'
import { Pool } from '../types'
import { Flex, Text } from '@envoysvision/uikit'
import { CenterFlexLink, SearchResultBox } from './styles'
import { TokenPairImage } from '../../TokenImage'
import { Token } from '@envoysvision/sdk'

interface ResultGroupProps {
  item: Pool
}

const SearchItemCard: React.FC<ResultGroupProps> = ({ item }) => {
  return (
    <SearchResultBox>
      <CenterFlexLink href={`/info/token/${item.earningToken.address}`}>
        <TokenPairImage
          primaryToken={item.earningToken as Token}
          secondaryToken={item.stakingToken as Token}
          height={20}
          width={20}
        />
        {/*<TokenImage token={item.earningToken as Token} width={20} height={20} />*/}
        <Flex mx={'16px'} width={'100%'}>
          <Text thin fontSize={'18px'}>
            {item.earningToken.symbol}
          </Text>
        </Flex>
      </CenterFlexLink>
    </SearchResultBox>
  )
}

export default SearchItemCard
