import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../state/types'

const getTokens = () => {
  const tokens: any = useSelector((state: State) => state.lists)

  const arr = tokens.byUrl['https://tokens.pancakeswap.finance/pancakeswap-extended.json'].current
  if (!arr) return

  const out = arr.tokens

  return out
}

const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return debouncedValue
}

export { getTokens, useDebounce }
