import React from 'react'
import LinkIcon from 'views/Companies/assets/LinkIcon'
import styles from './Details.module.scss'

type AdditionalDetailsProps = {
  additionalDetails: AdditionalDetail
  className?: string
}

type AdditionalDetail = {
  MVP: string
  platform: string
  whitelist?: WhiteListObj
}

type WhiteListObj = {
  categories: string
  fromDate: string
  tillDate: string
  url: string
}

const AdditionalDetails = ({ additionalDetails, className }: AdditionalDetailsProps) => {
  const categories = additionalDetails.whitelist?.categories

  return (
    <div className={`${styles['details']} ${className}`}>
      <div className={`${styles['details-header']}`}>Additional Details</div>
      <div className={`${styles['details-data']}`}>
        Platform
        <div className={`${styles['details-data-inner']}`}>{additionalDetails.platform}</div>
      </div>
      {additionalDetails.whitelist && (
        <div className={`${styles['details-data']}`}>
          Whitelist
          <div className={`${styles['details-data-inner']}`}>
            Yes&nbsp;
            <a href={additionalDetails.whitelist.url} rel="nofollow" target="_blank">
              <LinkIcon className={styles['link-icon']} color="#337ab7" />
              ,&nbsp;
            </a>
            {`from ${additionalDetails.whitelist.fromDate} till ${additionalDetails.whitelist.tillDate}`}
          </div>
        </div>
      )}
      {additionalDetails.whitelist && (
        <div className={`${styles['details-data']}`}>
          Categories
          <div className={`${styles['details-data-inner']}`}>{categories}</div>
        </div>
      )}
    </div>
  )
}

export default AdditionalDetails
