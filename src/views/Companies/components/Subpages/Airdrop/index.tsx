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
import { useAirdrop, useAirdropFactory } from 'hooks/useContract'
import { useToken } from 'hooks/Tokens'
import { EnvoysAirdrop } from 'config/abi/types'
import { getAirdrop } from 'utils/contractHelpers'
import { getProviderOrSigner } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Token } from '@envoysvision/sdk'
import { BigNumber } from 'ethers'

// http://localhost:3000/companies/6231a191e8e2c000132c2033
const Airdrop = ({ id }: { id: string }) => {
  const { t } = useTranslation()
  const [company, setCompany] = useState<BaseCompany>()
  const [airdrop, setAirdrop] = useState<EnvoysAirdrop | undefined>()
  const [airdropInfo, setAirdropInfo] = useState<{
    token: string
    amount: BigNumber
    start: BigNumber
    end: BigNumber
  }>()
  const [tokenAddr, setTokenAddr] = useState<string>()
  const token = useToken(tokenAddr)
  const { account, library } = useActiveWeb3React()

  useEffect(() => {
    handleGetCompany().then(initCompany)
  }, [])

  const [onGetAirdrop] = useModal(<AirdropQuestModal quests={company?.quests} />, true, true, 'airdropQuestModal')

  const handleGetCompany = async () => {
    const company = await getCompany(id)
    setCompany({ ...company, ...mock })
    return company
  }

  const airdropFactory = useAirdropFactory()

  const initCompany = async (company: any) => {
    if (!company || !airdropFactory) return
    const address = await airdropFactory.airdrops(company.token)
    const a = getAirdrop(address, getProviderOrSigner(library, account))
    setAirdrop(a)
    setTokenAddr(company.token)

    const info = await a.airdropInfo()
    setAirdropInfo(info)
  }

  if (!company || !airdropFactory || !airdrop || !token || !airdropInfo) return <PageLoader />

  return (
    <Layout
      company={company}
      backLink={<BackLink title={t('Airdrop %title%', { title: company.name })} id={company._id} />}
      content={<AirdropTokenDetails token={token} airdrop={airdrop} />}
      bottomContent={<AirdropAllocation airdrop={airdrop} />}
    >
      <CountdownRow title={'Airdrop'} endTime={airdropInfo.end.toString()} />
      <CompanyProgress unit={token.symbol} min={0} max={1} current={0} />
      <SideColumnFooter withDivider>
        <TextWithHeader title="Your allocation">
          <Text color={'primary'} fontSize="14px">
            [status]
          </Text>
        </TextWithHeader>
        <TextWithHeader title="Your claimed">0 {token.symbol}</TextWithHeader>
        <StyledButton width={'100%'} onClick={onGetAirdrop}>
          {t('Get Airdrop')}
        </StyledButton>
      </SideColumnFooter>
    </Layout>
  )
}

export default Airdrop
