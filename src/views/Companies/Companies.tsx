import { useTranslation } from 'contexts/Localization'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getCompanies } from './api'

const Companies = () => {
  const { t } = useTranslation()
  const [companies, setCompanies] = useState([])
  const [pagination, setPagination] = useState({})

  useEffect(() => {
    handleGetCompanies()
  }, [])

  const handleGetCompanies = async () => {
    const { items, meta } = await getCompanies()
    // console.log({ companies })
    setCompanies(items)
    setPagination(meta)
  }

  const renderCompany = (item) => {
    return <div key={item._id}>{item.name}</div>
  }

  return <div>{companies.map((item) => renderCompany(item))}</div>
}

export default Companies
