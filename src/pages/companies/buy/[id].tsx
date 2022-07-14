import CompanySale from 'views/Companies/components/Subpages/Buy'

const CompanyInterceptor = ({ id }) => {
  return <CompanySale id={id} />
}

CompanyInterceptor.getInitialProps = (appContext) => {
  return { id: appContext.query.id }
}

export default CompanyInterceptor
