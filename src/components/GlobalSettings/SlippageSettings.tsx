import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Text, Toggle, Flex } from '@envoysvision/uikit'
import { useTranslation } from 'contexts/Localization'
import { useUserSlippageTolerance } from 'state/user/hooks'
import { SettingsOptionButton } from '../GlobalSearch/components/styles'

const FlexWithTopBorder = styled(Flex)`
  border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

interface SlippageSettingsProps {
  showToggle?: boolean
}

const SlippageSettings: React.FC<SlippageSettingsProps> = ({ showToggle = false }) => {
  const [userSlippageTolerance, setUserSlippageTolerance] = useUserSlippageTolerance()
  const [isSlippageEnabled, setIsSlippageEnabled] = useState<boolean>(userSlippageTolerance > 0)
  const { t } = useTranslation()

  const setSlippage = (value: number) => {
    if (isSlippageEnabled) {
      setUserSlippageTolerance(value)
    }
  }

  const toggleSlippageEnabled = () => {
    setIsSlippageEnabled(!isSlippageEnabled)
  }

  useEffect(() => {
    if (isSlippageEnabled && userSlippageTolerance === 0) {
      setUserSlippageTolerance(10)
    }
  }, [isSlippageEnabled, userSlippageTolerance])

  return (
    <Flex flexDirection="column" p={'4px'}>
      <Flex flexDirection="column">
        <Flex mb="12px">
          <Text color={'darkClear'} mb={'8px'} fontSize={'14px'}>
            {t('Slip Tolerance')}
          </Text>
        </Flex>
        <Flex flexWrap="wrap" mb={'16px'} style={{ flexWrap: 'nowrap' }}>
          <SettingsOptionButton
            disabled={!isSlippageEnabled}
            mr="16px"
            onClick={() => setSlippage(10)}
            $active={userSlippageTolerance === 10}
          >
            <Flex height={50} alignItems="center">
              0.1%
            </Flex>
          </SettingsOptionButton>
          <SettingsOptionButton
            disabled={!isSlippageEnabled}
            onClick={() => setSlippage(50)}
            $active={userSlippageTolerance === 50}
          >
            <Flex height={50} alignItems="center">
              0.5%
            </Flex>
          </SettingsOptionButton>
        </Flex>
        {showToggle && (
          <FlexWithTopBorder justifyContent="space-between" pt={'16px'}>
            <Text small>{t('Slip Tolerance')}</Text>
            <Toggle scale="sm" checked={isSlippageEnabled} onChange={toggleSlippageEnabled} />
          </FlexWithTopBorder>
        )}
      </Flex>
    </Flex>
  )
}

export default SlippageSettings
