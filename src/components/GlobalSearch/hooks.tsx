import { useSelector } from 'react-redux'
import { State } from '../../state/types'

const getTokens = () => {
  const tokens = useSelector((state: State) => state.lists)

  const arr = tokens.byUrl['https://tokens.pancakeswap.finance/pancakeswap-extended.json'].current
  if (!arr) return

  const out = arr.tokens
  //   const filtered = out.filter(({ name }) => name.includes())

  return out
}
const getFarms = () => {
  return useSelector((state: State) => state.farms.data)
}
const getPoolsLiquidity = () => {
  return useSelector((state: State) => state.pools.data)
}
const getPoolsSyrup = () => {
  return null
}

export { getTokens, getFarms, getPoolsLiquidity, getPoolsSyrup }
