import React, { useEffect, useState } from 'react'
import { Button, Flex, InjectedModalProps, InputGroup, Modal, Text, useMatchBreakpoints } from '@envoysvision/uikit'
import { useTranslation } from 'contexts/Localization'
import { CompanyQuest } from '../../../../utils'
import Divider from '../../components/Divider'
import useToast from '../../../../../../hooks/useToast'
import { CompanyStyledInput, QuestFooter, QuestionBlock, QuestionLabel, QuestionsBlock, Summary } from '../styles'
import { breakpointMap } from '../../../../../../../../envoys-toolkit/packages/envoys-uikit/src/theme/base'

interface AirdropQuestModalProps {
  quests: CompanyQuest[]
}

const AirdropQuestModal: React.FC<InjectedModalProps & AirdropQuestModalProps> = ({ quests, onDismiss }) => {
  const { t } = useTranslation()
  const { isMd, isLg, isDesktop } = useMatchBreakpoints()
  const [stepsDone, setStepsDone] = useState<number>(0)
  const [steps, setSteps] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { toastSuccess } = useToast()

  const handleInputChange = (event, id) => {
    setSteps((prevState) => ({
      ...prevState,
      [id]: event?.target?.value,
    }))
  }

  if (!quests) {
    return null
  }

  useEffect(() => {
    const values = Object.values(steps) as string[]
    if (values) {
      let validValues = 0
      values.forEach((step) => {
        if (step && step.length && step.length > 0) {
          validValues += 1
        }
      })
      setStepsDone(validValues)
    }
  }, [steps])

  const handleSend = () => {
    setIsLoading(true)
    if (stepsDone === stepsTotal) {
      toastSuccess('Send')
      setTimeout(() => {
        setIsLoading(false)
        onDismiss()
      }, 1000)
    }
  }
  const stepsTotal = quests.length

  let minWidth = '320px'

  if (isMd) {
    minWidth = `${breakpointMap.sm}px`
  }
  if (isLg) {
    minWidth = `${breakpointMap.md}px`
  }
  if (isDesktop) {
    minWidth = '740px'
  }

  return (
    <Modal title={t('Airdrop quest')} onDismiss={onDismiss} bodyPadding={'16px'} minWidth={minWidth} maxWidth={'740px'}>
      <Flex flexDirection={'column'}>
        <QuestionsBlock>
          {quests.map((quest) => (
            <QuestionBlock key={`quest-${quest.id}`}>
              <Text fontSize={'14px'} my={'20px'}>
                {quest.question}
              </Text>
              <Flex alignItems="center" style={{ height: 70, marginRight: -16 }}>
                <InputGroup
                  endIcon={
                    <QuestionLabel fontSize={'14px'} color={'primary'}>
                      {quest.buttonLabel}
                    </QuestionLabel>
                  }
                >
                  <CompanyStyledInput
                    placeholder={quest.placeholder}
                    onChange={($event) => handleInputChange($event, quest.id)}
                  />
                </InputGroup>
              </Flex>
            </QuestionBlock>
          ))}
        </QuestionsBlock>
        <QuestFooter>
          <Divider />
          <Summary>
            {stepsDone} / {stepsTotal}
          </Summary>
          <Button onClick={handleSend} disabled={stepsDone < stepsTotal} isLoading={isLoading}>
            {t('Send Quests')}
          </Button>
        </QuestFooter>
      </Flex>
    </Modal>
  )
}

export default AirdropQuestModal
