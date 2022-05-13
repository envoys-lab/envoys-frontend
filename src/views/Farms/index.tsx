import { FinanceTab } from 'components/Finance/FinanceTab'
import React, { FC } from 'react'
import Farms, { FarmsContext } from './Farms'

export const FarmsPageLayout: FC = ({ children }) => {
  return (
    <FinanceTab>
      <Farms>{children}</Farms>
    </FinanceTab>
  )
}

export { FarmsContext }
