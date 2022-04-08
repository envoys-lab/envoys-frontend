import React from 'react'
import { BaseCompany } from '../../utils'

const Roadmap: React.FC<{ company: BaseCompany }> = ({ company }) => {
  return <>{JSON.stringify(company.roadmap)}</>
}

export default Roadmap
