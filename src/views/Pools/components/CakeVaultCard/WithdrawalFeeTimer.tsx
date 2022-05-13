import React from 'react'
import { Text } from '@envoysvision/uikit'
import getTimePeriods from 'utils/getTimePeriods'
import { useTranslation } from 'contexts/Localization'
import { Label } from '../PoolsTable/Cells/styles'
import styled from 'styled-components'
import { TimeIcon } from 'icons'

const TimeContainer = styled.div`
  background: #2261da;
  border-radius: 14px;

  max-width: 106px;
  height: 20px;

  padding-left: 4px;
  padding-right: 7px;

  display: flex;
  align-items: center;
`

const TextContainer = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  padding-left: 5px;

  text-align: right;

  color: #ffffff;
`

const WithdrawalFeeTimer: React.FC<{ secondsRemaining: number }> = ({ secondsRemaining }) => {
  const { t } = useTranslation()
  const { days, hours, minutes } = getTimePeriods(secondsRemaining)

  return (
    <TimeContainer>
      <TimeIcon />
      <TextContainer>{t('%day%d : %hour%h : %minute%m', { day: days, hour: hours, minute: minutes })}</TextContainer>
    </TimeContainer>
  )
}

export default WithdrawalFeeTimer
