import styled from 'styled-components'
import { Flex, Input, Text } from '@envoysvision/uikit'

export const QuestionsBlock = styled(Flex)`
  flex-direction: column;
  grid-gap: 10px;
  overflow-y: auto;
  max-height: 60vh;
`

export const QuestFooter = styled(Flex)`
  margin-top: 30px;
  flex-shrink: 0;
  flex-direction: column;
  position: relative;
`

export const Summary = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`

export const QuestionBlock = styled(Flex)`
  padding: 0 20px;
  flex-direction: column;
  border-radius: 14px;
  background-color: ${({ theme }) => theme.colors.backgroundPage};
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
