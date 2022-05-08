import React from 'react'
import { BIG_ZERO } from 'utils/bigNumber'
import { Text, useMatchBreakpoints } from '@envoysvision/uikit'
import BigNumber from 'bignumber.js'
import { DeserializedPool } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import BaseCell, { CellContent } from './BaseCell'
import Apr from '../Apr'
import { Label } from './styles'

interface AprCellProps {
  pool: DeserializedPool
}

const AprCell: React.FC<AprCellProps> = ({ pool }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const { userData } = pool
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO

  return (
    <BaseCell role="cell">
      <CellContent>
        <Label center={true}>{t('APR')}</Label>
        <Apr pool={pool} stakedBalance={stakedBalance} showIcon={!isMobile} />
      </CellContent>
    </BaseCell>
  )
}

export default AprCell
