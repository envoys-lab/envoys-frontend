import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getCompanies } from './api'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useLoadItems } from './utils'
import CompanyCard from './components/CompanyCard'
import { BodyWrapper } from 'components/App/AppBody'
import styles from './Companies.module.scss'

const CompanyWrapper = styled(BodyWrapper)`
  margin: 20px auto;
`

const Companies = () => {
  const { t } = useTranslation()
  const { loading, items: companies, hasNextPage, error, loadMore } = useLoadItems()

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
    <CompanyWrapper>
      <div className={styles['company__list-container']}>{companies.map((item) => renderCompany(item))}</div>
      {hasNextPage && (
        <div ref={infiniteRef}>
          <div>Loading</div>
        </div>
      )}
    </CompanyWrapper>
  )
}

export default Companies
