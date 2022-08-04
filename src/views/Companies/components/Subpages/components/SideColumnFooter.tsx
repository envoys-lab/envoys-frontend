import React from 'react'
import { ColumnCenter } from '../../../../../components/Layout/Column'
import Divider from './Divider'

interface ColumnFooterProps {
  children: React.ReactNode[]
  withDivider?: boolean
}

const SideColumnFooter: React.FC<ColumnFooterProps> = ({ children, withDivider }) => {
  return (
    <ColumnCenter style={{ paddingTop: '10px' }}>
      {withDivider && <Divider />}
      <ColumnCenter style={{ margin: '0 12px' }}>{children}</ColumnCenter>
    </ColumnCenter>
  )
}

export default SideColumnFooter
