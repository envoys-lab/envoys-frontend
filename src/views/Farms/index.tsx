import React, { FC } from 'react'
import Farms, { FarmsContext } from './Farms'
import Page from '../../components/Layout/Page'

export const FarmsPageLayout: FC = ({ children }) => {
  return (
    <Page removeInnerPadding>
      <Farms>{children}</Farms>
    </Page>
  )
}

export { FarmsContext }
