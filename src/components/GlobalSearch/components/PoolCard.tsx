import React from 'react'
import { Pool } from '../types'
import { Flex, Text } from '@envoysvision/uikit'
import { CenterFlex, SearchResultBox } from './styles'
import { TokenImage } from '../../TokenImage'
import { Token } from '@envoysvision/sdk'

interface ResultGroupProps {
  item: Pool
}

const SearchItemCard: React.FC<ResultGroupProps> = ({ item }) => {
  return (
    <SearchResultBox p={'10px'} background={'white'}>
      <CenterFlex>
        <TokenImage token={item.earningToken as Token} width={20} height={20} />
        <Flex mx={'16px'} width={'100%'}>
          <Text thin fontSize={'18px'}>
            {item.earningToken.symbol}
          </Text>
        </Flex>
      </CenterFlex>
    </SearchResultBox>
  )
}

export default SearchItemCard
