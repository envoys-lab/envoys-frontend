import styled, { css } from 'styled-components'
import { Flex, Input, Text } from '@envoysvision/uikit'

export const QuestionsBlock = styled(Flex)`
  flex-direction: column;
  grid-gap: 10px;
  overflow-y: auto;
  max-height: 60vh;
  padding-right: 16px;
  margin-left: 16px;
`

export const QuestFooter = styled(Flex)`
  margin: 30px 16px 4px;
  flex-shrink: 0;
  flex-direction: column;
  position: relative;
  align-items: center;
`

export const Summary = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`

export const QuestionBlock = styled(Flex)`
  flex-direction: column;
  border-radius: 14px;
  background-color: ${({ theme }) => theme.colors.backgroundPage};
`

export const QuestionInputBlock = styled(Flex)<{ $valid: boolean }>`
  align-items: center;
  height: 70px;
  padding: 0 0 0 20px;
  ${({ $valid, theme }) =>
    $valid &&
    css`
      border: 1px solid ${theme.colors.success};
      border-radius: 14px;
    `}
`

export const QuestionLabel = styled(Text)`
  font-weight: 500;
  padding: 10px;
  border: none;
  border-radius: 14px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  right: 0 !important;
`

export const CompanyStyledInput = styled(Input)`
  padding-left: 0 !important;
  padding-right: 35% !important;
`
