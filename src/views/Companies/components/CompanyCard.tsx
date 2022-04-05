import { useTranslation } from 'contexts/Localization'
import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from './CompanyCard.module.scss'
import StarIcon from '../assets/Star'

const getFormattedEndDate = (endDate) => {
  return `Will end in ${getDaysRange(new Date(), endDate)} days`
}

const getDaysRange = (startDate, endDate) => {
  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()
  const diffTime = Math.abs(end - start)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const CompanyCard = ({ company }) => {
  const router = useRouter()

  const handleClick = () => {
    const { _id } = company
    router.push(`/companies/${_id}`)
  }

  return (
    <div className={styles['company-card']} onClick={handleClick} key={company._id}>
      <div className={styles['company-card__logo']}>
        <img src={company.logoUrl} />
      </div>
      <div className={styles['company-card__content']}>
        <div className={styles['company-card__name']}>{company.name}</div>
        <div className={styles['company-card__status']}>{company.status}</div>
        <div className={styles['company-card__expiration']}>{getFormattedEndDate(company.stages[0].endDate)}</div>
      </div>
      <div className={styles['company-card__star']}>
        <StarIcon />
      </div>
    </div>
  )
}

export default CompanyCard
