import styled from 'styled-components'
import { Flex, Text } from '@envoysvision/uikit'

export const CompanyShortInfoBlock = styled(Flex)`
  max-width: 728px;
  align-items: center;
  flex-direction: row;
`

export const BigScreenLogo = styled.div`
  margin: 15px;
  display: none;
  ${({ theme }) => theme.mediaQueries.xxl} {
    display: block;
  }
  > img {
    min-width: 70px;
  }
`

export const SmallScreenLogo = styled.div`
  ${({ theme }) => theme.mediaQueries.xxl} {
    display: none;
  }
`

export const CompanyMainInfo = styled(Flex)`
  margin-right: 36px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.xxl} {
    align-items: flex-start;
  }
`

export const CompanyName = styled(Text)`
  color: ${({ theme }) => theme.colors.darkClear};
  font-size: 21px;
  line-height: 25px;
  font-weight: 500;
`

export const CompanyDescription = styled(Text)`
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.mainDark};
  font-size: 14px;
  line-height: 16px;
`
