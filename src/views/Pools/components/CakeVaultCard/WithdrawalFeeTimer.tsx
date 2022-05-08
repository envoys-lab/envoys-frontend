import React from 'react'
import { Text } from '@envoysvision/uikit'
import getTimePeriods from 'utils/getTimePeriods'
import { useTranslation } from 'contexts/Localization'
import { Label } from '../PoolsTable/Cells/styles'

const WithdrawalFeeTimer: React.FC<{ secondsRemaining: number }> = ({ secondsRemaining }) => {
  const { t } = useTranslation()
  const { days, hours, minutes } = getTimePeriods(secondsRemaining)

  return <Label>{t('until %day%d : %hour%h : %minute%m', { day: days, hour: hours, minute: minutes })}</Label>
}

export default WithdrawalFeeTimer
