import { useRouter } from 'next/router'
import React from 'react'
import LinesEllipsis from 'react-lines-ellipsis'
import { Box, Text } from '@envoysvision/uikit'
import { BaseCompany, CompanyStage, companyStatusOngoing, companyStatusPast, companyStatusUpcoming } from '../../utils'
import StarIcon from '../../assets/Star'
import { useTranslation } from '../../../../contexts/Localization'
import { CompanyCardImage, CompanyCardName, CompanyCardStar, CompanyCardTopRow, StyledCompanyCard } from './styles'

const getDaysRange = (company: BaseCompany): string => {
  const { t } = useTranslation()
  let stage: CompanyStage
  const stages = company.stages.filter((stage) => stage.status === company.status)
  if (stages && stages.length) {
    stage = stages[0]
  }
  const calcRange = (startDate: string | Date, endDate: string | Date): number => {
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()
    return Math.abs(end - start) / (1000 * 60 * 60 * 24)
  }

  let message
  let rangeDays
  switch (stage?.status) {
    case companyStatusPast: {
      message = 'Ended %days% days ago'
      rangeDays = Math.ceil(calcRange(stage.endDate, new Date()))
      break
    }
    case companyStatusOngoing: {
      message = 'Will end in %days% days'
      rangeDays = Math.ceil(calcRange(stage.endDate, new Date()))
      break
    }
    case companyStatusUpcoming: {
      message = 'Will start in %days% days'
      rangeDays = Math.floor(calcRange(stage.startDate, new Date()))
      break
    }
    default:
      return ''
  }
  return t(message, { days: rangeDays })
}

const CompanyCard: React.FC<{ company: BaseCompany }> = ({ company }) => {
  const router = useRouter()
  const handleClick = () => {
    const { _id } = company
    router.push(`/companies/${_id}`)
  }

  const realLogoUrl =
    !company.logoUrl || company.logoUrl !== 'https://cloud.example/logo' ? company.logoUrl : '/images/company.png'

  return (
    <StyledCompanyCard onClick={handleClick} key={company._id}>
      <CompanyCardTopRow>
        <CompanyCardImage src={realLogoUrl} />
        <CompanyCardName>
          <LinesEllipsis text={company.name} maxLine="2" ellipsis="..." trimRight basedOn="words" />
        </CompanyCardName>
        <CompanyCardStar>
          <StarIcon />
        </CompanyCardStar>
      </CompanyCardTopRow>

      <Box ml={'64px'} mt={'5px'}>
        <Text color={'success'} fontSize={'14px'}>
          {company.status}
        </Text>
        <Text thin color={'mainDark'} fontSize={'14px'}>
          {getDaysRange(company)}
        </Text>
      </Box>
    </StyledCompanyCard>
  )
}

export default CompanyCard
