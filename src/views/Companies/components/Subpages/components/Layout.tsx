import React from 'react'
import { Grid, useMatchBreakpoints } from '@envoysvision/uikit'
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
  const { isDesktop } = useMatchBreakpoints()
  const section = (
    <Column style={{ overflow: 'hidden' }}>
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
        <Grid
          padding={'20px'}
          justifyContent={'center'}
          alignContent={'center'}
          gridTemplateRows="1fr auto"
          gridRowGap="30px"
        >
          {section}
          <Divider />
          <Column style={{ width: '100%', overflow: 'hidden' }}>{children}</Column>
        </Grid>
      </Page>
    )
  }

  return (
    <Page>
      {backLink}
      <Grid
        padding={'20px'}
        justifyContent={'center'}
        alignContent={'center'}
        gridTemplateColumns="1fr auto 280px"
        gridColumnGap="30px"
      >
        {section}
        <DividerVertical />
        <Column>{children}</Column>
      </Grid>
    </Page>
  )
}

export default Layout
