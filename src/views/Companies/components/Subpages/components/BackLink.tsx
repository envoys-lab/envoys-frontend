import Row from 'components/Layout/Row'
import { ModalBackButton, Text } from '@envoysvision/uikit'
import { useRouter } from 'next/router'

const BackLink = ({ title, id }: { title: string; id: string }) => {
  const router = useRouter()

  const handleBackClick = () => {
    router.push(`/companies/${id}`)
  }
  return (
    <Row mb={'30px'}>
      <ModalBackButton onBack={handleBackClick} />
      <Text color={'mainDark'} fontWeight={500} ml={'20px'}>
        {title}
      </Text>
    </Row>
  )
}

export default BackLink
