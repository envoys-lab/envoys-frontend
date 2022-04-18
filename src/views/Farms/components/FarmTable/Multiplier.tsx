import React from 'react'
import styled from 'styled-components'
import { Text, HelpIcon, Skeleton, useTooltip } from '@envoysvision/uikit'
import { useTranslation } from 'contexts/Localization'

const ReferenceElement = styled.div`
  display: inline-block;
`

export interface MultiplierProps {
  multiplier: string
}

const MultiplierWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  width: 100%;
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Multiplier: React.FunctionComponent<MultiplierProps> = ({ multiplier }) => {
  const displayMultiplier = multiplier ? multiplier.toLowerCase() : <Skeleton width={30} />
  const { t } = useTranslation()
  const tooltipContent = (
    <>
      <Text>
        {t(
          'The Multiplier represents the proportion of EVT rewards each farm receives, as a proportion of the EVT produced each block.',
        )}
      </Text>
      <Text my="24px">
        {t('For example, if a 1x farm received 1 EVT per block, a 40x farm would receive 40 EVT per block.')}
      </Text>
      <Text>{t('This amount is already included in all APR calculations for the farm.')}</Text>
    </>
  )
  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, {
    placement: 'top-end',
    tooltipOffset: [20, 10],
  })

  return (
    <Container>
      <MultiplierWrapper>{displayMultiplier}</MultiplierWrapper>
      {/* <ReferenceElement ref={targetRef}>
        <HelpIcon color="textSubtle" />
      </ReferenceElement> */}
      {tooltipVisible && tooltip}
    </Container>
  )
}

export default Multiplier
