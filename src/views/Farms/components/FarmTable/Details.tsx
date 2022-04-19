import React from 'react'
import styled from 'styled-components'
import { ChevronDownIcon, useMatchBreakpoints } from '@envoysvision/uikit'
import { useTranslation } from 'contexts/Localization'

interface DetailsProps {
  actionPanelToggled: boolean
}

const Container = styled.div`
  display: flex;
  width: 30px;
  justify-content: flex-end;
  padding-right: 8px;
  color: ${({ theme }) => theme.colors.primary};

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 0px;
  }
`

const ArrowIcon = styled(ChevronDownIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(180deg)' : 'rotate(0)')};
  height: 20px;
`

const Details: React.FC<DetailsProps> = ({ actionPanelToggled }) => {
  const { t } = useTranslation()
  const { isDesktop } = useMatchBreakpoints()

  return (
    <Container>
      {/* {!isDesktop && t('Details')} */}
      <ArrowIcon color="text" toggled={actionPanelToggled} />
    </Container>
  )
}

export default Details
