import Column from 'components/Layout/Column'
import Row from 'components/Layout/Row'

const ProgressBar = ({ title, children }: { title: string; children: any }) => {
  return (
    <Row justify="space-between" style={{ paddingBottom: '20px' }}>
      <Column>{title}</Column>
      <Column>{children}</Column>
    </Row>
  )
}

export default ProgressBar
