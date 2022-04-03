import React from 'react'
import { Farm } from '../types'
import { Flex, Text } from '@envoysvision/uikit'
import { CenterFlexLink, SearchResultBox } from './styles'
import { AutoRow } from '../../Layout/Row'
import { TokenPairImage } from '../../TokenImage'

interface ResultGroupProps {
  item: Farm
}

const SearchItemCard: React.FC<ResultGroupProps> = ({ item }) => {
  return (
    <SearchResultBox p={'10px'} background={'white'}>
      <CenterFlexLink href={`/info/pool/${item.lpAddresses['56']}`}>
        <TokenPairImage primaryToken={item.token} secondaryToken={item.quoteToken} height={20} width={20} />
        <Flex mx={'16px'} width={'100%'}>
          <AutoRow>
            <Text thin fontSize={'18px'}>
              {item.token.symbol}/{item.quoteToken.symbol}
            </Text>
            {/*<BadgeButton scale={"xs"} variant={"secondary"}>
                            <Text color={"darkClear"} thin small m={"4px"} bold>???</Text>
                        </BadgeButton>*/}
          </AutoRow>
        </Flex>
      </CenterFlexLink>
    </SearchResultBox>
  )
}

export default SearchItemCard
