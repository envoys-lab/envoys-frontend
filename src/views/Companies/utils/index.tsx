import { ethers } from 'ethers'
import { useState } from 'react'
import { getCompanies } from '../api'

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

export interface SaleInfo {
  contract: string
  token: string
  soft: ethers.BigNumberish
  hard: ethers.BigNumberish
  buyToken: string
  price: ethers.BigNumberish
  start: ethers.BigNumberish
  end: ethers.BigNumberish
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
  sale?: CompanySaleDetails
  airdrop?: CompanyAirdropDetails
  quests?: CompanyQuest[]
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
  tickerName?: string
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

export interface CompanyAirdropDetails {
  airdropAddress: string
  status: string
  maxClaim: number
  minClaim: number
  claimed: number
  yourClaim: number
  totalTokens: number
  allocations: any[]
  endTime: string
}

export interface CompanySaleDetails {
  saleAddress: string
  softCap: number
  hardCap: number
  startTime: string
  endTime: string
  sold: number
  toSell: number
  minBuy: number
  maxBuy: number
  status: string
  pureDates?: any
}

export interface CompanyQuest {
  id: string
  question: string
  placeholder: string
  buttonLabel: string
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
