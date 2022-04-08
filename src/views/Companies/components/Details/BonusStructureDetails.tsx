import React from 'react'
import styles from './Details.module.scss'

interface BonusStructureDetailsProps {
  bonus: string[]
  className?: string
}

const BonusStructureDetails = ({ bonus, className }: BonusStructureDetailsProps) => {
  return (
    <div className={`${styles['details']} ${className}`}>
      <div className={`${styles['details-header']}`}>Bonus Structure</div>
      <div className={`${styles['details-data']}`}>
        {bonus.map((b) => (
          <div className={`${styles['details-data-inner']}`}>{b}</div>
        ))}
      </div>
    </div>
  )
}

export default BonusStructureDetails
