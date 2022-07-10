import React, { useEffect, useState } from 'react'
import { Text, useModal } from '@envoysvision/uikit'

import PageLoader from 'components/Loader/PageLoader'
import { BaseCompany } from 'views/Companies/utils'
import { getCompany } from 'views/Companies/api'
import AirdropTokenDetails from './components/AirdropTokenDetails'
import AirdropAllocation from './components/AirdropAllocation'
import TextWithHeader from '../components/TextWithHeader'

import mock from '../mock'
import CountdownRow from '../components/Countdown'
import BackLink from '../components/BackLink'
import { useTranslation } from '../../../../../contexts/Localization'
import { StyledButton } from '../styles'
import CompanyProgress from '../components/ProgressBar'
import SideColumnFooter from '../components/SideColumnFooter'
import AirdropQuestModal from './components/AirdropQuestModal'
import Layout from '../components/Layout'

// http://localhost:3000/companies/6231a191e8e2c000132c2033
const Airdrop = ({ id }: { id: string }) => {
  const { t } = useTranslation()
  const [company, setCompany] = useState<BaseCompany>()

  useEffect(() => {
    handleGetCompany()
  }, [])

  const [onGetAirdrop] = useModal(<AirdropQuestModal quests={company?.quests} />, true, true, 'airdropQuestModal')

  const handleGetCompany = async () => {
    const company = await getCompany(id)
    setCompany({ ...company, ...mock })
  }

  if (!company) return <PageLoader />

  const unit = company.details.token.ticker
  const { airdrop } = company

  return (
    <Layout
      company={company}
      backLink={<BackLink title={t('Airdrop %title%', { title: company.name })} id={company._id} />}
      content={<AirdropTokenDetails company={company} />}
      bottomContent={<AirdropAllocation allocations={company.airdrop.allocations} />}
    >
      <CountdownRow title={'Airdrop'} endTime={airdrop.endTime} />
      <CompanyProgress unit={unit} min={airdrop.minClaim} max={airdrop.maxClaim} current={airdrop.claimed} />
      <SideColumnFooter withDivider>
        <TextWithHeader title="Your allocation">
          <Text color={'primary'} fontSize="14px">
            {airdrop.status}
          </Text>
        </TextWithHeader>
        <TextWithHeader title="Your claimed">
          {airdrop.yourClaim} {unit}
        </TextWithHeader>
        <StyledButton width={'100%'} onClick={onGetAirdrop}>
          {t('Get Airdrop')}
        </StyledButton>
      </SideColumnFooter>
    </Layout>
  )
}

export default Airdrop
