import React from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import styled, { css } from 'styled-components'
import { useLoadItems } from './utils'
import { CompanyCard } from './components'
import Page from '../../components/Layout/Page'
import { Spinner, Grid, useMatchBreakpoints } from '@envoysvision/uikit'
import { useTranslation } from '../../contexts/Localization'

const CompaniesGrid = styled(Grid)<{ incompleteRowItemNumber?: boolean }>`
  padding: 6px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 110px;
  gap: 30px;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    gap: 30px 45px;
  }
  ${({ incompleteRowItemNumber }) =>
    incompleteRowItemNumber &&
    css`
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) !important;
      ${({ theme }) => theme.mediaQueries.md} {
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      }
      ${({ theme }) => theme.mediaQueries.xxl} {
        grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
      }
    `}
`

const MobileWrapper = styled('div')`
  padding: 10px;
`

const Wrapper = ({ children }: { children: any }) => {
  const { isMobile } = useMatchBreakpoints()

  if (!isMobile) {
    return <Page>{children}</Page>
  } else {
    return <MobileWrapper>{children}</MobileWrapper>
  }
}

const Companies = () => {
  const { loading, items: companies, hasNextPage, error, loadMore } = useLoadItems()
  const { t } = useTranslation()

  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: !!error,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 400px 0px',
  })

  const renderCompany = (item) => {
    return <CompanyCard company={item} key={item._id} />
  }

  return (
    <Wrapper>
      {companies?.length === 0 && <Spinner />}
      <CompaniesGrid incompleteRowItemNumber={companies?.length < 3 && !hasNextPage}>
        {companies.map((item) => renderCompany(item))}
      </CompaniesGrid>
      {hasNextPage && (
        <div ref={infiniteRef}>
          <div>{companies?.length > 0 && t('Loading')}</div>
        </div>
      )}
    </Wrapper>
  )
}

export default Companies
