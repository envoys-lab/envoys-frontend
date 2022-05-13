import { gql } from 'graphql-request'
import { mapBurns, mapMints, mapSwaps } from 'state/info/queries/helpers'
import { BurnResponse, MintResponse, SwapResponse } from 'state/info/queries/types'
import { Transaction } from 'state/info/types'
import { infoClient } from 'utils/graphql'

/**
 * Data to display transaction table on Token page
 */
const LEGACY_TOKEN_TRANSACTIONS = gql`
  query tokenTransactions($address: Bytes!) {
    mintsAs0: mints(first: 10, orderBy: timestamp, orderDirection: desc, where: { token0: $address }) {
      id
      timestamp
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      to
      amount0
      amount1
      amountUSD
    }
    mintsAs1: mints(first: 10, orderBy: timestamp, orderDirection: desc, where: { token0: $address }) {
      id
      timestamp
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      to
      amount0
      amount1
      amountUSD
    }
    swapsAs0: swaps(first: 10, orderBy: timestamp, orderDirection: desc, where: { token0: $address }) {
      id
      timestamp
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      from
      amount0In
      amount1In
      amount0Out
      amount1Out
      amountUSD
    }
    swapsAs1: swaps(first: 10, orderBy: timestamp, orderDirection: desc, where: { token1: $address }) {
      id
      timestamp
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      from
      amount0In
      amount1In
      amount0Out
      amount1Out
      amountUSD
    }
    burnsAs0: burns(first: 10, orderBy: timestamp, orderDirection: desc, where: { token0: $address }) {
      id
      timestamp
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      sender
      amount0
      amount1
      amountUSD
    }
    burnsAs1: burns(first: 10, orderBy: timestamp, orderDirection: desc, where: { token1: $address }) {
      id
      timestamp
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      sender
      amount0
      amount1
      amountUSD
    }
  }
`

const TOKEN_TRANSACTIONS = gql`
  query tokenTransactions($address: Bytes!) {
    tokenAs0: pairs(where: { token0: $address }) {
      id
      mints(first: 10, orderBy: timestamp, orderDirection: desc) {
        id
        timestamp
        pair {
          token0 {
            id
            symbol
          }
          token1 {
            id
            symbol
          }
        }
        to
        amount0
        amount1
        amountUSD
      }
      swaps(first: 10, orderBy: timestamp, orderDirection: desc) {
        id
        timestamp
        pair {
          token0 {
            id
            symbol
          }
          token1 {
            id
            symbol
          }
        }
        from
        amount0In
        amount1In
        amount0Out
        amount1Out
        amountUSD
      }
      burns(first: 10, orderBy: timestamp, orderDirection: desc) {
        id
        timestamp
        pair {
          token0 {
            id
            symbol
          }
          token1 {
            id
            symbol
          }
        }
        sender
        amount0
        amount1
        amountUSD
      }
    }

    tokenAs1: pairs(where: { token1: $address }) {
      id
      mints(first: 10, orderBy: timestamp, orderDirection: desc) {
        id
        timestamp
        pair {
          token0 {
            id
            symbol
          }
          token1 {
            id
            symbol
          }
        }
        to
        amount0
        amount1
        amountUSD
      }
      swaps(first: 10, orderBy: timestamp, orderDirection: desc) {
        id
        timestamp
        pair {
          token0 {
            id
            symbol
          }
          token1 {
            id
            symbol
          }
        }
        from
        amount0In
        amount1In
        amount0Out
        amount1Out
        amountUSD
      }
      burns(first: 10, orderBy: timestamp, orderDirection: desc) {
        id
        timestamp
        pair {
          token0 {
            id
            symbol
          }
          token1 {
            id
            symbol
          }
        }
        sender
        amount0
        amount1
        amountUSD
      }
    }
  }
`

interface PaieResponseResults {
  mints: MintResponse[]
  burns: BurnResponse[]
  swaps: SwapResponse[]
}

interface TransactionResults {
  tokenAs0: PaieResponseResults[]
  tokenAs1: PaieResponseResults[]
}

const fetchTokenTransactions = async (address: string): Promise<{ data?: Transaction[]; error: boolean }> => {
  try {
    const data = await infoClient.request<TransactionResults>(TOKEN_TRANSACTIONS, {
      address,
    })

    var mints = []
    var burns = []
    var swaps = []

    data.tokenAs0.forEach((pair) => {
      const mint = pair.mints.map(mapMints)
      mints = [...mints, ...mint]

      const burn = pair.burns.map(mapBurns)
      burns = [...burns, ...burn]

      const swap = pair.swaps.map(mapSwaps)
      swaps = [...swaps, ...swap]
    })

    data.tokenAs1.forEach((pair) => {
      const mint = pair.mints.map(mapMints)
      mints = [...mints, ...mint]

      const burn = pair.burns.map(mapBurns)
      burns = [...burns, ...burn]

      const swap = pair.swaps.map(mapSwaps)
      swaps = [...swaps, ...swap]
    })

    return { data: [...mints, ...burns, ...swaps], error: false }
  } catch (error) {
    console.error(`Failed to fetch transactions for token ${address}`, error)
    return {
      error: true,
    }
  }
}

export default fetchTokenTransactions
