import React, { useEffect, useState } from 'react'

import Page from '../../components/Layout/Page'
import { HeadText, CompanyShortInfo, CompanyButton, About } from './components'

import { getCompany } from './api'

import styles from './Company.module.scss'

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
          <>
            <CompanyShortInfo
              name={company.name}
              description={company.description}
              logoUrl={company.logoUrl}
              className={styles['company__head']}
            />
          </>
        )}
        {company && <CompanyButton holders={company.holders} homePageUrl={company.homePageUrl} />}
        {!company && 'Trying to load data, if this text stays 5 seconds, reload page'}
      </div>
    </Page>
  )
}

export default Company
