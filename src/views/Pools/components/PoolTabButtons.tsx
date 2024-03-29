import React from 'react'
import { NextLinkFromReactRouter } from 'components/NextLink'
// import { ViewMode } from 'state/user/actions'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem, Toggle, Text, NotificationDot, useMatchBreakpoints } from '@envoysvision/uikit'
import { useTranslation } from 'contexts/Localization'
// import ToggleView from './ToggleView/ToggleView'

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const TextContainer = styled.div<{ opacity?: number }>`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  text-align: center;

  color: ${({ theme }) => theme.colors.text};
  opacity: ${({ opacity }) => opacity ?? 1.0};

  flex: none;
  order: 0;
  flex-grow: 0;

  user-select: none;
`

/*
const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`
*/

const Space = styled.div<{ size: number }>`
  min-width: ${({ size }) => size + 'px'};
  height: 100%;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;

  a {
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 10px;
    padding-right: 10px;
    height: auto;
  }
`

const PoolTabButtons = ({ stakedOnly, setStakedOnly, hasStakeInFinishedPools, viewMode, setViewMode }) => {
  const router = useRouter()

  const { t } = useTranslation()

  const isExact = router.asPath === '/pools'

  // const viewModeToggle = <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />

  const { isMobile } = useMatchBreakpoints()
  const mobileStyle = isMobile ? { margin: '10px 0px' } : {}

  const liveOrFinishedSwitch = (
    <Wrapper style={mobileStyle}>
      <ButtonMenu activeIndex={isExact ? 0 : 1} scale="sm" variant="tevd">
        <ButtonMenuItem as={NextLinkFromReactRouter} to="/pools" replace>
          {t('Live')}
        </ButtonMenuItem>
        <NotificationDot show={hasStakeInFinishedPools}>
          <ButtonMenuItem id="finished-pools-button" as={NextLinkFromReactRouter} to="/pools/history" replace>
            {t('Finished')}
          </ButtonMenuItem>
        </NotificationDot>
      </ButtonMenu>
    </Wrapper>
  )

  const stakedOnlySwitch = (
    <ToggleWrapper>
      <Toggle
        style={mobileStyle}
        id="staked-only"
        checked={stakedOnly}
        onChange={() => setStakedOnly(!stakedOnly)}
        checkedColor="secondary"
        scale="ev"
      />
      <Space size={8} />
      <TextContainer> {t('Staked only')}</TextContainer>
    </ToggleWrapper>
  )

  return (
    <>
      {/* {viewModeToggle} */}
      {stakedOnlySwitch}
      <Space size={20} />
      {liveOrFinishedSwitch}
    </>
  )
}

export default PoolTabButtons
