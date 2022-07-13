import React from 'react'
import { Flex, Progress, progressBarVariants } from '@envoysvision/uikit'
import useTheme from '../../../../../hooks/useTheme'
import TextWithHeader from './TextWithHeader'

interface CompanyProgressProps {
  unit: string
  min?: number
  max: number
  current: number
}

const CompanyProgress: React.FC<CompanyProgressProps> = ({ unit, min = 0, max, current }) => {
  const { theme } = useTheme()
  const actualCurrent = Math.max(min, current)
  const primaryStep = Math.round(((actualCurrent - min) / (max - min)) * 100)
  return (
    <>
      <Flex style={{ width: '100%' }}>
        <div style={{ width: '100%' }}>
          <Progress
            barColor={theme.colors.success}
            withShadow={false}
            primaryStep={primaryStep}
            variant={progressBarVariants.ALL_ROUND}
          />
        </div>
      </Flex>
      <Flex style={{ paddingTop: '10px' }}>
        <TextWithHeader small={true} title={`${current} ${unit}`}>
          {max} {unit}
        </TextWithHeader>
      </Flex>
    </>
  )
}

export default CompanyProgress
