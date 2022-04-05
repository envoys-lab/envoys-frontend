import React from 'react'
import styles from './HeadText.module.scss'

interface HeadText {
  className?: string
}

const HeadText = ({ className }: HeadText) => {
  return <div className={`${styles.text} ${className}`}>Hot and trending Blockchain companies</div>
}

export default HeadText
