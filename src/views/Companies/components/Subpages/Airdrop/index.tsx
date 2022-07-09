import React, { useEffect, useState } from 'react'
import { Button, Flex, Grid, Progress } from '@envoysvision/uikit'

import PageLoader from 'components/Loader/PageLoader'
import { BaseCompany } from 'views/Companies/utils'
import { getCompany } from 'views/Companies/api'
import { CompanyShortInfo } from 'views/Companies/components/index'
import Column from 'components/Layout/Column'
import AirdropTokenDetails from './components/AirdropTokenDetails'
import AirdropAllocation from './components/AirdropAllocation'
import TextWithHeader from '../components/TextWithHeader'
import Page from '../../../../../components/Layout/Page'

import mock from '../mock'

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
            <AirdropTokenDetails company={company} />
          </Column>

          <Column style={{ paddingTop: '40px' }}>
            <AirdropAllocation />
          </Column>
        </Column>
        <Column style={{ width: '100%' }}>
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
