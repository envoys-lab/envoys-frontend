import React from 'react'
import ProgressBar from '../ProgressBar/ProgressBar'
import styles from './CompanyProgress.module.scss'

interface CompanyProgress {
  stage: Stage
  className?: string
}

export interface Stage {
  cap?: number
  endDate: string
  goal?: number
  hardcap?: number
  price?: string
  progress: number
  raisedFunds?: number
  startDate: string
  status: string
  type: string
}

const CompanyProgress = ({ stage, className }: CompanyProgress) => {
  const numberWithSpaces = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  const goalProgress = +(stage.raisedFunds && stage.goal && Math.round((stage.raisedFunds / stage.goal) * 100))

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
        <div className={`${styles['main-content-right']}`}>
          <div className={`${styles['right-header']}`}>
            <div>
              {(stage.raisedFunds && stage.goal && `$${numberWithSpaces(stage.raisedFunds)}`) ||
                `Raised Funds - No Data`}
            </div>
          </div>
          <div className={`${styles['right-progress-bar']}`}>
            <ProgressBar value={goalProgress} progressText="goal completed" hideProgressText={!goalProgress} />
          </div>
          <div className={`${styles['right-goals']}`}>
            {stage.goal && (
              <div className={`${styles['right-goals-item']}`}>
                <div className={`${styles['right-goals-item-header']}`}>goal</div>
                <div className={`${styles['right-goals-item-body']}`}>{`${numberWithSpaces(stage.goal)} USD`}</div>
              </div>
            )}
            {stage.cap && (
              <div className={`${styles['right-goals-item']}`}>
                <div className={`${styles['right-goals-item-header']}`}>cap</div>
                <div className={`${styles['right-goals-item-body']}`}>{`${numberWithSpaces(stage.cap)} USD`}</div>
              </div>
            )}
            {stage.hardcap && (
              <div className={`${styles['right-goals-item']}`}>
                <div className={`${styles['right-goals-item-header']}`}>hard cap</div>
                <div className={`${styles['right-goals-item-body']}`}>{`${numberWithSpaces(stage.hardcap)} USD`}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {stage.price && <div className={`${styles['company-progress-footer']}`}>{stage.price}</div>}
    </div>
  )
}

export default CompanyProgress
