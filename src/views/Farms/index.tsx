import { FinanceTab } from 'components/Finance/FinanceTab'
import React, { FC } from 'react'
import Farms, { FarmsContext } from './Farms'
import Page from '../../components/Layout/Page'

export const FarmsPageLayout: FC = ({ children }) => {
  return (
    <FinanceTab>
      <Farms>{children}</Farms>
    </FinanceTab>
  )
}

export { FarmsContext }

// <<<<<<< HEAD
// =======
//     <Page removeInnerPadding>
//       <Farms>{children}</Farms>
//     </Page>
// >>>>>>> develop