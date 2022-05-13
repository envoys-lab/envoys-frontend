import React, { useState } from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from '@envoysvision/uikit'
import { DeserializedPool, VaultKey } from 'state/types'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import NameCell from './Cells/NameCell'
import EarningsCell from './Cells/EarningsCell'
import IFOCreditCell from './Cells/IFOCreditCell'
import AprCell from './Cells/AprCell'
import TotalStakedCell from './Cells/TotalStakedCell'
import EndsInCell from './Cells/EndsInCell'
import ExpandActionCell from './Cells/ExpandActionCell'
import ActionPanel from './ActionPanel/ActionPanel'
import AutoEarningsCell from './Cells/AutoEarningsCell'
import AutoAprCell from './Cells/AutoAprCell'
import StakedCell from './Cells/StakedCell'
import CellLayout from 'views/Farms/components/FarmTable/CellLayout'

interface PoolRowProps {
  pool: DeserializedPool
  account: string
  userDataLoaded: boolean
}

const StyledRow = styled.div`
  background-color: transparent;
  /* display: flex; */
  cursor: pointer;
`

const BorderContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(230, 230, 230, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ExpandContainer = styled.div<{ showBackground: boolean }>`
  ${({ showBackground }) => (showBackground ? 'background: #f9f9f9;' : '')}

  border-radius: 18px 18px 0 0;
  padding-left: 8px;
  padding-right: 8px;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 12px;
    padding-right: 12px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    padding-left: 18px;
    padding-right: 18px;
  }
`

const ItemsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin-top: 14px;
`

const DetailsContainer = styled.div`
  width: 43px;
  min-width: 43px;
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 63px;
    min-width: 63px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 83px;
    min-width: 83px;
  }
  height: 55px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const PoolRow: React.FC<PoolRowProps> = ({ pool, account, userDataLoaded }) => {
  const { isXs, isSm, isMd, isLg, isXl, isXxl, isTablet, isDesktop } = useMatchBreakpoints()
  const isLargerScreen = isLg || isTablet
  const [expanded, setExpanded] = useState(false)
  const shouldRenderActionPanel = useDelayedUnmount(expanded, 300)

  const toggleExpanded = () => {
    setExpanded((prev) => !prev)
  }

  const isDefaultPool = pool.sousId === 0

  return (
    <>
      <StyledRow role="row" onClick={toggleExpanded}>
        <ExpandContainer showBackground={expanded}>
          <BorderContainer>
            <NameCell pool={pool} />
            <ItemsContainer>
              {pool.vaultKey ? (
                ((isDesktop && pool.vaultKey === VaultKey.IfoPool) || pool.vaultKey === VaultKey.CakeVault) && (
                  <AutoEarningsCell pool={pool} account={account} />
                )
              ) : (
                <EarningsCell pool={pool} account={account} userDataLoaded={userDataLoaded} />
              )}
              {pool.vaultKey === VaultKey.IfoPool ? (
                <IFOCreditCell account={account} />
              ) : isDesktop && isDefaultPool ? (
                <StakedCell pool={pool} account={account} userDataLoaded={userDataLoaded} />
              ) : null}
              {/* {isLargerScreen && !isDefaultPool && <TotalStakedCell pool={pool} />} */}
              {(isTablet || isDesktop) && (pool.vaultKey ? <AutoAprCell pool={pool} /> : <AprCell pool={pool} />)}
              {!isMd && !(isDesktop && isXl) && isDefaultPool && <TotalStakedCell pool={pool} />}
              {(isTablet || isDesktop) && !isDefaultPool && <EndsInCell pool={pool} />}
              <DetailsContainer>
                <CellLayout>
                  <ExpandActionCell expanded={expanded} isFullLayout={isLargerScreen} />
                </CellLayout>
              </DetailsContainer>
            </ItemsContainer>
          </BorderContainer>
        </ExpandContainer>
      </StyledRow>
      {shouldRenderActionPanel && (
        <ActionPanel
          account={account}
          pool={pool}
          userDataLoaded={userDataLoaded}
          expanded={expanded}
          breakpoints={{ isXs, isSm, isMd, isLg, isXl, isXxl }}
        />
      )}
    </>
  )
}

export default PoolRow
