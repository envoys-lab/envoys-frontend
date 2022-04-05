import { useTranslation } from 'contexts/Localization'
import React, { useEffect, useState } from 'react'
import { getCompany } from './api'

// http://localhost:3000/companies/6231a191e8e2c000132c2033
const Company = ({ companyId }: { companyId: string }) => {
  const [company, setCompany] = useState()
  const { t } = useTranslation()

  useEffect(() => {
    handleGetCompany()
  }, [])

  const handleGetCompany = async () => {
    const company = await getCompany(companyId)
    // console.log({ companies })
    setCompany(company)
  }

  return (
    <div>
      {companyId}
      <div>{JSON.stringify(company)}</div>
    </div>
  )
}

export default Company
