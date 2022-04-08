import React from 'react'
import styles from './CompanyMembers.module.scss'
import { Member } from '../../utils'

interface CompanyMembersProps {
  members: Member[]
  className?: string
}

const CompanyMembers = ({ members, className }: CompanyMembersProps) => {
  return (
    <div className={`${styles['company-members']} ${className}`}>
      {members.map((member, index) => (
        <div key={index} className={styles['company-members-card']}>
          <div>
            <div className={styles['company-members-card-avatar']}>
              <img src={member.avatarUrl}></img>
            </div>
            <div className={styles['company-members-card-title']}>{member.name}</div>
            <div className={styles['company-members-card-position']}>{member.position}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CompanyMembers
