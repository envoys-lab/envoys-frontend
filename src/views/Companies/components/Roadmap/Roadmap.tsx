import React, { useState } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import { Button, Flex, useMatchBreakpoints } from '@envoysvision/uikit'
import { BaseCompany } from '../../utils'
import Card from '../../../../components/Card'
import { useTranslation } from '../../../../contexts/Localization'

const RoadmapSteps = styled(Flex)`
  position: relative;
  flex-direction: column;
  &:before {
    display: block;
    position: absolute;
    width: 2px;
    height: 100%;
    left: calc(50%);
    content: '';
    border-right: 2px dashed ${({ theme }) => theme.colors.cardBorder};
    z-index: 0;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    &:before {
      display: none;
    }
  }
  &:not(.expanded) .toHide {
    display: none;
  }
`

const RoadmapStage = styled(Flex)`
  align-items: flex-start;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  padding-bottom: 8px;
  width: 100%;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 32px;
    justify-content: flex-end;
    width: 180px;
    padding-bottom: 0;
    transform: translateY(25%);
    &:before {
      display: block;
      position: absolute;
      width: 16px;
      height: 16px;
      right: -9px;
      content: '';
      background-color: ${({ theme }) => theme.colors.backgroundAlt};
      border: 2px solid ${({ theme }) => theme.colors.cardBorder};
      border-radius: 16px;
    }
  }
`

const RoadmapDescription = styled(Flex)`
  box-sizing: border-box;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
  padding-bottom: 32px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-bottom: 0;
    width: auto;
    padding-left: 32px;
    flex-direction: row;
    align-items: center;
    border-left: 2px dashed ${({ theme }) => theme.colors.cardBorder};
    &.first:before,
    &.last:before {
      display: block;
      position: absolute;
      width: 16px;
      content: '';
      background-color: ${({ theme }) => theme.colors.backgroundAlt};
      left: -8px;
    }
    &.first:before {
      height: 25%;
      top: 0;
    }
    &.last:before {
      height: calc(75% - 16px);
      bottom: 0;
    }
  }
`

const ShowHideButton = styled(Button)`
  position: relative;
  z-index: 1;
  margin: 0 auto;
`

const Roadmap: React.FC<{ company: BaseCompany }> = ({ company }) => {
  const limit = 3
  const { isMobile } = useMatchBreakpoints()
  const totalSteps = company.roadmap.length
  const [isExpanded, setIsExpanded] = useState(totalSteps < limit)
  const { t } = useTranslation()
  return (
    <RoadmapSteps className={classNames({ expanded: isExpanded })}>
      {company.roadmap.map((road, index) => (
        <Flex key={`company-roadmap-item-${index}`} className={classNames({ toHide: index >= limit })}>
          {!isMobile && <RoadmapStage>{road.title}</RoadmapStage>}
          <RoadmapDescription className={classNames({ first: !index, last: index === totalSteps - 1 })}>
            {isMobile && <RoadmapStage>{road.title}</RoadmapStage>}
            <Card>{road.description}</Card>
          </RoadmapDescription>
        </Flex>
      ))}
      {totalSteps > limit && (
        <ShowHideButton scale={'md'} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? t('Hide') : t('Show all')}
        </ShowHideButton>
      )}
    </RoadmapSteps>
  )
}

export default Roadmap
