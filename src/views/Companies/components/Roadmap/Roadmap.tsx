import React from 'react'
import { BaseCompany } from '../../utils'
import { Flex } from '@envoysvision/uikit'
import styled from 'styled-components'

const StyledFlexCell = styled(Flex)`
  border-left: 1px dashed ${({ theme }) => theme.colors.cardBorder};
  position: relative;
`

const Roadmap: React.FC<{ company: BaseCompany }> = ({ company }) => {
  return (
    <Flex flexDirection={'column'}>
      {company.roadmap.map((road, index) => (
        <StyledFlexCell key={`company-roadmap-item-${index}`}>{JSON.stringify(road)}</StyledFlexCell>
      ))}
    </Flex>
  )
}

export default Roadmap
