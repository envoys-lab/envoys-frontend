import styled from 'styled-components'
import { Flex, Text } from '@envoysvision/uikit'

export const StyledCompanyCard = styled(Flex)`
  flex-direction: column;
  /* windows */
  background: ${({ theme }) => theme.colors.backgroundAlt};
  box-shadow: ${({ theme }) => theme.shadows.level0};
  border-radius: ${({ theme }) => theme.radii.default};
  cursor: pointer;
  padding: 11px 12px;
  transition: box-shadow ${({ theme }) => theme.animations.duration} ease-in-out;
  position: relative;
  &:after {
    position: absolute;
    display: block;
    inset: 0 0 0 0;
    content: '';
    transition: opacity ${({ theme }) => theme.animations.duration} ease-in-out;
    background: url(/images/campaign-card.png) bottom right no-repeat;
    background-size: contain;
    opacity: 0;
  }
  &:hover {
    &:after {
      opacity: 1;
    }
    box-shadow: 0 31px 40px -22px rgba(244, 128, 32, 0.19);
  }
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
