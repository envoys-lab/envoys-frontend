import React, { useEffect, useState } from 'react'
import { Flex, Input, InputGroup, Text } from '@envoysvision/uikit'

import PageLoader from 'components/Loader/PageLoader'
import { BaseCompany, SaleInfo } from 'views/Companies/utils'
import { getCompany } from 'views/Companies/api'
import TextWithHeader from '../components/TextWithHeader'
import CompanySaleDetails from './components/CompanySaleDetails'
import mock from '../mock'
import CountdownRow from '../components/Countdown'
import BackLink from '../components/BackLink'
import { useTranslation } from '../../../../../contexts/Localization'
import { MaxButton, StyledButton } from '../styles'
import CompanyProgress from '../components/ProgressBar'
import SideColumnFooter from '../components/SideColumnFooter'
import Layout from '../components/Layout'
import { getSaleFactoryContract } from 'utils/contractHelpers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useERC20, useSale, useSaleFactory } from 'hooks/useContract'
import { callWithEstimateGas } from 'utils/calls'
import { useToken } from 'hooks/Tokens'
import { ethers } from 'ethers'
import { getContract, getProviderOrSigner } from 'utils'
import { ERC20_ABI } from 'config/abi/erc20'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { JSBI, TokenAmount } from '@envoysvision/sdk'
const ZERO_ADDR = '0x0000000000000000000000000000000000000000'

export enum TokenSaleStatus {
  NOT_STARTED,
  STARTED,
  ENDED,
}

// http://localhost:3000/companies/6231a191e8e2c000132c2033
const Buy = ({ id }: { id: string }) => {
  const { t } = useTranslation()
  const { account, active, library } = useActiveWeb3React()

  const saleFactory = useSaleFactory()
  const [saleInfo, setSaleInfo] = React.useState<SaleInfo>({
    hard: 0,
    soft: 0,
    token: '',
    buyToken: '',
    price: 0,
    start: 0,
    end: 0,
    contract: '',
  })
  const [currentTime, setCurrentTime] = React.useState(0)
  const token = useToken(saleInfo ? saleInfo.token : ZERO_ADDR)
  const buyToken = useToken(saleInfo ? saleInfo.buyToken : ZERO_ADDR)
  const [startAfter, setStartAfter] = React.useState(0)
  const [endAfter, setEndAfter] = React.useState(0)
  const [status, setStatus] = React.useState<TokenSaleStatus>(TokenSaleStatus.NOT_STARTED)

  const [company, setCompany] = useState<BaseCompany>()
  const [amount, setAmount] = useState(0)
  const [amountView, setAmountView] = useState('0')
  const [saleInfoAddress, setSaleInfoAddress] = useState<string>(ZERO_ADDR)
  const saleContract = useSale(saleInfoAddress)
  const buyTokenAmount = buyToken
    ? new TokenAmount(buyToken, JSBI.BigInt(ethers.utils.parseUnits(amount.toString(), buyToken.decimals)))
    : undefined

  const [approved, approve] = useApproveCallback(buyTokenAmount, saleInfoAddress)

  const updateSaleInfo = async () => {
    if (!saleContract || saleContract.address == ZERO_ADDR) return

    const info = await saleContract.saleInfo()
    setSaleInfo({
      ...info,
      contract: saleContract.address,
    })
    setCurrentTime((await saleContract.provider.getBlock('latest')).timestamp)
  }

  React.useEffect(() => {
    if (!saleInfo) return

    const start = ethers.BigNumber.from(saleInfo.start)
    const end = ethers.BigNumber.from(saleInfo.end)

    setStartAfter(start.sub(currentTime).toNumber())
    setEndAfter(end.sub(currentTime).toNumber())
  }, [currentTime])

  React.useEffect(() => {
    let status = TokenSaleStatus.NOT_STARTED

    if (startAfter < 0) {
      status = TokenSaleStatus.STARTED
    }

    if (endAfter < 0) {
      status = TokenSaleStatus.ENDED
    }
    setStatus(status)
  }, [startAfter, endAfter])

  React.useEffect(() => {
    updateSaleInfo()
  })

  React.useEffect(() => {
    updateSaleInfo()
  }, [saleContract.address])

  useEffect(() => {
    handleGetCompany()
  }, [])

  const handleGetCompany = async () => {
    const company = await getCompany(id)
    setCompany({ ...company, ...mock })
  }

  useEffect(() => {
    handleGetSale()
  }, [company, account, active])

  const [totalSupply, setTotalSupply] = React.useState(0)
  React.useEffect(() => {
    if (!saleContract || saleContract.address == ZERO_ADDR) return
    const contract = getContract(saleContract.address, ERC20_ABI, getProviderOrSigner(library, account))
    contract.totalSupply().then((supply) => {
      setTotalSupply(parseFloat(ethers.utils.formatUnits(supply.toString(), token.decimals)))
    })
  }, [saleInfo.token])

  const handleGetSale = async () => {
    if (!company || !account || !active || !saleFactory) return

    const resp = await callWithEstimateGas(saleFactory, 'sales', [company.token])
    const addr = resp as unknown as string

    if (addr == ZERO_ADDR) return
    setSaleInfoAddress(addr)
  }

  const hard = React.useMemo(
    () => parseInt(ethers.utils.formatUnits(saleInfo.hard, token ? token.decimals : 18)),
    [saleInfo.hard],
  )

  const soft = React.useMemo(
    () => parseInt(ethers.utils.formatUnits(saleInfo.soft, token ? token.decimals : 18)),
    [saleInfo.soft],
  )

  if (!company || saleContract.address === ZERO_ADDR) return <PageLoader />

  const unit = company.details.token.ticker

  const handleAmountChange = (e) => {
    const newVal = e?.target?.value || '0'

    setAmount(parseFloat(newVal))
    setAmountView(newVal)
  }

  const handleClaim = async () => {
    await saleContract.claim()
  }

  const handleMaxClick = async () => {
    const contract = getContract(buyToken.address, ERC20_ABI, getProviderOrSigner(library, account))
    const balance = await contract.balanceOf(account)

    setAmount(parseFloat(ethers.utils.formatUnits(balance, buyToken.decimals)))
  }

  const handleBuy = async () => {
    await saleContract.buy(ethers.utils.parseUnits(amount.toString(), buyToken.decimals))
  }

  const statusString =
    status == TokenSaleStatus.ENDED
      ? 'ended'
      : status == TokenSaleStatus.NOT_STARTED
      ? 'not started'
      : status == TokenSaleStatus.STARTED
      ? 'active'
      : 'UNDEFINED'
  const timestampNow = Math.floor(Date.now() / 1000)
  const endTime = timestampNow + endAfter

  return (
    <Layout
      company={company}
      backLink={<BackLink title={t('Buy with ”%title%”', { title: unit })} id={company._id} />}
      content={
        <CompanySaleDetails
          sale={saleContract}
          saleInfo={saleInfo}
          token={token}
          status={status}
          startAfter={startAfter}
          endAfter={endAfter}
        />
      }
    >
      <CountdownRow title={'Private Sale'} endTime={endTime} />

      <CompanyProgress unit={unit} min={0} max={soft} current={totalSupply} />

      <Flex alignItems="center" style={{ height: 70 }} my={'20px'}>
        <InputGroup endIcon={<MaxButton onClick={handleMaxClick}>{t('MAX')}</MaxButton>}>
          <Input value={amountView} placeholder="0,0" style={{ height: 70 }} onChange={handleAmountChange} />
        </InputGroup>
      </Flex>

      <Flex alignItems={'flex-end'} flexDirection={'column'}>
        {status === TokenSaleStatus.ENDED ? (
          <>
            <StyledButton disabled={false} onClick={handleClaim} variant="danger">
              {t('Claim')}
            </StyledButton>
          </>
        ) : approved === ApprovalState.APPROVED ? (
          <StyledButton disabled={false} variant="success" onClick={handleBuy}>
            {t('Buy with %title%', { title: buyToken ? buyToken.symbol : '' })}
          </StyledButton>
        ) : approved == ApprovalState.NOT_APPROVED ? (
          <StyledButton disabled={false} onClick={approve}>
            {t('Approve %title%', { title: buyToken ? buyToken.symbol : '' })}
          </StyledButton>
        ) : approved == ApprovalState.PENDING ? (
          <StyledButton disabled={true}>
            {t('Approve %title%...', { title: buyToken ? buyToken.symbol : '' })}
          </StyledButton>
        ) : (
          <></>
        )}
      </Flex>
      <SideColumnFooter>
        <TextWithHeader title="Status">
          <Text color={'primary'} fontSize="14px">
            {statusString}
          </Text>
        </TextWithHeader>
        {/* <TextWithHeader title="Min Buy">
          {sale.minBuy} {unit}
        </TextWithHeader>
        <TextWithHeader title="Max Buy">
          {sale.maxBuy} {unit}
        </TextWithHeader> */}
      </SideColumnFooter>
    </Layout>
  )
}

export default Buy
