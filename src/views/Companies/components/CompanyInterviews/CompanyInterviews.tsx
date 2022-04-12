import React from 'react'
import styles from './CompanyInterviews.module.scss'
import { Member } from '../../utils'
import classNames from 'classnames'

interface CompanyInterviewsProps {
  members: Member[]
  className?: string
}

const CompanyInterviews = ({ members, className }: CompanyInterviewsProps) => {
  const getAvatarBlock = (person, smallScreen = false) => (
    <div
      className={classNames(styles['company-members-card-avatar'], {
        [styles['showBeforeSm']]: smallScreen,
        [styles['showAfterSm']]: !smallScreen,
      })}
    >
      <div className={styles['company-members-card-avatar-image']}>
        <img src={person.avatarUrl}></img>
      </div>
      <div className={styles['company-members-card-avatar-title']}>{person.name}</div>
    </div>
  )

  return (
    <div className={`${styles['company-members']} ${className}`}>
      {members.map((member, index) => (
        <div key={index} className={styles['company-members-card']}>
          {getAvatarBlock(member, false)}
          <div className={styles['company-members-card-interview']}>
            {member.interview.questions.map((question, index) => (
              <React.Fragment key={index}>
                {!index && getAvatarBlock(member, true)}
                <div className={styles['company-members-card-interview-question']}>{question.question}</div>
                <div className={styles['company-members-card-interview-answer']}>{question.answear}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CompanyInterviews
