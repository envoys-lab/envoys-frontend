import { Link } from '@envoysvision/uikit'
import TextWithHeader from '../TextWithHeader/TextWithHeader'

const AirdropTokenDetails = () => {
  return (
    <>
      <TextWithHeader title="Token address">
        <Link href="#">0x9F8eA79a3325D0Db4F0DEa98B7916192b0635ECd</Link>
      </TextWithHeader>

      <TextWithHeader title="Airdrop address">
        <Link href="#">0x9F8eA79a3325D0Db4F0DEa98B7916192b0635ECd</Link>
      </TextWithHeader>

      <TextWithHeader title="Name">EVT</TextWithHeader>
      <TextWithHeader title="Symbol">EVT</TextWithHeader>
      <TextWithHeader title="Total tokens">2 000 000 EVT</TextWithHeader>
    </>
  )
}

export default AirdropTokenDetails
