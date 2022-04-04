import { useTranslation } from 'contexts/Localization'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getCompany } from './api'
import CompanyContainer from './components/CompanyContainer/CompanyContainer'
import HeadText from './components/HeadText/HeadText'
import styles from './Company.module.scss'
import CompanyShortInfo from './components/CompanyShortInfo/CompanyShortInfo'
import CompanyButton from './components/CompanyButton/CompanyButton'

// http://localhost:3000/companies/6231a191e8e2c000132c2033
const Company = () => {
  const router = useRouter()
  const companyId = typeof router.query.id === 'string' ? router.query.id : ''
  const [company, setCompany] = useState<any>()
  const { t } = useTranslation()

  useEffect(() => {
    handleGetCompany()
  }, [])

  const handleGetCompany = async () => {
    const companies = await getCompany(companyId)
    setCompany(companies.items?.[0])
  }

  return (
    <CompanyContainer>
      <HeadText />
      <div className={styles.companyHead}>
        {company && <CompanyShortInfo name={company.name} description={company.description} logoUrl={company.logoUrl} className={styles.companyHead} />}
        {company && <CompanyButton holders={company.holders} />}
      </div>
{/*       
      <div>{companyId}</div>
      <div>{JSON.stringify(company)}</div> */}
    </CompanyContainer>
  )
}

export default Company
