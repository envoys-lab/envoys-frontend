import styled from 'styled-components'
import FlexLayout from '../../components/Layout/Flex'

export const TextTitleContainer = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.colors.textSubtle};
`

export const CardLayout = styled(FlexLayout)`
  justify-content: center;
`

export const Space = styled.div<{ size: number }>`
  min-width: ${({ size }) => size + 'px'};
  height: 100%;
`

export const PoolControls = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 30px 30px;
    margin-bottom: 0;
  }
`

export const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding-top: 16px;
    padding-right: 8px;
    padding-left: 8px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 8px;
    }
  }
`

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
    flex-direction: row;
  }
`
export const TextContainer = styled.div<{ opacity?: number }>`
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

export const SortContainer = styled.div`
  background: ${({ theme }) => theme.colors.backgroundPage};
  border: 1px solid ${({ theme }) => theme.colors.backgroundPage};
  box-sizing: border-box;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  height: 30px;
`

export const TopContainer = styled.div`
  padding-left: 8px;
  padding-right: 8px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 15px;
    padding-right: 15px;
  }
`
