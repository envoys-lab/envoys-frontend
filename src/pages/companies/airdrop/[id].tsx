import Airdrop from 'views/Airdrop'

const CompanyInterceptor = ({ id }) => {
  return <Airdrop id={id} />
}

CompanyInterceptor.getInitialProps = (appContext) => {
  return { id: appContext.query.id }
}

export default CompanyInterceptor
