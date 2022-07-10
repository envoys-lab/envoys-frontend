import React from 'react'
import { Flex, Grid, useMatchBreakpoints } from '@envoysvision/uikit'
import Column from '../../../../../components/Layout/Column'
import { CompanyShortInfo } from '../../index'
import Divider from './Divider'
import DividerVertical from './DividerVertical'

import Page from '../../../../../components/Layout/Page'
import { BaseCompany } from '../../../utils'

interface LayoutProps {
  company: BaseCompany
  backLink: React.ReactNode
  content: React.ReactNode
  bottomContent?: React.ReactNode
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ company, backLink, content, bottomContent, children }) => {
  const { isDesktop, isLg, isXL } = useMatchBreakpoints()
  const section = (
    <Column>
      <CompanyShortInfo name={company.name} description={company.description} logoUrl={company.logoUrl} switchMargin />

      <Column style={{ paddingTop: '40px' }}>{content}</Column>

      {bottomContent && (
        <Column style={{ paddingTop: '20px' }}>
          <Divider />
          {bottomContent}
        </Column>
      )}
    </Column>
  )
  if (!isDesktop) {
    return (
      <Page>
        {backLink}
        <Flex p={'20px'} justifyContent={'center'} alignContent={'center'} flexDirection={'column'}>
          {section}
          <Divider />
          <Column style={{ width: '100%' }}>{children}</Column>
        </Flex>
      </Page>
    )
  }

  let gridTemplate = '8fr auto 7fr'
  if (isLg) {
    gridTemplate = '9fr auto 6fr'
  }
  if (isXL) {
    gridTemplate = '10fr auto 5fr'
  }
  return (
    <Page>
      {backLink}
      <Grid
        padding={'20px'}
        justifyContent={'center'}
        alignContent={'center'}
        gridTemplateColumns={gridTemplate}
        gridColumnGap="30px"
      >
        {section}
        <DividerVertical />
        <Column style={{ width: '100%' }}>{children}</Column>
      </Grid>
    </Page>
  )
}

export default Layout
