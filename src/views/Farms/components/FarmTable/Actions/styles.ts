import styled from 'styled-components'

export const ActionContainer = styled.div`
  padding-left: 17px;

  padding-top: 4px;
  padding-bottom: 4px;


  display: flex;
  align-items: center;
  flex-direction: row;

  /* border: 2px solid ${({ theme }) => theme.colors.primary}; */
  /* border-radius: 16px;
  flex-grow: 1;
  flex-basis: 0;
  margin-bottom: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 12px;
    margin-right: 12px;
    margin-bottom: 0;
    max-height: 100px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    margin-left: 48px;
    margin-right: 0;
    margin-bottom: 0;
    max-height: 100px;
  } */
`

export const ActionTitles = styled.div`
  display: flex;
`

export const ActionContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
