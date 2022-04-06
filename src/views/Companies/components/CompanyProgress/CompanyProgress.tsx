import React from 'react'
import ProgressBar from '../ProgressBar/ProgressBar'
import styles from './CompanyProgress.module.scss'

interface CompanyProgress {
  stage: Stage
  className?: string
}

export interface Stage {
  cap: number
  endDate: string
  goal: number
  hardcap: number
  price: string
  progress: number
  raisedFunds: number
  startDate: string
  status: string
  type: string
}

const CompanyProgress = ({ stage, className }: CompanyProgress) => {
  return (
    <div className={`${styles['company-progress']} ${className}`}>
      <div className={`${styles['company-progress-header']}`}>
        <div className={`${styles['company-progress-header__type']}`}>{stage.type}</div>
        <div
          className={`${styles['company-progress-header__status']} ${
            styles[`company-progress-header__status--${stage.status}`]
          }`}
        >
          {stage.status}
        </div>
      </div>
      <div className={`${styles['company-progress-main-content']}`}>
        <div className={`${styles['main-content-left']}`}>
          <div className={`${styles['left-header']}`}>
            <div>{stage.startDate}</div>
            <div>{stage.endDate}</div>
          </div>
          <div className={`${styles['left-progress-bar']}`}>
            <ProgressBar value={stage.progress} />
          </div>
        </div>
        <div className={`${styles['main-content-right']}`}>2</div>
      </div>
    </div>
  )
}

export default CompanyProgress
