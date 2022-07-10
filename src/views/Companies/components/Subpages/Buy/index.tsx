import React, { useEffect, useState } from 'react'
import { Flex, Input, InputGroup, Text } from '@envoysvision/uikit'

import PageLoader from 'components/Loader/PageLoader'
import { BaseCompany } from 'views/Companies/utils'
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

// http://localhost:3000/companies/6231a191e8e2c000132c2033
const Airdrop = ({ id }: { id: string }) => {
  const { t } = useTranslation()

  const [company, setCompany] = useState<BaseCompany>()
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    handleGetCompany()
  }, [])

  const handleGetCompany = async () => {
    const company = await getCompany(id)
    setCompany({ ...company, ...mock })
  }

  if (!company) return <PageLoader />

  const unit = company.details.token.ticker

  const { sale } = company
  const handleAmountChange = (e) => {
    const newVal = e?.target?.value || '0'
    setAmount(parseFloat(newVal))
  }

  const handleMaxClick = () => {
    setAmount(Math.min(sale.toSell - sale.sold, sale.maxBuy))
  }

  return (
    <Layout
      company={company}
      backLink={<BackLink title={t('Buy with ”%title%”', { title: unit })} id={company._id} />}
      content={<CompanySaleDetails company={company} />}
    >
      <CountdownRow title={'Private Sale'} endTime={sale.endTime} />

      <CompanyProgress unit={unit} min={0} max={sale.toSell} current={sale.sold} />

      <Flex alignItems="center" style={{ height: 70, marginRight: -16 }} my={'20px'}>
        <InputGroup endIcon={<MaxButton onClick={handleMaxClick}>{t('MAX')}</MaxButton>}>
          <Input value={amount} placeholder="0,0" style={{ height: 70 }} onChange={handleAmountChange} />
        </InputGroup>
      </Flex>

      <Flex alignItems={'flex-end'} flexDirection={'column'}>
        <StyledButton disabled={amount < company.sale.minBuy || amount > company.sale.maxBuy}>
          {t('Buy with %title%', { title: unit })}
        </StyledButton>
      </Flex>
      <SideColumnFooter>
        <TextWithHeader title="Status">
          <Text color={'primary'} fontSize="14px">
            {sale.status}
          </Text>
        </TextWithHeader>
        <TextWithHeader title="Min Buy">
          {sale.minBuy} {unit}
        </TextWithHeader>
        <TextWithHeader title="Max Buy">
          {sale.maxBuy} {unit}
        </TextWithHeader>
      </SideColumnFooter>
    </Layout>
  )
}

export default Airdrop
