import { SerializedPoolConfig, SerializedToken } from '../../config/constants/types'
import { BigNumber } from '@ethersproject/bignumber'
import { BaseCompany } from '../../views/Companies/utils'
import { DeserializedFarm } from '../../state/types'
import { PoolData } from '../../state/info/types'

export interface SearchResults {
  companies?: Company[]
  farms?: Farm[]
  poolsLiquidity?: Liquidity[]
  poolsSyrup?: Pool[]
  tokens?: Token[]
}

interface SearchResultItem {
  search?: string
}

export interface Company extends SearchResultItem, BaseCompany {}

export interface Farm extends SearchResultItem, DeserializedFarm {}

export interface Liquidity extends SearchResultItem, PoolData {}

export interface Pool extends SearchResultItem, SerializedPoolConfig {
  stakingLimit?: BigNumber
  userData: any
}

export interface Token extends SearchResultItem, SerializedToken {
  href?: string
  logoURI?: string
}

export type SearchItem = Company | Farm | Liquidity | Pool | Token

export const groupTypes = ['allFilters', 'tokens', 'companies', 'farms', 'poolsLiquidity', 'poolsSyrup']
