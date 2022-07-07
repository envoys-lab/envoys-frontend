import React, { useEffect, useState } from 'react'
import { Button, Flex, Grid, Link, Progress, ProgressBar, useMatchBreakpoints } from '@envoysvision/uikit'

import PageLoader from 'components/Loader/PageLoader'
import Page from '../../components/Layout/Page'
import { useTranslation } from '../../contexts/Localization'
import styles from './Company.module.scss'
import { BaseCompany } from 'views/Companies/utils'
import { getCompany } from 'views/Companies/api'
import { CompanyShortInfo } from 'views/Companies/components'
import Column from 'components/Layout/Column'
import Row from 'components/Layout/Row'
import AirdropTokenDetails from './components/AirdropTokenDetails/AirdropTokenDetails'
import AirdropAllocation from './components/AirdropAllocation/AirdropAllocation'
import TextWithHeader from './components/TextWithHeader/TextWithHeader'


// http://localhost:3000/companies/6231a191e8e2c000132c2033
const Airdrop = ({ id }: { id: string }) => {
    const [company, setCompany] = useState<BaseCompany>()

    const { t } = useTranslation()
    const { isMobile, isTablet } = useMatchBreakpoints()

    const lowResolutionMode = isTablet || isMobile

    useEffect(() => {
        handleGetCompany()
    }, [])

    const handleGetCompany = async () => {
        const company = await getCompany(id)
        setCompany(company)
    }

    if (!company) return <PageLoader />

  return (
    <Page>
        <Grid padding={"20px"}
            justifyContent={"center"}
            alignContent={"center"}
            gridTemplateColumns="10fr 6fr"
            gridColumnGap="30px"
        >
            <Column>
                <CompanyShortInfo name={company.name} description={company.description} logoUrl={company.logoUrl} />

                <Column style={{paddingTop: "40px"}}>
                   <AirdropTokenDetails />
                </Column>

                <Column style={{paddingTop: "40px"}}>
                   <AirdropAllocation />
                </Column>
                
            </Column>
            <Column style={{width: "100%"}}>
                <Flex style={{width: "100%"}}>
                    <div style={{width: "100%"}}>
                        <Progress primaryStep={64} variant="round" />
                    </div>
                </Flex>

                <Flex style={{paddingTop: "10px"}}>
                    <TextWithHeader title='0 EVT'>50 EVT</TextWithHeader>
                </Flex>

                <Column style={{paddingTop: "10px"}}>
                    <TextWithHeader title='Your allocation'>inprogress</TextWithHeader>
                    <TextWithHeader title='Your claimed'>0 EVT</TextWithHeader>
                </Column>

                
                
                <Button width={"100%"} height="40px">Get Airdrop</Button>
            </Column>
        </Grid>
    </Page>
  )
}

export default Airdrop
