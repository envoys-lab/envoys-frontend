import React from 'react'
import styles from './ProgressBar.module.scss'

type ProgressBarProps = {
  value: number
  progressText?: string
  className?: string
  hideProgressText?: boolean
}

const ProgressBar = ({ value, progressText, hideProgressText, className }: ProgressBarProps) => {
  const fillerRelativePercentage = (100 / value) * 100

  return (
    <div className={`${className}`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
      <div className={styles['barContainer']}>
        <div className={styles['filler']} style={{ width: `${value}%` }}>
          <div className={styles['fillerBackground']} style={{ width: `${fillerRelativePercentage}%` }} />
        </div>
      </div>
      {!hideProgressText && <div className={styles['textValue']}>{`${value}% ${progressText || 'completed'}`}</div>}
    </div>
  )
}

export default ProgressBar
