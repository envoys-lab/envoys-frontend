import React from 'react'
import { Flex, Image, Text } from '@envoysvision/uikit'
import styled from 'styled-components'
import { Company } from '../types'

import { AutoColumn } from '../../Layout/Column'
import { SearchResultBox, BadgeButton, FlexLink } from './styles'

interface ResultGroupProps {
  item: Company
}

const FakeLink = styled(Text)`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.primary};
  }
`

const SearchItemCard: React.FC<ResultGroupProps> = ({ item }) => {
  const realLogoUrl = item.logoUrl !== 'https://cloud.example/logo' ? item.logoUrl : '/images/company.png'
  const stage = item.stages.find((stage) => stage?.status === item.status)
  const openCompanyLink = (e) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(item.homePageUrl, '_blank')
  }
  return (
    <SearchResultBox p={'10px'} background={'white'}>
      <FlexLink mr={'4px'} href={`/companies/${item._id}`}>
        <Image src={realLogoUrl} width={20} height={20} mt={'4px'} />
        <Flex mx={'16px'} width={'100%'}>
          <AutoColumn gap={'sm'}>
            <Text thin fontSize={'18px'}>
              {item.name}
            </Text>
            {stage && (
              <Text thin small>
                {stage?.startDate} - {stage?.endDate}
              </Text>
            )}
            <FakeLink thin small onClick={openCompanyLink}>
              {item.homePageUrl}
            </FakeLink>
          </AutoColumn>
        </Flex>
        <BadgeButton scale={'xs'} variant={'secondary'}>
          <Text color={'success'} small m={'4px'} bold>
            {item.status}
          </Text>
        </BadgeButton>
      </FlexLink>
    </SearchResultBox>
  )
}

export default SearchItemCard
