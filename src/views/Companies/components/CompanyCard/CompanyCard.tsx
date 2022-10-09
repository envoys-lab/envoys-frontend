import { useRouter } from 'next/router'
import React from 'react'
import Truncate from 'react-truncate'
import { Box, Text } from '@envoysvision/uikit'
import { BaseCompany, CompanyStage, companyStatusOngoing, companyStatusPast, companyStatusUpcoming } from '../../utils'
import StarIcon from '../../assets/Star'
import { useTranslation } from '../../../../contexts/Localization'
import { CompanyCardImage, CompanyCardName, CompanyCardStar, CompanyCardTopRow, StyledCompanyCard } from './styles'
import { useAirdrop, useAirdropFactory, useSale, useSaleFactory } from 'hooks/useContract'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { AirdropFactory, SaleFactory } from 'config/abi/types'
import { getAirdrop, getSale } from 'utils/contractHelpers'
import { getProviderOrSigner } from 'utils'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'

enum CompanyStatus {
  NotStarted,
  Ongoing,
  Ended,
}

const fetchAirdropStatus = async (airdropFactory: AirdropFactory, token: string, provider: Web3Provider) => {
  const airdropAddress = await airdropFactory.airdrops(token)
  if (airdropAddress === '0x0000000000000000000000000000000000000000') {
    return {
      exists: false,
    }
  }
  const airdrop = getAirdrop(airdropAddress, provider)
  const info = await airdrop.airdropInfo()
  const currentTime = (await provider.getBlock('latest')).timestamp

  const endIn = info.end.sub(currentTime)
  const startIn = info.start.sub(currentTime)

  return {
    exists: true,
    endIn,
    startIn,
  }
}

const fetchSaleStatus = async (saleFactory: SaleFactory, token: string, provider: Web3Provider) => {
  const saleAddress = await saleFactory.sales(token)
  if (saleAddress === '0x0000000000000000000000000000000000000000') {
    return {
      exists: false,
    }
  }
  const sale = getSale(saleAddress, provider)
  const info = await sale.saleInfo()
  const currentTime = (await provider.getBlock('latest')).timestamp

  const endIn = info.end.sub(currentTime)
  const startIn = info.start.sub(currentTime)

  return {
    exists: true,
    endIn,
    startIn,
  }
}

const formatTimestamp = (timestamp: number) => {
  let negative = false
  if (timestamp < 0) {
    timestamp = -timestamp
    negative = true
  }

  const buff: string[] = []

  const days = Math.floor(timestamp / (3600 * 24))
  const hours = Math.floor(timestamp / 3600)
  const minutes = Math.floor(timestamp / 60)

  if (days > 0) {
    buff.push(`${days} days ${Math.floor((timestamp % (3600 * 24)) / 3600)} hours`)
  } else if (hours > 0) {
    buff.push(`${hours} hours`)
  } else if (minutes > 0) {
    buff.push(`${minutes} minutes`)
  } else {
    buff.push(`${timestamp} seconds`)
  }
  if (negative) {
    buff.push('ago')
  }

  return buff.join(' ')
}

const CompanyCard: React.FC<{ company: BaseCompany }> = ({ company }) => {
  const router = useRouter()
  const handleClick = () => {
    const { _id } = company
    router.push(`/companies/${_id}`)
  }

  const { library, account } = useActiveWeb3React()

  const realLogoUrl =
    !company.logoUrl || company.logoUrl !== 'https://cloud.example/logo' ? company.logoUrl : '/images/company.png'

  const airdropFactory = useAirdropFactory()
  const saleFactory = useSaleFactory()

  const [status, setStatus] = React.useState<CompanyStatus>(CompanyStatus.NotStarted)
  const [statusTime, setStatusTime] = React.useState<number>(undefined)
  const statusTimeString = React.useMemo(() => formatTimestamp(statusTime), [statusTime])

  const updateStatus = async () => {
    const airdropStatus = await fetchAirdropStatus(airdropFactory, company.token, library)
    const saleStatus = await fetchSaleStatus(saleFactory, company.token, library)
    console.log(airdropStatus)
    if (
      (airdropStatus.exists && airdropStatus.startIn.lt(0) && airdropStatus.endIn.gt(0)) ||
      (saleStatus.exists && saleStatus.startIn.lt(0) && saleStatus.endIn.gt(0))
    ) {
      setStatus(CompanyStatus.Ongoing)
      setStatusTime(airdropStatus.exists ? airdropStatus.endIn.toNumber() : saleStatus.endIn.toNumber())
    } else if (!airdropStatus.exists && !saleStatus.exists) {
      setStatus(CompanyStatus.NotStarted)
    } else {
      setStatus(CompanyStatus.Ended)
      setStatusTime(airdropStatus.exists ? airdropStatus.endIn.toNumber() : saleStatus.endIn.toNumber())
    }
  }

  React.useEffect(() => {
    updateStatus()
  }, [company])

  return (
    <StyledCompanyCard onClick={handleClick} key={company._id}>
      <CompanyCardTopRow>
        <CompanyCardImage src={realLogoUrl} />
        <CompanyCardName>
          <Truncate lines={2}>{company.name}</Truncate>
        </CompanyCardName>
        {/* <CompanyCardStar>
          <StarIcon />
        </CompanyCardStar> */}
      </CompanyCardTopRow>

      <Box ml={'64px'} mt={'5px'}>
        {status === CompanyStatus.NotStarted && (
          <Text color="silver" fontSize="14px">
            Not Started
          </Text>
        )}
        {status === CompanyStatus.Ongoing && (
          <Text color="primary" fontSize="14px">
            Ongoing
          </Text>
        )}
        {status === CompanyStatus.Ended && (
          <Text color="primary" fontSize="14px">
            Ended
          </Text>
        )}
        <Text thin color={'mainDark'} fontSize={'14px'}>
          {status === CompanyStatus.Ongoing && `Ends in ${statusTimeString}`}
          {status === CompanyStatus.NotStarted && `Coming soon...`}
          {status === CompanyStatus.Ended && `${statusTimeString}`}
        </Text>
      </Box>
    </StyledCompanyCard>
  )
}

export default CompanyCard
