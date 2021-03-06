import React from 'react'
import { CompanyToken } from '../../utils'
import styles from './Details.module.scss'

interface TokenDetailsProps {
  token: CompanyToken
  className?: string
}

const TokenDetails = ({ token, className }: TokenDetailsProps) => {
  return (
    <div className={`${styles['details']} ${className}`}>
      <div className={`${styles['details-header']}`}>Token Details</div>
      <div className={`${styles['details-data']}`}>
        Ticker
        <div className={`${styles['details-data-inner']}`}>{token.ticker}</div>
      </div>
      <div className={`${styles['details-data']}`}>
        Total Supply
        <div className={`${styles['details-data-inner']}`}>{token.supply}</div>
      </div>
      <div className={`${styles['details-data']}`}>
        Token Distribution
        {token.distribution.map((dist, index) => (
          <div key={index} className={`${styles['details-data-inner']}`}>
            {dist}
          </div>
        ))}
      </div>
      <div className={`${styles['details-data']}`}>
        Accepted Currencies
        <div className={`${styles['details-data-inner']}`}>{token.currencies.join(', ')}</div>
      </div>
      <div className={`${styles['details-data']}`}>
        Min Contribution
        <div className={`${styles['details-data-inner']}`}>{token.minContribution}</div>
      </div>
    </div>
  )
}

export default TokenDetails
