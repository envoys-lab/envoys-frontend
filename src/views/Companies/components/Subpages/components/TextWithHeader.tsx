import styled from 'styled-components'
import Column from 'components/Layout/Column'
import Row from 'components/Layout/Row'
import { useTranslation } from '../../../../../contexts/Localization'
import { Text } from '@envoysvision/uikit'

const LabelColumn = styled(Column)`
  padding-right: 16px;
  flex: auto;
`

const TextColumn = styled(Column)`
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
    <Row justify="space-between" style={{ paddingBottom: '20px', flexWrap: 'wrap' }}>
      <LabelColumn>
        <Text small={small} fontSize="14px" color="mainDark">
          {t(title)}
        </Text>
      </LabelColumn>
      <TextColumn>
        <Text small={small} fontSize="14px" color={'darkClear'}>
          {children}
        </Text>
      </TextColumn>
    </Row>
  )
}

export default TextWithHeader
