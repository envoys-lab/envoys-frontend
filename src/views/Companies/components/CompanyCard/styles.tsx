import styled from 'styled-components'
import { Flex, Text } from '@envoysvision/uikit'

export const StyledCompanyCard = styled(Flex)`
  border: 1px solid ${({ theme }) => theme.colors.backgroundAlt};
  box-sizing: border-box;
  flex-direction: column;
  /* windows */
  background: ${({ theme }) => theme.colors.backgroundAlt};
  box-shadow: ${({ theme }) => theme.shadows.level0};
  border-radius: ${({ theme }) => theme.radii.default};
  cursor: pointer;
  padding: 10px 11px;
`

export const CompanyCardTopRow = styled(Flex)`
  gap: 24px;
  align-items: center;
`

export const CompanyCardName = styled(Text)`
  display: flex;
  flex-grow: 1;
  line-height: 20px;
  font-weight: 500;
  overflow: hidden;
`

export const CompanyCardImage = styled(Flex)<{ src }>`
  flex-shrink: 0;
  background: url('${({ src }) => src}') center center no-repeat;
  background-size: contain;
  width: 40px;
  height: 40px;
`

export const CompanyCardStar = styled(Flex)`
  flex-shrink: 0;
  padding-right: 10px;
`
