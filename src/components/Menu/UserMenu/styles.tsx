import styled, { css } from 'styled-components'
import { UserMenu } from '@envoysvision/uikit'

export const UserMenuWrapper = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radii.default};
  background: ${({ theme }) => theme.colors.background};
`

export const UserMenuContentWrapper = styled.div<{
  withAccount?: boolean
  isConnecting?: boolean
  isDisconnecting?: boolean
}>`
  position: relative;
`

export const AccountWrapper = styled(UserMenu)<{ isConnecting?: boolean; isDisconnecting?: boolean }>`
  opacity: 0;
  position: relative;

  > div:first-child {
    position: relative;
    justify-content: space-between;
    width: 100%;
    margin: 0;
    background: transparent;
    padding-right: 12px;
    > div {
      display: flex;
      align-items: center;
      &:first-child {
        width: 100%;
      }
    }
  }

  ${({ isConnecting, account }) =>
    !account &&
    isConnecting &&
    css`
      opacity: 1;
      > div:first-child {
        > div:last-child {
          opacity: 1;
        }
      }
    `}

  ${({ account, isDisconnecting }) =>
    account &&
    !isDisconnecting &&
    css`
      transition: none;
      opacity: 1;
      > div:first-child {
        > div:last-child {
          opacity: 1;
        }
      }
    `}

  ${({ account, isDisconnecting }) =>
    account &&
    isDisconnecting &&
    css`
      opacity: 0;
      > div:first-child {
        > div:last-child {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          > div {
            &:first-child {
              width: auto;
            }
          }
        }
      }
    `}
`
