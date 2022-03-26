import styled from 'styled-components'
import { Box } from '@envoysvision/uikit'

const Card = styled(Box)<{
  width?: string | number
  padding?: string | number
  border?: string
  borderRadius?: string | number
}>`
  width: ${({ width }) => width ? (typeof width === 'number' ? `${width}px` : width) : '100%'};
  padding: ${({ padding }) => padding ? (typeof padding === 'number' ? `${padding}px` : padding) : '1.25rem'};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius: br }) => br ? (typeof br === 'number' ? `${br}px` : br) : br ?? '16px'};
  background-color: ${({ theme }) => theme.colors.background};
`
export default Card

export const LightCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.colors.tipBackground};
  background-color: ${({ theme }) => theme.colors.tipBackground};
`

export const LightGreyCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background-color: ${({ theme }) => theme.colors.background};
`

export const GreyCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.dropdown};
`
