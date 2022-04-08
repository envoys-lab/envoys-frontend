import { useRouter } from 'next/router'
import React from 'react'
import { BaseCompany } from '../../utils'
import styles from './CompanyCard.module.scss'
import StarIcon from '../../assets/Star'
import { useTranslation } from '../../../../contexts/Localization'

const getDaysRange = (startDate, endDate) => {
  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()
  const diffTime = Math.abs(end - start)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const CompanyCard: React.FC<{ company: BaseCompany }> = ({ company }) => {
  const router = useRouter()
  const { t } = useTranslation()
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
        <div className={styles['company-card__expiration']}>
          {t('Will end in %days% days', { days: getDaysRange(new Date(), company.stages[0].endDate) })}
        </div>
      </div>
      <div className={styles['company-card__star']}>
        <StarIcon />
      </div>
    </div>
  )
}

export default CompanyCard
