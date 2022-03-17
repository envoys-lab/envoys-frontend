import { useTranslation } from 'contexts/Localization'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getCompanies } from './api'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useLoadItems } from './utils'

const Companies = () => {
  const { t } = useTranslation()
  const [companies, setCompanies] = useState([])
  const [pagination, setPagination] = useState({
    itemsPerPage: 10,
    totalItems: 1,
    loadedItems: 1,
    totalPages: 1,
    currentPage: 1,
  })

  const { loading, items, hasNextPage, error, loadMore } = useLoadItems()

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

  useEffect(() => {
    handleGetCompanies()
  }, [])

  const handleGetCompanies = async () => {
    const { items, meta } = await getCompanies()
    // console.log({ companies })
    setCompanies(items)
    setPagination(meta)
  }

  const renderCompany = (item) => {
    return <div key={item._id}>{item.name}</div>
  }

  //   return <div>{companies.map((item) => renderCompany(item))}</div>
  return (
    <div>
      {items.map((item) => (
        <div key={item.key}>{item.value}</div>
      ))}
      {/* 
              As long as we have a "next page", we show "Loading" right under the list.
              When it becomes visible on the screen, or it comes near, it triggers 'onLoadMore'.
              This is our "sentry".
              We can also use another "sentry" which is separated from the "Loading" component like:
                <div ref={infiniteRef} />
                {loading && <ListItem>Loading...</ListItem>}
              and leave "Loading" without this ref.
          */}
      {hasNextPage && (
        <div ref={infiniteRef}>
          <div>Loading</div>
        </div>
      )}
    </div>
  )
}

export default Companies
