import React from 'react'
import styles from './CompanyMembers.module.scss'
import { Member } from '../../utils'

interface CompanyMembersProps {
  members: Member[]
  className?: string
}

const CompanyMembers = ({ members, className }: CompanyMembersProps) => {
  const getAvatarUrl = (member) => {
    if (member.avatarUrl && member.avatarUrl !== 'https://cloud.example/profile-picture') {
      return member.avatarUrl
    }
    return '/images/avatar.svg'
  }
  return (
    <div className={`${styles['company-members']} ${className}`}>
      {members.map((member, index) => (
        <div key={index} className={styles['company-members-card']}>
          <div>
            <div className={styles['company-members-card-avatar']}>
              <img src={getAvatarUrl(member)} alt={member.name} />
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
