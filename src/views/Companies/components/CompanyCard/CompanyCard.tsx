import { useRouter } from 'next/router'
import React from 'react'
import { BaseCompany, CompanyStage, companyStatusOngoing, companyStatusPast, companyStatusUpcoming } from '../../utils'
import styles from './CompanyCard.module.scss'
import StarIcon from '../../assets/Star'
import { useTranslation } from '../../../../contexts/Localization'

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
    <div className={styles['company-card']} onClick={handleClick} key={company._id}>
      <div className={styles['company-card__logo']}>
        <img src={realLogoUrl} alt={company.name} />
      </div>
      <div className={styles['company-card__content']}>
        <div className={styles['company-card__name']}>{company.name}</div>
        <div className={styles['company-card__status']}>{company.status}</div>
        <div className={styles['company-card__expiration']}>{getDaysRange(company)}</div>
      </div>
      <div className={styles['company-card__star']}>
        <StarIcon />
      </div>
    </div>
  )
}

export default CompanyCard
