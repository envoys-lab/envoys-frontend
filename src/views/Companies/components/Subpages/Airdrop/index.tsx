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
import { Token, TokenAmount } from '@envoysvision/sdk'
import { BigNumber, ethers } from 'ethers'
import useCurrentBlock from 'hooks/useCurrentBlock'
import useTokenBalance from 'hooks/useTokenBalance'


enum AirdropStatus {
  Undefined,
  CanGetAirdrop,
  WaitToHarvest,
  CanHarvest,
  Closed
}

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
  const block = useCurrentBlock();
  const [debtBalance, setDebtBalance] = useState<string>("0");
  

  const [status, setStatus] = useState<AirdropStatus>(AirdropStatus.Undefined);

  useEffect(() => {
    handleGetCompany().then(initCompany)
  }, [])

  React.useEffect(() => {
    if(!airdrop || !airdrop.address || !account || !block || !airdropInfo) return;

    const update = () => {
      airdrop.balanceOf(account).then(balance => {
        setDebtBalance(ethers.utils.formatUnits(balance, token.decimals));
        if(balance.eq("0")) {
          if(
            airdropInfo.start.lt(block.timestamp) 
            && airdropInfo.end.gt(block.timestamp)
          ) {
            setStatus(AirdropStatus.CanGetAirdrop)
          } else {
            setStatus(AirdropStatus.Closed)
          }
        } else {
          if(
            airdropInfo.start.lt(block.timestamp) 
            && airdropInfo.end.gt(block.timestamp)
          ) {
            setStatus(AirdropStatus.WaitToHarvest)
          } else {
            setStatus(AirdropStatus.CanHarvest)
          }
        }
      });
    }

    update();
    const interval = setInterval(() => update(), 3000);
    return () => clearInterval(interval);
  }, [airdrop, block]);

  // const [onGetAirdrop] = useModal(<AirdropQuestModal quests={company?.quests} />, true, true, 'airdropQuestModal')
  const onGetAirdrop = async () => {
    if(!airdrop) return;

    const address = await airdropFactory.airdrops(company.token)
    const a = getAirdrop(address, getProviderOrSigner(library, account))

    await a.airdrop();
  }

  const onHarvest = async () => {
    if(!airdrop) return;

    const address = await airdropFactory.airdrops(company.token)
    const a = getAirdrop(address, getProviderOrSigner(library, account))

    await a.harvest();
  }

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
            {status == AirdropStatus.CanGetAirdrop && t('can get airdrop')}
            {status == AirdropStatus.WaitToHarvest && t('wait to harvest')}
            {status == AirdropStatus.CanHarvest && t('can to harvest')}
            {status == AirdropStatus.Closed && t('closed')}
            {status == AirdropStatus.Undefined && t('...')}
          </Text>
        </TextWithHeader>
        <TextWithHeader title="Your claimed">{debtBalance} {token.symbol}</TextWithHeader>

        {status == AirdropStatus.CanGetAirdrop && 
          <StyledButton width={'100%'} onClick={onGetAirdrop}>
            {t('Get Airdrop')}
          </StyledButton>
        }

        {status == AirdropStatus.WaitToHarvest && 
          <StyledButton disabled width={'100%'} onClick={onHarvest}>
            {t('Wait end airdrop...')}
          </StyledButton>
        }
        
      </SideColumnFooter>
    </Layout>
  )
}

export default Airdrop
