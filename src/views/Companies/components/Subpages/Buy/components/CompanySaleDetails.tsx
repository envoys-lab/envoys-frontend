import React from 'react'
import { Link } from '@envoysvision/uikit'
import TextWithHeader from '../../components/TextWithHeader'
import { BaseCompany, SaleInfo } from '../../../../utils'
import { EnvoysSale } from 'config/abi/types'
import { useToken } from 'hooks/Tokens'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { TokenSaleStatus } from '..'
import { Token } from '@envoysvision/sdk'

const ZERO_ADDR = '0x0000000000000000000000000000000000000000'

const formatTimestamp = (timestamp: number) => {
  const MINUTE = 60
  const HOUR = 3600
  const DAY = 3600 * 24

  let tmp = timestamp
  let ret: string[] = []

  const days = Math.floor(tmp / DAY)
  tmp = tmp % DAY
  const hours = Math.floor(tmp / HOUR)
  tmp = tmp % HOUR
  const minutes = Math.floor(tmp / MINUTE)
  tmp = tmp % MINUTE
  const seconds = tmp

  if (days > 0) ret.push(`${days} days`)
  if (hours > 0) ret.push(`${hours} hours`)
  if (days == 0) {
    if (minutes > 0) ret.push(`${minutes} minutes`)

    if (hours == 0) {
      if (seconds > 0) ret.push(`${seconds} seconds`)
    }
  }

  return ret.join(' ')
}

const CompanySaleDetails: React.FC<{
  sale: EnvoysSale
  saleInfo: SaleInfo
  token: Token
  status: TokenSaleStatus
  startAfter: number
  endAfter: number
}> = ({ sale, saleInfo, token, status, startAfter, endAfter }) => {
  return (
    <>
      <TextWithHeader title="Private Sale Address">
        <Link external={true} href={"https://bscscan.com/address/" + sale.address} fontWeight={400} style={{ display: 'inline' }}>
          {sale.address}
        </Link>
      </TextWithHeader>
      {saleInfo && token && (
        <>
          <TextWithHeader title="Soft Cap">
            {ethers.utils.formatUnits(saleInfo.soft, token.decimals)} {token.symbol}
          </TextWithHeader>
          <TextWithHeader title="Hard Cap">
            {ethers.utils.formatUnits(saleInfo.hard, token.decimals)} {token.symbol}
          </TextWithHeader>

          {status == TokenSaleStatus.NOT_STARTED && (
            <TextWithHeader title="Start In">{formatTimestamp(startAfter)}</TextWithHeader>
          )}
          {status == TokenSaleStatus.STARTED && (
            <TextWithHeader title="End In">{formatTimestamp(endAfter)}</TextWithHeader>
          )}
        </>
      )}
    </>
  )
}

export default CompanySaleDetails
