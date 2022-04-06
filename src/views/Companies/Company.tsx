import React, { useEffect, useState } from 'react'
import { getCompany } from './api'
import HeadText from './components/HeadText/HeadText'
import styles from './Company.module.scss'
import CompanyShortInfo from './components/CompanyShortInfo/CompanyShortInfo'
import CompanyButton from './components/CompanyButton/CompanyButton'
import Page from '../../components/Layout/Page'

// http://localhost:3000/companies/6231a191e8e2c000132c2033
const Company = ({ companyId }: { companyId: string }) => {
  const [company, setCompany] = useState<any>()

  useEffect(() => {
    handleGetCompany()
  }, [])

  const handleGetCompany = async () => {
    console.log(companyId)
    const company = await getCompany(companyId)
    console.log(company)
    setCompany(company)
  }

  return (
    <Page>
      <HeadText />
      <div className={styles['company__head']}>
        {company && (
          <CompanyShortInfo
            name={company.name}
            description={company.description}
            logoUrl={company.logoUrl}
            className={styles['company__head']}
          />
        )}
        {company && <CompanyButton holders={company.holders} homePageUrl={company.homePageUrl} />}
        {!company && 'Trying to load data, if this text stays 5 seconds, reload page'}
      </div>
    </Page>
  )
}

export default Company
