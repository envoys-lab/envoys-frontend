import styled from 'styled-components'

export const CompanyHead = styled.div`
  /* windows */
  background: ${({ theme }) => theme.colors.backgroundAlt};

  margin-top: 20px;
  display: inline-flex;
  justify-content: space-between;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    align-items: center;
    flex-direction: row;
  } ;
`

export const CompanyTabs = styled.div`
  padding-top: 60px;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 246.09%);
  backdrop-filter: blur(40px);

  button {
    background-color: transparent;
  }

  max-width: 728px;
  position: sticky;
  top: 0;
  z-index: 2;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 19px;
  } ;
`

export const CompanyTabInfo = styled.div`
  padding-top: 25px;
  max-width: 728px;
  font-family: Roboto, sans-serif;
  color: #34495e;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 35px;
  } ;
`

export const CompanyTabInfoHeader = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 1.9rem;
  padding: 5px 0;
  margin-bottom: 0.9rem;
`

export const StyledFrame = styled.iframe`
  width: 100%;
  height: 410px;
`
