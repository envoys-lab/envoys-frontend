import { Skeleton } from '@envoysvision/uikit'
import styled from 'styled-components'

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  padding-right: 8px;
`

export const ActionContainer = styled.div<{ isAutoVault?: boolean }>`
  padding: 16px;
  border: 2px solid ${({ theme }) => theme.colors.input};
  border-radius: 16px;
  flex-grow: 1;
  flex-basis: 0;
  margin-bottom: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 12px;
    margin-right: 12px;
    margin-bottom: 0;
    height: ${({ isAutoVault }) => (isAutoVault ? '100px' : 'auto')};
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    margin-left: 32px;
    margin-right: 0;
  }
`

export const Heading = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.text};
`

export const EnvoysSkeleton = styled(Skeleton)`
  border-radius: 10px;
`

export const ActionTitles = styled.div`
  display: flex;
`

export const ActionContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
