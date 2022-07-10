import styled from 'styled-components'
import Column from 'components/Layout/Column'
import Row from 'components/Layout/Row'
import { useTranslation } from '../../../../../contexts/Localization'
import { Text } from '@envoysvision/uikit'

const ShrinkColumn = styled(Column)`
  overflow: hidden;
  color: ${({ theme }) => theme.colors.mainDark};
  > * {
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

const TextWithHeader = ({ title, children, small }: { title: string; children: any; small?: boolean }) => {
  const { t } = useTranslation()
  return (
    <Row justify="space-between" style={{ paddingBottom: '20px' }}>
      <Column style={{ flexShrink: 0, paddingRight: 16 }}>
        <Text small={small} fontSize="14px" color="mainDark">
          {t(title)}
        </Text>
      </Column>
      <ShrinkColumn>
        <Text small={small} fontSize="14px" color={'darkClear'}>
          {children}
        </Text>
      </ShrinkColumn>
    </Row>
  )
}

export default TextWithHeader
