import { useState } from 'react'
import { getCompanies } from '../api'
import { User, VerificationStatus } from '../../Settings/types'
import { isVerificationPassed } from '../../Settings/heplers'

export const companyStatusPast = 'past'
export const companyStatusOngoing = 'ongoing'
export const companyStatusUpcoming = 'upcoming'
export type CompanyStatus = typeof companyStatusPast | typeof companyStatusOngoing | typeof companyStatusUpcoming

export interface CompanyStage {
  type: string
  startDate: string
  endDate: string
  progress: number
  goal: number
  raisedFunds: number
  cap: number
  hardcap: number
  status: CompanyStatus
  price: string
}

interface CompanyRoadMapItem {
  title: string
  description: string
}

export interface BaseCompany {
  about: any
  active: boolean
  activity: object
  description: string
  details: BaseCompanyDetails
  documents: object[]
  homePageUrl: string
  logoUrl: string
  members: Member[]
  name: string
  roadmap: CompanyRoadMapItem[]
  sellType: string[]
  social: object
  stages: CompanyStage[]
  status: CompanyStatus
  videoUrl: string
  token: string
  _id: string
  holdersCount: number
}

export interface Member {
  advisor: boolean
  avatarUrl: string
  name: string
  position: string
  interview: Interview
}

export interface Interview {
  questions: Question[]
}

export interface Question {
  question: string
  answear: string
}

export interface BaseCompanyDetails {
  token: CompanyToken
  company: CompanyFoundation
  bonus: string[]
  additional: AdditionalDetails
}

export interface CompanyToken {
  ticker: string
  supply: string
  distribution: string[]
  currencies: string[]
  minContribution: string
}

export interface CompanyFoundation {
  foundedDate: string
  registredCountry: string
  registredName: string
}

export interface AdditionalDetails {
  MVP: string
  platform: string
  whitelist?: WhiteListObj
}

export interface WhiteListObj {
  categories: string
  fromDate: string
  tillDate: string
  url: string
}

export const useLoadItems = () => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<BaseCompany[]>([])
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const [error, setError] = useState<Error>()
  const [nextPage, setNextPage] = useState(1)

  async function loadMore() {
    setLoading(true)
    try {
      const {
        items,
        meta: { totalPages, currentPage },
      } = await getCompanies(nextPage)

      setItems((current) => [...current, ...items])
      setHasNextPage(totalPages !== currentPage)
      if (hasNextPage) {
        setNextPage(currentPage + 1)
      }
    } catch (err: any) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { loading, items, hasNextPage, error, loadMore }
}
