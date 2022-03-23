import { useState } from 'react'
import { getCompanies } from '../api'

export interface Item {
  about: object
  active: boolean
  activity: object
  description: string
  details: object
  documents: object[]
  homePageUrl: string
  logoUrl: string
  members: object[]
  name: string
  roadmap: object[]
  sellType: string[]
  social: object
  stages: object[]
  status: string
  videoUrl: string
  _id: string
}

export const useLoadItems = () => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<Item[]>([])
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const [error, setError] = useState<Error>()
  const [nextPage, setNextPage] = useState(1)

  async function loadMore() {
    setLoading(true)
    try {
      const {
        items,
        meta: { totalPages, currentPage },
      } = await getCompanies(nextPage)

      setItems((current) => [...current, ...items])
      setHasNextPage(totalPages !== currentPage)
      if (hasNextPage) {
        setNextPage(currentPage + 1)
      }
    } catch (err: any) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { loading, items, hasNextPage, error, loadMore }
}