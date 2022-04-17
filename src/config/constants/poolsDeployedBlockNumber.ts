import { ChainId } from '@envoysvision/sdk'
import { CURRENT_CHAIN_ID } from 'config'
import { PoolDeployedBlockNumber } from './types'

const poolsDeployedBlockNumberMAINNET: PoolDeployedBlockNumber = {
  '0x35f64b2f6824d8Be046Ac854c5E4db72f6D9cE79': 18467024, // Update with MAINNET EVT
}

const poolsDeployedBlockNumberTESTNET: PoolDeployedBlockNumber = {
  '0x35f64b2f6824d8Be046Ac854c5E4db72f6D9cE79': 18467024, // Update with TESTNET EVT
}

const BY_NET = {
  [ChainId.MAINNET]: poolsDeployedBlockNumberMAINNET,
  [ChainId.TESTNET]: poolsDeployedBlockNumberTESTNET
}

const poolsDeployedBlockNumber = BY_NET[CURRENT_CHAIN_ID]

export default poolsDeployedBlockNumber
