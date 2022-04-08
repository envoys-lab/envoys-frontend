import React from 'react'
import styles from './CompanyInterviews.module.scss'
import { Member } from '../../utils'

interface CompanyInterviewsProps {
  members: Member[]
  className?: string
}

const CompanyInterviews = ({ members, className }: CompanyInterviewsProps) => {
  return (
    <div className={`${styles['company-members']} ${className}`}>
      {members.map((member, index) => (
        <div key={index} className={styles['company-members-card']}>
          <div className={styles['company-members-card-avatar']}>
            <div className={styles['company-members-card-avatar-image']}>
              <img src={member.avatarUrl}></img>
            </div>
            <div className={styles['company-members-card-avatar-title']}>{member.name}</div>
          </div>
          <div className={styles['company-members-card-interview']}>
            {member.interview.questions.map((question, index) => (
              <div key={index}>
                <div className={styles['company-members-card-interview-question']}>{question.question}</div>
                <div className={styles['company-members-card-interview-answer']}>{question.answear}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CompanyInterviews
