import React from 'react'
import styles from './HeadText.module.scss'

interface HeadTextProps {
  className?: string
}

const HeadText = ({ className }: HeadTextProps) => {
  return <div className={`${styles.text} ${className}`}>Hot and trending Blockchain companies</div>
}

export default HeadText
