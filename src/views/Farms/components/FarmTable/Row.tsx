import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { useMatchBreakpoints } from '@envoysvision/uikit'
import { useTranslation } from 'contexts/Localization'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import { useFarmUser } from 'state/farms/hooks'

import Apr, { AprProps } from './Apr'
import Farm, { FarmProps } from './Farm'
import Earned, { EarnedProps } from './Earned'
import Details from './Details'
import Multiplier, { MultiplierProps } from './Multiplier'
import Liquidity, { LiquidityProps } from './Liquidity'
import ActionPanel from './Actions/ActionPanel'
import CellLayout from './CellLayout'
import { DesktopColumnSchema, MobileColumnSchema } from '../types'

export interface RowProps {
  apr: AprProps
  farm: FarmProps
  earned: EarnedProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
}

interface RowPropsWithLoading extends RowProps {
  userDataReady: boolean
}

const cells = {
  apr: Apr,
  farm: Farm,
  earned: Earned,
  details: Details,
  multiplier: Multiplier,
  liquidity: Liquidity,
}

const CellInner = styled.div`
  margin: 14px 0 13px 0;
  height: 42px;
  display: flex;
  align-items: flex-start;
`

const DetailsContainer = styled.div`
  width: 83px;
`

const StyledTr = styled.div`
  cursor: pointer;
`

const ExpandContainer = styled.div<{ showBackground: boolean }>`
  ${({ showBackground }) => (showBackground ? 'background: #f9f9f9;' : '')}

  border-radius: 18px 18px 0 0;
  padding-left: 18px;
  padding-right: 18px;
`

const BorderContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(230, 230, 230, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const EarnedMobileCell = styled.td`
  padding: 16px 0 24px 16px;
`

const AprMobileCell = styled.td`
  padding-top: 16px;
  padding-bottom: 24px;

  ${({ theme }) => theme.mediaQueries.xs} {
    padding-left: 8px;
  }
`

const FarmMobileCell = styled.td`
  padding-top: 24px;
`

const ItemsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const FarmContainer = styled.div`
  width: 190px;
  display: flex;
`

const APRContainer = styled.div`
  width: 110px;
  display: flex;
  justify-content: center;
`

const ItemContainer = styled.div`
  width: 110px;
  display: flex;
  justify-content: flex-end;
`

const LiquidityContainer = styled(ItemContainer)`
  width: 95px;
`

const EarnedContainer = styled.div`
  margin-right: 38px;
`

const Row: React.FunctionComponent<RowPropsWithLoading> = (props) => {
  const { details, userDataReady } = props
  const hasStakedAmount = !!useFarmUser(details.pid).stakedBalance.toNumber()
  const [actionPanelExpanded, setActionPanelExpanded] = useState(hasStakedAmount)
  const shouldRenderChild = useDelayedUnmount(actionPanelExpanded, 300)
  const { t } = useTranslation()

  const toggleActionPanel = () => {
    setActionPanelExpanded(!actionPanelExpanded)
  }

  useEffect(() => {
    setActionPanelExpanded(hasStakedAmount)
  }, [hasStakedAmount])

  const { isDesktop, isMobile, isXlm, isXl, isMd } = useMatchBreakpoints()

  let lowResolution = isMobile || isMd

  const isSmallerScreen = isXlm || isXl || !isDesktop
  const tableSchema = isSmallerScreen ? MobileColumnSchema : DesktopColumnSchema
  const columnNames = tableSchema.map((column) => column.name)

  const instantiateComponent = (props, key, userDataReady) => {
    return React.createElement(cells[key], { ...props[key], userDataReady })
  }

  const handleRenderRow = () => {
    if (!lowResolution) {
      return (
        <StyledTr onClick={toggleActionPanel}>
          <ExpandContainer showBackground={actionPanelExpanded}>
            <BorderContainer>
              {Object.keys(props).map((key) => {
                const columnIndex = columnNames.indexOf(key)
                if (columnIndex === -1) {
                  return null
                }
                if (key === 'farm') {
                  return (
                    <FarmContainer key={key}>
                      <CellLayout label={t(tableSchema[columnIndex].label)}>
                        {instantiateComponent(props, key, userDataReady)}
                      </CellLayout>
                    </FarmContainer>
                  )
                }
              })}

              <ItemsContainer>
                {Object.keys(props).map((key) => {
                  const columnIndex = columnNames.indexOf(key)
                  if (columnIndex === -1) {
                    return null
                  }

                  switch (key) {
                    case 'farm':
                      return ''
                    case 'details':
                      return (
                        <DetailsContainer key={key}>
                          <CellLayout>
                            <Details actionPanelToggled={actionPanelExpanded} />
                          </CellLayout>
                        </DetailsContainer>
                      )
                    case 'apr':
                      return (
                        <APRContainer key={key}>
                          <CellInner>
                            <CellLayout center={true} label={t('APR')}>
                              <Apr {...props.apr} hideButton={isSmallerScreen} />
                            </CellLayout>
                          </CellInner>
                        </APRContainer>
                      )
                    case 'earned':
                      return (
                        <EarnedContainer key={key}>
                          <CellInner>
                            <CellLayout label={t(tableSchema[columnIndex].label)}>
                              {instantiateComponent(props, key, userDataReady)}
                            </CellLayout>
                          </CellInner>
                        </EarnedContainer>
                      )
                    case 'liquidity':
                      return (
                        <LiquidityContainer key={key}>
                          <CellInner>
                            <CellLayout label={t(tableSchema[columnIndex].label)}>
                              {instantiateComponent(props, key, userDataReady)}
                            </CellLayout>
                          </CellInner>
                        </LiquidityContainer>
                      )

                    default:
                      return (
                        <ItemContainer key={key}>
                          <CellInner>
                            <CellLayout label={t(tableSchema[columnIndex].label)}>
                              {instantiateComponent(props, key, userDataReady)}
                            </CellLayout>
                          </CellInner>
                        </ItemContainer>
                      )
                  }
                })}
              </ItemsContainer>
            </BorderContainer>
          </ExpandContainer>
        </StyledTr>
      )
    }

    return (
      <StyledTr onClick={toggleActionPanel}>
        <ExpandContainer showBackground={actionPanelExpanded}>
          <td>
            <tr>
              <FarmMobileCell>
                <CellLayout>
                  <Farm {...props.farm} />
                </CellLayout>
              </FarmMobileCell>
            </tr>
            <tr>
              <EarnedMobileCell>
                <CellLayout label={t('Earned')}>
                  <Earned {...props.earned} userDataReady={userDataReady} />
                </CellLayout>
              </EarnedMobileCell>
              <AprMobileCell>
                <CellLayout label={t('APR')}>
                  <Apr {...props.apr} hideButton />
                </CellLayout>
              </AprMobileCell>
            </tr>
          </td>
          <td>
            <CellInner>
              <CellLayout>
                <Details actionPanelToggled={actionPanelExpanded} />
              </CellLayout>
            </CellInner>
          </td>
        </ExpandContainer>
      </StyledTr>
    )
  }

  return (
    <>
      {handleRenderRow()}
      {shouldRenderChild && (
        <div>
          <div>
            <ActionPanel {...props} expanded={actionPanelExpanded} />
          </div>
        </div>
      )}
    </>
  )
}

export default Row
