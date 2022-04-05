import Company from '../../views/Companies/Company'

const CompanyInterceptor = ({ id }) => {
  return <Company companyId={id} />
}

CompanyInterceptor.getInitialProps = (appContext) => {
  return { id: appContext.query.id }
}

export default CompanyInterceptor
