import Airdrop from 'views/Companies/components/Subpages/Airdrop'

const CompanyInterceptor = ({ id }) => {
  return <Airdrop id={id} />
}

CompanyInterceptor.getInitialProps = (appContext) => {
  return { id: appContext.query.id }
}

export default CompanyInterceptor
