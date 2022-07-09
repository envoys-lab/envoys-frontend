import React, { useEffect, useState } from 'react'
import { Button, Flex, Grid, Progress } from '@envoysvision/uikit'

import PageLoader from 'components/Loader/PageLoader'
import { BaseCompany } from 'views/Companies/utils'
import { getCompany } from 'views/Companies/api'
import { CompanyShortInfo } from 'views/Companies/components/index'
import Column from 'components/Layout/Column'
import TextWithHeader from '../components/TextWithHeader'
import Page from '../../../../../components/Layout/Page'
import CompanySaleDetails from './components/CompanySaleDetails'
import mock from '../mock'
import CountdownRow from '../components/Countdown'

// http://localhost:3000/companies/6231a191e8e2c000132c2033
const Airdrop = ({ id }: { id: string }) => {
  const [company, setCompany] = useState<BaseCompany>()

  useEffect(() => {
    handleGetCompany()
  }, [])

  const handleGetCompany = async () => {
    const company = await getCompany(id)
    setCompany({ ...company, ...mock })
  }

  if (!company) return <PageLoader />

  return (
    <Page>
      <Grid
        padding={'20px'}
        justifyContent={'center'}
        alignContent={'center'}
        gridTemplateColumns="10fr 6fr"
        gridColumnGap="30px"
      >
        <Column>
          <CompanyShortInfo name={company.name} description={company.description} logoUrl={company.logoUrl} />

          <Column style={{ paddingTop: '40px' }}>
            <CompanySaleDetails company={company} />
          </Column>
        </Column>
        <Column style={{ width: '100%' }}>
          <CountdownRow title={'Private Sale'} endTime={company.sale.endTime} />

          <Flex style={{ width: '100%' }}>
            <div style={{ width: '100%' }}>
              <Progress primaryStep={64} variant="round" />
            </div>
          </Flex>

          <Flex style={{ paddingTop: '10px' }}>
            <TextWithHeader title="0 EVT">50 EVT</TextWithHeader>
          </Flex>

          <Column style={{ paddingTop: '10px' }}>
            <TextWithHeader title="Your allocation">inprogress</TextWithHeader>
            <TextWithHeader title="Your claimed">0 EVT</TextWithHeader>
          </Column>

          <Button width={'100%'} height="40px">
            Get Airdrop
          </Button>
        </Column>
      </Grid>
    </Page>
  )
}

export default Airdrop
